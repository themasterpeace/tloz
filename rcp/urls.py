from django.urls import path

from rcp.views import *
from .views import *

urlpatterns = [
    path('ingreso_rcp', ingresorcp, name='ingreso_rcp'),
    
]
