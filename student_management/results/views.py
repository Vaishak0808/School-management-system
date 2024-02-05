from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from results.models import Results, Subjects
from userdetails.models import UserDetails
from userdetails.views import IsStaffUser, IsEditorUser, IsStudentUser
from student_management import ins_logger
from datetime import datetime

# Create your views here.
        
class FiltersAPI(APIView):
    permission_classes = [IsAuthenticated, IsStaffUser]

    def get(self, request):
        # import pdb;pdb.set_trace()
        subjects = Subjects.objects.values(
            'id',
            'dat_created',
            'vchr_name'
        )
        students = UserDetails.objects.filter(fk_role__vchr_name = 'STUDENT').values(
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

        return Response({'status':1,'subjects':subjects, 'students': students})

    def post(self, request):

        try:
            if Results.objects.filter(student_id = request.data.get('student_id')).exists():
                return Response({'status':0,'details':'Marks already added'})
            return Response({'status':1,'details':'Good to go'})
        except Exception as e:
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(e.__traceback__.tb_lineno)})
            return Response({'status':0,'reason':str(e)})
        
class SubjectAPI(APIView):
    permission_classes = [IsAuthenticated, IsEditorUser]

    def get(self, request):
        # import pdb;pdb.set_trace()
        subjects = Subjects.objects.values(
            'id',
            'dat_created',
            'vchr_name'
        )

        return Response({'status':1,'subjects':subjects})

    def post(self, request):
        # import pdb;pdb.set_trace()
        try:
            if Subjects.objects.filter(vchr_name = request.data.get('name')).exists():
                raise "Subject already exists"
            Subjects.objects.create(
                vchr_name = request.data.get('name')
            )
            subjects = Subjects.objects.values(
                'id',
                'dat_created',
                'vchr_name'
            )

            return Response({'status':1,'subjects':subjects})
        except Exception as e:
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(e.__traceback__.tb_lineno)})
            return Response({'status':0,'reason':str(e)})
        
class ResultAPI(APIView):
    permission_classes = [IsAuthenticated, IsStaffUser]

    def get(self, request):
        try:
            results = Results.objects.values(
                'id',
                'dat_created',
                'staff__first_name',
                'staff__last_name',
                'student__first_name',
                'student__last_name',
                'json_grade'
            )

            return Response({'status':1,'results':results})

        except Exception as e:
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(e.__traceback__.tb_lineno)})
            return Response({'status':0,'reason':str(e)})

    def post(self, request):
        # import pdb;pdb.set_trace()
        try:
            Results.objects.create(
                student_id = request.data.get('student_id'),
                json_grade = request.data.get('results'),
                staff_id = request.user.id,
                dat_created = datetime.now()
            )

            return Response({'status':1,'details':'created successfully'})
        except Exception as e:
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(e.__traceback__.tb_lineno)})
            return Response({'status':0,'reason':str(e)})

class GradeCard(APIView):
    permission_classes = [IsAuthenticated, IsStudentUser]

    def get(self, request):
        try:
            results = Results.objects.filter(student=request.user).values(
                'id',
                'dat_created',
                'staff__first_name',
                'staff__last_name',
                'student__first_name',
                'student__last_name',
                'json_grade'
            ).first()

            return Response({'status':1,'results':results})

        except Exception as e:
            ins_logger.logger.error(e, extra={'user': 'user_id:' + str(request.user.id),'details':'line no: ' + str(e.__traceback__.tb_lineno)})
            return Response({'status':0,'reason':str(e)})
        