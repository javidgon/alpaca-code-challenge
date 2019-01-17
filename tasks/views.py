from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from tasks.models import Task
from tasks.serializers import TaskSerializer


class TaskList(ListCreateAPIView):
    """
    API endpoint that allows users to be created.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskDetail(RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows single user to be viewed.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer

    def get_object(self):
        user = self.request.user
        task_id = self.kwargs['task_id']

        return get_object_or_404(Task, **{
            'id': task_id,
            'user': user
        })
