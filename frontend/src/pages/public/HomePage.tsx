import { Link } from 'react-router-dom';
import {
  Car, BadgeIndianRupee, ShieldCheck, Wrench, ArrowRight,
  CheckCircle2, Phone, MessageCircle, Star,
} from 'lucide-react';
import { useCars } from '../../hooks/useCars';
import { CardSkeleton } from '../../components/common/Loader';
import type { Car as CarType } from '../../lib/types';

function HeroSection() {
  return (
    <section className="bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="inline-block bg-[#F47A20]/20 text-[#F47A20] text-sm font-semibold font-primary px-3 py-1 rounded-full mb-4">
            Trusted Automobile Platform
          </span>
          <h1 className="font-primary font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            Buy, Sell &{' '}
            <span className="text-[#F47A20]">Maintain</span>{' '}
            Your Car
          </h1>
          <p className="mt-5 text-gray-400 text-lg md:text-xl font-secondary leading-relaxed max-w-xl">
            Trusted automobile solutions for cars, finance, insurance and car care — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/cars" className="inline-flex items-center gap-2 bg-[#F47A20] hover:bg-[#D96513] text-white font-semibold font-primary rounded-[10px] h-12 px-6 transition-colors">
              <Car size={18} /> Browse Cars
            </Link>
            <Link to="/sell-car" className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold font-primary rounded-[10px] h-12 px-6 transition-colors">
              Sell Your Car <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/919999890667"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold font-primary rounded-[10px] h-12 px-6 transition-colors"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Car,
    title: 'Buy a Car',
    description: 'Browse our wide selection of certified pre-owned and new cars.',
    to: '/cars',
    cta: 'Browse Cars',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Sell Your Car',
    description: 'Get the best price for your car. Quick valuation and hassle-free process.',
    to: '/sell-car',
    cta: 'Sell Now',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Car Finance',
    description: 'Easy loan approvals with competitive interest rates for your dream car.',
    to: '/finance',
    cta: 'Apply Now',
  },
  {
    icon: ShieldCheck,
    title: 'Car Insurance',
    description: 'Comprehensive and third-party insurance at the best rates.',
    to: '/insurance',
    cta: 'Get Quote',
  },
  {
    icon: Wrench,
    title: 'Denting & Painting',
    description: 'Professional denting, painting, and body repair for your vehicle.',
    to: '/services',
    cta: 'Book Now',
  },
  {
    icon: Wrench,
    title: 'Repair & Maintenance',
    description: 'Certified mechanics for all types of car repairs and regular maintenance.',
    to: '/services',
    cta: 'Book Service',
  },
];

function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-primary font-bold text-[#111827] text-3xl md:text-4xl">Our Services</h2>
          <p className="mt-3 text-[#6B7280] font-secondary text-lg">
            Everything you need for your automobile — under one roof.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, to, cta }) => (
            <div
              key={title}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:border-[#F47A20]/30 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-[#FFF7ED] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F47A20] transition-colors">
                <Icon size={22} className="text-[#F47A20] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-primary font-semibold text-[#111827] text-lg mb-2">{title}</h3>
              <p className="text-[#6B7280] font-secondary text-sm leading-relaxed mb-4">{description}</p>
              <Link
                to={to}
                className="inline-flex items-center gap-1 text-[#F47A20] font-semibold font-primary text-sm hover:gap-2 transition-all"
              >
                {cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCarsSection() {
  const { data: cars, isLoading } = useCars({ status: 'available', pageSize: 6 });

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-primary font-bold text-[#111827] text-3xl md:text-4xl">Featured Cars</h2>
            <p className="mt-2 text-[#6B7280] font-secondary">Handpicked cars from our latest inventory</p>
          </div>
          <Link
            to="/cars"
            className="hidden sm:inline-flex items-center gap-1 text-[#F47A20] font-semibold font-primary text-sm hover:gap-2 transition-all"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : (cars ?? []).slice(0, 6).map((car) => <CarCard key={car.id} car={car} />)}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/cars" className="btn-outline inline-flex">
            View All Cars <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CarCard({ car }: { car: CarType }) {
  const primaryImage = car.images?.find((i) => i.isPrimary) ?? car.images?.[0];
  return (
    <Link
      to={`/cars/${car.id}`}
      className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="h-48 bg-gray-100 overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage.imageUrl}
            alt={car.carName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car size={48} className="text-gray-300" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-primary font-semibold text-[#111827] text-base leading-tight">{car.carName}</h3>
            <p className="text-[#6B7280] text-sm font-secondary mt-0.5">{car.carCompany} · {car.carManufactureYear}</p>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-secondary flex-shrink-0 ${
            car.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {car.status === 'available' ? 'Available' : 'Sold'}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-[#6B7280] font-secondary">
          <span>{Number(car.kmsDriven).toLocaleString()} km</span>
          <span>{car.carFuelType}</span>
          <span>{car.transmission}</span>
        </div>
        <p className="mt-3 font-primary font-bold text-[#111827] text-lg">
          ₹{Number(car.expectedPrice).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

const whyPoints = [
  'Verified & inspected cars with report',
  'Transparent pricing, no hidden charges',
  'OTP-based secure login — no passwords',
  'Finance & insurance under one roof',
  'Expert repair, denting & painting services',
  'Trusted by hundreds of customers across India',
];

function WhyUsSection() {
  return (
    <section className="py-16 bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-primary font-bold text-3xl md:text-4xl mb-4">
              Why Choose <span className="text-[#F47A20]">Autocarwellness</span>?
            </h2>
            <p className="text-gray-400 font-secondary leading-relaxed mb-8">
              We combine automobile buying, selling, finance, insurance, and car care into one trusted platform — built for Indian customers.
            </p>
            <div className="space-y-3">
              {whyPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#F47A20] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 font-secondary text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Cars Sold' },
              { value: '200+', label: 'Happy Customers' },
              { value: '5+', label: 'Years Experience' },
              { value: '100%', label: 'Transparent' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="font-primary font-bold text-[#F47A20] text-3xl">{value}</p>
                <p className="text-gray-400 font-secondary text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: 'Rahul Sharma', city: 'Mumbai', text: 'Found my dream car at a great price. The OTP login was super smooth and the team was very helpful.', rating: 5 },
    { name: 'Priya Mehta', city: 'Delhi', text: 'Got the best deal on my car insurance through Autocarwellness. Highly recommended!', rating: 5 },
    { name: 'Amit Patel', city: 'Ahmedabad', text: 'Sold my old car quickly. The process was transparent and I got a fair price.', rating: 5 },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-primary font-bold text-[#111827] text-3xl md:text-4xl">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, city, text, rating }) => (
            <div key={name} className="bg-[#F5F5F5] border border-[#E5E7EB] rounded-2xl p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#F47A20] text-[#F47A20]" />
                ))}
              </div>
              <p className="text-[#111827] font-secondary text-sm leading-relaxed mb-4">"{text}"</p>
              <div>
                <p className="font-primary font-semibold text-[#111827] text-sm">{name}</p>
                <p className="text-[#6B7280] text-xs font-secondary">{city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="py-12 bg-[#F47A20]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <h2 className="font-primary font-bold text-white text-2xl md:text-3xl mb-3">
          Ready to Find Your Next Car?
        </h2>
        <p className="text-white/80 font-secondary mb-6">
          Browse available cars or contact us on WhatsApp for quick help.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 bg-white text-[#F47A20] hover:bg-gray-100 font-semibold font-primary rounded-[10px] h-11 px-6 transition-colors"
          >
            <Car size={18} /> Browse Cars
          </Link>
          <a
            href="tel:+919999890667"
            className="inline-flex items-center gap-2 bg-[#050505] text-white hover:bg-[#222] font-semibold font-primary rounded-[10px] h-11 px-6 transition-colors"
          >
            <Phone size={18} /> Call Now
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedCarsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
