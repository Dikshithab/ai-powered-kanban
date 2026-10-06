"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from kanban.views import (
    ai_early_warnings,
    ai_project_health,
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
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/health/", health_check),
    path("api/register/", register),
    path("api/login/", login),

    path("api/users/profile/", profile),
    path("api/users/change-password/", change_password),

    path("api/boards/", boards),
    path("api/boards/<int:board_id>/", board_detail),
    path("api/boards/<int:board_id>/tasks/", get_board_tasks),

    path("api/tasks/", tasks_view),
    path("api/tasks/<int:task_id>/", task_detail),

    # AI
    path("api/ai/generate-tasks/", ai_generate_tasks),
    path("api/ai/project-health/", ai_project_health),
    path(
        "api/ai/early-warnings/",
        ai_early_warnings,
        name="ai-early-warnings"
    ),
    
]
    
urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
