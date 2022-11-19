from pyexpat import model
from re import template
from django.http import HttpResponseRedirect, request 
from django.shortcuts import redirect, render, get_object_or_404

from django.db import transaction, IntegrityError

# from link.forms import IngresoForm
from .models import *
from .forms import *
from django.urls import reverse_lazy
from django.views import generic
from django.views.generic import TemplateView
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required, permission_required
from django.http import HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from openpyxl import Workbook
from openpyxl.writer.excel import save_virtual_workbook
from django.forms import modelformset_factory
from django.views.generic.edit import FormView

# class testnew(LoginRequiredMixin, generic.CreateView):
#     model = Test
#     template_name = "tests/test.html"
#     context_object_name = "obj"
#     form_class = TestForm
#     success_url=reverse_lazy("test:test")
#     login_url = "bases:login"
    
#     def form_valid(self, form):
#         form.instance.uc = self.request.user
#         return super().form_valid(form)

# class productodet(LoginRequiredMixin, FormView):
#     model= Productodet
#     template_name = "tests/producto.html"
#     context_object_name ="obj"
#     form_class = formset_factory(ProductoForm, extra=1, max_num=1 )
#     success_url=reverse_lazy("test:test")
#     login_url= "base:login"

#     def form_valid(self, form):
#         for f in form:
#             if f.is_valid():
#                 f.save()
#         form.instance.uc = self.request.user
#         return super().form_valid(form)

# class TestCreate(LoginRequiredMixin, FormView):
#     model= Productodet
#     template_name='tests/test.html'
#     form = formset_factory(ProductoForm, extra =1)
#     second_form = TestForm
#     success_url = reverse_lazy('tests:test')
#     login_url  = 'bases:login'

#     def get_context_data(self, **kwargs):
#         context = super(TestCreate, self).get_context_data(**kwargs)
#         if 'form' not in context:
#             context['form'] = self.form(self.request.GET)
#         if 'form2' not in context:
#             context['form2'] = self.second_form(self.request.GET)
#         return context

#     def post(self, request, *args, **kwargs):
#         self.object = self.get_object()
#         form = self.get_form_classs()
#         form2 = self.get_second_form_class()
#         if form.is_valid() and form2.is_valid():
#             producto = form.save(commit=False)
#             producto.test = form2.save()
#             producto.save()
#             return HttpResponseRedirect(self.get_success_url())
#         else:
#             return self.render_to_response(self.get_context_data(form=form, form2=form2))
        
def create(request):
    context = {}
    productoformset = modelformset_factory(Productodet, form=ProductoForm)
    form = TestForm(request.POST or None)
    formset = productoformset(request.POST or None, queryset=Productodet.objects.none(), prefix='prod')
    if request.method == "POST":
        if form.is_valid() and formset.is_valid():
            try:
                with transaction.atomic():
                    guia = form.save(commit=False)
                    guia.save()

                    for producto in formset:
                        data = producto.save(commit=False)
                        data.guia = guia
                        data.save()
            except IntegrityError:
                print("Error Encontrado")
                
            return redirect('tests:test')
    context['formset']=formset
    context['form']=form
    return render(request, 'tests/test.html', context)
