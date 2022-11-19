from re import  template
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

class impview(LoginRequiredMixin, generic.ListView):
    model = ImpGuias
    template_name ="impa/imp_list.html"
    context_object_name = "obj"
    login_url = "bases:login"

class impnew(LoginRequiredMixin, generic.CreateView):
    model = ImpGuias
    template_name = "impa/imp_new.html"
    context_object_name = "obj"
    form_class = ImpresionForm
    success_url = reverse_lazy("impa:imp_list")
    login_url = "bases:login"

    def form_valid(self, form, *numini, **numfin):
        form.instance.uc = self.request.user
        rango= []
        impguias = ImpGuias
        for imp in range(numini,numfin):
            if numini>=numini.objects.filter(numini).exists() and numfin>=numfin.objects.filter(numfin).exists():
                mensaje = "Rango ya existe"
            else:
                rango.append(impguias)
        ImpGuias.objects.bulk_create(rango)
        return super().form_valid(form)
    
class impedit(LoginRequiredMixin, generic.UpdateView):
    model = ImpGuias
    template_name="impa/imp_new.html"
    context_object_name="obj"
    form_class = ImpresionForm
    success_url=reverse_lazy("imp:imp_list")
    login_url = "bases:login"

    def form_valid(self, form):
        form.instance.um = self.request.user.id
        return super().form_valid(form)

class impdel(LoginRequiredMixin, generic.DeleteView):
    model = ImpGuias
    template_name='impa/eliminar.html'
    context_object_name='obj'
    success_url=reverse_lazy("impa:imp_list")
    login_url = "bases:login"

