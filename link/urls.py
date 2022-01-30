from django.urls import path
from .views import *

urlpatterns = [
    path('',home, name="home"),
    path('ingreso_bodega/', ingreso_bodega, name="ingreso_bodega"),
    path('salida_bodega/', salida_bodega, name="salida_bodega"),
    path('consulta/', consulta, name="consulta"),
    
    path('vendedores/',VendedorView.as_view(),name="vendedores_list"),
    #path('vendedores/', vendedores, name="vendedores"),
    
    path('departamento/list', departamentoview.as_view(), name="departamento_list"),
    path('departamento/new', departamentonew.as_view(), name="departamento_new"),
    path('departamento/edit<int:pk>', departamentoedit.as_view(), name="departamento_edit"),
    path('departamento/inactivar<int:id>', departamentoinactivar, name="departamento_inactivar"),
    path('departamento/delete<int:pk>', departamentodel.as_view(), name="eliminar"),

    path('municipio/list', municipioview.as_view(), name="municipio_list"),
    path('municipio/new', municipionew.as_view(), name="municipio_new"),
    path('municipio/edit<int:pk>', municipioedit.as_view(), name="municipio_edit"),
    path('municipio/inactivar<int:id>', municipioactivar, name="municipio_inactivar"),
    path('municipio/inactivar<int:id>', municipioinactivar, name="municipio_inactivar"),
    path('municipio/delete<int:pk>', municipiodel.as_view(), name="eliminar"),
    
    path('pilotos', pilotos, name="pilotos"),
    path('ingreso_guias', ingresogui, name='ingreso_guias'),
    path('ingreso_bodega', ingresobod, name='ingreso_bodega'),
    path('boletas', boletadeposito, name='boletas'),
    path('registro/', registro, name='registro'),
    
]