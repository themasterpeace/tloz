# Generated by Django 4.1.3 on 2022-11-21 03:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('impa', '0007_alter_impguias_numfin_alter_impguias_numini'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='impguias',
            name='cliente',
        ),
        migrations.RemoveField(
            model_name='impguias',
            name='codigo',
        ),
        migrations.AddField(
            model_name='impguias',
            name='fpago',
            field=models.IntegerField(choices=[[0, 'POR COBRAR'], [1, 'CONTADO'], [2, 'CREDITO'], [3, 'PREPAGO'], [4, 'CREDITO X COBRAR'], [5, 'CONTADO X COBRAR'], [6, 'CREDITO X CREDITO'], [7, 'CORTESIA']], default=1, verbose_name='FORMA DE PAGO'),
            preserve_default=False,
        ),
    ]