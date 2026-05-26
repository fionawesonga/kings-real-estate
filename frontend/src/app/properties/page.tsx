import Link from 'next/link';
import Image from 'next/image';

export default function PropertiesPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      
      {/* LEFT SIDE: Lifestyle Projects */}
      <Link 
        href="/properties/lifestyle" 
        className="relative w-full md:w-1/2 h-[50vh] md:h-screen group overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/lifestyle.jpg" 
            alt="Lifestyle Projects" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-[#111216]/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16">
          <div className="border-l-4 border-[#A37238] pl-6 mb-4">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-wider uppercase">
              Lifestyle<br/>Projects
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-md mb-6">
            Discover your dream home. Exclusive villas and residences designed for modern living.
          </p>
          <div className="flex items-center text-[#A37238] font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
            Explore 
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </div>
        </div>
      </Link>

      {/* RIGHT SIDE: Investment Projects */}
      <Link 
        href="/properties/investment" 
        className="relative w-full md:w-1/2 h-[50vh] md:h-screen group overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/investments.jpg" 
            alt="Investment Projects" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-[#111216]/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16">
          <div className="border-l-4 border-[#A37238] pl-6 mb-4">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-wider uppercase">
              Investment<br/>Projects
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-md mb-6">
            High-yield opportunities. Premium apartments and commercial units for smart investors.
          </p>
          <div className="flex items-center text-[#A37238] font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
            Explore 
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </div>
        </div>
      </Link>

    </main>
  );
}
