import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import { BASE_URL } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(parseFloat(property.price));

  const imageUrl = property.main_image
    ? (property.main_image.startsWith('http') 
        ? property.main_image 
        : BASE_URL + property.main_image)
    : 'https://via.placeholder.com/400x300';

  return (
    <div className="bg-[#111216] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-800 group">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={property.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
          unoptimized={true}
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-[#A37238] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {property.status.replace('_', ' ')}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2 text-[#A37238]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {property.neighborhood}
        </p>
        
        <div className="flex justify-between items-center text-gray-300 text-sm mb-6 border-t border-gray-800 pt-4">
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🛁 {property.bathrooms} Baths</span>
          <span>📐 {property.area_sqft} sqft</span>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-[#A37238] mb-6">{formattedPrice}</p>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {/* Virtual Tour Button */}
          {property.virtual_tour_url ? (
            <a 
              href={property.virtual_tour_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="col-span-1 text-center py-2 px-2 border border-gray-700 text-gray-300 rounded hover:bg-[#A37238] hover:border-[#A37238] hover:text-white transition text-xs font-bold uppercase tracking-wider"
            >
              Virtual Tour
            </a>
          ) : (
            <div className="col-span-1 text-center py-2 px-2 border border-gray-800 text-gray-600 rounded text-xs font-bold uppercase tracking-wider cursor-not-allowed">
              No Tour
            </div>
          )}

          {/* Details Button */}
          <Link 
            href={'/properties/' + property.slug} 
            className="col-span-1 text-center py-2 px-2 border border-gray-700 text-gray-300 rounded hover:bg-white hover:text-black transition text-xs font-bold uppercase tracking-wider"
          >
            Details
          </Link>

          {/* Enquire Button */}
          <Link 
            href={'/inquiry/' + property.slug} 
            className="col-span-1 text-center py-2 px-2 bg-[#A37238] text-white rounded hover:bg-[#c48a4e] transition text-xs font-bold uppercase tracking-wider"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  );
}
