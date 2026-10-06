from django.contrib import admin
from .models import User, Board, Task


admin.site.register(User)
admin.site.register(Board)
admin.site.register(Task)