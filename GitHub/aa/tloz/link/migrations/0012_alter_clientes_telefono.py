# Generated by Django 4.0.1 on 2022-02-05 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('link', '0011_alter_clientes_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clientes',
            name='telefono',
            field=models.IntegerField(max_length=9),
        ),
    ]