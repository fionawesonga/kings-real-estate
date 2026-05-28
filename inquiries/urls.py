# inquiries/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InquiryViewSet, SellerRequestViewSet

router = DefaultRouter()
router.register(r'', InquiryViewSet, basename='inquiry')
router.register(r'seller-requests', SellerRequestViewSet, basename='seller-request')

urlpatterns = [
    path('', include(router.urls)),
]