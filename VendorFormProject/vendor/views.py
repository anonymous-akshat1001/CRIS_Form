# vendor/views.py
import logging
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Subscriber, Vendor, Zone, Division, State
from django.shortcuts import render
from .serializers import SubscriberSerializer, VendorSerializer, ZoneSerializer, DivisionSerializer, StateSerializer
from django.core.mail import send_mail
from rest_framework.decorators import api_view

logger = logging.getLogger(__name__)

@api_view(['POST'])
def create_vendor(request):
    if request.method == 'POST':
        serializer = VendorSerializer(data=request.data)
        if serializer.is_valid():
            vendor = serializer.save()
            send_mail(
                'Vendor Form Submission Alert',
                f"Vendor Form Submitted Successfully \n Subscriber {vendor.vendor_name} needs to be configured in the API Gateway",
                'noobdagamerog@gmail.com',
                [vendor.nodal_person_email],
                fail_silently=False,
            )
            return Response({'id': vendor.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

    def create_id(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        vendor = Vendor.objects.get(id=response.data['id'])
        subscriber_code = vendor.vendor_code
        return Response({'vendor': response.data, 'subscriber_code': subscriber_code})
    

class ZoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer

class StateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer

class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

    def create(self, request, *args, **kwargs):
        try:
            print("Request data:", request.data)  # Debug statement
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f'Error during subscriber creation: {e}')
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DivisionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer

def vendor_list(request):
    vendors = Vendor.objects.all()
    subscribers = Subscriber.objects.all()
    return render(request, 'vendor/vendor_list.html', {'vendors': vendors, 'subscribers': subscribers})

from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the CRIS Vendor Management System!")