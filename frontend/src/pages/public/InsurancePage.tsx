import { useState } from 'react';
import { ShieldCheck, CheckCircle2, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Select } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useSubmitInsurance } from '../../hooks/useLeads';

const schema = z.object({
  customerName: z.string().min(2, 'Enter your name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email().or(z.literal('')).optional(),
  registrationNumber: z.string().optional(),
  insuranceType: z.enum(['new', 'renewal', 'used_car_transfer']),
  city: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const types = [
  { value: 'new', label: 'New Car Insurance' },
  { value: 'renewal', label: 'Policy Renewal' },
  { value: 'used_car_transfer', label: 'Used Car Transfer' },
];

const benefits = [
  'Instant quotes from 15+ insurers',
  'Comprehensive & third-party cover',
  'Cashless claims at 4000+ garages',
  'Zero depreciation add-on available',
  'Hassle-free claim support',
  'Best rates guaranteed',
];

export function InsurancePage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitInsurance();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { insuranceType: 'renewal' },
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
              <ShieldCheck size={20} className="text-white" />
            </div>
            <h1 className="font-primary font-bold text-3xl">Car Insurance</h1>
          </div>
          <p className="text-gray-400 font-secondary">Best insurance plans for new, renewal & used car transfers.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Benefits */}
          <div>
            <h2 className="font-primary font-bold text-[#111827] text-2xl mb-6">Why Insure with Us?</h2>
            <div className="space-y-3 mb-8">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span className="text-[#111827] font-secondary text-sm">{b}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '15+', label: 'Insurers' },
                { value: '4000+', label: 'Garages' },
                { value: '24/7', label: 'Claim Support' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 text-center shadow-card">
                  <p className="font-primary font-bold text-[#F47A20] text-xl">{value}</p>
                  <p className="text-[#6B7280] font-secondary text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center shadow-card">
                <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
                <h2 className="font-primary font-bold text-[#111827] text-xl">Enquiry Submitted!</h2>
                <p className="text-[#6B7280] font-secondary mt-2">
                  Our insurance team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-card">
                <h3 className="font-primary font-semibold text-[#111827] text-lg mb-5">Get Insurance Quote</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input label="Your Name *" {...register('customerName')} placeholder="Rahul Sharma" error={errors.customerName?.message} />
                  <Input label="Phone Number *" {...register('phone')} placeholder="9999890667" error={errors.phone?.message} />
                  <Input label="Email (optional)" type="email" {...register('email')} placeholder="rahul@email.com" />
                  <Select label="Insurance Type *" {...register('insuranceType')} error={errors.insuranceType?.message}>
                    {types.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                  </Select>
                  <Input label="Registration Number (if existing)" {...register('registrationNumber')} placeholder="MH01AB1234" />
                  <Input label="City" {...register('city')} placeholder="Mumbai" />
                  <Button type="submit" loading={isPending} className="w-full">
                    <ShieldCheck size={16} /> Get Quote
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
