from django.urls import path

from .views import HijaView, HijaNew

app_name = "imphijas"

urlpatterns = [
    path('imphija/list', HijaView.as_view(), name="hijalist"),
    path('imphija/new', HijaNew.as_view(), name="hijanew"),
    #path('ruta/edit/<int:pk>', RutaEdit.as_view(), name="edit_ruta"),
]
