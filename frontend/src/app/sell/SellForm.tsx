'use client';

import { useState } from 'react';

export default function SellForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/inquiries/seller-requests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-[#A37238]">Thank You!</h3>
        <p className="text-gray-300 mt-2">Your request has been submitted. We will contact you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Name</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-[#111216] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-[#A37238]"
          placeholder="Your Name"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Phone Number</label>
        <input 
          type="tel" 
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full bg-[#111216] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-[#A37238]"
          placeholder="+254 7XX XXX XXX"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Email Address</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-[#111216] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-[#A37238]"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Property Details</label>
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full bg-[#111216] border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-[#A37238]"
          placeholder="Tell us about your property (Location, Size, Type)"
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#A37238] hover:bg-[#c48a4e] text-white font-bold py-4 rounded uppercase tracking-widest transition disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Request a Quote'}
      </button>
    </form>
  );
}
