import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-[#111216] text-white">

      {/* Section 1: Hero */}
      <section className="relative h-[70vh] w-full">
        <Image 
          src="/images/about-hero.jpg"
          alt="About Us"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wider">About Us</h1>
        </div>
      </section>

      {/* Section 2: Intro */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded overflow-hidden">
            <Image 
              src="/images/about-intro.jpg"
              alt="King's Estate Team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">List your property <span className="text-[#A37238]">with confidence</span></h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              King's Estate Globe is a leading real estate agency dedicated to connecting clients with their dream properties. With years of experience in the Nairobi market, we provide unparalleled service, market insights, and professional marketing strategies.
            </p>
            <button className="bg-[#A37238] hover:bg-[#c48a4e] text-white font-bold py-3 px-8 rounded uppercase tracking-wider transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Services */}
      <section className="py-20 bg-[#111216]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">Our <span className="text-[#A37238]">Services</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
            <div className="p-8 border border-gray-800 rounded">
              <p className="text-4xl font-bold text-[#A37238] mb-2">5+</p>
              <p className="text-gray-400 uppercase text-sm">Years of Experience</p>
            </div>
            <div className="p-8 border border-gray-800 rounded">
              <p className="text-4xl font-bold text-[#A37238] mb-2">200+</p>
              <p className="text-gray-400 uppercase text-sm">Completed Projects</p>
            </div>
            <div className="p-8 border border-gray-800 rounded">
              <p className="text-4xl font-bold text-[#A37238] mb-2">100%</p>
              <p className="text-gray-400 uppercase text-sm">Client Satisfaction</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1b1e] p-6 rounded">
              <h3 className="text-xl font-bold mb-3">Private Showings</h3>
              <p className="text-gray-400 text-sm">Exclusive viewings tailored to your schedule.</p>
            </div>
            <div className="bg-[#1a1b1e] p-6 rounded">
              <h3 className="text-xl font-bold mb-3">Market Analysis</h3>
              <p className="text-gray-400 text-sm">Data-driven insights for the best pricing.</p>
            </div>
            <div className="bg-[#1a1b1e] p-6 rounded">
              <h3 className="text-xl font-bold mb-3">Legal Assistance</h3>
              <p className="text-gray-400 text-sm">Complete support for paperwork and legalities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Approach */}
      <section className="py-20 bg-[#0d0d10]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">Our <span className="text-[#A37238]">Approach</span></h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Residents enjoy private movie nights in the home cinema, equipped with major streaming platforms. This amenity adds experiential value, elevating the living environment.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="relative h-32 rounded overflow-hidden">
                  <Image src="/images/about-team-1.jpg" alt="Team 1" fill sizes="33vw" className="object-cover" />
                </div>
                <div className="relative h-32 rounded overflow-hidden">
                  <Image src="/images/about-team-2.jpg" alt="Team 2" fill sizes="33vw" className="object-cover" />
                </div>
                <div className="relative h-32 rounded overflow-hidden">
                  <Image src="/images/about-team-3.jpg" alt="Team 3" fill sizes="33vw" className="object-cover" />
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded overflow-hidden">
              <Image 
                src="/images/about-approach-main.jpg"
                alt="Our Approach Main"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Our Process */}
      <section className="py-20 bg-[#111216]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">Our <span className="text-[#A37238]">Process</span></h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="bg-[#A37238] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <h4 className="text-xl font-bold">Consultation</h4>
                    <p className="text-gray-400">We meet to understand your needs and property goals.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-[#A37238] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <h4 className="text-xl font-bold">Valuation</h4>
                    <p className="text-gray-400">Our experts determine the accurate market value.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-[#A37238] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <h4 className="text-xl font-bold">Marketing</h4>
                    <p className="text-gray-400">Professional listing and targeted marketing campaigns.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-[#A37238] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <h4 className="text-xl font-bold">Closing</h4>
                    <p className="text-gray-400">We handle negotiations and paperwork to the finish line.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-[500px] rounded overflow-hidden">
              <Image 
                src="/images/about-process.jpg"
                alt="Our Process"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Footer */}
      <section className="py-16 bg-[#0d0d10]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 uppercase">Company</h2>
              <div className="space-y-6 text-gray-400">
                <div>
                  <h4 className="text-white font-bold mb-1">Location</h4>
                  <p>KILIMANI</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-6 text-gray-400 mt-16 md:text-right">
                <div>
                  <h4 className="text-white font-bold mb-1">Phone</h4>
                  <p>+254 799 302 067</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <p>mauriceking@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">King's</span>
            <span className="text-2xl font-light text-[#A37238]">Estate Globe</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 King's Estate Globe. All rights reserved.</p>
        </div>
      </section>

    </main>
  );
}
