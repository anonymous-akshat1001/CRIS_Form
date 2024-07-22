# vendor/serializers.py
from rest_framework import serializers
from .models import Subscriber, Vendor, Zone, Division, State

class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ['code', 'name']

class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = ['code', 'name', 'zone']

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['code', 'name']

# vendor/serializers.py
class VendorSerializer(serializers.ModelSerializer):
    zone = serializers.PrimaryKeyRelatedField(queryset=Zone.objects.all())
    division = serializers.PrimaryKeyRelatedField(queryset=Division.objects.all())

    class Meta:
        model = Vendor
        fields = '__all__'
        extra_kwargs = {
            'pdf_file': {'write_only': True}

        }

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'

