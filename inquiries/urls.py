# inquiries/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter  # <--- CORRECTED
from .views import InquiryViewSet

router = DefaultRouter()
router.register(r'', InquiryViewSet, basename='inquiry')

urlpatterns = [
    path('', include(router.urls)),
]