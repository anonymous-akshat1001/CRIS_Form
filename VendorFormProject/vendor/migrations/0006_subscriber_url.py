# Generated by Django 5.0.6 on 2024-07-16 19:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0005_vendor_attachment_url_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscriber',
            name='url',
            field=models.URLField(default=django.utils.timezone.now, max_length=255),
            preserve_default=False,
        ),
    ]
