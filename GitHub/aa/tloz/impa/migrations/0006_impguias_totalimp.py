# Generated by Django 4.0.4 on 2022-05-11 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('impa', '0005_alter_impguias_numfin_alter_impguias_numini'),
    ]

    operations = [
        migrations.AddField(
            model_name='impguias',
            name='totalimp',
            field=models.IntegerField(default=0, verbose_name='Total Guías A Imprimir'),
        ),
    ]
