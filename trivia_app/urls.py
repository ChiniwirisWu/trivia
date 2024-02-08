from django.urls import path 
from . import views

app_name = 'trivia'

urlpatterns = [
    path('', views.main_view, name='main_view'),
    path('general/', views.general_view, name='general_view'),
    path('personal/', views.personal_view, name='personal_view'),
    path('questions/', views.getTriviaQuestions, name='trivia_questions')
]
