from django.urls import path, include
from .views import *

urlpatterns = [
    path('v1/clientes/', Clientelist.as_view(), name='cliente_list'),
    path('v1/clientes/<str:codigo_cliente>', ClienteDetalle.as_view(), name='cliente_detalle'),

    
]
