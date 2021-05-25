import jwt
import requests
from django.conf import settings
from django.utils.http import urlsafe_base64_decode
from jwt import ExpiredSignatureError
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .proxy_decorators import session_authentication
from ..models import AuthUser

proxy = r'http://127.0.0.1:8080'


def get_user_id(request):
    token1 = request.COOKIES['access']
    payload = jwt.decode(token1, settings.SECRET_KEY,
                         settings.SIMPLE_JWT['ALGORITHM'])
    return int(payload['user_id'])


@api_view(['POST'])
@session_authentication
def test_link_generate(request):
    response = requests.post(f"{proxy}/test/link?test_id={str(request.data['test_id'])}&user_id={str(get_user_id(request))}")
    return Response(response, response.status_code)


@api_view(['PATCH'])
@session_authentication
def test_save(request):
    response = requests.patch(
        f"{proxy}/test/save?test_id={str(request.data['test_id'])}&question_id={str(request.data['question_id'])}",
        json=request.data['user_answer'])
    return Response(response, response.status_code)


@api_view(['POST'])
@session_authentication
def test(request, test_id):
    user_id = get_user_id(request)
    response = requests.post(f"{proxy}/test/{test_id}/{str(user_id)}")
    print(user_id)
    if response.status_code == 403 or 'creator_id' not in response.json():
        return Response(response, response.status_code)
    creator = AuthUser.objects.get(pk=response.json()['creator_id'])
    new_response = response.json()
    new_response['creator'] = {'first_name': creator.first_name, 'last_name': creator.last_name, 'email': creator.email}
    return Response(new_response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_create(request):
    user_id = get_user_id(request)
    request.data['creator'] = int(user_id)
    request.data['is_link_generated'] = False
    print(request.data)
    response = requests.post(f"{proxy}/test/create", json=request.data)
    return Response(response, response.status_code)


@api_view(['GET'])
@session_authentication
def test_list(request):
    response = requests.get(f"{proxy}/test/list")
    return Response({'tests': response.json()}, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_delete(request):
    response = requests.delete(f"{proxy}/test/delete?test_id={str(request.data['test_id'])}")
    return Response(response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_user(request):
    response = requests.post(f"{proxy}/test/user", json=request.data)
    return Response(response, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_user(request):
    response = requests.delete(
        f"{proxy}/test/user?test_id={str(request.data['test_id'])}&user_id={str(request.data['user_id'])}")
    return Response(response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_question(request):
    response = requests.post(f"{proxy}/test/question?test_id={str(request.data['test_id'])}", json=request.data['data'])
    return Response(response, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_question(request):
    response = requests.delete(f"{proxy}/test/question?test_id={str(request.data['test_id'])}&question_id={str(request.data['question_id'])}")
    return Response(response, response.status_code)


@api_view(['PATCH'])
@session_authentication
def test_question(request):
    response = requests.patch(f"{proxy}/test/question?test_id={str(request.data['test_id'])}&question_id={str(request.data['question_id'])}", json=request.data['data'])
    return Response(response, response.status_code)


# @api_view(['POST'])
# @session_authentication
# def test_answer(request):
#     response = requests.post(f"{proxy}/test/answer?test_id={str(request.data['test_id'])}", json=request.data['data'])
#     return Response(response, response.status_code)
#
#
# @api_view(['DELETE'])
# @session_authentication
# def test_answer(request):
#     response = requests.delete(
#         f"{proxy}/test/answer?test_id={str(request.data['test_id'])}&answer_id={str(request.data['answer_id'])}")
#     return Response(response, response.status_code)
#
#
# @api_view(['PATCH'])
# @session_authentication
# def test_answer(request):
#     response = requests.patch(
#         f"{proxy}/test/answer?test_id={str(request.data['test_id'])}&answer_id={str(request.data['answer_id'])}",
#         json=request.data['data'])
#     return Response(response, response.status_code)
