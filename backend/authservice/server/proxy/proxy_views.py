import jwt
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
from ..views.serializers import *
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, logout
from django.utils import timezone
from django.utils.encoding import force_bytes
from django.conf import settings
from rest_framework_simplejwt.exceptions import TokenError
from .proxy_decorators import session_authentication
import requests

proxy = str('http://127.0.0.1:8080')


@api_view(['POST'])
@session_authentication
def test_create(request):
    print(type(request.data))
    response = requests.post(proxy + '/test/create', json=request.data)
    return Response(response, response.status_code)


@api_view(['GET'])
@session_authentication
def test_list(request):
    response = requests.get(proxy + '/test/list')
    return Response(response, response.status_code)


@api_view(['DELETE'])
def test_delete(request):
    response = requests.delete(proxy + '/test/delete?test_id=' + str(request.data['test_id']))
    return Response(response, response.status_code)


@api_view(['POST'])
def test_user(request):
    response = requests.post(proxy + '/test/user', json=request.data)
    return Response(response, response.status_code)


@api_view(['DELETE'])
def test_user(request):
    response = requests.delete(proxy + '/test/user?test_id=' + str(request.data['test_id']) + '&user_id=' + str(request.data['user_id']))
    return Response(response, response.status_code)


@api_view(['POST'])
def test_question(request):
    response = requests.post(proxy + '/test/question?test_id=' + str(request.data['test_id']), json=request.data['data'])
    return Response(response, response.status_code)


@api_view(['DELETE'])
def test_question(request):
    response = requests.delete(proxy + '/test/question?test_id=' + str(request.data['test_id']) + '&question_id=' + str(request.data['question_id']))
    return Response(response, response.status_code)


@api_view(['PATCH'])
def test_question(request):
    response = requests.patch(proxy + '/test/question?test_id=' + str(request.data['test_id']) + '&question_id=' + str(request.data['question_id']), json=request.data['data'])
    return Response(response, response.status_code)


@api_view(['POST'])
def test_answer(request):
    response = requests.post(proxy + '/test/answer?test_id=' + str(request.data['test_id']), json=request.data['data'])
    return Response(response, response.status_code)


@api_view(['DELETE'])
def test_answer(request):
    response = requests.delete(proxy + '/test/answer?test_id=' + str(request.data['test_id']) + '&answer_id=' + str(request.data['answer_id']))
    return Response(response, response.status_code)


@api_view(['PATCH'])
def test_answer(request):
    response = requests.patch(proxy + '/test/answer?test_id=' + str(request.data['test_id']) + '&answer_id=' + str(request.data['answer_id']), json=request.data['data'])
    return Response(response, response.status_code)
