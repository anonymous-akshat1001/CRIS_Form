# vendor/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VendorViewSet, ZoneViewSet, DivisionViewSet, SubscriberViewSet, StateViewSet
from . import views

router = DefaultRouter()
router.register(r'vendor', VendorViewSet)
router.register(r'zone', ZoneViewSet)
router.register(r'division', DivisionViewSet)
router.register(r'subscribers', SubscriberViewSet)
router.register(r'state', StateViewSet)

from .views import home

urlpatterns = [
    path('', home, name='home'),
    path('vendors/', views.vendor_list, name='vendor_list'),
    path('api/', include(router.urls)),
]
