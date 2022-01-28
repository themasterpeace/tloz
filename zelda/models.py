from django.db import models
from django.db.models.fields import IntegerField

# Create your models here.

#class placas(models.Model):
   # placa=models.CharField(max_length=50)
    
    #def __str__(self):
     #   return self.placa
ruta=[
    [0, "BAR1"],
    [1, "BAR2"],
    [2, "JAL1"],
    [3, "JAL2"],
    [4, "JUT1"],
    [5, "JUT2"],
    [6, "JUT3"],
] 
piloto=[
    [0,"LESTER ZEPEDA"],
    [1,"BYRON BLASS"],
    [2,"ALLAN GOMEZ"],
    [3,"EDUARDO BONILLA"],
    [4,"DARWIN VARGAS"],
    [5,"LUIS JIMENEZ"],
    [6,"ABRAHAM MARTINEZ"],
]
placas=[
    [0,"C339BPH"],
    [1,"C386BLD"],
    [2,"C649BKM"],
    [3,"C511BNL"],
    [4,"C856BLY"],
    [5,"C910BNX"],
    [6,"C306BPR"],
]  
class Registro(models.Model):
    fecha=models.DateField(verbose_name="Fecha llenado")
    hora_llenado=models.TimeField(verbose_name="Hora llenado")
    placa=models.IntegerField(verbose_name="Placa", choices=placas)
    piloto=models.IntegerField (verbose_name="Piloto", choices=piloto)
    ruta=models.IntegerField(verbose_name="Ruta", choices=ruta)
    serie=models.CharField(verbose_name="Serie Factura", max_length=50)
    no_factura=models.IntegerField(verbose_name="Numero de Factura")
    total=models.FloatField(verbose_name="Total Llenado")
    galones=models.FloatField(verbose_name="Galones Llenados")
    tipo_combustible=models.CharField(verbose_name="Tipo de Combustible", max_length=50)
    bomnba=models.IntegerField(verbose_name="Bomba Lllenado")
    precioxgalon=models.FloatField(verbose_name="Precio Por Galon")
    kminicial=models.IntegerField(verbose_name="Kilometro Inicial")
    kmfinal=models.IntegerField(verbose_name="Kilometro Final")
    recorrido=models.IntegerField(verbose_name="Recorrido")
    rendxgalon=models.FloatField(verbose_name="Rendimiento Por Galon")
    manifiesto=models.IntegerField(verbose_name="Manifiesto")
    observaciones=models.TextField(verbose_name="Observaciones")
    
    def __str__(self):
        return self.serie
    