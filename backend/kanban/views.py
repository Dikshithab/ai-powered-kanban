from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Board, Task, Priority
from .ai_service import generate_tasks, analyze_project_health
from .ai_service import (
    generate_tasks,
    analyze_project_health,
    detect_early_warnings
)

def serialize_task(task):
    due_str = str(task.due_date) if task.due_date else None

    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "priority": task.priority,
        "due_date": due_str,
        "dueDate": due_str,
        "board_id": task.board_id,
        "boardId": task.board_id,
        "updatedAt": task.updated_at.isoformat(),

        "dependencies": list(
            task.dependencies.values_list("id", flat=True)
        ),
    }

def serialize_board(board, include_tasks=True):
    data = {
        "id": board.id,
        "name": board.name,
        "user_id": board.user_id,
    }
    if include_tasks:
        data["tasks"] = [serialize_task(t) for t in board.tasks.all()]
    return data


# --- Health API ---
@api_view(["GET"])
def health_check(request):
    return Response({
        "message": "Kanban Python Backend is running!"
    })


# --- Authentication & User Profile ---
@api_view(["POST"])
def register(request):
    name = request.data.get("name") or request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not name or not email or not password:
        return Response(
            {"message": "Name, email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"message": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        email=email,
        password=password,
        name=name
    )

    return Response(
        {
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        },
        status=status.HTTP_201_CREATED
    )


@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"message": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        request,
        email=email,
        password=password
    )

    if user is None:
        return Response(
            {"message": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    })

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser, JSONParser])

