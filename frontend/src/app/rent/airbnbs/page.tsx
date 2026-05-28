import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types';
import api from '@/lib/api';

async function getAirbnbs(): Promise<Property[]> {
  try {
    const res = await api.get('/properties/?listing_type=airbnb');
    return res.data;
  } catch (error) { return []; }
}

export default async function AirbnbsPage() {
  const properties = await getAirbnbs();

  return (
    <main className="min-h-screen bg-[#111216] text-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-l-4 border-[#A37238] pl-6">
          <h1 className="text-5xl font-bold uppercase tracking-wider text-white">Airbnbs & Short Stays</h1>
          <p className="text-gray-400 mt-2 text-lg">Furnished properties for short-term rental.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </div>
    </main>
  );
}
