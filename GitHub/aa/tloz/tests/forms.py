
from django import forms
from django.db.models import fields
from django.forms import widgets
# from django_select2 import forms as s2forms

from link.models import *
from bases.models import ClaseModelo
from tests.models import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class TestForm(forms.ModelForm):
    
    class Meta:
        model = Test
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
        model = Productodet
        fields = ['tipo_envio', 'descripcion', 'cantidad', 
        'peso', 'precio', 'totenv']
        
        widgets = {'tipon_envio': forms.TextInput(attrs={'class':'formset-field'}),
                'descripcion': forms.TextInput(attrs={'class':'formset-field'}),
                'cantidad': forms.TextInput(attrs={'class':'formset-field'}),
                'peso': forms.TextInput(attrs={'class':'formset-field'}),
                'precio': forms.TextInput(attrs={'class':'formset-field'}),
                'totenv': forms.TextInput(attrs={'class':'formset-field'})
                }

    
