export interface Property {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  address: string;
  neighborhood: string;
  property_type: 'residential' | 'commercial' | 'land';
  listing_type: 'sale' | 'rent' | 'airbnb'; // Updated
  status: 'now_selling' | 'under_development' | 'ready_to_move_in';
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  main_image: string;
  images: { id: number; image: string }[]; // For gallery
  virtual_tour_url?: string;
  is_featured: boolean;
  is_private: boolean;
  created_at: string;
}
