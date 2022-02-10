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


class bodeganew(LoginRequiredMixin, generic.CreateView):
    model = Ingreso_bodega
    template_name = "link/ingreso_bod.html"
    context_object_name = "obj"
    form_class = BodegaForm
    success_url = reverse_lazy("link:ingreso_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)

def salida_bodega(request):
    return render(request, 'link/salida_bodega.html')

def consulta(request):
    return render(request, 'link/consulta.html')

#------------------SECCION DEPARTAMENTOS  CRUD---------------------------#
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

#---------------SECCION DE MUNICIPIOS CRUD----------------------#
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
    success_url=reverse_lazy("link:municipio_list")
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
        form.instance.um = self.request.user
        return super().form_valid(form)

class municipiodel(LoginRequiredMixin, generic.DeleteView):
    model = Municipio
    template_name='link/eliminar.html'
    context_object_name='obj'
    success_url=reverse_lazy("link:municipio_list")

'''def municipioactivar(request, id):
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

    return render(request, template_name, contexto)'''

@login_required(login_url="/login/")
@permission_required("link.change_municipio",login_url="/login/")
def municipioinactivar(request, id):
    muni = Municipio.objects.filter(pk=id).first()
    #contexto={}
    #template_name = "link/eliminar.html"

    #if not depto:
    #    return redirect("link:departamento_list")

    #if request.method=='GET':
    #    contexto={'obj':depto}
    
    if request.method=='POST':
        if muni:
            muni.estado = not muni.estado
            muni.save()
            return HttpResponse("OK")
        return HttpResponse("FAIL")


    return HttpResponse("FAIL")

    return render(request, template_name, contexto)

#-----------Seccion de pilotos CRUD---------------------#
class pilotoview(LoginRequiredMixin, generic.ListView):
    model = Piloto
    template_name = "link/piloto_list.html"
    context_object_name="obj"
    login = "registration:login"

class pilotonew(LoginRequiredMixin, generic.CreateView):
    model = Piloto
    template_name="link/piloto_new.html"
    context_object_name="obj"
    form_class = PilotoForm
    success_url=reverse_lazy("link:piloto_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)

class pilotoedit(LoginRequiredMixin, generic.UpdateView):
    model = Piloto
    template_name="link/piloto_new.html"
    context_object_name="obj"
    form_class = DepartamentoForm
    success_url=reverse_lazy("link:piloto_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.um = self.request.user.id
        return super().form_valid(form)

@login_required(login_url="/login/")
@permission_required("link.change_piloto", login_url="/login/")
def pilotoinactivar(request, id):
    piloto = Piloto.objects.filter(pk=id).first()
    #contexto={}
    #template_name = "link/eliminar.html"

    #if not depto:
    #    return redirect("link:departamento_list")

    #if request.method=='GET':
    #    contexto={'obj':depto}
    
    if request.method=='POST':
        if piloto:
            piloto.estado = not piloto.estado
            piloto.save()
            return HttpResponse("OK")
        return HttpResponse("FAIL")


    return HttpResponse("FAIL")

    return render(request, template_name, contexto)

#----------------SECCION RUTAS CRUD----------------------#
class rutaview(LoginRequiredMixin, generic.ListView):
    model = Ruta
    template_name = "link/ruta_list.html"
    context_object_name = "obj"
    login = "registration:login"
    
class rutanew(LoginRequiredMixin, generic.CreateView):
    model = Ruta
    template_name="link/ruta_new.html"
    context_object_name="obj"
    form_class = RutaForm
    success_url=reverse_lazy("link:ruta_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)
    
class rutaedit(LoginRequiredMixin, generic.UpdateView):
    model = Ruta
    template_name="link/ruta_new.html"
    context_object_name="obj"
    form_class = RutaForm
    success_url=reverse_lazy("link:ruta_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.um = self.request.user.id
        return super().form_valid(form)
    

@login_required(login_url="/login/")
@permission_required("link.change_ruta", login_url="/login/")
def rutainactivar(request, id):
    ruta = Ruta.objects.filter(pk=id).first()
    #contexto={}
    #template_name = "link/eliminar.html"

    #if not depto:
    #    return redirect("link:departamento_list")

    #if request.method=='GET':
    #    contexto={'obj':depto}

    if request.method == 'POST':
        if ruta:
            ruta.estado = not ruta.estado
            ruta.save()
            return HttpResponse("OK")
        return HttpResponse("FAIL")

    return HttpResponse("FAIL")

    return render(request, template_name, contexto)

class tarifarioview(LoginRequiredMixin, generic.ListView):
    model = Tarifario
    template_name = "link/tarifario_list.html"
    context_object_name = "obj"
    login = "registration:login"

class tarifarionew(LoginRequiredMixin, generic.CreateView):
    model = Tarifario
    template_name = "link/tarifario_new.html"
    context_object_name = "obj"
    form_class = TarifarioForm
    success_url=reverse_lazy("link:tarifario_list")
    login_url = "registration:login"
    
    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)

class tarifarioedit(LoginRequiredMixin, generic.UpdateView):
    model = Tarifario
    template_name="link/tarifario_new.html"
    context_object_name="obj"
    form_class = TarifarioForm
    success_url=reverse_lazy("link:tarifario_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.um = self.request.user
        return super().form_valid(form)


@login_required(login_url="/login/")
@permission_required("link.change_piloto", login_url="/login/")
def tarifarioinactivar(request, id):
    descripcion = Tarifario.objects.filter(pk=id).first()
    #contexto={}
    #template_name = "link/eliminar.html"

    #if not depto:
    #    return redirect("link:departamento_list")

    #if request.method=='GET':
    #    contexto={'obj':depto}

    if request.method == 'POST':
        if descripcion:
            descripcion.estado = not descripcion.estado
            descripcion.save()
            return HttpResponse("OK")
        return HttpResponse("FAIL")

    return HttpResponse("FAIL")

    return render(request, template_name, contexto)


def registro(request):
    data = {
        'form': CustomUserCreationForm()
    }

    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(
                username=formulario.cleaned_data["username"], password=formulario.cleaned_data["password1"])
            login(request, user)
            messages.success(request, "Te has registrado exitosamente")
            #redirigir al home
            return redirect(to="home")
        data["form"] = formulario
    return render(request, 'registration/registro.html', data)

#----------------------SECCION DE VENDEDORES CRUD---------------------------#

class vendedorview(LoginRequiredMixin, generic.ListView):
    model = Vendedor
    template_name = "link/vendedor_list.html"
    context_object_name="obj"
    login = "registration:login"

class vendedornew(LoginRequiredMixin, generic.CreateView):
    model = Vendedor
    template_name = "link/vendedor_new.html"
    context_object_name = "obj"
    form_class = VendedorForm
    success_url=reverse_lazy("link:vendedor_list")
    login_url = "registration:login"
    
    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)

class vendedoredit(LoginRequiredMixin, generic.UpdateView):
    model = Vendedor
    template_name="link/vendedor_new.html"
    context_object_name="obj"
    form_class = VendedorForm
    success_url=reverse_lazy("link:vendedor_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.um = self.request.user
        return super().form_valid(form)


@login_required(login_url="/login/")
@permission_required("link.change_vendedor", login_url="/login/")
def vendedorinactivar(request, id):
    nombre = Vendedor.objects.filter(pk=id).first()
    #contexto={}
    #template_name = "link/eliminar.html"

    #if not depto:
    #    return redirect("link:departamento_list")

    #if request.method=='GET':
    #    contexto={'obj':depto}

    if request.method == 'POST':
        if nombre:
            nombre.estado = not nombre.estado
            nombre.save()
            return HttpResponse("OK")
        return HttpResponse("FAIL")

    return HttpResponse("FAIL")

    return render(request, template_name, contexto)

#--------------------------------SECCION CLIENTE CRUD-------------------------------#
class clienteview(LoginRequiredMixin, generic.ListView):
    model = Clientes
    template_name = "link/cliente_list.html"
    context_object_name="obj"
    login = "registration:login"

class clientenew(LoginRequiredMixin, generic.CreateView):
    model = Clientes
    template_name = "link/cliente_new.html"
    context_object_name = "obj"
    form_class = ClienteForm
    success_url=reverse_lazy("link:cliente_list")
    login_url = "registration:login"
    
    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)

class clienteedit(LoginRequiredMixin, generic.UpdateView):
    model = Clientes
    template_name="link/cliente_new.html"
    context_object_name="obj"
    form_class = ClienteForm
    success_url=reverse_lazy("linkclienter_list")
    login_url = "registration:login"

    def form_valid(self, form):
        form.instance.um = self.request.user
        return super().form_valid(form)


@login_required(login_url="/login/")
@permission_required("link.change_cliente", login_url="/login/")
def clienteinactivar(request, id):
    codigo =Clientes.objects.filter(pk=id).first()
    #contexto={}
    #template_name = "link/eliminar.html"

    #if not depto:
    #    return redirect("link:departamento_list")

    #if request.method=='GET':
    #    contexto={'obj':depto}

    if request.method == 'POST':
        if codigo:
            codigo.estado = not codigo.estado
            codigo.save()
            return HttpResponse("OK")
        return HttpResponse("FAIL")

    return HttpResponse("FAIL")

    return render(request, template_name, contexto)

#----------------------------SECCION INGRESO DE GUIAS---------------------------#
'''class ingresonew(LoginRequiredMixin, generic.CreateView):
    model = Ingreso_guias
    template_name = "link/ingreso_new.html"
    context_object_name = "obj"
    form_class = IngresoForm
    success_url=reverse_lazy("link:ingreso_new")
    login_url = "registration:login"
    
    def form_valid(self, form):
        form.instance.uc = self.request.user
        return super().form_valid(form)'''

@login_required(login_url="/login/")
@permission_required("link.change_ingreso_guias", login_url="/login/")
def ingresonew(request,id=None):
    template_name='link/ingreso_new.html'
    
    encabezado = {
        'fecha':datetime.today()
    }
    detalle = {}
    clientes = Clientes.objects.filter(estado=True)
    print(clientes)
    contexto = {"enc":encabezado,"det":detalle,"clientes":clientes}

    if request.method =="GET":
        pass

    return render(request, template_name,contexto)