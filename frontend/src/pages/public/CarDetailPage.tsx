import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Car, Fuel, Gauge, Calendar, MapPin, Phone, MessageCircle,
  ChevronLeft, ChevronRight, Download, Heart, ArrowLeft,
  ShieldCheck, BadgeIndianRupee, CheckCircle2,
} from 'lucide-react';
import { useCar } from '../../hooks/useCars';
import { useSubmitInterest } from '../../hooks/useLeads';
import { useAuthStore } from '../../stores/authStore';
import { OtpLoginModal } from '../../components/Auth/OtpLoginModal';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loader } from '../../components/common/Loader';

function ImageGallery({ images, carName }: { images: { imageUrl: string; isPrimary: boolean }[]; carName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!images.length) {
    return (
      <div className="h-72 md:h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
        <Car size={64} className="text-gray-300" />
      </div>
    );
  }
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div>
      {/* Main image */}
      <div className="relative h-72 md:h-96 bg-gray-100 rounded-2xl overflow-hidden">
        <img
          src={images[activeIndex].imageUrl}
          alt={`${carName} ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-secondary px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex ? 'border-[#F47A20]' : 'border-transparent'
              }`}
            >
              <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InterestForm({ carId, onSuccess }: { carId: string; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '' });
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending, isError } = useSubmitInterest();

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    mutate({ carId, data: form }, {
      onSuccess: () => { setSubmitted(true); onSuccess(); },
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
        <p className="font-primary font-semibold text-[#111827]">Interest Submitted!</p>
        <p className="text-[#6B7280] text-sm font-secondary mt-1">We'll contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input label="Your Name *" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Rahul Sharma" required />
      <Input label="Phone Number *" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="9999890667" required />
      <Input label="Email (optional)" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="rahul@email.com" />
      <Input label="Your City" value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Mumbai" />
      {isError && <p className="text-sm text-[#E9342D] font-secondary">Failed to submit. Please try again.</p>}
      <Button type="submit" loading={isPending} className="w-full">Submit Interest</Button>
    </form>
  );
}

