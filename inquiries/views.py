# inquiries/views.py
from rest_framework import viewsets, permissions
from .models import Inquiry
from .serializers import InquirySerializer

class InquiryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for inquiries.
    - Anyone can CREATE an inquiry (POST).
    - Only Admins can view list of inquiries (GET).
    """
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer
    
    def get_permissions(self):
        if self.action == 'create':
            # Anyone can send an inquiry
            return [permissions.AllowAny()]
        # Only admin can view inquiries
        return [permissions.IsAdminUser()]