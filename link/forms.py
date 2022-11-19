from django import forms
from django.db.models import fields
from django.forms import widgets
# from django_select2 import forms as s2forms

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
        fields = ['id', 'nombre','nombre_auxiliar','telefono','estado']
        labels = {
                  'nombre':'Nombre Piloto',
                  #'nombre_auxiliar':'Nombre Auxiliar',
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


class IngresoForm(forms.ModelForm):
    
    class Meta:
        model = Ingreso_guias
        fields = ['no_guia','fecha','no_manifiesto','codigo_cliente',
                 'remitente','dirrem','tel','zona','muni','origen',
                 'ruta','codigo_desti','destinatario','dirdes','teldes',
                 'zonades','munides','destino','rutades','codigo','cliente',
                 'observa', 'boleta_cte','ptpae','comision',
                 'totpieenv','sub_total','descuento','total'
                 ]
        labels={
            'no_guia':"Numero guia",'fecha':"Fecha",'no_manifiesto':"Numero Manifiesto",'codigo_cliente':"Codigo Cliente",
            'remitente':"Remitente",'dirrem':"Direccion Remitente",'tel':"Telefono",'zona':"Zona",'muni':"Municipio",'origen':"Origen",
            'ruta':"Ruta",'codigo_desti':"Codigo Dest",'destinatario':"Destinatario",'dirdes':"Direccion Dest",'teldes':"Telefono",
            'zonades':"Zona",'munides':"Municipio",'destino':"Destino",'rutades':"Ruta",'codigo':"Codigo",'cliente':"Cliente",'observa':"Observaciones",
            'boleta_cte':"No. Boleta CE",'ptpae':"Valor Total Producto",'comision':"Comision",
            'totenv':"Total Envio",'sub_total':"Subtotal",'totpienv':'Total Piezas','descuento':"Descuento",'total':"Total",
        }

class ProductoForm(forms.ModelForm):
    
    class Meta:
        model = Producto
        fields = ['tipo_envio', 'descripcion', 'cantidad', 
        'peso', 'precio', 'totenv']
        
        widgets = {'tipo_envio': forms.TextInput(attrs={'class':'formset-field'}),
                'descripcion': forms.TextInput(attrs={'class':'formset-field'}),
                'cantidad': forms.TextInput(attrs={'class':'formset-field'}),
                'peso': forms.TextInput(attrs={'class':'formset-field'}),
                'precio': forms.TextInput(attrs={'class':'formset-field'}),
                'totenv': forms.TextInput(attrs={'class':'formset-field'})
                }

class HijasForm(forms.ModelForm):

    class Meta:
        model = Ingreso_hijas
        fields = '__all__'

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })
            
class CorrelativoForm(forms.ModelForm):

    class Meta:
        model = Correlativo
        fields = '__all__'
    
    def __ini__(self,*args,**kwargs):
        super().__ini__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })

class BodegaForm(forms.ModelForm):
    
    class Meta:
        model = Ingreso_bodega
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class': 'form-control'
            })

class BoletaForm(forms.ModelForm):
    
    class Meta:
        model = Boletadeposito
        fields = '__all__'
        

class CustomUserCreationForm(UserCreationForm):
    
    class Meta:
        model = User
        fields = ['username', "first_name", "last_name", 
        "email", "password1", "password2"]