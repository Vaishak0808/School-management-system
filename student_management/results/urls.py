from django.urls import path
from .views import *

urlpatterns = [
    path('subjects/',SubjectAPI.as_view()),
    path('filters/',FiltersAPI.as_view()),
    path('results/',ResultAPI.as_view()),
    path('grade_card/',GradeCard.as_view()),
]