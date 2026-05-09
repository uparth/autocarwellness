import { Car, ShieldCheck, BadgeIndianRupee, Wrench, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero */}
      <div className="bg-[#050505] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-[#F47A20] rounded-full flex items-center justify-center mx-auto mb-5">
            <Car size={32} className="text-white" />
          </div>
          <h1 className="font-primary font-bold text-4xl md:text-5xl mb-4">About Autocarwellness</h1>
          <p className="text-gray-400 font-secondary text-lg max-w-2xl mx-auto">
            Your trusted partner for everything automobile — buying, selling, finance, insurance, and car care.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Mission */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 md:p-12 shadow-card mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-primary font-bold text-[#111827] text-3xl mb-4">Our Mission</h2>
            <p className="text-[#6B7280] font-secondary text-lg leading-relaxed">
              To make the automobile experience simple, transparent, and trustworthy for every Indian customer.
              We bring together the best cars, finance, insurance, and car care services under one trusted platform.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { icon: ShieldCheck, title: 'Trust & Transparency', desc: 'Every car is inspected and priced fairly. No hidden charges.' },
            { icon: CheckCircle2, title: 'Quality Assurance', desc: 'All cars undergo thorough inspection before listing.' },
            { icon: BadgeIndianRupee, title: 'Best Value', desc: 'Competitive pricing on cars, finance, and insurance.' },
            { icon: Wrench, title: 'Expert Care', desc: 'Certified mechanics for all your car service needs.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card text-center">
              <div className="w-12 h-12 bg-[#FFF7ED] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon size={22} className="text-[#F47A20]" />
              </div>
              <h3 className="font-primary font-semibold text-[#111827] mb-2">{title}</h3>
              <p className="text-[#6B7280] font-secondary text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-[#050505] text-white rounded-2xl p-8 md:p-12 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Cars Sold' },
              { value: '200+', label: 'Happy Customers' },
              { value: '5+', label: 'Years of Trust' },
              { value: '100%', label: 'Transparency' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-primary font-bold text-[#F47A20] text-4xl">{value}</p>
                <p className="text-gray-400 font-secondary mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-primary font-bold text-[#111827] text-2xl mb-4">Ready to Get Started?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/cars" className="btn-primary inline-flex">Browse Cars</Link>
            <Link to="/contact" className="btn-secondary inline-flex">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
