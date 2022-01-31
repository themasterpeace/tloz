from django.db.models.deletion import PROTECT
from django.db.models.enums import Choices
from django.db.models.fields import IntegerField
from django.db.models.fields.related import ForeignKey
from django.views import*
from django.db import models
from datetime import datetime 
from bases.models import ClaseModelo

# Create your models here.
banco=[
    [0, "BANRURAL"],
    [1, "GYT CONTINENTAL"],
    [2, "BANCO INDUSTRIAL"],
    [3, "INTERBANCO"],
    [4, "BAC CREDOMATIC"],
    [5, "BANCO DE ANTIGUA"],
    [6, "VIVIBANCO"],
]    


    
class Departamento(ClaseModelo):
    #codigo = models.CharField(max_length=2)
    nombre = models.CharField(max_length=50,
    unique=True
    )
    iniciales = models.CharField(max_length=10)
    
    def __str__(self):
        return '{}'.format(self.nombre)
    
    def save(self):
        self.nombre = self.nombre.upper()
        super(Departamento, self).save()

    class Meta:
        verbose_name_plural = "Departamentos"
    
class Municipio(ClaseModelo):
    depto = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    muni = models.CharField(max_length=100,
    help_text='Nombre Municipio')
    #ruta = models.CharField(max_length=50)
    #porcentaje = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return '{}:{}'.format(self.depto.nombre, self.muni)

    def save(self):
        self.muni = self.muni.upper()
        super(Municipio, self).save()
    
    class Meta:
        verbose_name_plural = "Municipios"
        unique_together = ('depto', 'muni')

class Rutas(ClaseModelo):
    codigo = models.CharField(max_length=15)
    nombre = models.CharField(max_length=50)
    vendedor = models.CharField(max_length=15)
    #distancia = models.DecimalField(max_digits=11, decimal_places=0)
    depto = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    #deptodesti = models.DecimalField(max_digits=11, decimal_places=0)
    placa = models.CharField(max_length=15)
    
    def __str__(self):
        return '{}:{}'.format(self.depto.nombre, self.codigo)
class Vendedor(ClaseModelo):
    codigo = models.CharField(max_length=3, unique=True)
    nombre = models.CharField(max_length=75)
    porcentaje = models.DecimalField(max_digits=10, decimal_places=2)
    #fechaingre = models.DateTimeField(auto_now_add=True)
    telefono = models.CharField(max_length=10)
    #porcentaj2 = models.DecimalField(max_digits=10, decimal_places=2)
    placa = models.CharField(max_length=20)
    #foto = models.CharField(max_length=50)
    
    def __str__(self):
        return '{}'.format(self.codigo)
    
    def save(self):
        self.codigo = self.codigo.upper()
        super(Vendedor, self).save()

    class Meta:
        verbose_name_plural = "Vendedores"

class Clientes(ClaseModelo):
    codigo_cliente = models.CharField(max_length=8, unique=True, verbose_name="Codigo Cliente")
    nombre = models.CharField(max_length=150, verbose_name="Nombre Cliente")
    direccion = models.CharField(max_length=75)
    telefono = models.CharField(max_length=70)
    #email = models.CharField(max_length=50)
    #web = models.CharField(max_length=50)
    nit = models.CharField(max_length=15)
    municipio = models.CharField(max_length=50)
    depto = models.CharField(max_length=50)
    contacto = models.CharField(max_length=50)
    #ctacontabl = models.CharField(max_length=15)
    #transporte = models.CharField(max_length=50)
    #pequenocon = models.BooleanField()
    limitecred = models.DecimalField(max_digits=10, decimal_places=2)
    rutadestin = models.CharField(max_length=30)
    ruta = models.CharField(max_length=30)
    #codigo=models.ForeignKey(Vendedor, on_delete=models.PROTECT,verbose_name="Vendedor")
    #fechacrea = models.DateTimeField(auto_now_add=True)
    observa = models.TextField(verbose_name="Oboservaciones")
    
    def __str__(self):
        return self.codigo
    
class Pilotos(ClaseModelo):
    ruta = models.CharField(max_length=10)
    descripcio = models.CharField(max_length=75)
    responsabl = models.CharField(max_length=75)
    
    def __str__(self):
        return self.ruta
    
