# Generated by Django 5.0.6 on 2024-06-27 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0003_auto_20240608_1333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='vendor_address_line2',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='vendor_address_state',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='vendor_status',
            field=models.CharField(default='new', max_length=10),
        ),
    ]