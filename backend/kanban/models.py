from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(
            email,
            password,
            **extra_fields
        )


class User(AbstractUser):
    username = None

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    # Profile Photo
    profile_photo = models.ImageField(
        upload_to="profile_photos/",
        null=True,
        blank=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


class Board(models.Model):
    name = models.CharField(max_length=100)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="boards"
    )

    def __str__(self):
        return self.name


class Priority(models.TextChoices):
    LOW = "LOW", "Low"
    MEDIUM = "MEDIUM", "Medium"
    HIGH = "HIGH", "High"


class TaskStatus(models.TextChoices):
    TODO = "TODO", "To Do"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    DONE = "DONE", "Done"


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=TaskStatus.choices,
        default=TaskStatus.TODO
    )

    due_date = models.DateField(null=True, blank=True)

    priority = models.CharField(
        max_length=10,
        choices=Priority.choices,
        default=Priority.MEDIUM
    )

    updated_at = models.DateTimeField(auto_now=True)

    board = models.ForeignKey(
        Board,
        on_delete=models.CASCADE,
        related_name="tasks"
    )

    dependencies = models.ManyToManyField(
    "self",
    symmetrical=False,
    blank=True,
    related_name="dependent_tasks"
)

    def __str__(self):
        return self.title
