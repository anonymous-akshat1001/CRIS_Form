# vendor/migrations/0003_auto_populate_zones_divisions.py
from django.db import migrations

def populate_zones_and_divisions(apps, schema_editor):
    Zone = apps.get_model('vendor', 'Zone')
    Division = apps.get_model('vendor', 'Division')
    

    # Populate Zones
    zones = [
        {'code': 'ER', 'name': 'Eastern Railway'},
        {'code': 'WR', 'name': 'Western Railway'},
        {'code': 'NR', 'name': 'Northern Railway'},
        {'code': 'SR', 'name': 'Southern Railway'},
        {'code': 'CR', 'name': 'Central Railway'},
    ]
    for zone in zones:
        Zone.objects.create(**zone)

    # Populate Divisions
    divisions = [
        {'code': 'ASN', 'name': 'Asansol', 'zone_id': 'ER'},
        {'code': 'HWH', 'name': 'Howrah', 'zone_id': 'ER'},
        {'code': 'MLDT', 'name': 'Malda Town', 'zone_id': 'ER'},
        {'code': 'SDAH', 'name': 'Sealdah', 'zone_id': 'ER'},
        {'code': 'ADI', 'name': 'Ahmedabad', 'zone_id': 'WR'},
        {'code': 'BCT', 'name': 'Mumbai Central', 'zone_id': 'WR'},
        {'code': 'BRC', 'name': 'Vadodara', 'zone_id': 'WR'},
        {'code': 'BVP', 'name': 'Bhavnagar', 'zone_id': 'WR'},
        {'code': 'RJT', 'name': 'Rajkot', 'zone_id': 'WR'},
        {'code': 'RTM', 'name': 'Ratlam', 'zone_id': 'WR'},
        {'code': 'DLI', 'name': 'Delhi', 'zone_id': 'NR'},
        {'code': 'FZR', 'name': 'Firozpur', 'zone_id': 'NR'},
        {'code': 'LKO', 'name': 'Lucknow', 'zone_id': 'NR'},
        {'code': 'MB', 'name': 'Moradabad', 'zone_id': 'NR'},
        {'code': 'UMB', 'name': 'Ambala', 'zone_id': 'NR'},
        {'code': 'BSL', 'name': 'Bhusaval', 'zone_id': 'CR'},
        {'code': 'CSTM', 'name': 'Mumbai CST', 'zone_id': 'CR'},
        {'code': 'NGP', 'name': 'Nagpur', 'zone_id': 'CR'},
        {'code': 'PUNE', 'name': 'Pune', 'zone_id': 'CR'},
        {'code': 'SUR', 'name': 'Solapur', 'zone_id': 'CR'},
        {'code': 'MAS', 'name': 'Chennai', 'zone_id': 'SR'},
        {'code': 'MDU', 'name': 'Madurai', 'zone_id': 'SR'},
        {'code': 'PGT', 'name': 'Palakkad', 'zone_id': 'SR'},
        {'code': 'SA', 'name': 'Salem', 'zone_id': 'SR'},
        {'code': 'TPJ', 'name': 'Tiruchirappalli', 'zone_id': 'SR'},
        {'code': 'TVC', 'name': 'Thiruvananthapuram', 'zone_id': 'SR'},
    ]
    for division in divisions:
        Division.objects.create(**division)

class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0002_division_zone_and_more')  # Replace with your actual dependency
    ]

    operations = [
        migrations.RunPython(populate_zones_and_divisions),
    ]
