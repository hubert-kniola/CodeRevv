from django.http import response
import jwt
import requests
from django.conf import settings
from django.utils.http import urlsafe_base64_decode
from jwt import ExpiredSignatureError
from rest_framework.decorators import api_view
from rest_framework.response import Response

from pprint import pprint

from .proxy_decorators import session_authentication
from ..models import AuthUser

proxy = r'http://127.0.0.1:8080'


def get_user_id(request):
    token1 = request.COOKIES['access']
    payload = jwt.decode(token1, settings.SECRET_KEY,
                         settings.SIMPLE_JWT['ALGORITHM'])
    return int(payload['user_id'])

def move_cookies(request, response):
    if request.COOKIES['access']:
        response.set_cookie('access', request.COOKIES['access'], max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(), httponly=True)
    if request.COOKIES['refresh']:
        response.set_cookie('refresh', request.COOKIES['refresh'], max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds(), httponly=True)

def make_response_with_cookies(request, *args, **kwargs):
    response = Response(*args, **kwargs)
    move_cookies(request, response)
    return response

@api_view(['POST'])
@session_authentication
def test_link_generate(request):
    response = requests.post(f"{proxy}/test/link?test_id={str(request.data['test_id'])}&user_id={str(get_user_id(request))}")
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['PATCH'])
@session_authentication
def test_save(request):
    response = requests.patch(
        f"{proxy}/test/save?test_id={str(request.data['test_id'])}&question_id={str(request.data['question_id'])}",
        json=request.data['user_answer'])
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_join(request, test_id):
    user_id = get_user_id(request)
    response = requests.post(f"{proxy}/test/{test_id}/{str(user_id)}")
    if response.status_code == 403 or response.status_code == 409:
        return Response(response, response.status_code)

    if 'creator' not in response.json():
        return Response(response, 500)

    creator = AuthUser.objects.get(pk=response.json()['creator'])
    new_response = response.json()
    new_response['creator_id'] = new_response['creator']
    new_response['creator'] = {'first_name': creator.first_name, 'last_name': creator.last_name, 'email': creator.email}
    return make_response_with_cookies(request, new_response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_create(request):
    user_id = get_user_id(request)
    request.data['creator'] = int(user_id)
    request.data['is_link_generated'] = True # do zmiany przy wprowadzeniu whitelisty
    response = requests.post(f"{proxy}/test/create", json=request.data)
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['GET'])
@session_authentication
def test_list(request):
    user_id = get_user_id(request)
    response = requests.get(f"{proxy}/test/list/{user_id}")
    return make_response_with_cookies(request, {'tests': response.json()}, response.status_code)


@api_view(['GET'])
@session_authentication
def creator_tests(request):
    user_id = get_user_id(request)
    response = requests.get(f"{proxy}/test/list/creator/{user_id}")
    tests = response.json()
    for test in tests:
        users_of_test = []

        if not test['users']:
            test['users'] = []

        for user in test['users']:
            user_object = AuthUser.objects.get(pk=user)
            user_dict = {'index': user_object.id ,'first_name': user_object.first_name, 'last_name': user_object.last_name, 'email': user_object.email}
            users_of_test.append(user_dict)

        test['users_data'] = users_of_test

    return make_response_with_cookies(request, {'tests': tests}, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_delete(request):
    response = requests.delete(f"{proxy}/test/delete?test_id={str(request.data['test_id'])}")
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_user(request):
    response = requests.post(f"{proxy}/test/user", json=request.data)
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_user(request):
    response = requests.delete(
        f"{proxy}/test/user?test_id={str(request.data['test_id'])}&user_id={str(request.data['user_id'])}")
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_question(request):
    response = requests.post(f"{proxy}/test/question?test_id={str(request.data['test_id'])}", json=request.data['data'])
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_question(request):
    response = requests.delete(f"{proxy}/test/question?test_id={str(request.data['test_id'])}&question_id={str(request.data['question_id'])}")
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['PATCH'])
@session_authentication
def test_question(request):
    response = requests.patch(f"{proxy}/test/question?test_id={str(request.data['test_id'])}&question_id={str(request.data['question_id'])}", json=request.data['data'])
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_submit(request):
    user_id = get_user_id(request)
    test_id = request.data['test_id']
    response = requests.post(f"{proxy}/test/save?test_id={str(test_id)}&user_id={str(user_id)}", json=request.data['test'])
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['GET'])
@session_authentication
def test_results(request, test_id):
    print('xd' * 100)
    user_id = get_user_id(request)
    response = requests.get(f"{proxy}/test/result/{test_id}/{user_id}")
    return make_response_with_cookies(request, response, response.status_code)


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

