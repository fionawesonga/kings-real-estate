import Image from 'next/image';
import Link from 'next/link';

export default function BuyPage() {
  return (
    <main className="bg-[#111216] text-white min-h-screen pt-24">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image 
          src="/images/buy-hero.jpg"
          alt="Discover King's Globe Real Estate"
          fill
          sizes="100vw" // Added sizes prop
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-white uppercase">
              Discovering <span className="text-[#A37238]">Kings Globe</span> Real Estate
            </h1>
            <p className="mt-4 text-lg text-gray-300">Find your perfect investment</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Residential Card - Updated Link */}
          <Link href="/buy/residential" className="group relative h-96 rounded overflow-hidden cursor-pointer border border-gray-800 hover:border-[#A37238] transition">
            <Image 
              src="/images/residential-card.jpg"
              alt="Residential"
              fill
              sizes="(max-width: 768px) 100vw, 33vw" // Added sizes prop
              className="object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wider">Residential</h3>
              <p className="text-[#A37238] uppercase text-sm mt-2 tracking-widest">Explore Homes →</p>
            </div>
          </Link>

          {/* Commercial Card - Updated Link */}
          <Link href="/buy/commercial" className="group relative h-96 rounded overflow-hidden cursor-pointer border border-gray-800 hover:border-[#A37238] transition">
            <Image 
              src="/images/commercial-card.jpg"
              alt="Commercial"
              fill
              sizes="(max-width: 768px) 100vw, 33vw" // Added sizes prop
              className="object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wider">Commercial</h3>
              <p className="text-[#A37238] uppercase text-sm mt-2 tracking-widest">Business Spaces →</p>
            </div>
          </Link>

          {/* Land Card - Updated Link */}
          <Link href="/buy/land" className="group relative h-96 rounded overflow-hidden cursor-pointer border border-gray-800 hover:border-[#A37238] transition">
            <Image 
              src="/images/land-card.jpg"
              alt="Land"
              fill
              sizes="(max-width: 768px) 100vw, 33vw" // Added sizes prop
              className="object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wider">Land</h3>
              <p className="text-[#A37238] uppercase text-sm mt-2 tracking-widest">Prime Plots →</p>
            </div>
          </Link>

        </div>
      </section>

    </main>
  );
}