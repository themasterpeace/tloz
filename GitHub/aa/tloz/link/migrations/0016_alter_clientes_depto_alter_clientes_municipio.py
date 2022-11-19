# Generated by Django 4.0.1 on 2022-02-06 22:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('link', '0015_alter_clientes_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clientes',
            name='depto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='link.departamento'),
        ),
        migrations.AlterField(
            model_name='clientes',
            name='municipio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='link.municipio'),
        ),
    ]
