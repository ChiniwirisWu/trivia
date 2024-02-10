from django.shortcuts import render
from django.urls import include
import os
import json
import csv
import pandas as pd

# Create your views here.

def main_view(request):
    return render(request, 'main.html', context={})

def general_view(request):
    response = getTriviaQuestions()
    return render(request, 'survey.html', context={'response':response, 'mode':'general'})

def personal_view(request):
    response = getTriviaQuestions()
    return render(request, 'survey.html', context={'response':response, 'mode':'personal'})

#behaviour
def getTriviaQuestions():
   current_path = os.getcwd() 
   general_questions = pd.read_csv(os.path.join(current_path, 'trivia_app/general_questions.csv')) 
   personal_questions = pd.read_csv(os.path.join(current_path, 'trivia_app/personal_questions.csv')) 
   response = {
       'general': general_questions.set_index('questions').to_dict()['answers'],
       'personal': list(personal_questions['questions']),
    }
   return json.dumps(response)

