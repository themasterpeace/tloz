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

def home(request):
    return render(request, 'link/home.html')

def ingreso_bodega(request):
    return render(request, 'link/ingreso_bodega.html')

def salida_bodega(request):
    return render(request, 'link/salida_bodega.html')

def consulta(request):
    return render(request, 'link/consulta.html')

class VendedorView(LoginRequiredMixin, generic.ListView):
    model = Vendedor
    template_name = "link/vendedores_list.html"
    context_object_name="obj"
    login = "registration:login"

def rutas(request):
    data = {
        'form': RutasForm()
    }
    return render(request, 'link/rutas.html', data)

def nuevo_cliente(request):
    data ={
        'form': NuevoClienteForm()
    }
    return render(request, 'link/nuevo_cliente.html', data)

class departamentoview(LoginRequiredMixin, generic.ListView):
    model =  Departamento
    template_name="link/departamento_list.html"
    context_object_name = "obj"
    login = "registration:login"

class departamentonew(LoginRequiredMixin, generic.CreateView):
    model = Departamento
    template_name="link/departamento_new.html"
    context_object_name="obj"
    form_class = DepartamentoForm
    success_url=reverse_lazy("link:departamento_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)

class departamentoedit(LoginRequiredMixin, generic.UpdateView):
    model = Departamento
    template_name="link/departamento_new.html"
    context_object_name="obj"
    form_class = DepartamentoForm
    success_url=reverse_lazy("link:departamento_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.um = self.request.user.id
        return super().form_valid(form)

class departamentodel(LoginRequiredMixin, generic.DeleteView):
    model = Departamento
    template_name='link/eliminar.html'
    context_object_name='obj'
    success_url=reverse_lazy("link:departamento_list")

class municipioview(LoginRequiredMixin, generic.ListView):
    model =  Municipio
    template_name="link/municipio_list.html"
    context_object_name = "obj"
    login = "registration:login"

class municipionew(LoginRequiredMixin, generic.CreateView):
    model = Municipio   
    template_name="link/municipio_new.html"
    context_object_name="obj"
    form_class = MunicipioForm
    success_url=reverse_lazy("link:municipio_new")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)

class municipioedit(LoginRequiredMixin, generic.UpdateView):
    model = Municipio
    template_name="link/municipio_new.html"
    context_object_name="obj"
    form_class = MunicipioForm
    success_url=reverse_lazy("link:municipio_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.um = self.request.user.id
        return super().form_valid(form)

class municipiodel(LoginRequiredMixin, generic.DeleteView):
    model = Municipio
    template_name='link/eliminar.html'
    context_object_name='obj'
    success_url=reverse_lazy("link:municipio_list")

def pilotos(request):
    data = {
        'form': PilotosForm()
    }
    return render(request, 'link/pilotos.html', data)

def ingresogui(request):
    data = {
        'form': IngresoForm()
    }
    if request.method == 'POST':
        formulario = IngresoForm(data=request.POST, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            data["mensaje"] = "Guia ingresada correctamente"
        else:
            data["form"] = formulario
    return render(request, 'link/ingreso_guias.html', data)

def ingresobod(request):
    data = {
        'form': IngresoBodegaForm()
    }
    return render(request, 'link/ingreso_bod.html', data)

def boletadeposito(request):
    data = {
        'form':BoletaForm()
    }
    return render(request, 'link/boletas.html', data)

def registro(request):
    data = {
        'form': CustomUserCreationForm()
    }
    
    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(username=formulario.cleaned_data["username"], password=formulario.cleaned_data["password1"])
            login(request, user)
            messages.success(request, "Te has registrado exitosamente")
            #redirigir al home 
            return redirect(to="home")
        data["form"]= formulario
    return render(request, 'registration/registro.html', data)

@login_required(login_url="/login/")
@permission_required("link.change_departamento",login_url="/login/")
def departamentoinactivar(request, id):
    depto = Departamento.objects.filter(pk=id).first()
    #contexto={}
    #template_name = "link/eliminar.html"

    #if not depto:
    #    return redirect("link:departamento_list")

    #if request.method=='GET':
    #    contexto={'obj':depto}
    
    if request.method=='POST':
        if depto:
            depto.estado= not depto.estado
            depto.save()
            return HttpResponse("OK")
        return HttpResponse("FAIL")


    return HttpResponse("FAIL")

    return render(request, template_name, contexto)

    
def municipioactivar(request, id):
    depto = Departamento.objects.filter(pk=id).first()
    contexto={}
    template_name = "link/eliminar.html"

    if not depto:
        return redirect("link:municipio_list")

    if request.method=='GET':
        contexto={'obj':depto}
    
    if request.method=='POST':
        depto.estado=False
        depto.save()
        return redirect("link:municipio_list")

    return render(request, template_name, contexto)

def municipioinactivar(request, id):
    muni = Municipio.objects.filter(pk=id).first()
    contexto={}
    template_name = "link/eliminar.html"

    if not muni:
        return redirect("link:municipio_list")

    if request.method=='GET':
        contexto={'obj':muni}
    
    if request.method=='POST':
        muni.estado=False
        muni.save()
        return redirect("link:municipio_list")

    return render(request, template_name, contexto)