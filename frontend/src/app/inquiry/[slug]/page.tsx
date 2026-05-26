'use client'; // Client component for form handling

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import api, { BASE_URL } from '@/lib/api';
import { Property } from '@/types';

export default function InquiryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      api.get(`/properties/${slug}/`).then(res => setProperty(res.data));
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send inquiry to Django backend
      await api.post('/inquiries/', {
        ...formData,
        property: property?.id
      });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error("Error submitting inquiry", error);
      alert("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!property) return <div className="min-h-screen bg-[#111216] text-white flex items-center justify-center">Loading...</div>;

  const imageUrl = property.main_image
    ? (property.main_image.startsWith('http') ? property.main_image : BASE_URL + property.main_image)
    : 'https://via.placeholder.com/800x1000';

  return (
    <main className="min-h-screen bg-[#111216] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-[#A37238] uppercase tracking-wider text-center">Make an Enquiry</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Side: Property Image */}
          <div className="relative h-[500px] md:h-[700px] rounded-lg overflow-hidden shadow-xl">
            <Image 
              src={imageUrl} 
              alt={property.title} 
              fill 
              className="object-cover"
              unoptimized={true}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
              <h2 className="text-2xl font-bold text-white">{property.title}</h2>
              <p className="text-[#A37238] font-bold">
                {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(parseFloat(property.price))}
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-[#1a1b1e] p-8 rounded-lg shadow-xl border border-gray-800">
            {success ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-[#A37238] mb-2">Thank You!</h3>
                <p className="text-gray-300">Your inquiry has been submitted successfully. We will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#111216] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-[#A37238]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#111216] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-[#A37238]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#111216] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-[#A37238]"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#111216] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-[#A37238]"
                    placeholder="I am interested in this property..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#A37238] hover:bg-[#c48a4e] text-white font-bold py-4 rounded uppercase tracking-wider transition disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
