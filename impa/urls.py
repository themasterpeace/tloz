from django.urls import path
from .views import *

urlpatterns = [
    path('imp/list', impview.as_view(), name="imp_list"),
    path('imp/new', impnew.as_view(), name="imp_new"),
    path('imp/edit<int:pk>', impedit.as_view(), name="imp_edit"),
    #path('imp/estado/<int:id>', impinactivar, name="imp_inactivar"),
]
