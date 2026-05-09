import { useState } from 'react';
import { BadgeIndianRupee, Car, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Select, Textarea } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useSubmitSellCar } from '../../hooks/useLeads';

const schema = z.object({
  customerName: z.string().min(2, 'Enter your name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email').or(z.literal('')).optional(),
  city: z.string().optional(),
  carCompany: z.string().min(1, 'Select car brand'),
  carModel: z.string().min(1, 'Enter car model'),
  manufactureYear: z.coerce.number().min(1990).max(new Date().getFullYear()),
  kmsDriven: z.coerce.number().min(0, 'Enter kms driven'),
  fuelType: z.string().min(1, 'Select fuel type'),
  expectedPrice: z.coerce.number().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function SellCarPage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitSellCar();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data, { onSuccess: () => setSubmitted(true) });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#050505] text-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#F47A20] rounded-xl flex items-center justify-center">
              <BadgeIndianRupee size={20} className="text-white" />
            </div>
            <h1 className="font-primary font-bold text-3xl">Sell Your Car</h1>
          </div>
          <p className="text-gray-400 font-secondary">Get the best price for your car. Fill in the details below.</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
        {submitted ? (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center shadow-card">
            <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
            <h2 className="font-primary font-bold text-[#111827] text-2xl">Request Submitted!</h2>
            <p className="text-[#6B7280] font-secondary mt-2">
              Our team will contact you within 24 hours to schedule an inspection.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Your Name *" {...register('customerName')} placeholder="Rahul Sharma" error={errors.customerName?.message} />
                <Input label="Phone Number *" {...register('phone')} placeholder="9999890667" error={errors.phone?.message} />
                <Input label="Email (optional)" type="email" {...register('email')} placeholder="rahul@email.com" />
                <Input label="Your City" {...register('city')} placeholder="Mumbai" />
              </div>
              <hr className="border-[#E5E7EB]" />
              <h3 className="font-primary font-semibold text-[#111827]">Car Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select label="Car Brand *" {...register('carCompany')} error={errors.carCompany?.message}>
                  <option value="">Select Brand</option>
                  {['Maruti Suzuki','Hyundai','Tata','Honda','Toyota','Mahindra','Kia','Ford','MG','BMW','Mercedes','Audi','Other'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </Select>
                <Input label="Car Model *" {...register('carModel')} placeholder="Swift, Creta, Nexon..." error={errors.carModel?.message} />
                <Input label="Manufacture Year *" type="number" {...register('manufactureYear')} placeholder="2019" error={errors.manufactureYear?.message} />
                <Input label="KMs Driven *" type="number" {...register('kmsDriven')} placeholder="45000" error={errors.kmsDriven?.message} />
                <Select label="Fuel Type *" {...register('fuelType')} error={errors.fuelType?.message}>
                  <option value="">Select Fuel Type</option>
                  {['Petrol','Diesel','Electric','Hybrid','CNG'].map(f => <option key={f} value={f}>{f}</option>)}
                </Select>
                <Input label="Expected Price (₹)" type="number" {...register('expectedPrice')} placeholder="350000" />
              </div>
              <Textarea label="Additional Details" {...register('description')} rows={3} placeholder="Any additional information about your car..." />
              <Button type="submit" loading={isPending} className="w-full">
                <Car size={16} /> Submit Sell Request
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
