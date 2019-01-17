import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token


class UserTestCase(TestCase):
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
        self.token = Token.objects.get(user=self.user)


    # Being Logged in
    def test_can_create_user_being_logged_in(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.post('/api/v1/users/', {
            'username': 'blabla',
            'email': 'new_email@example.com',
            'password': 'pyiieyiireyrey',
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(get_user_model().objects.filter(email='new_email@example.com').count(), 1)

    def test_can_update_user_being_logged_in(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.put('/api/v1/users/account/'.format(self.user.id), {
            'username': 'blabla',
            'email': 'updated_email@example.com',
            'password': 'pyiieyiireyrey',
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(get_user_model().objects.filter(email='updated_email@example.com').count(), 1)


    def test_can_partially_update_user_being_logged_in(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.patch('/api/v1/users/account/'.format(self.user.id), {
            'username': 'blabla',
            'email': 'updated_email@example.com',
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(get_user_model().objects.filter(email='updated_email@example.com').count(), 1)


    def test_can_fetch_user_being_logged_in(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.get('/api/v1/users/account/'.format(self.user.id))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content).get('email'), 'test@example.com')

    # Being Logged out
    def test_can_create_user_being_logged_out(self):
        response = self.client.post('/api/v1/users/', {
            'username': 'blabla',
            'email': 'new_email@example.com',
            'password': 'pyiieyiireyrey',
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(get_user_model().objects.filter(email='new_email@example.com').count(), 1)

    def test_complains_that_password_is_too_weak(self):
        response = self.client.post('/api/v1/users/', {
            'username': 'blabla',
            'email': 'new_email@example.com',
            'password': 'password',
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn(b'This password is too common.', response.content)

    def test_cannot_update_user_being_logged_out(self):
        response = self.client.put('/api/v1/users/account/'.format(self.user.id), {
            'username': 'blabla',
            'email': 'updated_email@example.com',
            'password': 'pyiieyiireyrey',
        })
        self.assertEqual(response.status_code, 401)

    def test_cannot_partially_update_user_being_logged_out(self):
        response = self.client.patch('/api/v1/users/account/'.format(self.user.id), {
            'username': 'blabla',
            'email': 'updated_email@example.com',
        })
        self.assertEqual(response.status_code, 401)

    def test_cannot_fetch_user_being_logged_out(self):
        response = self.client.get('/api/v1/users/account/'.format(self.user.id))
        self.assertEqual(response.status_code, 401)