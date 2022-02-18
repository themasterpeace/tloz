from enum import unique
from tabnanny import verbose
from django.db.models.deletion import PROTECT
from django.db.models.enums import Choices
from django.db.models.fields import IntegerField
from django.db.models.fields.related import ForeignKey
from django.views import*
from django.db import models
from datetime import datetime 
from bases.models import ClaseModelo
from link.models import *

# Create your models here.

class Ingresorcp(Ingreso_guias):

    def __str__(self):
        return '{}'.format(self.no_guia)

    def save(self):
        self.no_guia = self.no_guia.upper()
        super(Ingresorcp, self).save()
    
    class Meta:
        verbose_name_plural = "Ingresos Recepciones"