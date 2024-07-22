# vendor/admin.py
from django.contrib import admin
from .models import Vendor, Zone, Division, Subscriber, State

admin.site.register(Vendor)
admin.site.register(Zone)
admin.site.register(State)
admin.site.register(Division)
admin.site.register(Subscriber)
