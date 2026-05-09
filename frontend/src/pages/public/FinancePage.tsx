import { useState } from 'react';
import { BadgeIndianRupee, CheckCircle2, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Select } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useSubmitFinance } from '../../hooks/useLeads';

const schema = z.object({
  customerName: z.string().min(2, 'Enter your name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email').or(z.literal('')).optional(),
  city: z.string().optional(),
  loanAmount: z.coerce.number().min(50000, 'Minimum loan amount is ₹50,000'),
  monthlyIncome: z.coerce.number().min(10000, 'Enter monthly income'),
});

type FormData = z.infer<typeof schema>;

const benefits = [
  'Loan approval in 24-48 hours',
  'Competitive interest rates starting at 7.5%',
  'Flexible tenure up to 84 months',
  'Minimal documentation required',
  'No hidden charges',
  'All banks & NBFCs covered',
];

export function FinancePage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitFinance();

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
            <h1 className="font-primary font-bold text-3xl">Car Finance</h1>
          </div>
          <p className="text-gray-400 font-secondary">Easy car loans with competitive interest rates.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Benefits */}
          <div>
            <h2 className="font-primary font-bold text-[#111827] text-2xl mb-6">Why Choose Our Finance?</h2>
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
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '7.5%', label: 'Starting Rate' },
                { value: '84', label: 'Max Months' },
                { value: '24h', label: 'Approval Time' },
                { value: '100+', label: 'Lenders' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 text-center shadow-card">
                  <p className="font-primary font-bold text-[#F47A20] text-2xl">{value}</p>
                  <p className="text-[#6B7280] font-secondary text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center shadow-card">
                <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
                <h2 className="font-primary font-bold text-[#111827] text-xl">Application Submitted!</h2>
                <p className="text-[#6B7280] font-secondary mt-2">
                  Our finance team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-card">
                <h3 className="font-primary font-semibold text-[#111827] text-lg mb-5">Apply for Car Loan</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input label="Your Name *" {...register('customerName')} placeholder="Rahul Sharma" error={errors.customerName?.message} />
                  <Input label="Phone Number *" {...register('phone')} placeholder="9999890667" error={errors.phone?.message} />
                  <Input label="Email (optional)" type="email" {...register('email')} placeholder="rahul@email.com" error={errors.email?.message} />
                  <Input label="Your City" {...register('city')} placeholder="Mumbai" />
                  <Input label="Loan Amount (₹) *" type="number" {...register('loanAmount')} placeholder="500000" error={errors.loanAmount?.message} />
                  <Input label="Monthly Income (₹) *" type="number" {...register('monthlyIncome')} placeholder="50000" error={errors.monthlyIncome?.message} />
                  <Button type="submit" loading={isPending} className="w-full">
                    <BadgeIndianRupee size={16} /> Apply Now
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
