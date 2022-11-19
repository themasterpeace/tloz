from link.models import *
from django.contrib import admin
from .models import*

# Register your models here.

admin.site.register(Ruta)
admin.site.register(Piloto)
admin.site.register(Departamento)
admin.site.register(Municipio)
admin.site.register(Tarifario)
admin.site.register(Clientes)
admin.site.register(Vendedor)
admin.site.register(Boletadeposito)
admin.site.register(Ingreso_bodega)
admin.site.register(Ingreso_guias)
admin.site.register(Correlativo)
