import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import api, { BASE_URL } from '@/lib/api';

// Fetch single property including benefits
async function getProperty(slug: string): Promise<Property | null> {
  try {
    const res = await api.get(`/properties/${slug}/`);
    return res.data;
  } catch (error) {
    return null;
  }
}

// FIX: params is now a Promise in Next.js 15+, so we await it
export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#111216] flex items-center justify-center text-white">
        <h1>Property not found</h1>
      </div>
    );
  }

  const imageUrl = property.main_image
    ? (property.main_image.startsWith('http') ? property.main_image : BASE_URL + property.main_image)
    : 'https://via.placeholder.com/1200x800';

  const formattedPrice = new Intl.NumberFormat('en-KE', {
    style: 'currency', currency: 'KES', minimumFractionDigits: 0,
  }).format(parseFloat(property.price));

  return (
    <main className="bg-[#111216] text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] w-full">
        <Image 
          src={imageUrl} 
          alt={property.title} 
          fill 
          className="object-cover" 
          priority 
          unoptimized={true} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-black/50 to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-2 text-white drop-shadow-lg">
              {property.title}
            </h1>
            <p className="text-2xl text-[#A37238] font-bold uppercase tracking-widest">{property.neighborhood}</p>
          </div>
        </div>
      </section>

      {/* 2. WELCOME SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white tracking-wide">
          WELCOME TO <span className="text-[#A37238]">{property.title.toUpperCase()}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#1a1b1e] p-8 rounded border-l-4 border-[#A37238]">
            <h3 className="text-xl font-bold text-[#A37238] uppercase mb-2">Prime Location</h3>
            <p className="text-gray-400 text-sm">Located in the heart of {property.neighborhood}, offering convenience and luxury.</p>
          </div>
          <div className="bg-[#1a1b1e] p-8 rounded border-l-4 border-[#A37238]">
            <h3 className="text-xl font-bold text-[#A37238] uppercase mb-2">Modern Design</h3>
            <p className="text-gray-400 text-sm">Architectural excellence with state-of-the-art finishing and spacious layouts.</p>
          </div>
          <div className="bg-[#1a1b1e] p-8 rounded border-l-4 border-[#A37238]">
            <h3 className="text-xl font-bold text-[#A37238] uppercase mb-2">High ROI</h3>
            <p className="text-gray-400 text-sm">A perfect investment opportunity with high rental yield and appreciation.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-300 text-lg leading-relaxed">{property.description}</p>
        </div>
      </section>

      {/* 3. BENEFITS SECTION */}
      {property.benefits && property.benefits.length > 0 && (
        <section className="bg-[#0f0f11] py-20">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl font-bold mb-12 text-white uppercase tracking-wide">
              Benefits of <span className="text-[#A37238]">{property.title.toUpperCase()}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {property.benefits.map((benefit) => (
                <div key={benefit.id} className="group relative h-80 overflow-hidden rounded">
                  <Image 
                    src={BASE_URL + benefit.image} 
                    alt={benefit.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition duration-500"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-lg font-bold text-[#A37238] uppercase">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. PROJECT INFO BAR */}
      <section className="bg-black py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
            <div>
              <p className="text-gray-500 uppercase text-xs tracking-wider mb-2">Project</p>
              <p className="text-white text-2xl font-bold">{property.title}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs tracking-wider mb-2">Location</p>
              <p className="text-white text-2xl font-bold">{property.neighborhood}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs tracking-wider mb-2">Price</p>
              <p className="text-[#A37238] text-2xl font-bold">FROM {formattedPrice}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs tracking-wider mb-2">Completion</p>
              <p className="text-white text-2xl font-bold">{property.completion_year || 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-900 h-64 rounded overflow-hidden relative">
              {property.latitude && property.longitude ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{border:0}}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(property.longitude)-0.01}%2C${parseFloat(property.latitude)-0.01}%2C${parseFloat(property.longitude)+0.01}%2C${parseFloat(property.latitude)+0.01}&layer=mapnik&marker=${property.latitude}%2C${property.longitude}`}
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  Map not available
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Link 
                href={'/inquiry/' + property.slug} 
                className="w-full bg-[#A37238] text-white text-center py-4 rounded font-bold uppercase tracking-wider hover:bg-[#c48a4e] transition"
              >
                Book a Visit
              </Link>
              {property.virtual_tour_url && (
                <a 
                  href={property.virtual_tour_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full border border-white text-white text-center py-4 rounded font-bold uppercase tracking-wider hover:bg-white hover:text-black transition"
                >
                  Take Virtual Tour
                </a>
              )}
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
