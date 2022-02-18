from multiprocessing.spawn import import_main_path
from django import forms
from django.db.models import fields
from django.forms import widgets
# from django_select2 import forms as s2forms

from link.models import *
from bases.models import ClaseModelo
from rcp.models import Ingresorcp
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
 

class RcpForm(forms.ModelForm):
    
    class Meta:
        model = Ingresorcp
        fields = ['no_guia','fecha','codigo_cliente','remitente',
                'dirrem','tel','zona','muni','origen','ruta','codigo_desti',
                'destinatario','dirdes','teldes','zonades','munides',
                'destino','rutades','observa','codigo','cliente','cantidad',
                'tipo_envio','descripcion','peso','precio','sub_total','descuento',
                'total','boleta_cte','ptpae','comision'
                ]

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class':'form-control'
            })
        