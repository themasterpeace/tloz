from django.urls import path
from .views import *

urlpatterns = [

    path('registro/list', combustibleview.as_view(), name="registro_list"),
    path('registro/new', combustiblenew.as_view(), name="registro_new"),
    #path('departamento/edit<int:pk>', departamentoedit.as_view(), name="departamento_edit"),
    #path('departamento/estado/<int:id>', departamentoinactivar, name="departamento_inactivar"),
    #path('departamento/delete<int:pk>', departamentodel.as_view(), name="eliminar"),
    path('registro/excel', ReporteRegistrosExcel.as_view(), name="reporte_registro_excel"),
]