def profile(request):
    if request.method == "GET":
        profile_photo = None

        if request.user.profile_photo:
            profile_photo = request.build_absolute_uri(
                request.user.profile_photo.url
            )

        return Response({
            "message": "You are authenticated!",
            "id": request.user.id,
            "name": request.user.name,
            "email": request.user.email,
            "profile_photo": profile_photo
        })

    if request.method == "PUT":
        name = request.data.get("name", request.user.name)
        email = request.data.get("email", request.user.email)

        if email != request.user.email and User.objects.filter(email=email).exists():
            return Response(
                {"message": "Email already in use"},
                status=status.HTTP_400_BAD_REQUEST
            )

        request.user.name = name
        request.user.email = email

        # Profile photo upload
        if "profile_photo" in request.FILES:
            request.user.profile_photo = request.FILES["profile_photo"]

        request.user.save()

        profile_photo = None

        if request.user.profile_photo:
            profile_photo = request.build_absolute_uri(
                request.user.profile_photo.url
            )

        return Response({
            "message": "Profile updated successfully",
            "id": request.user.id,
            "name": request.user.name,
            "email": request.user.email,
            "profile_photo": profile_photo
        })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    old_password = request.data.get("oldPassword") or request.data.get("old_password")
    new_password = request.data.get("newPassword") or request.data.get("new_password")

    if not old_password or not new_password:
        return Response(
            {"message": "Both current password and new password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not request.user.check_password(old_password):
        return Response(
            {"message": "Current password is incorrect"},
            status=status.HTTP_400_BAD_REQUEST
        )

    request.user.set_password(new_password)
    request.user.save()

    return Response({
        "message": "Password changed successfully"
    })


# --- Board APIs ---
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def boards(request):
    if request.method == "GET":
        user_boards = Board.objects.filter(user=request.user)
        return Response([serialize_board(b, include_tasks=True) for b in user_boards])

    if request.method == "POST":
        name = request.data.get("name")

        if not name:
            return Response(
                {"message": "Board name is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        board = Board.objects.create(
            name=name,
            user=request.user
        )

        return Response(
            {
                "message": "Board created successfully",
                "board": serialize_board(board, include_tasks=True)
            },
            status=status.HTTP_201_CREATED
        )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def board_detail(request, board_id):
    board = get_object_or_404(
        Board,
        id=board_id,
        user=request.user
    )

    if request.method == "GET":
        return Response(serialize_board(board, include_tasks=True))

    if request.method == "PUT":
        name = request.data.get("name")
        if not name:
            return Response(
                {"message": "Board name is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        board.name = name
        board.save()
        return Response({
            "message": "Board updated successfully",
            "board": serialize_board(board, include_tasks=True)
        })

    if request.method == "DELETE":
        board.delete()
        return Response({
            "message": "Board deleted successfully"
        })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_board_tasks(request, board_id):
    board = get_object_or_404(
        Board,
        id=board_id,
        user=request.user
    )

    tasks_qs = Task.objects.filter(board=board)
    return Response([serialize_task(t) for t in tasks_qs])


# --- Task APIs ---
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def tasks_view(request):
    if request.method == "GET":
        all_tasks = Task.objects.filter(board__user=request.user)
        return Response([serialize_task(t) for t in all_tasks])

    if request.method == "POST":
        board_id = request.data.get("board_id") or request.data.get("boardId")
        title = request.data.get("title")
        description = request.data.get("description", "")
        status_value = request.data.get("status", "TODO")
        due_date = request.data.get("due_date") or request.data.get("dueDate")
        priority = request.data.get("priority", "MEDIUM")

        if not board_id or not title:
            return Response(
                {"message": "board_id and title are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        board = get_object_or_404(
            Board,
            id=board_id,
            user=request.user
        )

        if priority not in Priority.values:
            priority = "MEDIUM"

        task = Task.objects.create(
            title=title,
            description=description,
            status=status_value,
            due_date=due_date if due_date else None,
            priority=priority,
            board=board
        )

        return Response(
            {
                "message": "Task created successfully",
                "task": serialize_task(task)
            },
            status=status.HTTP_201_CREATED
        )

def validate_dependencies(task, dependency_ids):
    """
    Validate task dependencies.

    Rules:
    1. A task cannot depend on itself.
    2. Dependencies must belong to the same board.
    3. Circular dependencies are not allowed.
    """

    dependency_ids = list(set(dependency_ids))

    if task.id in dependency_ids:
        return "A task cannot depend on itself."

    dependencies = Task.objects.filter(
        id__in=dependency_ids,
        board=task.board
    )

    if dependencies.count() != len(dependency_ids):
        return "All dependencies must belong to the same board."

    # Check for circular dependency
    def creates_cycle(current_task_id, visited=None):
        if visited is None:
            visited = set()

        if current_task_id in visited:
            return True

        visited.add(current_task_id)

        current_task = Task.objects.filter(
            id=current_task_id
        ).first()

        if not current_task:
            return False

        for dependency in current_task.dependencies.all():
            if dependency.id == task.id:
                return True

            if creates_cycle(dependency.id, visited.copy()):
                return True

        return False

    for dependency in dependencies:
        if creates_cycle(dependency.id):
            return "Circular dependency detected."

    return None

@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def task_detail(request, task_id):
    task = get_object_or_404(
        Task,
        id=task_id,
        board__user=request.user
    )

    # GET TASK
    if request.method == "GET":
        return Response(
            serialize_task(task),
            status=status.HTTP_200_OK
        )

    # UPDATE TASK
    if request.method == "PUT":

        title = request.data.get("title")
        description = request.data.get("description")
        status_value = request.data.get("status")
        priority = request.data.get("priority")

        due_date = request.data.get(
            "due_date",
            request.data.get("dueDate")
        )

        dependency_ids = request.data.get("dependencies")

        # Validate dependencies
        if dependency_ids is not None:

            try:
                dependency_ids = [
                    int(dependency_id)
                    for dependency_id in dependency_ids
                ]
            except (TypeError, ValueError):
                return Response(
                    {"message": "Invalid dependency IDs"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            dependency_error = validate_dependencies(
                task,
                dependency_ids
            )

            if dependency_error:
                return Response(
                    {"message": dependency_error},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Update only fields provided by frontend
        if title is not None:
            task.title = title

        if description is not None:
            task.description = description

        if status_value is not None:
            task.status = status_value

        if priority is not None:
            if priority in Priority.values:
                task.priority = priority
            else:
                return Response(
                    {"message": "Invalid priority"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        if due_date is not None:
            task.due_date = due_date or None

        task.save()

        # Update dependencies only when provided
        if dependency_ids is not None:
            task.dependencies.set(dependency_ids)

        return Response(
            serialize_task(task),
            status=status.HTTP_200_OK
        )

    # DELETE TASK
    if request.method == "DELETE":
        task.delete()

        return Response(
            {"message": "Task deleted successfully"},
            status=status.HTTP_200_OK
        )

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_generate_tasks(request):
    project_description = (
        request.data.get("project_description")
        or request.data.get("projectDescription")
    )

    if not project_description or not project_description.strip():
        return Response(
            {"message": "Project description is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    project_description = project_description.strip()

    if len(project_description) > 3000:
        return Response(
            {"message": "Project description is too long"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        tasks = generate_tasks(project_description)

        return Response(
            {"tasks": tasks},
            status=status.HTTP_200_OK
        )

    except Exception as error:
        print("AI generation error:", error)

        return Response(
            {"message": "Failed to generate tasks"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_project_health(request):
    board_id = request.data.get("board_id") or request.data.get("boardId")

    if not board_id:
        return Response(
            {"message": "Board ID is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        board = Board.objects.get(
            id=board_id,
            user=request.user
        )
    except Board.DoesNotExist:
        return Response(
            {"message": "Board not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    tasks = Task.objects.filter(board=board)

    if not tasks.exists():
        return Response(
            {
                "message": "No tasks found on this board",
                "health_score": 0,
                "health_status": "WARNING",
                "summary": "Add some tasks before analyzing project health.",
                "risks": [],
                "recommendations": [
                    "Create tasks for your project."
                ]
            },
            status=status.HTTP_200_OK
        )

    try:
        result = analyze_project_health(tasks)

        return Response(
            result,
            status=status.HTTP_200_OK
        )

    except Exception as error:
        print("AI project health error:", error)

        return Response(
            {"message": "Failed to analyze project health"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_early_warnings(request):

    board_id = (
        request.data.get("board_id")
        or request.data.get("boardId")
    )

    if not board_id:
        return Response(
            {"message": "Board ID is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        board = Board.objects.get(
            id=board_id,
            user=request.user
        )

    except Board.DoesNotExist:
        return Response(
            {"message": "Board not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    tasks = Task.objects.filter(
        board=board
    ).prefetch_related("dependencies")

    warnings = detect_early_warnings(tasks)

    return Response(
        {
            "board_id": board.id,
            "board_name": board.name,
            "total_warnings": len(warnings),
            "warnings": warnings,
        },
        status=status.HTTP_200_OK
    )