from django.test import TestCase, Client
from django.urls import reverse


class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        #self.list_url = reverse('list')

    # def test_recaptcha_verify_POST(self):
    #     response = self.client.post('api/v1/recaptcha/', )

    # def test_user_login_POST(self):
    #     response = self.client.post('api/v1/login/', {'email': 'kniola4@gmail.com', 'password': 'asdfasdf'})

    def test_user_register_POST(self):
        response = self.client.post('api/v1/register/', {'email': 'jordankondracki1999@gmail.com', 'password': 'asdfasdf', 'first_name': 'Jordan', 'last_name': 'Kondracki'})
        self.assertEquals(response.status_code, 201)
