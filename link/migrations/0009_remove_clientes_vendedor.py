# Generated by Django 4.0.1 on 2022-02-05 05:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('link', '0008_clientes_vendedor_alter_clientes_nit'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientes',
            name='vendedor',
        ),
    ]
