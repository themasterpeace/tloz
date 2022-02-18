from re import template
from django.http import request 
from django.shortcuts import redirect, render, get_object_or_404
from .models import *
from .forms import *
from django.urls import reverse_lazy
from django.views import generic
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required, permission_required
from django.http import HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.
@login_required(login_url="/login/")
@permission_required("rcp.change_ingreso_rcp", login_url="/login/")
def ingresorcp(request,id=None):
    data = {
        'form':RcpForm
    }
    
    if request.method == "POST":
        form = RcpForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            form.save()
            data["mensaje"] = "Guia ingresada correctamente"
        else:
            data["form"] = form
    
    return render(request, 'rcp/ingreso_rcp.html', data)
