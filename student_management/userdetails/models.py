from django.db import models
from django.contrib.auth.models import User


class Country(models.Model):
    id = models.BigAutoField(primary_key=True)
    vchr_name = models.CharField(max_length=100)

    class Meta:
        db_table = "country"

class RoleMaster(models.Model):
    id = models.BigAutoField(primary_key=True)
    vchr_name = models.CharField(max_length=100)

    class Meta:
        db_table = "role_master"

class UserDetails(models.Model):
    id = models.BigAutoField(primary_key=True)
    dat_created = models.DateTimeField(blank=True, null=True)
    bint_mobile =  models.DecimalField(max_digits=10,decimal_places=0)
    email = models.CharField(max_length=50, blank=True, null=True)
    fk_role = models.ForeignKey(RoleMaster, models.DO_NOTHING)
    fk_user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_details')
    fk_country = models.ForeignKey(Country, models.DO_NOTHING)

    class Meta:
        db_table = "user_details"