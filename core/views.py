from django.contrib.auth import get_user_model
from django.http import HttpResponse

from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from core.serializers import UserSerializer


class UserList(ListCreateAPIView):
    """
    API endpoint that allows users to be created.
    """
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user

        return get_user_model().objects.filter(email=user.email)

    def list(self, request,  *args, **kwargs):
        if request.user.is_anonymous:
            return HttpResponse('Unauthorized', status=401)

        return super().list(request)


class UserDetail(RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows single user to be viewed.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

