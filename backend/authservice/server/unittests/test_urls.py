from django.test import SimpleTestCase
from django.urls import reverse, resolve

from ..views.authviews import *
from ..views.views import *


class TestUrls(SimpleTestCase):

    def test_user_list_url_resolves(self):
        url = reverse('user_list')
        self.assertEquals(resolve(url).func, user_list)

    def test_user_url_resolves(self):
        url = reverse('user', args=[1])
        self.assertEquals(resolve(url).func, user_detail)

    def test_test_list_url_resolves(self):
        url = reverse('test_list')
        self.assertEquals(resolve(url).func, test_list)

    def test_login_url_resolves(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func, user_login)

    def test_google_login_url_resolves(self):
        url = reverse('google_login')
        self.assertEquals(resolve(url).func, user_google_login)

    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, user_register)

    def test_password_reset_url_resolves(self):
        url = reverse('pwd_reset')
        self.assertEquals(resolve(url).func, password_reset)

    def test_token_create_url_resolves(self):
        url = reverse('token_create')
        self.assertEquals(resolve(url).func.view_class, TokenPairView)

    def test_refresh_token_url_resolves(self):
        url = reverse('token_refresh')
        self.assertEquals(resolve(url).func, refresh_token)

    def test_activate_url_resolves(self):
        url = reverse('activate')
        self.assertEquals(resolve(url).func, activate)

    def test_recover_url_resolves(self):
        url = reverse('recover')
        self.assertEquals(resolve(url).func, recover_password)

    def test_logout_url_resolves(self):
        url = reverse('logout')
        self.assertEquals(resolve(url).func, user_logout)

    def test_recaptcha_url_resolves(self):
        url = reverse('recaptcha')
        self.assertEquals(resolve(url).func, recaptcha_verify)
