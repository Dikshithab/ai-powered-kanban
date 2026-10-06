from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Board, Task, Priority

User = get_user_model()


class KanbanAPITests(APITestCase):
    def setUp(self):
        # Create User A
        self.user_a = User.objects.create_user(
            email="usera@example.com",
            password="PasswordA123!",
            name="User A"
        )
        # Create User B
        self.user_b = User.objects.create_user(
            email="userb@example.com",
            password="PasswordB123!",
            name="User B"
        )

        # Create Board A and Task A for User A
        self.board_a = Board.objects.create(name="Board A", user=self.user_a)
        self.task_a = Task.objects.create(
            title="Task A",
            description="Task A description",
            status="TODO",
            priority=Priority.HIGH,
            board=self.board_a
        )

        # Create Board B and Task B for User B
        self.board_b = Board.objects.create(name="Board B", user=self.user_b)
        self.task_b = Task.objects.create(
            title="Task B",
            description="Task B description",
            status="IN_PROGRESS",
            priority=Priority.MEDIUM,
            board=self.board_b
        )

    def test_user_registration_and_password_hashing(self):
        url = "/api/register/"
        data = {
            "name": "New User",
            "email": "newuser@test.com",
            "password": "SecretPassword123!"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["user"]["email"], "newuser@test.com")

        # Verify password is not stored as plain text
        new_user = User.objects.get(email="newuser@test.com")
        self.assertTrue(new_user.check_password("SecretPassword123!"))
        self.assertNotEqual(new_user.password, "SecretPassword123!")

        # Verify duplicate registration is rejected
        dup_response = self.client.post(url, data, format="json")
        self.assertEqual(dup_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_and_jwt_authentication(self):
        url = "/api/login/"
        data = {
            "email": "usera@example.com",
            "password": "PasswordA123!"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

        access_token = response.data["access"]

        # Test authenticated profile access
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
        profile_response = self.client.get("/api/profile/")
        self.assertEqual(profile_response.status_code, status.HTTP_200_OK)
        self.assertEqual(profile_response.data["email"], "usera@example.com")

        # Test unauthenticated profile access
        self.client.credentials()  # Clear credentials
        unauth_response = self.client.get("/api/profile/")
        self.assertEqual(unauth_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_board_crud(self):
        # Authenticate as User A
        self.client.force_authenticate(user=self.user_a)

        # 1. Create Board
        create_res = self.client.post("/api/boards/", {"name": "Sprint 1 Board"}, format="json")
        self.assertEqual(create_res.status_code, status.HTTP_201_CREATED)
        board_id = create_res.data["board"]["id"]

        # 2. Get User Boards
        list_res = self.client.get("/api/boards/")
        self.assertEqual(list_res.status_code, status.HTTP_200_OK)
        board_ids = [b["id"] for b in list_res.data]
        self.assertIn(board_id, board_ids)

        # 3. Get Single Board
        get_res = self.client.get(f"/api/boards/{board_id}/")
        self.assertEqual(get_res.status_code, status.HTTP_200_OK)
        self.assertEqual(get_res.data["name"], "Sprint 1 Board")

        # 4. Update Board
        update_res = self.client.put(f"/api/boards/{board_id}/", {"name": "Sprint 1 Updated"}, format="json")
        self.assertEqual(update_res.status_code, status.HTTP_200_OK)
        self.assertEqual(update_res.data["board"]["name"], "Sprint 1 Updated")

        # 5. Delete Board
        delete_res = self.client.delete(f"/api/boards/{board_id}/")
        self.assertEqual(delete_res.status_code, status.HTTP_200_OK)
        self.assertFalse(Board.objects.filter(id=board_id).exists())

    def test_task_crud(self):
        self.client.force_authenticate(user=self.user_a)

        # 1. Create Task
        create_res = self.client.post("/api/tasks/", {
            "board_id": self.board_a.id,
            "title": "New Kanban Feature",
            "description": "Implement DRF views",
            "status": "TODO",
            "priority": "HIGH",
            "due_date": "2026-10-01"
        }, format="json")
        self.assertEqual(create_res.status_code, status.HTTP_201_CREATED)
        task_id = create_res.data["task"]["id"]

        # 2. Get Board Tasks
        board_tasks_res = self.client.get(f"/api/boards/{self.board_a.id}/tasks/")
        self.assertEqual(board_tasks_res.status_code, status.HTTP_200_OK)
        task_ids = [t["id"] for t in board_tasks_res.data]
        self.assertIn(task_id, task_ids)

        # 3. Get All User Tasks
        all_tasks_res = self.client.get("/api/tasks/")
        self.assertEqual(all_tasks_res.status_code, status.HTTP_200_OK)
        all_task_ids = [t["id"] for t in all_tasks_res.data]
        self.assertIn(task_id, all_task_ids)

        # 4. Update Task
        update_res = self.client.put(f"/api/tasks/{task_id}/", {
            "title": "New Kanban Feature Updated",
            "status": "IN_PROGRESS",
            "priority": "MEDIUM"
        }, format="json")
        self.assertEqual(update_res.status_code, status.HTTP_200_OK)
        self.assertEqual(update_res.data["task"]["status"], "IN_PROGRESS")
        self.assertEqual(update_res.data["task"]["title"], "New Kanban Feature Updated")

        # 5. Delete Task
        delete_res = self.client.delete(f"/api/tasks/{task_id}/")
        self.assertEqual(delete_res.status_code, status.HTTP_200_OK)
        self.assertFalse(Task.objects.filter(id=task_id).exists())

    def test_two_user_ownership_security(self):
        """
        SECURITY TEST:
        User A has Board A, Task A.
        User B has Board B, Task B.
        Verify User A cannot access, modify, or delete Board B or Task B.
        """
        self.client.force_authenticate(user=self.user_a)

        # User A cannot GET Board B
        res = self.client.get(f"/api/boards/{self.board_b.id}/")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

        # User A cannot PUT Board B
        res = self.client.put(f"/api/boards/{self.board_b.id}/", {"name": "Hacked Board"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

        # User A cannot DELETE Board B
        res = self.client.delete(f"/api/boards/{self.board_b.id}/")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

        # User A cannot GET Task B
        res = self.client.get(f"/api/tasks/{self.task_b.id}/")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

        # User A cannot PUT Task B
        res = self.client.put(f"/api/tasks/{self.task_b.id}/", {"title": "Hacked Task"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

        # User A cannot DELETE Task B
        res = self.client.delete(f"/api/tasks/{self.task_b.id}/")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

        # User A cannot create a task in User B's Board
        res = self.client.post("/api/tasks/", {
            "board_id": self.board_b.id,
            "title": "Unauthorized Task"
        }, format="json")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
