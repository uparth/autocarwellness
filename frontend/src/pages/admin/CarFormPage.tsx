import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useCar } from '../../hooks/useCars';
import { useDealers } from '../../hooks/useDealers';
import { Input, Select, Textarea } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import api from '../../lib/api';

const schema = z.object({
  carName: z.string().min(2, 'Enter car name'),
  carCompany: z.string().min(1, 'Select brand'),
  carFuelType: z.string().min(1, 'Select fuel type'),
  carManufactureYear: z.coerce.number().min(1990).max(new Date().getFullYear()),
  carVariant: z.string().optional(),
  kmsDriven: z.coerce.number().min(0),
  transmission: z.string().min(1, 'Select transmission'),
  color: z.string().optional(),
  expectedPrice: z.coerce.number().min(1000, 'Enter price'),
  numberOfOwners: z.coerce.number().min(1).max(10),
  dealerId: z.string().min(1, 'Select dealer'),
  carRegistrationNumber: z.string().optional(),
  carRegistrationDate: z.string().optional(),
  carRegistrationState: z.string().optional(),
  insuranceValidUpto: z.string().optional(),
  status: z.enum(['available', 'sold']),
});

type FormData = z.infer<typeof schema>;

const brands = ['Maruti Suzuki','Hyundai','Tata','Honda','Toyota','Mahindra','Kia','Ford','MG','BMW','Mercedes','Audi','Other'];

export function CarFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: car, isLoading: carLoading } = useCar(id ?? '');
  const { data: dealers, isLoading: dealersLoading } = useDealers();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'available', numberOfOwners: 1 },
  });

  useEffect(() => {
    if (car && isEdit) {
      reset({
        carName: car.carName,
        carCompany: car.carCompany,
        carFuelType: car.carFuelType,
        carManufactureYear: car.carManufactureYear,
        carVariant: car.carVariant ?? '',
        kmsDriven: car.kmsDriven,
        transmission: car.transmission,
        color: car.color ?? '',
        expectedPrice: car.expectedPrice,
        numberOfOwners: car.numberOfOwners,
        dealerId: car.dealerId,
        carRegistrationNumber: car.carRegistrationNumber ?? '',
        carRegistrationDate: car.carRegistrationDate?.slice(0, 10) ?? '',
        carRegistrationState: car.carRegistrationState ?? '',
        insuranceValidUpto: car.insuranceValidUpto?.slice(0, 10) ?? '',
        status: car.status,
      });
    }
  }, [car, isEdit, reset]);

  const onSubmit = async (data: FormData) => {
    if (isEdit) {
      await api.put(`/cars/${id}`, data);
    } else {
      await api.post('/cars', data);
    }
    navigate('/admin/cars');
  };

  if (isEdit && carLoading) return <Loader />;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/cars" className="p-2 rounded-xl hover:bg-[#E5E7EB] transition-colors">
          <ArrowLeft size={20} className="text-[#6B7280]" />
        </Link>
        <div>
          <h1 className="font-primary font-bold text-[#111827] text-2xl">{isEdit ? 'Edit Car' : 'Add New Car'}</h1>
          <p className="text-[#6B7280] font-secondary text-sm mt-0.5">{isEdit ? `Editing: ${car?.carName}` : 'Fill in the car details below'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
              <h2 className="font-primary font-semibold text-[#111827] mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Car Name *" {...register('carName')} placeholder="Swift VXI, Creta SX..." error={errors.carName?.message} />
                <Select label="Brand *" {...register('carCompany')} error={errors.carCompany?.message}>
                  <option value="">Select Brand</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </Select>
                <Input label="Variant" {...register('carVariant')} placeholder="VXI, ZXI, SX..." />
                <Input label="Color" {...register('color')} placeholder="White, Black, Silver..." />
                <Input label="Manufacture Year *" type="number" {...register('carManufactureYear')} placeholder="2019" error={errors.carManufactureYear?.message} />
                <Input label="KMs Driven *" type="number" {...register('kmsDriven')} placeholder="45000" error={errors.kmsDriven?.message} />
                <Select label="Fuel Type *" {...register('carFuelType')} error={errors.carFuelType?.message}>
                  <option value="">Select Fuel Type</option>
                  {['Petrol','Diesel','Electric','Hybrid','CNG'].map(f => <option key={f} value={f}>{f}</option>)}
                </Select>
                <Select label="Transmission *" {...register('transmission')} error={errors.transmission?.message}>
                  <option value="">Select</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </Select>
                <Input label="Number of Owners *" type="number" {...register('numberOfOwners')} placeholder="1" error={errors.numberOfOwners?.message} />
                <Input label="Expected Price (₹) *" type="number" {...register('expectedPrice')} placeholder="350000" error={errors.expectedPrice?.message} />
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
              <h2 className="font-primary font-semibold text-[#111827] mb-4">Registration & Insurance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Registration Number" {...register('carRegistrationNumber')} placeholder="MH01AB1234" />
                <Input label="Registration Date" type="date" {...register('carRegistrationDate')} />
                <Input label="Registration State" {...register('carRegistrationState')} placeholder="Maharashtra" />
                <Input label="Insurance Valid Upto" type="date" {...register('insuranceValidUpto')} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
              <h2 className="font-primary font-semibold text-[#111827] mb-4">Status & Dealer</h2>
              <div className="space-y-4">
                <Select label="Status *" {...register('status')} error={errors.status?.message}>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </Select>
                <Select label="Dealer *" {...register('dealerId')} error={errors.dealerId?.message}>
                  <option value="">{dealersLoading ? 'Loading...' : 'Select Dealer'}</option>
                  {(dealers ?? []).map(d => (
                    <option key={d.id} value={d.id}>{d.dealerName}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" loading={isSubmitting} className="w-full">
                <Save size={16} /> {isEdit ? 'Save Changes' : 'Add Car'}
              </Button>
              <Link to="/admin/cars" className="btn-outline text-sm text-center w-full inline-block py-2.5 rounded-[10px] font-primary font-semibold">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
