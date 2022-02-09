from django import forms
from django.db.models import fields
from django.forms import widgets
from django_select2 import forms as s2forms

from link.models import *
from bases.models import ClaseModelo
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
 

class ClienteForm(forms.ModelForm):
    
    class Meta:
        model = Clientes
        fields = ['id', 'codigo_cliente', 'contacto',
                 'razonsoc', 'nombrecom', 'direccion',
                 'telefono', 'email', 'nit', 'depto',
                 'municipio','fpago', 'minimofac', 'vendedor',
                 'observa', 'estado'
                 ]
        labels = {
                  'codigo_cliente':'Codigo Cliente','contacto':'Contacto',
                  'razonsoc':'Razon Social','nombrecom':'Nombre Comercial',
                  'direccion':'Direccion','telefono':'Telefono','email':'Email',
                  'nit':'Nit','depto':'Departamento','municipio':'Municipio',
                  'fpago':'Forma de Pago', 'minimofac':'Minimo Facturacion',
                  'vendedor':'Vendedor', 'observa':'Observaciones','estado':'Estado'
                   }
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })
            
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


class PilotoForm(forms.ModelForm):
    
    class Meta:
        model = Piloto
        fields = ['id', 'nombre','telefono','estado']
        labels = {
                  'nombre':'Nombre Piloto',
                  'telefono':'Telefono',
                  'estado':'Estado'}
    
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })

class RutaForm(forms.ModelForm):
    depto = forms.ModelChoiceField(
        queryset=Departamento.objects.filter(estado=True)
        .order_by('nombre')
    )
    class Meta:
        model = Ruta
        fields =['ruta','piloto','depto', 'placa', 'estado']
        labels = {
            'ruta':'Ruta',
            'nombre':'Nombre Piloto',
            'nombre':'Nombre Departamento',
            'placa':'No. Placa',
            'estado':'Estado'
        }
        
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })
        self.fields['depto'].empty_label = "Seleccione Departamento"
        self.fields['piloto'].empty_label = "Seleccione Piloto"

class TarifarioForm(forms.ModelForm):
    
    class Meta:
        model = Tarifario
        fields = ['id','descripcion','precio','estado']
        labels = {
                 'descripcion':'Descripcion ',
                 'precio':'Precio Producto',
                 'estado':'Estado'}
        
    def __int__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })

class VendedorForm(forms.ModelForm):
    
    class Meta:
        model = Vendedor
        fields = ['id','codigo','nombre','porcentaje',
                 'telefono','estado']
        labels = {'codigo':"Codigo Vendedor", 'nombre':"Nombre Vendedor",
                 'porcentaje':"Porcentaje de venta",
                 'telefono':"No. Telefono",
                 'estado':'estado'}
        
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })

class ClienteWidget(s2forms.ModelSelect2MultipleWidget):
    search_fields = [
        "username__icontains",
        "email__icontains",
    ]


class IngresoForm(forms.ModelForm):
    
    class Meta:
        model = Ingreso_guias
        fields = '__all__'
        widgets = {
            "cliente": ClienteWidget,
            
        }
class BodegaForm(forms.ModelForm):
    
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