export function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: car, isLoading, isError } = useCar(id!);
  const { isAuthenticated } = useAuthStore();
  const [otpOpen, setOtpOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);

  if (isLoading) return <Loader fullPage />;
  if (isError || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Car size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="font-primary font-semibold text-[#111827]">Car not found</p>
          <Link to="/cars" className="text-[#F47A20] text-sm mt-2 inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  const handleInterestClick = () => {
    if (!isAuthenticated) {
      setOtpOpen(true);
    } else {
      setInterestOpen(true);
    }
  };

  const specs = [
    { icon: Calendar, label: 'Year', value: car.carManufactureYear },
    { icon: Gauge, label: 'KMs Driven', value: `${Number(car.kmsDriven).toLocaleString()} km` },
    { icon: Fuel, label: 'Fuel Type', value: car.carFuelType },
    { icon: Car, label: 'Transmission', value: car.transmission },
    { icon: Car, label: 'Variant', value: car.carVariant ?? '—' },
    { icon: Car, label: 'Owners', value: car.numberOfOwners },
    { icon: Car, label: 'Color', value: car.color ?? '—' },
    { icon: MapPin, label: 'Reg. State', value: car.carRegistrationState ?? '—' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-2 text-sm font-secondary text-[#6B7280]">
          <Link to="/" className="hover:text-[#F47A20]">Home</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-[#F47A20]">Cars</Link>
          <span>/</span>
          <span className="text-[#111827] font-medium truncate">{car.carName}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Image + Specs */}
          <div className="lg:col-span-2 space-y-6">
            <ImageGallery images={car.images ?? []} carName={car.carName} />

            {/* Car title */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-primary font-bold text-[#111827] text-2xl md:text-3xl">{car.carName}</h1>
                  <p className="text-[#6B7280] font-secondary mt-1">{car.carCompany} · {car.carVariant}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-secondary ${
                  car.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {car.status === 'available' ? 'Available' : 'Sold'}
                </span>
              </div>
              <p className="font-primary font-bold text-[#F47A20] text-3xl mt-4">
                ₹{Number(car.expectedPrice).toLocaleString()}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
              <h2 className="font-primary font-semibold text-[#111827] text-lg mb-4">Key Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#F5F5F5] rounded-xl p-3 text-center">
                    <Icon size={20} className="text-[#F47A20] mx-auto mb-1.5" />
                    <p className="text-xs text-[#6B7280] font-secondary">{label}</p>
                    <p className="font-primary font-semibold text-[#111827] text-sm mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration details */}
            {(car.carRegistrationNumber || car.carRegistrationDate || car.insuranceValidUpto) && (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
                <h2 className="font-primary font-semibold text-[#111827] text-lg mb-4">Registration & Insurance</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-secondary">
                  {car.carRegistrationNumber && (
                    <div><p className="text-[#6B7280]">Reg. Number</p><p className="font-medium text-[#111827] mt-0.5">{car.carRegistrationNumber}</p></div>
                  )}
                  {car.carRegistrationDate && (
                    <div><p className="text-[#6B7280]">Reg. Date</p><p className="font-medium text-[#111827] mt-0.5">{new Date(car.carRegistrationDate).toLocaleDateString('en-IN')}</p></div>
                  )}
                  {car.insuranceValidUpto && (
                    <div><p className="text-[#6B7280]">Insurance Valid</p><p className="font-medium text-[#111827] mt-0.5">{new Date(car.insuranceValidUpto).toLocaleDateString('en-IN')}</p></div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: CTA sidebar */}
          <div className="space-y-4">
            {/* Interest CTA */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
              <Button onClick={handleInterestClick} className="w-full mb-3" disabled={car.status === 'sold'}>
                {car.status === 'sold' ? 'Car Sold' : 'I am Interested'}
              </Button>
              <a
                href="tel:+919999890667"
                className="flex items-center justify-center gap-2 w-full h-11 border border-[#050505] text-[#111827] hover:bg-gray-50 font-semibold font-primary rounded-[10px] transition-colors text-sm mb-2"
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/919999890667?text=Hi, I'm interested in ${car.carName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 bg-green-500 hover:bg-green-600 text-white font-semibold font-primary rounded-[10px] transition-colors text-sm"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>

            {/* Report download */}
            {car.reportUrl && (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck size={20} className="text-[#F47A20]" />
                  <h3 className="font-primary font-semibold text-[#111827]">Inspection Report</h3>
                </div>
                <a
                  href={car.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-11 border border-[#F47A20] text-[#F47A20] hover:bg-[#FFF7ED] font-semibold font-primary rounded-[10px] transition-colors text-sm"
                >
                  <Download size={16} /> Download Report
                </a>
              </div>
            )}

            {/* Finance CTA */}
            <div className="bg-[#FFF7ED] border border-[#F47A20]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <BadgeIndianRupee size={18} className="text-[#F47A20]" />
                <h3 className="font-primary font-semibold text-[#111827]">Need Finance?</h3>
              </div>
              <p className="text-[#6B7280] text-sm font-secondary mb-3">Easy loans at competitive interest rates.</p>
              <Link to="/finance" className="btn-outline text-sm h-9 px-4 inline-flex">Apply for Loan</Link>
            </div>

            {/* Dealer info */}
            {car.dealer && (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-card">
                <h3 className="font-primary font-semibold text-[#111827] mb-3">Dealer Info</h3>
                <p className="font-medium text-[#111827] font-secondary text-sm">{car.dealer.dealerName}</p>
                {car.dealer.city && (
                  <p className="text-[#6B7280] text-xs font-secondary flex items-center gap-1 mt-1">
                    <MapPin size={11} /> {car.dealer.city}{car.dealer.state ? `, ${car.dealer.state}` : ''}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <OtpLoginModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onSuccess={() => { setOtpOpen(false); setInterestOpen(true); }}
      />
      <Modal open={interestOpen} onClose={() => setInterestOpen(false)} title="Show Interest">
        <InterestForm carId={id!} onSuccess={() => setTimeout(() => setInterestOpen(false), 2000)} />
      </Modal>
    </div>
  );
}
