# inquiries/serializers.py
from rest_framework import serializers
from .models import Inquiry, SellerRequest

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'

class SellerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerRequest
        fields = '__all__'