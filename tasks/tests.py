import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from tasks.models import Task


class TaskTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username='username',
            first_name='first_name',
            last_name='last_name',
            email='test@example.com',
            password='dE1XrSgSwonvd9Eq',
            is_superuser=False,
            is_staff=False
        )

        self.task = Task.objects.create(
            name='Task1',
            date=timezone.now(),
            duration=3,
            user=self.user
        )
        self.token = Token.objects.get(user=self.user)


    # Being Logged in
    def test_can_create_task_being_logged_in(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.post('/api/v1/tasks/', {
            'name': 'Task2',
            'date': timezone.now().strftime('%Y-%m-%d'),
            'duration': 3,
            'user': self.user
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.filter(name='Task2').count(), 1)


    def test_can_update_task_being_logged_in(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.put('/api/v1/tasks/{}/'.format(self.task.id), {
            'name': 'Task1 Updated',
            'date': timezone.now().strftime('%Y-%m-%d'),
            'duration': 3,
            'user': self.user
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Task.objects.filter(name='Task1 Updated').count(), 1)


    def test_can_partially_update_task_being_logged_in(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.patch('/api/v1/tasks/{}/'.format(self.task.id), {
            'name': 'Task1 Updated',
            'date': timezone.now().strftime('%Y-%m-%d'),
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Task.objects.filter(name='Task1 Updated').count(), 1)

    def test_can_fetch_task_being_logged_in(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.get('/api/v1/tasks/{}/'.format(self.task.id))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content).get('name'), 'Task1')

    def test_complains_that_task_with_the_same_name_already_exists(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.post('/api/v1/tasks/', {
            'name': 'Task1',
            'date': timezone.now().strftime('%Y-%m-%d'),
            'duration': 3,
            'user': self.user
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'task with this name already exists', response.content)


    # Being Logged out
    def test_cannot_create_task_being_logged_out(self):
        response = self.client.post('/api/v1/tasks/', {
            'name': 'Task2',
            'date': timezone.now().strftime('%Y-%m-%d'),
            'duration': 3,
            'user': self.user
        })
        self.assertEqual(response.status_code, 401)

    def test_cannot_update_task_being_logged_out(self):
        response = self.client.put('/api/v1/tasks/{}/'.format(self.task.id), {
            'name': 'Task1 Updated',
            'date': timezone.now().strftime('%Y-%m-%d'),
            'duration': 3,
            'user': self.user
        })

        self.assertEqual(response.status_code, 401)

    def test_cannot_partially_update_task_being_logged_out(self):
        response = self.client.patch('/api/v1/tasks/{}/'.format(self.task.id), {
            'name': 'Task1 Updated',
            'date': timezone.now().strftime('%Y-%m-%d'),
        })

        self.assertEqual(response.status_code, 401)

    def test_cannot_fetch_task_being_logged_out(self):
        response = self.client.get('/api/v1/tasks/{}/'.format(self.task.id))

        self.assertEqual(response.status_code, 401)