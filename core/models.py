from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.TextField(unique=True)
    preferred_working_hours_per_day = models.FloatField(default=8.0)
