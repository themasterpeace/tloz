# Generated by Django 4.0.1 on 2022-01-23 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('link', '0006_alter_departamento_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='departamento',
            name='codigo',
            field=models.CharField(max_length=2),
        ),
    ]
