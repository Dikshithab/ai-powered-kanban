from rest_framework import serializers
from .models import User, Board, Task, Priority


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password", "profile_photo"]
        extra_kwargs = {
            "password": {"write_only": True}
        }


class TaskSerializer(serializers.ModelSerializer):
    dueDate = serializers.DateField(source="due_date", required=False, allow_null=True)
    boardId = serializers.IntegerField(source="board_id", read_only=True)

    class Meta:
        model = Task
        fields = ["id", "title", "description", "status", "priority", "due_date", "dueDate", "board_id", "boardId"]
        read_only_fields = ["id", "board_id", "boardId"]


class BoardSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = Board
        fields = ["id", "name", "user_id", "tasks"]