class Ingreso_bodega(ClaseModelo):
    bodega=models.CharField(max_length=50, verbose_name="Nombre de Bodega")
    fecha=models.DateTimeField(auto_now=False, auto_now_add=False, verbose_name="Fecha ingreso Bodega")
    ruta=models.ForeignKey(Rutas, verbose_name="Ruta Entrega", on_delete=models.PROTECT)
    piloto=models.ForeignKey(Pilotos, on_delete=models.PROTECT, verbose_name="Piloto de ruta")
    auxliar=models.CharField(max_length=50, verbose_name="Auxiliar de ruta")
    personalrecibe=models.CharField(max_length=50, verbose_name="Personal Que Recibe")
    noguia= models.CharField(verbose_name="Numero de guia", max_length=6)
    guiamadre=models.IntegerField(verbose_name="Ultima guia madre escaneada")
    guiahija=models.CharField(max_length=50, verbose_name="Ultima guia Hija escaneada")
    piezas = models.IntegerField(verbose_name="Total Piezas")
    guias = models.IntegerField(verbose_name="Total Guias")
    
    def __str__(self):
        return self.bodega


class Tarifario(ClaseModelo):
    tipo_envio = models.IntegerField(unique=True, verbose_name="Codigo")
    descripcion = models.CharField(max_length=150, verbose_name="Descripcion Envio", unique=True )
    precio = models.FloatField(default=0)

class Ingreso_guias(ClaseModelo):
    no_guia = models.CharField(unique=True,max_length=6,verbose_name="No. Guia")
    fecha = models.DateTimeField()
    no_manifiesto = models.CharField(max_length=5, unique=True)
    
    codigo_cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE, null=False)
    remitente = models.CharField(max_length=200, verbose_name="Nombre Remitente")
    dirrem = models.CharField(max_length=300, verbose_name="Direccion Remitente")
    tel = models.CharField(max_length=9, verbose_name="No. Telefono")
    zona = models.CharField(max_length=2, verbose_name="Zona")
    muni= models.CharField(max_length=50, verbose_name="Municipio")
    origen = models.CharField(max_length=3, verbose_name="Origen")
    ruta = models.CharField(max_length=50, verbose_name="Ruta")
    #Datos destinatario
    destinatario = models.CharField(max_length=100, verbose_name="Nombre Destinatario")
    dirdes = models.CharField(max_length=300, verbose_name="Direccion Destinatario")
    teldes = models.CharField(max_length=9, verbose_name="No. Telefono")
    zonades = models.CharField(max_length=2, verbose_name="Zona")
    munides= models.CharField(max_length=50, verbose_name="Municipio")
    destino = models.CharField(max_length=3, verbose_name="Codigo Destino")
    observa = models.TextField(max_length=500, verbose_name="Observaciones")
    #Forma de pago 
    nombre=models.CharField(max_length=100)
    #Descripcion de Envio 
    cantidad = IntegerField(default=0 ,verbose_name="Cantidad")
    tipo_envio = models.ForeignKey(Tarifario, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=150, verbose_name="Descripcion")
    peso = models.FloatField(default=0, verbose_name="Peso")
    precio = models.FloatField(default=0, verbose_name="Tarifa")
        
    def __str__(self):
        return self.no_guia

class Boletadeposito(ClaseModelo):
    no_manifiesto = models.ForeignKey(Ingreso_guias, verbose_name="Manifiestos", on_delete=models.PROTECT)
    boleta = models.CharField(max_length=15)
    boleta2 = models.CharField(max_length=15)
    boleta3 = models.CharField(max_length=15)
    boleta4 = models.CharField(max_length=15)
    fgenera = models.DateTimeField(verbose_name='Fechar Generada')
    origen = models.CharField(max_length=15)
    destino = models.CharField(max_length=15)
    frecibido = models.DateTimeField(verbose_name='Fecha Ingreso')
    noguias = models.DecimalField(max_digits=11, decimal_places=0, verbose_name='Total guias')
    nopiezas = models.DecimalField(max_digits=11, decimal_places=0, verbose_name='Total piezas')
    noguiasrec = models.DecimalField(max_digits=11, decimal_places=0, verbose_name='Guias recibidas')
    xcobrar = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Total por cobrar')
    contado = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Total contado')
    credito = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Total credito')
    prepago = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Total prepago')
    contraentr = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Total contraentrega')
    fdeposito = models.DateTimeField(verbose_name='Fecha depositado')
    banco = models.IntegerField(choices=banco, verbose_name='Banco')
    estatus = models.CharField(max_length=20)
    observa = models.CharField(max_length=250)
    ruta = models.CharField(max_length=15)
    totalbole1 = models.DecimalField(max_digits=12, decimal_places=2)
    totalbole2 = models.DecimalField(max_digits=12, decimal_places=2)
    totalbole3 = models.DecimalField(max_digits=12, decimal_places=2)
    totalbole4 = models.DecimalField(max_digits=12, decimal_places=2)
    
    def __str__(self):
        return self.manifiesto