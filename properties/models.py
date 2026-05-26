from django.db import models

class Property(models.Model):
    # 1. Listing Type (Matches Navigation: BUY vs RENT)
    LISTING_TYPE_CHOICES = (
        ('sale', 'For Sale'),
        ('rent', 'For Rent'),
    )
    
    # 2. Project Status (Matches Screenshot 2: Lifestyle Projects)
    STATUS_CHOICES = (
        ('now_selling', 'Now Selling'),
        ('under_development', 'Under Development'),
        ('ready_to_move_in', 'Ready to Move In'),
    )

    # Basic Info
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, help_text="e.g., 'ankori-project-karen'")
    description = models.TextField(help_text="Main welcome text and introduction")
    
    # Location Details
    address = models.CharField(max_length=255, help_text="Full street address")
    neighborhood = models.CharField(max_length=100, default='Nairobi', help_text="e.g., Karen, Lavington")
    
    # Map Coordinates
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Classification
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPE_CHOICES, default='sale')
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default='now_selling')
    
    # Financials
    price = models.DecimalField(max_digits=12, decimal_places=2)
    
    # Features
    bedrooms = models.IntegerField(default=0)
    bathrooms = models.IntegerField(default=0)
    area_sqft = models.IntegerField(default=0, help_text="Area in Square Feet")
    garages = models.IntegerField(default=0)
    
    # Completion Year
    completion_year = models.IntegerField(null=True, blank=True, help_text="e.g., 2029")

    # Special Flags
    is_featured = models.BooleanField(default=False, help_text="Check if this is 'Property of the Month'")
    is_available = models.BooleanField(default=True)
    
    # Media
    main_image = models.ImageField(upload_to='property_images/main/')
    # NEW: Virtual Tour Link
    virtual_tour_url = models.URLField(blank=True, null=True, help_text="Link to YouTube or Virtual Tour")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_featured = models.BooleanField(default=False, help_text="Check if this is 'Property of the Month'")
    is_private = models.BooleanField(default=False, help_text="Check if this is a 'Private Listing' (requires password)") # NEW
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Properties"
        ordering = ['-created_at']


# Model for General Gallery Images
class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='property_images/gallery/')
    
    def __str__(self):
        return f"Gallery Image for {self.property.title}"


# Model for "Benefits" Section
class PropertyBenefit(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='benefits')
    title = models.CharField(max_length=100, help_text="e.g., Modern Kitchen, Master Bedroom")
    image = models.ImageField(upload_to='property_images/benefits/')
    description = models.TextField(blank=True, help_text="Short description of the benefit")

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['id']