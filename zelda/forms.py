from django import forms
from django.forms import widgets
from .models import *


class RegistroForm(forms.ModelForm):
    
    class Meta:
        model = Registro
        fields= '__all__'