from django.db import models

from bases.models import ClaseModelo

# Create your models here.

class ImpHija(ClaseModelo):
    madre = models.IntegerField(unique=True)
    pieza = models.IntegerField(unique=True)
    de = models.IntegerField(unique=True)
    origen = models.CharField(max_length=3)
    destino = models.CharField(max_length=3)

    def __str__(self):
        return self.origen

    def save(self):
        self.madre = self.madre
        super(ImpHija, self).save()

    class Meta:
        verbose_name_plural = "ImpHijas"