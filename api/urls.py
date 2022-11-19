from django.urls import path, include
from .views import *

urlpatterns = [
    path('v1/clientes/', Clientelist.as_view(), name='cliente_list'),
    path('v1/clientes/<str:codigo_cliente>', ClienteDetalle.as_view(), name='cliente_detalle'),

    path('v1/producto/',Productolist.as_view(), name='producto_list'),
    path('v1/producto/<str:pk>',ProductoDetalle.as_view(), name='producto_detalle'),
]
