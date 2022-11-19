from enum import unique
from tabnanny import verbose
from django.db.models.deletion import PROTECT
#from django.db.models.enums import Choices
from django.db.models.fields import IntegerField
from django.db.models.fields.related import ForeignKey
from django.views import*
from django.db import models
from datetime import datetime 
from bases.models import ClaseModelo
from link.models import Tarifario


# Create your models here.
class Test(ClaseModelo):
    no_guia = models.CharField(unique=True, max_length=6, verbose_name="No. Guia")
    fecha = models.DateTimeField()
    no_manifiesto = models.CharField(max_length=5)
    
    codigo_cliente = models.CharField(max_length=8)
    remitente = models.CharField(max_length=200, verbose_name="Nombre Remitente")
    dirrem = models.CharField(max_length=300, verbose_name="Direccion Remitente")
    tel = models.CharField(max_length=9, verbose_name="No. Telefono")
    zona = models.CharField(max_length=2, verbose_name="Zona")
    muni= models.CharField(max_length=50, verbose_name="Municipio")
    origen = models.CharField(max_length=50, verbose_name="Origen")
    ruta = models.CharField(max_length=3, verbose_name="Ruta")
    #Datos destinatario
    codigo_desti=models.CharField(max_length=8)
    destinatario = models.CharField(max_length=100, verbose_name="Nombre Destinatario")
    dirdes = models.CharField(max_length=300, verbose_name="Direccion Destinatario")
    teldes = models.CharField(max_length=9, verbose_name="No. Telefono")
    zonades = models.CharField(max_length=2, verbose_name="Zona")
    munides= models.CharField(max_length=50, verbose_name="Municipio")
    destino = models.CharField(max_length=50, verbose_name="Codigo Destino")
    rutades = models.CharField(max_length=3, verbose_name="Ruta")
    #Forma de pago 
    codigo = models.CharField(max_length=8)
    cliente = models.CharField(max_length=150)
    #Seccion contra entrega 
    boleta_cte = models.CharField(max_length=6, verbose_name="Boleta Contra Entrega", blank=True, null=True)
    ptpae = models.FloatField(default=0, verbose_name="Precio Total Del Envio", blank=True, null=True)
    comision = models.FloatField(default=0, verbose_name="Comision", blank=True, null=True)
    #Total detalle envio
    descuento=models.FloatField(default=0)
    sub_total=models.FloatField(default=0)
    totpieenv=models.IntegerField(default=0, verbose_name="Total Envios")
    total=models.FloatField(default=0)
    observa = models.TextField(max_length=500, verbose_name="Observaciones")
    
    def __str__(self):
        return self.no_guia
        
    def save(self):
        self.total = self.sub_total - float(self.descuento)
        super(Test,self).save()
    
    class Meta:
        verbose_name_plural = "Ingresos Guias"
        verbose_name = "Ingreso Guia"
        db_table= 'guias'

class Productodet(ClaseModelo):
      #Descripcion de Envio 
    guia = models.ForeignKey(Test, related_name='prod', on_delete=models.CASCADE)
    tipo_envio = models.ForeignKey(Tarifario, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=150, verbose_name="Descripcion")
    cantidad = IntegerField(default=0 ,verbose_name="Cantidad")
    peso = models.FloatField(default=0, verbose_name="Peso")
    precio = models.FloatField(default=0, verbose_name="Tarifa")
    totenv=models.FloatField(default=0, verbose_name="Total Envio")

    def __str__(self):
        return self.guia

    def save(self):
        self.totenv = float(float(int(self.cantidad)) * float(self.precio))
        super(Productodet, self).save()

    class Meta:
        verbose_name="Producto"
        verbose_name_plural="Productos"
        db_table = "prod"