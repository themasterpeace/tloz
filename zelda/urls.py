from django.urls import path
from .views import *

urlpatterns = [
    path('control', control, name="control"),
    path('listar/', listar, name="listar"),
    path('modificar/<id>/', modificar, name="modificar"),
    path('eliminar/<id>/', eliminar, name="eliminar"),        
    path('reporte_registro_excel/', ReporteRegistrosExcel.as_view(), name="reporte_registro_excel"),
    
]