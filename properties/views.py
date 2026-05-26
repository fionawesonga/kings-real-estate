# properties/views.py
from rest_framework import viewsets, permissions
from .models import Property
from .serializers import PropertySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows properties to be viewed or edited.
    - Public users can only READ (GET).
    - Admin users can CREATE, UPDATE, DELETE (POST, PUT, DELETE).
    """
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_field = 'slug' # Use slug for looking up properties
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]