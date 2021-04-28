from datetime import datetime

from background_task import background
from background_task.models import Task

from .models import AuthUser


@background()
def delete_inactive_users():
    users = AuthUser.objects.all()
    for user in users:
        if user.is_active:
            continue
        if (datetime.now() - user.date_joined).total_seconds() > 86400:
            user.delete()
