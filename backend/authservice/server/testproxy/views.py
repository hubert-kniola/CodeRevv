import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..configure import testservice

from pprint import pprint

from ..utility import session_authentication, make_response_with_cookies, get_user_id
from ..models import AuthUser


@api_view(['POST'])
@session_authentication
def test_link_generate(request):
    response = requests.post(f"{testservice}/t/link/{request.data['test_id']}/{get_user_id(request)}")
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['POST'])
@session_authentication
def test_join(request, test_id):
    user_id = get_user_id(request)
    response = requests.post(f"{testservice}/t/{test_id}/{user_id}")
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
    request.data['is_finished'] = False
    response = requests.post(f"{testservice}/t/create", json=request.data)
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['PATCH'])
@session_authentication
def test_edit(request):
    response = requests.patch(f"{testservice}/t/edit/{get_user_id(request)}", json=request.data)
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['PATCH'])
@session_authentication
def test_whitelist(request, test_id):
    users_id = []
    for user_email in request.data['users']:
        user = AuthUser.objects.get(email=user_email)
        users_id.append(user.id)
    request.data['users'] = users_id
    response = requests.patch(f'{testservice}/t/whitelist/{test_id}/{get_user_id(request)}', json=request.data)
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['GET'])
@session_authentication
def creator_tests(request):
    user_id = get_user_id(request)
    response = requests.get(f"{testservice}/t/list/creator/{user_id}")
    tests = response.json()
    for test in tests:
        users_of_test = []

        if not test['users']:
            test['users'] = {}

        for user in test['users']:
            user_object = AuthUser.objects.get(pk=user)
            user_dict = {'index': user_object.id ,'first_name': user_object.first_name, 'last_name': user_object.last_name, 'email': user_object.email}
            users_of_test.append(user_dict)

        test['users_data'] = users_of_test

    return make_response_with_cookies(request, {'tests': tests}, response.status_code)


@api_view(['DELETE'])
@session_authentication
def test_delete(request):
    response = requests.delete(f"{testservice}/t/delete/{request.data['test_id']}/{get_user_id(request)}")
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['GET'])
@session_authentication
def test_questions(request):
    creator_id = get_user_id(request)
    response = requests.get(f"{testservice}/t/questions/{creator_id}")
    return make_response_with_cookies(request, response, response.status_code)


# ===================================================================

@api_view(['POST'])
@session_authentication
def test_submit(request):
    user_id = get_user_id(request)
    test_id = request.data['test_id']
    response = requests.post(f"{testservice}/t/save/{test_id}/{user_id}", json=request.data['test'])
    return make_response_with_cookies(request, response, response.status_code)


@api_view(['GET'])
@session_authentication
def test_results(request, test_id):
    user_id = get_user_id(request)
    response = requests.get(f"{testservice}/t/result/{test_id}/{user_id}")
    return make_response_with_cookies(request, response, response.status_code)

# @api_view(['PATCH'])
# @session_authentication
# def test_save(request):
#      response = requests.patch(
#          f"{proxy}/t/save/{str(request.data['test_id'])}/{str(request.data['question_id'])}",
#          json=request.data['user_answer'])
#      return make_response_with_cookies(request, response, response.status_code)
