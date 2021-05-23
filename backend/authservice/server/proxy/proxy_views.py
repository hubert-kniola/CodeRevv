import jwt
import requests
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .proxy_decorators import session_authentication

proxy = r'http://127.0.0.1:8080'


@api_view(['POST'])
@session_authentication
def test_join(request):
    token1 = request.COOKIES['access']
    payload = jwt.decode(token1, settings.SECRET_KEY, settings.SIMPLE_JWT['ALGORITHM'])
    response = request.post(proxy + f"/test/{request.data['test_id']}/{payload['user_id']}")
    return Response(response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_create(request):
    response = requests.post(proxy + '/test/create', json=request.data)
    return Response(response, response.status_code)


@api_view(['GET'])
@session_authentication
def test_list(request):
    response = requests.get(proxy + '/test/list')
    return Response(response, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_delete(request):
    response = requests.delete(proxy + '/test/delete?test_id=' + str(request.data['test_id']))
    return Response(response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_user(request):
    response = requests.post(proxy + '/test/user', json=request.data)
    return Response(response, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_user(request):
    response = requests.delete(proxy + '/test/user?test_id=' + str(request.data['test_id']) + '&user_id=' + str(request.data['user_id']))
    return Response(response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_question(request):
    response = requests.post(proxy + '/test/question?test_id=' + str(request.data['test_id']), json=request.data['data'])
    return Response(response, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_question(request):
    response = requests.delete(proxy + '/test/question?test_id=' + str(request.data['test_id']) + '&question_id=' + str(request.data['question_id']))
    return Response(response, response.status_code)


@api_view(['PATCH'])
@session_authentication
def test_question(request):
    response = requests.patch(proxy + '/test/question?test_id=' + str(request.data['test_id']) + '&question_id=' + str(request.data['question_id']), json=request.data['data'])
    return Response(response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_answer(request):
    response = requests.post(proxy + '/test/answer?test_id=' + str(request.data['test_id']), json=request.data['data'])
    return Response(response, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_answer(request):
    response = requests.delete(proxy + '/test/answer?test_id=' + str(request.data['test_id']) + '&answer_id=' + str(request.data['answer_id']))
    return Response(response, response.status_code)


@api_view(['PATCH'])
@session_authentication
def test_answer(request):
    response = requests.patch(proxy + '/test/answer?test_id=' + str(request.data['test_id']) + '&answer_id=' + str(request.data['answer_id']), json=request.data['data'])
    return Response(response, response.status_code)
