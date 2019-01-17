from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password, password_changed
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password', 'preferred_working_hours_per_day')

    def create(self, validated_data):
        password = validated_data['password']

        try:
            validate_password(password)
        except Exception as e:
            raise ValidationError({'password': e})

        user = get_user_model().objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
        )

        user.set_password(password)
        user.save()
        password_changed(password, user)

        return user
