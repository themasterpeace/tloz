from django.shortcuts import render, redirect

from django.views.generic import ListView, CreateView, UpdateView, TemplateView
from django.contrib import messages
from django.urls import reverse_lazy

from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin

from django.contrib.auth.decorators import login_required, permission_required
from django.http.response import HttpResponse, JsonResponse

from bases.views import SinPrivilegios
from .models import ImpHija
from .forms import HijaForm

class HijaView(SinPrivilegios, ListView):
    permission_required = "imphija.view_imphija"
    model = ImpHija
    template_name = "imphija/hijaslist.html"
    context_object_name = "obj"
    login_url = "bases:login"

class HijaNew(SuccessMessageMixin, SinPrivilegios, CreateView):
    permission_required = "imphija.create_imphija"
    model = ImpHija
    template_name = "imphija/hijasnew.html"
    context_object_name = "obj"
    form_class = HijaForm
    success_url = reverse_lazy("imphija:hijalist")
    success_message = "IMPRESION DE GUIAS EXITOSA"
    login_url = "bases:login"



