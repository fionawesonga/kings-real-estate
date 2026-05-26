from django.db import models
from properties.models import Property

class Inquiry(models.Model):
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name='inquiries')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    
    # Optional: To know if they want to Buy or Rent specific to this inquiry
    inquiry_type = models.CharField(max_length=50, blank=True, help_text="e.g. Schedule Visit, More Info")
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} regarding {self.property}"