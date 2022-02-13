from django.urls import path
from .views import *

urlpatterns = [
    path('',home, name="home"),
    path('ingreso_bodega/', bodeganew.as_view(), name="ingreso_bodega"),
    path('salida_bodega/', salida_bodega, name="salida_bodega"),
    path('consulta/', consulta, name="consulta"),
    
    path('vendedor/list', vendedorview.as_view(), name="vendedor_list"),
    path('vendedor/new', vendedornew.as_view(), name="vendedor_new"),
    path('vendedor/edit<int:pk>', vendedoredit.as_view(), name="vendedor_edit"),
    path('vendedor/estado/<int:id>', vendedorinactivar, name="vendedor_inactivar"),
    
    path('cliente/list', clienteview.as_view(), name="cliente_list"),
    path('cliente/new', clientenew.as_view(), name="cliente_new"),
    path('cliente/edit<int:pk>', clienteedit.as_view(), name="cliente_edit"),
    path('cliente/estado/<int:id>', clienteinactivar, name="cliente_inactivar"),

    path('departamento/list', departamentoview.as_view(), name="departamento_list"),
    path('departamento/new', departamentonew.as_view(), name="departamento_new"),
    path('departamento/edit<int:pk>', departamentoedit.as_view(), name="departamento_edit"),
    path('departamento/estado/<int:id>', departamentoinactivar, name="departamento_inactivar"),
    path('departamento/delete<int:pk>', departamentodel.as_view(), name="eliminar"),

    path('municipio/list', municipioview.as_view(), name="municipio_list"),
    path('municipio/new', municipionew.as_view(), name="municipio_new"),
    path('municipio/edit<int:pk>', municipioedit.as_view(), name="municipio_edit"),
    path('municipio/estado/<int:id>', municipioinactivar, name="municipio_inactivar"),
    path('municipio/delete<int:pk>', municipiodel.as_view(), name="eliminar"),
    
    path('piloto/list', pilotoview.as_view(), name="piloto_list"),
    path('piloto/new', pilotonew.as_view(), name="piloto_new"),
    path('piloto/edit<int:pk>', pilotoedit.as_view(), name="piloto_edit"),
    path('piloto/estado/<int:id>', pilotoinactivar, name="piloto_inactivar"),

    path('ruta/list', rutaview.as_view(), name="ruta_list"),
    path('ruta/new', rutanew.as_view(), name="ruta_new"),
    path('ruta/edit<int:pk>', rutaedit.as_view(), name="ruta_edit"),
    path('ruta/estado/<int:id>', rutainactivar, name="ruta_inactivar"),
    
    path('tarifario/list', tarifarioview.as_view(), name="tarifario_list"),
    path('tarifario/new', tarifarionew.as_view(), name="tarifario_new"),
    path('tarifario/edit<int:pk>', tarifarioedit.as_view(), name="tarifario_edit"),
    path('tarifario/estado/<int:id>', tarifarioinactivar, name="tarifario_inactivar"),

    path('ingreso/new', ingresonew, name="ingresonew"),
    path('buscar_cli', buscarcli.as_view(), name="buscar_cli"),
    
    path('registro/', registro, name='registro'),
    
]