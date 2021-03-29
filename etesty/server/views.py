from django.contrib.auth.backends import AllowAllUsersModelBackend
from django.http import *
from rest_framework.permissions import AllowAny

from .serializers import *
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
# Create your views here.
from django.views.generic import View
from django.utils import timezone
import os


@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = AuthUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = AuthUser.objects.get(pk=pk)

    except AuthUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def test_list(request):
    if request.method == 'GET':
        tests = OnlineTest.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = TokenPairSerializer


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def user_login(request):
    if request.method == 'POST':
        user_data = request.data
        user = authenticate(username=user_data['email'], password=user_data['password'])
        if user is not None:
            user.is_active = True
            user.last_login = timezone.now()
            user.save()
            serializer = TokenPairSerializer()
            attr = {
                'email': user.email,
                'password': user_data['password']
            }
            return Response(serializer.validate(attr), status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def user_register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            user = serializer.save()
            print('.....')
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ReactView(View):
    REACT_INDEX = os.path.join(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'webapp'), 'build', 'index.html')

    def get(self, request):
        try:
            with open(ReactView.REACT_INDEX) as file:
                return HttpResponse(file.read(), status=status.HTTP_200_OK)

        except:
            return Response(data="""index.html not found ! build your React app !!""", status=status.HTTP_501_NOT_IMPLEMENTED,)
