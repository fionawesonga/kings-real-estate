import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types';
import api from '@/lib/api';

async function getInvestmentProperties() {
  try {
    const res = await api.get('/properties/');
    return res.data;
  } catch (error) {
    return [];
  }
}

export default async function InvestmentPage() {
  const properties: Property[] = await getInvestmentProperties();

  return (
    <main className="min-h-screen bg-[#111216] text-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-l-4 border-[#A37238] pl-6">
          <h1 className="text-5xl font-bold uppercase tracking-wider text-white">Investment Projects</h1>
          <p className="text-gray-400 mt-2 text-lg">High-return assets for serious investors.</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-700 pb-4">
          <button className="px-6 py-2 bg-[#A37238] text-white rounded-full font-bold uppercase text-sm">All</button>
          <button className="px-6 py-2 bg-transparent border border-gray-600 text-gray-300 rounded-full font-bold uppercase text-sm hover:border-[#A37238] hover:text-[#A37238] transition">Apartments</button>
          <button className="px-6 py-2 bg-transparent border border-gray-600 text-gray-300 rounded-full font-bold uppercase text-sm hover:border-[#A37238] hover:text-[#A37238] transition">Commercial</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
