# inquiries/views.py
from rest_framework import viewsets, permissions
from .models import Inquiry, SellerRequest
from .serializers import InquirySerializer, SellerRequestSerializer

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class SellerRequestViewSet(viewsets.ModelViewSet):
    queryset = SellerRequest.objects.all().order_by('-created_at')
    serializer_class = SellerRequestSerializer
    permission_classes = [permissions.AllowAny] # Anyone can submit
    http_method_names = ['post', 'get'] # Only allow POST and GET