import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types';
import api from '@/lib/api';

async function getCommercialProperties(): Promise<Property[]> {
  try {
    // Filter: Sale AND Commercial (so Rent properties don't show up here)
    const res = await api.get('/properties/?listing_type=sale&property_type=commercial');
    return res.data;
  } catch (error) {
    return [];
  }
}

export default async function CommercialPage() {
  const properties = await getCommercialProperties();

  return (
    <main className="min-h-screen bg-[#111216] text-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-l-4 border-[#A37238] pl-6">
          <h1 className="text-5xl font-bold uppercase tracking-wider text-white">Commercial Properties</h1>
          <p className="text-gray-400 mt-2 text-lg">Premium office spaces and business units for sale.</p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No Commercial properties listed at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}