'use client'; // Needed for state (carousel)

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import { BASE_URL } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Combine main image and gallery images
  const allImages = [
    property.main_image,
    ...(property.images?.map(img => img.image) || [])
  ].filter(Boolean); // Remove any null/undefined

  const formattedPrice = new Intl.NumberFormat('en-KE', {
    style: 'currency', currency: 'KES', minimumFractionDigits: 0,
  }).format(parseFloat(property.price));

  // Helper to get full URL
  const getUrl = (img: string) => img.startsWith('http') ? img : BASE_URL + img;

  // Navigation Logic
  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Button Logic
  const isCommercialRental = property.listing_type === 'rent' && property.property_type === 'commercial';
  const isAirbnb = property.listing_type === 'airbnb';
  const isResidentialRental = property.listing_type === 'rent' && property.property_type === 'residential';

  return (
    <div className="bg-[#111216] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-800 group flex flex-col">
      
      {/* Image Section with Arrows */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={getUrl(allImages[currentImageIndex])} 
          alt={property.title} 
          fill 
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-[#A37238] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
          {isAirbnb ? 'Airbnb' : property.listing_type.replace('_', ' ')}
        </div>

        {/* Carousel Arrows (Only show if multiple images) */}
        {allImages.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#A37238] text-white p-2 rounded-full z-10 transition"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#A37238] text-white p-2 rounded-full z-10 transition"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2 text-[#A37238]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          </svg>
          {property.neighborhood}
        </p>
        
        <div className="flex justify-between items-center text-gray-300 text-sm mb-6 border-t border-gray-800 pt-4">
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🛁 {property.bathrooms} Baths</span>
          <span>📐 {property.area_sqft} sqft</span>
        </div>

        <p className="text-2xl font-bold text-[#A37238] mb-6">{formattedPrice}<span className="text-sm font-normal text-gray-400"> {isAirbnb ? '/ night' : '/ month'}</span></p>

        {/* Action Buttons Logic */}
        <div className="mt-auto">
          {isCommercialRental ? (
            // Commercial Rentals: ONLY Enquire
            <Link 
              href={'/inquiry/' + property.slug} 
              className="block w-full text-center py-3 px-4 bg-[#A37238] text-white rounded hover:bg-[#c48a4e] transition font-bold uppercase text-sm"
            >
              Enquire
            </Link>
          ) : (
            // Residential & Airbnb: Virtual Tour + Details
            <div className="grid grid-cols-2 gap-2">
               {property.virtual_tour_url && (
                 <a 
                   href={property.virtual_tour_url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-center py-2 px-2 border border-gray-700 text-gray-300 rounded hover:bg-[#A37238] hover:border-[#A37238] hover:text-white transition text-xs font-bold uppercase tracking-wider"
                 >
                   Virtual Tour
                 </a>
               )}
              <Link 
                href={'/properties/' + property.slug} 
                className={`${property.virtual_tour_url ? '' : 'col-span-2'} text-center py-2 px-2 border border-gray-700 text-gray-300 rounded hover:bg-white hover:text-black transition text-xs font-bold uppercase tracking-wider`}
              >
                Details
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
