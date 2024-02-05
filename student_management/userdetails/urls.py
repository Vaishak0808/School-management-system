from django.urls import path
from userdetails.views import UserLogin, userLogout,RegistraionFormAPI,DropDown,UserAPI

urlpatterns = [
    path('login/',UserLogin.as_view()),
    path('logout/',userLogout.as_view()),
    path('registeruser/',RegistraionFormAPI.as_view()),
    path('dropdown/',DropDown.as_view()),
    path('user_api/',UserAPI.as_view()),
]