# Generated by Django 4.0.1 on 2022-04-20 04:31

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('link', '0030_remove_ingreso_guias_cantidad_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Productodet',
            new_name='Producto',
        ),
    ]