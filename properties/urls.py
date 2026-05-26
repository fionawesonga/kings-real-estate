# properties/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter  # <--- CORRECTED
from .views import PropertyViewSet

router = DefaultRouter()
router.register(r'', PropertyViewSet, basename='property')

urlpatterns = [
    path('', include(router.urls)),
]