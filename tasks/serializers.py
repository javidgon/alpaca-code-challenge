from rest_framework import serializers
from rest_framework.fields import HiddenField, CurrentUserDefault
from rest_framework.validators import UniqueTogetherValidator

from tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'date', 'duration')
        user = HiddenField(
            default=CurrentUserDefault()
        )

    def create(self, validated_data):
        """
        This check should not be necessary with "unique_together", but I found out that
        with SQLite this restriction is not working as I should, so I did this validation explicitly.
        """
        try:
            Task.objects.get(name=validated_data['name'], user=validated_data['user'])
        except:
            task = Task.objects.create(
                name=validated_data['name'],
                date=validated_data['date'],
                duration=validated_data['duration'],
                user=validated_data['user']
            )
            return task
        else:
            raise serializers.ValidationError({'name': "task with this name already exists"})