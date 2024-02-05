from typing import Counter
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
import requests,json
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
import re
import datetime
from django.db import transaction
from student_management import ins_logger
from userdetails.models import Country, RoleMaster, UserDetails
from django.contrib.auth.models import User
# Create your views here.
from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.user_details.fk_role.vchr_name == 'ADMIN'

class IsStaffUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.user_details.fk_role.vchr_name == 'STAFF'

class IsStudentUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.user_details.fk_role.vchr_name == 'STUDENT'

class IsEditorUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.user_details.fk_role.vchr_name == 'EDITOR'

class IsStaffAdminStudentUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.user_details.fk_role.vchr_name in ['Admin','Staff','Student']


class DropDown(APIView):
    def get(self,request):
        try:
            lst_role_master = RoleMaster.objects.all().values('vchr_name','id')
            lst_country = Country.objects.all().values('vchr_name','id')
            return Response({'status':1,'lst_role':lst_role_master,'lst_country':lst_country})
        except Exception as e:
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(e.__traceback__.tb_lineno)})
            return Response({'status':0,'reason':str(e)})

class RegistraionFormAPI(APIView):
    def post(self,request):
        try:
            with transaction.atomic():
                if request.data:
                    if not isinstance(request.data.get('first_name'), str):
                        raise Exception('Enter valid first name.')
                    if bool( not request.data.get('first_name') or (request.data.get('first_name') and not request.data.get('first_name').strip())):
                        raise Exception('Enter first name.')
                    if  request.data.get('last_name') and not isinstance(request.data.get('last_name'), str):
                        raise Exception('Enter valid last name.')

                    if not isinstance(request.data.get('mobile'), int):
                        raise Exception('Enter valid mobile number.')
                    if not len(str(request.data.get('mobile'))):
                        raise Exception('Mobile must conatin 10 digits.')
                    email_regex = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$'
                    if not re.match(email_regex, request.data.get('email')):
                        raise Exception('Enter valid email.')

                    if User.objects.filter(username = request.data.get('email')).exists():
                        raise Exception('Email Already exist.')

                    user = User.objects.create(
                        first_name=request.data.get('first_name'),
                        last_name=request.data.get('last_name'),
                        email=request.data.get('email'),
                        username = request.data.get('email')
                    )
                    user.set_password(request.data.get('password'))
                    user.save()
                    
                    UserDetails.objects.create(
                        dat_created = datetime.datetime.now(),
                        bint_mobile = request.data.get('mobile'),
                        email = request.data.get('email'),
                        fk_user_id = user.id,
                        fk_role_id = request.data.get('role'),
                        fk_country_id = request.data.get('country')
                    )
                    return Response({'status':1})
                raise Exception('Something went wrong')

        except Exception as e:
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(e.__traceback__.tb_lineno)})
            return Response({'status':0,'reason':str(e)})


class UserLogin(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            str_username = request.data['username']
            str_password = request.data['password']
            user = authenticate(
                request, username=str_username, password=str_password)
            if user:
                login(request, user)
                # token_json = requests.post(request.scheme+'://'+request.get_host()+'/api/token/',{'username':str_username,'password':str_password})
                # token = json.loads(token_json._content.decode("utf-8"))['access']
                str_name = user.username
                email = user.email or ''
                userdetails = {'Name': str_name, 'email': email, 'role':user.user_details.fk_role.vchr_name}
                login(request, user)
                refresh = RefreshToken.for_user(user)
                token = str(refresh.access_token)
                return Response({'status': 1, 'token': token, 'userdetails': userdetails, "str_session_key": request.session.session_key})
            raise Exception('User does not exist')
        except Exception as e:
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(e.__traceback__.tb_lineno)})
            return Response({'status':0,'reason':str(e)})

      
class userLogout(APIView):
    def get(self, request):
        logout(request)
        return Response({'status': 1, 'details': 'user logged out successfully'})


# classes with predefined data for showing pages
        
class UserAPI(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # import pdb;pdb.set_trace()
        users = UserDetails.objects.values(
            'id',
            'dat_created',
            'bint_mobile',
            'email',
            'fk_role__vchr_name',
            'fk_user__first_name',
            'fk_user__last_name',
            'fk_user__username',
            'fk_country__vchr_name'
        )

        return Response({'status':1,'users':users})
        
class MarkListAPI(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):

        # import pdb;pdb.set_trace()
        users = UserDetails.objects.values(
            'id',
            'dat_created',
            'bint_mobile',
            'email',
            'fk_role__vchr_name',
            'fk_user__first_name',
            'fk_user__last_name',
            'fk_user__username',
            'fk_country__vchr_name'
        )

        return Response({'status':1,'users':users})