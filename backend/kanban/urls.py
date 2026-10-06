from django import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    ai_project_health,
    ai_early_warnings,
    health_check,
    register,
    login,
    profile,
    change_password,
    boards,
    board_detail,
    get_board_tasks,
    tasks_view,
    task_detail,
    ai_generate_tasks,

)


urlpatterns = [
    # Health check
    path("health/", health_check),

    # Auth & Tokens
    path("register/", register),
    path("users/register/", register),
    path("users/register", register),
    path("login/", login),
    path("users/login/", login),
    path("users/login", login),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Profile & Password
    path("profile/", profile),
    path("users/profile/", profile),
    path("users/profile", profile),
    path("change-password/", change_password),
    path("users/change-password/", change_password),
    path("users/change-password", change_password),

    # Boards
    path("boards/", boards),
    path("boards/<int:board_id>/", board_detail),
    path("boards/<int:board_id>/tasks/", get_board_tasks),

    # Tasks
    path("tasks/", tasks_view),
    path("tasks/<int:task_id>/", task_detail),
    path("tasks/<int:task_id>/delete/", task_detail),
    path("ai/generate-tasks/", ai_generate_tasks),
    path("ai/project-health/", ai_project_health),
    path(
    "ai/early-warnings/",
    views.ai_early_warnings,
    name="ai-early-warnings"
),
]

