import PropertyCard from '@/components/PropertyCard';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Property } from '@/types';
import api from '@/lib/api';

async function getProperties() {
  try {
    const res = await api.get('/properties/');
    return res.data;
  } catch (error) {
    console.error("Failed to fetch properties", error);
    return [];
  }
}

export default async function Home() {
  const properties: Property[] = await getProperties();
  
  // Filter for featured (optional, just example logic)
  const featuredProperties = properties.slice(0, 6); 

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Featured Property Listings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Featured Property Listings</h2>
              <p className="text-gray-600 mt-2">Handpicked properties just for you</p>
            </div>
            <a href="/properties" className="text-indigo-600 font-bold hover:underline flex items-center">
              View All 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </a>
          </div>
          
          {properties.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No properties found. Add some in Django Admin!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section (Simple) */}
      <section className="bg-indigo-700 py-20 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to find your home?</h2>
        <p className="mb-8 text-indigo-100">Let our experts guide you to the perfect property.</p>
        <button className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition">
          Contact Us Today
        </button>
      </section>

    </main>
  );
}
