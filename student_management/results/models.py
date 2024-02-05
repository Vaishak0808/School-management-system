from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField

# Create your models here.

class Subjects(models.Model):
    id = models.BigAutoField(primary_key=True)
    vchr_name = models.CharField(max_length=100)
    dat_created = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "subjects"

class Results(models.Model):
    id = models.BigAutoField(primary_key=True)
    student = models.ForeignKey(User, models.DO_NOTHING, related_name='student_id')
    json_grade = JSONField(null=True, blank=True)
    staff = models.ForeignKey(User, models.DO_NOTHING, related_name='staff_id')
    dat_created = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "results"
