from django.test import TestCase, Client
from django.urls import reverse
from django.conf import settings


class TestViews(TestCase):

    def setUp(self):
        self.client = Client()

    def test_recaptcha_verify_POST(self):
        response = self.client.post(reverse('recaptcha'),
                                    {'token': 'invalid token'})
        self.assertEquals(response.status_code, 200)

    def test_refresh_token_POST(self):
        response = self.client.post(reverse('token_refresh'),
                                    {'refresh': 'invalid refresh token'})
        self.assertEquals(response.status_code, 401)

    def test_refresh_token_no_POST(self):
        response = self.client.post(reverse('token_refresh'),
                                    {'refresh': 'invalid refresh token'})
        self.assertNotEquals(response.status_code, 200)

    def test_user_login_no_POST(self):
        response = self.client.post(reverse('login'),
                                    {'email': 'kniola10@gmail.com', 'password': 'asdfasdf'})
        self.assertEquals(response.status_code, 404)

    # def test_user_google_login_POST(self):
    #     response = self.client.post(reverse('google_login'),
    #                                 {'email': 'kniola10@gmail.com', 'googleId': 'asdfasdf'})
    #     self.assertEquals(response.status_code, 409)

    # def test_user_register_no_POST(self):
    #     response = self.client.post(reverse('register'),
    #                                 {'email': 'kniola9@gmail.com', 'password': 'asdfasdf',
    #                                  'first_name': 'Hubert', 'last_name': 'Kniola'})
    #     self.assertEquals(response.status_code, 201)
    #
    # def test_user_register_POST(self):
    #     response = self.client.post(reverse('register'),
    #                                 {'email': 'jordankondracki1999@gmail.com', 'password': 'asdfasdf',
    #                                  'first_name': 'Jordan', 'last_name': 'Kondracki'})
    #     self.assertNotEquals(response.status_code, 201)

    def test_activate_POST(self):
        response = self.client.post(reverse('activate'),
                                    {'uid': 'invalid uid',
                                     'token': 'invalid token'})
        self.assertEquals(response.status_code, 409)

    def test_password_reset_POST(self):
        response = self.client.post(reverse('pwd_reset'),
                                    {'email': 'invalid email'})
        self.assertEquals(response.status_code, 409)

    def test_recover_password_POST(self):
        response = self.client.post(reverse('recover'),
                                    {'uid': 'invalid uid', 'token': 'invalid token',
                                     'password': 'invalid password'})
        self.assertEquals(response.status_code, 409)

    def test_user_logout_POST(self):
        response = self.client.post(reverse('logout'),)
        self.assertEquals(response.status_code, 200)
