import { useState } from 'react';
import { Wrench, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Select, Textarea } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useSubmitService } from '../../hooks/useLeads';

const schema = z.object({
  customerName: z.string().min(2, 'Enter your name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email().or(z.literal('')).optional(),
  serviceType: z.enum(['repair', 'maintenance', 'denting', 'painting']),
  carCompany: z.string().optional(),
  carModel: z.string().optional(),
  description: z.string().optional(),
  preferredDate: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const serviceTypes = [
  { value: 'repair', label: 'Repair', icon: '🔧', desc: 'Engine, electrical, AC, and mechanical repairs.' },
  { value: 'maintenance', label: 'Maintenance', icon: '⚙️', desc: 'Oil change, filter replacement, periodic service.' },
  { value: 'denting', label: 'Denting', icon: '🔨', desc: 'Dent removal, panel beating, and body work.' },
  { value: 'painting', label: 'Painting', icon: '🎨', desc: 'Full body painting, spot painting, and polish.' },
];

export function ServicesPage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitService();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { serviceType: 'maintenance' },
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
              <Wrench size={20} className="text-white" />
            </div>
            <h1 className="font-primary font-bold text-3xl">Car Services</h1>
          </div>
          <p className="text-gray-400 font-secondary">Expert repair, maintenance, denting & painting services.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Service types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {serviceTypes.map(({ value, label, icon, desc }) => (
            <div key={value} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-card text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <h3 className="font-primary font-semibold text-[#111827] text-sm">{label}</h3>
              <p className="text-[#6B7280] text-xs font-secondary mt-1">{desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center shadow-card">
              <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
              <h2 className="font-primary font-bold text-[#111827] text-xl">Booking Submitted!</h2>
              <p className="text-[#6B7280] font-secondary mt-2">
                Our team will call you within 2 hours to confirm your service appointment.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-card">
              <h3 className="font-primary font-semibold text-[#111827] text-lg mb-5">Book a Service</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Your Name *" {...register('customerName')} placeholder="Rahul Sharma" error={errors.customerName?.message} />
                  <Input label="Phone Number *" {...register('phone')} placeholder="9999890667" error={errors.phone?.message} />
                  <Input label="Email (optional)" type="email" {...register('email')} placeholder="rahul@email.com" />
                  <Select label="Service Type *" {...register('serviceType')} error={errors.serviceType?.message}>
                    {serviceTypes.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                  </Select>
                  <Input label="Car Brand" {...register('carCompany')} placeholder="Maruti Suzuki" />
                  <Input label="Car Model" {...register('carModel')} placeholder="Swift, Creta..." />
                  <Input label="Preferred Date" type="date" {...register('preferredDate')} />
                </div>
                <Textarea label="Describe the issue" {...register('description')} rows={3} placeholder="Describe what needs to be fixed or serviced..." />
                <Button type="submit" loading={isPending} className="w-full">
                  <Wrench size={16} /> Book Service
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
