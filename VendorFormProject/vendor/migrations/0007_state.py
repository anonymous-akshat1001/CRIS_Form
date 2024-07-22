# Generated by Django 5.0.6 on 2024-07-19 07:44

from django.db import migrations, models


def populate_states(apps, schema_editor):
    State = apps.get_model('vendor', 'State')
    # Populate States
    states = [
    {'code': 'AP', 'name': 'Andhra Pradesh'},
    {'code': 'AR', 'name': 'Arunachal Pradesh'},
    {'code': 'AS', 'name': 'Assam'},
    {'code': 'BR', 'name': 'Bihar'},
    {'code': 'CT', 'name': 'Chhattisgarh'},
    {'code': 'GA', 'name': 'Goa'},
    {'code': 'GJ', 'name': 'Gujarat'},
    {'code': 'HR', 'name': 'Haryana'},
    {'code': 'HP', 'name': 'Himachal Pradesh'},
    {'code': 'JH', 'name': 'Jharkhand'},
    {'code': 'KA', 'name': 'Karnataka'},
    {'code': 'KL', 'name': 'Kerala'},
    {'code': 'MP', 'name': 'Madhya Pradesh'},
    {'code': 'MH', 'name': 'Maharashtra'},
    {'code': 'MN', 'name': 'Manipur'},
    {'code': 'ML', 'name': 'Meghalaya'},
    {'code': 'MZ', 'name': 'Mizoram'},
    {'code': 'NL', 'name': 'Nagaland'},
    {'code': 'OR', 'name': 'Odisha'},
    {'code': 'PB', 'name': 'Punjab'},
    {'code': 'RJ', 'name': 'Rajasthan'},
    {'code': 'SK', 'name': 'Sikkim'},
    {'code': 'TN', 'name': 'Tamil Nadu'},
    {'code': 'TG', 'name': 'Telangana'},
    {'code': 'TR', 'name': 'Tripura'},
    {'code': 'UP', 'name': 'Uttar Pradesh'},
    {'code': 'UT', 'name': 'Uttarakhand'},
    {'code': 'WB', 'name': 'West Bengal'},
    {'code': 'AN', 'name': 'Andaman and Nicobar Islands'},
    {'code': 'CH', 'name': 'Chandigarh'},
    {'code': 'DH', 'name': 'Dadra and Nagar Haveli and Daman and Diu'},
    {'code': 'DL', 'name': 'Delhi'},
    {'code': 'JK', 'name': 'Jammu and Kashmir'},
    {'code': 'LA', 'name': 'Ladakh'},
    {'code': 'LD', 'name': 'Lakshadweep'},
    {'code': 'PY', 'name': 'Puducherry'}
    ]
    for state in states:
        print(f"Creating state: {state['name']}")  # Debug print
        State.objects.create(**state)



class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0006_subscriber_url'),
    ]

    operations = [
        migrations.RunPython(populate_states),
        migrations.CreateModel(
            name='State',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
    ]