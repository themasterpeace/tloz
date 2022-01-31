from django import forms
from django.db.models import fields
from django.forms import widgets

from link.models import *
from bases.models import ClaseModelo
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
 

class NuevoClienteForm(forms.ModelForm):
    
    class Meta:
        model = Clientes
        fields = ['codigo_cliente','nit','nombre',
                    'direccion','depto', 'municipio',
                    'contacto','rutadestin','ruta',
                    'observa']
        labels={'codigo_cliente':"Codigo de Cliente",
                'nit':"No. de Nit"}
        
class DepartamentoForm(forms.ModelForm):
    
    class Meta:
        model = Departamento
        fields = ['id', 'nombre','iniciales','estado']
        labels = {
                  'nombre':'Nombre Departamento',
                  'iniciales':'Prefijo',
                  'estado':'Estado'}
    
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })

class MunicipioForm(forms.ModelForm):
    depto = forms.ModelChoiceField(
        queryset=Departamento.objects.filter(estado=True)
        .order_by('nombre')
    )
    class Meta:
        model = Municipio
        fields = ['depto','muni','estado']
        labels = {
                  'nombre':'Nombre Departamento',
                  'muni':'Municipio',
                  'estado':'Estado'}
    
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })
        self.fields['depto'].empty_label = "Seleccione Departamento"

class RutaForm(forms.ModelForm):
    depto = forms.ModelChoiceField(
        queryset=Departamento.objects.filter(estado=True)
        .order_by('nombre')
    )
    

class PilotosForm(forms.ModelForm):
    
    class Meta:
        model = Pilotos
        fields ='__all__'

class VendedorForm(forms.ModelForm):
    
    class Meta:
        model = Vendedor
        fields = ['codigo','nombre','porcentaje',
                 'telefono','placa']
        labels = {'codigo':"Codigo Vendedor", 'nombre':"Nombre Vendedor",
                 'porcentaje':"Porcentaje de venta",
                 'telefono':"No. Telefono",'placa':"No. de Placa"}
        widget = {
            'codigo':forms.TextInput
        }
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })

class IngresoForm(forms.ModelForm):
    
    class Meta:
        model = Ingreso_guias
        fields = '__all__'
    
class IngresoBodegaForm(forms.ModelForm):
    
    class Meta:
        model = Ingreso_bodega
        fields = '__all__'

class BoletaForm(forms.ModelForm):
    
    class Meta:
        model = Boletadeposito
        fields = '__all__'
        

class CustomUserCreationForm(UserCreationForm):
    
    class Meta:
        model = User
        fields = ['username', "first_name", "last_name", "email", "password1", "password2"]