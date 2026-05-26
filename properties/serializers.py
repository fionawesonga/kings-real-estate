# properties/serializers.py
from rest_framework import serializers
from .models import Property, PropertyImage, PropertyBenefit

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image']

class PropertyBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyBenefit
        fields = ['id', 'title', 'image', 'description']

class PropertySerializer(serializers.ModelSerializer):
    # Nested serializers
    images = PropertyImageSerializer(many=True, read_only=True)
    benefits = PropertyBenefitSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = '__all__' # This includes the new virtual_tour_url automatically
        lookup_field = 'slug'