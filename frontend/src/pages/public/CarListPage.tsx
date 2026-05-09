import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, SlidersHorizontal, X, Fuel, Gauge, Calendar } from 'lucide-react';
import { useCars } from '../../hooks/useCars';
import { Input, Select } from '../../components/common/Input';
import { CardSkeleton } from '../../components/common/Loader';
import type { Car as CarType } from '../../lib/types';

const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
const transmissions = ['Manual', 'Automatic'];
const brands = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Toyota', 'Mahindra', 'Ford', 'Kia', 'MG', 'BMW', 'Mercedes', 'Audi'];

interface Filters {
  search: string;
  fuelType: string;
  transmission: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
}

function CarCard({ car }: { car: CarType }) {
  const primaryImage = car.images?.find((i) => i.isPrimary) ?? car.images?.[0];
  return (
    <Link
      to={`/cars/${car.id}`}
      className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="h-44 bg-gray-100 overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage.imageUrl}
            alt={car.carName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car size={40} className="text-gray-300" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-primary font-semibold text-[#111827] text-sm leading-tight truncate">{car.carName}</h3>
            <p className="text-[#6B7280] text-xs font-secondary mt-0.5">{car.carCompany}</p>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-secondary flex-shrink-0 ${
            car.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {car.status === 'available' ? 'Available' : 'Sold'}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5 text-xs text-[#6B7280] font-secondary">
          <span className="flex items-center gap-1"><Calendar size={11} />{car.carManufactureYear}</span>
          <span className="flex items-center gap-1"><Gauge size={11} />{Number(car.kmsDriven).toLocaleString()} km</span>
          <span className="flex items-center gap-1"><Fuel size={11} />{car.carFuelType}</span>
        </div>
        <p className="mt-3 font-primary font-bold text-[#111827] text-base">
          ₹{Number(car.expectedPrice).toLocaleString()}
        </p>
        {car.dealer?.city && (
          <p className="text-xs text-[#6B7280] font-secondary mt-1">{car.dealer.city}</p>
        )}
      </div>
    </Link>
  );
}

export function CarListPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '', fuelType: '', transmission: '', brand: '', minPrice: '', maxPrice: '',
  });

  const { data: cars, isLoading, isError } = useCars({
    search: filters.search || undefined,
    fuelType: filters.fuelType || undefined,
    transmission: filters.transmission || undefined,
    brand: filters.brand || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    status: 'available',
  });

  const set = (key: keyof Filters, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const clearFilters = () => setFilters({ search: '', fuelType: '', transmission: '', brand: '', minPrice: '', maxPrice: '' });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Page header */}
      <div className="bg-[#050505] text-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="font-primary font-bold text-3xl">Available Cars</h1>
          <p className="text-gray-400 font-secondary mt-1">
            {isLoading ? 'Loading...' : `${cars?.length ?? 0} cars available`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        {/* Search + Filter toggle */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, brand, model..."
              value={filters.search}
              onChange={(e) => set('search', e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 h-11 rounded-[10px] border font-semibold font-primary text-sm transition-colors flex-shrink-0 ${
              showFilters || activeFilterCount > 0
                ? 'bg-[#F47A20] border-[#F47A20] text-white'
                : 'bg-white border-[#D1D5DB] text-[#111827]'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-white text-[#F47A20] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 mb-5 shadow-card">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Select value={filters.fuelType} onChange={(e) => set('fuelType', e.target.value)}>
                <option value="">All Fuel Types</option>
                {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
              </Select>
              <Select value={filters.transmission} onChange={(e) => set('transmission', e.target.value)}>
                <option value="">Transmission</option>
                {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
              <Select value={filters.brand} onChange={(e) => set('brand', e.target.value)}>
                <option value="">All Brands</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </Select>
              <Input
                type="number"
                placeholder="Min Price (₹)"
                value={filters.minPrice}
                onChange={(e) => set('minPrice', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max Price (₹)"
                value={filters.maxPrice}
                onChange={(e) => set('maxPrice', e.target.value)}
              />
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-1 h-11 text-sm font-medium text-[#E9342D] hover:bg-red-50 rounded-[10px] transition-colors"
              >
                <X size={14} /> Clear All
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-secondary">Failed to load cars. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && (cars?.length ?? 0) === 0 && (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center">
            <Car size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="font-primary font-semibold text-[#111827] text-lg">No cars found</p>
            <p className="text-[#6B7280] font-secondary text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            : (cars ?? []).map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      </div>
    </div>
  );
}
