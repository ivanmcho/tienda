# Generated by Django 2.2.13 on 2021-01-17 07:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_producto'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='estado',
            new_name='descripcion',
        ),
    ]
