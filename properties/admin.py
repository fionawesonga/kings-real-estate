from django.contrib import admin
from .models import Property, PropertyImage, PropertyBenefit

# Inline for General Gallery Images
class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

# Inline for Benefits (Kitchen, Bedroom, etc.)
class PropertyBenefitInline(admin.TabularInline):
    model = PropertyBenefit
    extra = 1 # Shows 1 empty slot by default

class PropertyAdmin(admin.ModelAdmin):
    inlines = [PropertyImageInline, PropertyBenefitInline]
    
    # Fields to display in the list view
    list_display = ('title', 'neighborhood', 'price', 'status', 'completion_year', 'is_featured')
    
    # Filters on the right side
    list_filter = ('status', 'neighborhood', 'listing_type', 'is_featured')
    
    # Search bar
    search_fields = ('title', 'address', 'neighborhood')
    
    # Auto-fill the slug from the title
    prepopulated_fields = {'slug': ('title',)}

    # Organize fields into sections for easier editing
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'description', 'main_image')
        }),
        ('Location & Map', {
            'fields': ('address', 'neighborhood', 'latitude', 'longitude')
        }),
        ('Details & Pricing', {
            'fields': ('price', 'listing_type', 'status', 'completion_year', 'bedrooms', 'bathrooms', 'area_sqft', 'garages')
        }),
        ('Flags', {
            'fields': ('is_featured', 'is_available')
        }),
    )

admin.site.register(Property, PropertyAdmin)