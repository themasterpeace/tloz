# Generated by Django 4.0.1 on 2022-02-21 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('link', '0027_alter_ingreso_hijas_guia_madre'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingreso_guias',
            name='totenv',
            field=models.IntegerField(default=0, verbose_name='Total Envio'),
        ),
        migrations.AddField(
            model_name='piloto',
            name='nombre_auxiliar',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]
