# Generated by Django 4.0.1 on 2022-02-08 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('link', '0019_ingreso_guias_descuento_ingreso_guias_sub_total_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingreso_guias',
            name='boleta_cte',
            field=models.CharField(default=1, max_length=6, verbose_name='Boleta Contra Entrega'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ingreso_guias',
            name='comision',
            field=models.FloatField(default=0, verbose_name='Comision'),
        ),
        migrations.AddField(
            model_name='ingreso_guias',
            name='ptpae',
            field=models.FloatField(default=0, verbose_name='Precio Total Del Envio'),
        ),
    ]
