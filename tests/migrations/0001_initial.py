# Generated by Django 4.0.1 on 2022-03-27 02:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_userforeignkey.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('link', '0028_ingreso_guias_totenv_piloto_nombre_auxiliar'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado', models.BooleanField(default=True)),
                ('fc', models.DateTimeField(auto_now_add=True)),
                ('fm', models.DateTimeField(auto_now=True)),
                ('no_guia', models.CharField(max_length=6, unique=True, verbose_name='No. Guia')),
                ('fecha', models.DateTimeField()),
                ('no_manifiesto', models.CharField(max_length=5)),
                ('codigo_cliente', models.CharField(max_length=8)),
                ('remitente', models.CharField(max_length=200, verbose_name='Nombre Remitente')),
                ('dirrem', models.CharField(max_length=300, verbose_name='Direccion Remitente')),
                ('tel', models.CharField(max_length=9, verbose_name='No. Telefono')),
                ('zona', models.CharField(max_length=2, verbose_name='Zona')),
                ('muni', models.CharField(max_length=50, verbose_name='Municipio')),
                ('origen', models.CharField(max_length=50, verbose_name='Origen')),
                ('ruta', models.CharField(max_length=3, verbose_name='Ruta')),
                ('codigo_desti', models.CharField(max_length=8)),
                ('destinatario', models.CharField(max_length=100, verbose_name='Nombre Destinatario')),
                ('dirdes', models.CharField(max_length=300, verbose_name='Direccion Destinatario')),
                ('teldes', models.CharField(max_length=9, verbose_name='No. Telefono')),
                ('zonades', models.CharField(max_length=2, verbose_name='Zona')),
                ('munides', models.CharField(max_length=50, verbose_name='Municipio')),
                ('destino', models.CharField(max_length=50, verbose_name='Codigo Destino')),
                ('rutades', models.CharField(max_length=3, verbose_name='Ruta')),
                ('observa', models.TextField(max_length=500, verbose_name='Observaciones')),
                ('codigo', models.CharField(max_length=8)),
                ('cliente', models.CharField(max_length=150)),
                ('cantidad', models.IntegerField(default=0, verbose_name='Cantidad')),
                ('descripcion', models.CharField(max_length=150, verbose_name='Descripcion')),
                ('peso', models.FloatField(default=0, verbose_name='Peso')),
                ('precio', models.FloatField(default=0, verbose_name='Tarifa')),
                ('totenv', models.IntegerField(default=0, verbose_name='Total Envio')),
                ('sub_total', models.FloatField(default=0)),
                ('descuento', models.FloatField(default=0)),
                ('total', models.FloatField(default=0)),
                ('boleta_cte', models.CharField(blank=True, max_length=6, null=True, verbose_name='Boleta Contra Entrega')),
                ('ptpae', models.FloatField(blank=True, default=0, null=True, verbose_name='Precio Total Del Envio')),
                ('comision', models.FloatField(blank=True, default=0, null=True, verbose_name='Comision')),
                ('tipo_envio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='link.tarifario')),
                ('uc', django_userforeignkey.models.fields.UserForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('um', django_userforeignkey.models.fields.UserForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Ingreso Guia',
                'verbose_name_plural': 'Ingresos Guias',
            },
        ),
    ]
