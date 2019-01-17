from django.contrib.auth import get_user_model

from django.db import models

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Task(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    duration = models.FloatField()
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    class Meta:
        unique_together = (('name', 'user'),)