# Generated by Django 2.2.13 on 2021-01-17 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210117_0751'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='nombreComprador',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
