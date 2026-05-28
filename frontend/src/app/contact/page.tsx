import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Section (Top Image with Title) */}
      <div className="relative h-64 md:h-96 w-full">
        {/* Local Image from public/images/contact-hero.jpg */}
        <Image 
          src="/images/contact-hero.jpg" 
          alt="Modern House" 
          fill
          className="object-cover"
          priority // Loads this image first as it's at the top
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase">
            Contact Us
          </h1>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Top Grid: Contact Info & Working Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side: Contact Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 tracking-wide">
              Contact Us
            </h2>
            
            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Location</h3>
                  <p className="text-gray-600">KILIMANI</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Phone</h3>
                  <p className="text-gray-600">+254 799 302067</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Email</h3>
                  <p className="text-gray-600">mauriciking@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Working Hours */}
          <div className="md:border-l md:border-gray-200 md:pl-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 tracking-wide">
              Working Hours
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Mon - Fri</span>
                <span className="text-gray-800 font-semibold">8:30 AM — 9:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Weekends</span>
                <span className="text-red-500 font-semibold">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Grid: Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Office Interior Image */}
          <div className="h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg relative">
            <Image 
              src="/images/office-space.jpg" 
              alt="Office Space" 
              fill
              className="object-cover"
            />
          </div>

          {/* Map Image Placeholder */}
          <div className="h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg bg-gray-200 relative">
            <Image 
              src="/images/map-placeholder.jpg" 
              alt="Map Location" 
              fill
              className="object-cover"
            />
          </div>
          
        </div>

      </div>
    </div>
  );
}