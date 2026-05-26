export interface Property {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  address: string;
  neighborhood: string;
  listing_type: 'sale' | 'rent';
  status: 'now_selling' | 'under_development' | 'ready_to_move_in';
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  main_image: string;
  virtual_tour_url?: string;
  is_featured: boolean;
  is_private: boolean; // New field
  created_at: string;
}
