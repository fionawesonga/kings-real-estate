import Link from 'next/link';

export default function Features() {
  const features = [
    { title: "Wide Range of Properties", icon: "🏠", description: "Explore apartments, villas, and commercial spaces." },
    { title: "Trusted by Thousands", icon: "🤝", description: "We have helped thousands find their dream home." },
    { title: "Financing Made Easy", icon: "💰", description: "Partnered with top banks for mortgage solutions." },
    { title: "Expert Agents", icon: "👨‍💼", description: "Professional guidance at every step of the way." },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">View New Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We provide the best service to make your property journey seamless and enjoyable.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition text-center border-t-4 border-indigo-500">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
