from django.urls import path
from .views import *

urlpatterns = [

    path('test/test', create, name="test"),
   #path('test/productodet', productodet.as_view(), name="productodet"),
            
  
]