from django import forms
from allauth.account.forms import SignupForm
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Invisible


# class CustomSignupForm(SignupForm):
#     first_name = forms.CharField(max_length=30, label='First name')
#     last_name = forms.CharField(max_length=30, label='Last name')
#
#     captcha = ReCaptchaField(widget=ReCaptchaV2Invisible(attrs={'data-theme': 'dark'}))
#
#     def signup(self, request, user):
#         user.first_name = self.cleaned_data['first_name']
#         user.last_name = self.cleaned_data['last_name']
#         user.save()