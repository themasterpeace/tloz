# Generated by Django 4.0.4 on 2022-05-11 04:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('impa', '0006_impguias_totalimp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='impguias',
            name='numfin',
            field=models.IntegerField(default=0, unique=True, verbose_name='Numero Final'),
        ),
        migrations.AlterField(
            model_name='impguias',
            name='numini',
            field=models.IntegerField(default=0, unique=True, verbose_name='Numero inicial'),
        ),
    ]