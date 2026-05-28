import Image from 'next/image';
import SellForm from './SellForm';

export default function SellPage() {
  return (
    <main className="bg-[#111216] text-white min-h-screen pt-24">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image 
          src="/images/sell-hero.jpg"
          alt="List your property with confidence"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-4">
              List your property <span className="text-[#A37238]">with confidence</span>
            </h1>
            <p className="text-gray-200 text-lg">Get the best price for your property with our expert guidance.</p>
          </div>
        </div>
      </section>

      {/* Selling Points Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-[#1a1b1e] p-8 rounded border-t-4 border-[#A37238] text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-white uppercase mb-2">Professional Marketing</h3>
            <p className="text-gray-400 text-sm">High-quality listings, professional photography, and wide exposure.</p>
          </div>

          <div className="bg-[#1a1b1e] p-8 rounded border-t-4 border-[#A37238] text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-white uppercase mb-2">Verified Buyers</h3>
            <p className="text-gray-400 text-sm">We screen all potential buyers to ensure serious offers only.</p>
          </div>

          <div className="bg-[#1a1b1e] p-8 rounded border-t-4 border-[#A37238] text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white uppercase mb-2">Market Pricing Guidance</h3>
            <p className="text-gray-400 text-sm">Expert valuation to help you set the right price.</p>
          </div>

        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto bg-[#1a1b1e] p-10 rounded shadow-xl border border-gray-800">
          <h2 className="text-3xl font-bold text-center text-white uppercase tracking-wide mb-2">Request a Quote</h2>
          <p className="text-center text-gray-400 mb-8">Fill the form below and we will get back to you shortly.</p>
          
          <SellForm />
          
        </div>
      </section>

    </main>
  );
}
