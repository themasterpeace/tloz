# Generated by Django 4.0.1 on 2022-04-18 00:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0002_remove_test_cantidad_remove_test_descripcion_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='productodet',
            name='guia',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tests.test'),
        ),
    ]