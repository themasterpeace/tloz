# Generated by Django 4.0 on 2022-01-02 22:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('link', '0002_remove_clientes_fechacrea_remove_clientes_vendedor_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vendedor',
            name='foto',
        ),
        migrations.RemoveField(
            model_name='vendedor',
            name='porcentaj2',
        ),
    ]
