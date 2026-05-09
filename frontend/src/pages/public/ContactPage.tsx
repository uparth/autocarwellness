import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Textarea } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useSubmitContact } from '../../hooks/useLeads';

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email().or(z.literal('')).optional(),
  message: z.string().min(10, 'Enter a message (min 10 characters)'),
});

type FormData = z.infer<typeof schema>;

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitContact();

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
          <h1 className="font-primary font-bold text-3xl">Contact Us</h1>
          <p className="text-gray-400 font-secondary mt-1">We're here to help. Reach out anytime.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
              <h2 className="font-primary font-semibold text-[#111827] text-lg mb-5">Get in Touch</h2>
              <div className="space-y-4">
                <a href="tel:+919999890667" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[#FFF7ED] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#F47A20] transition-colors">
                    <Phone size={18} className="text-[#F47A20] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] font-secondary">Phone</p>
                    <p className="font-medium text-[#111827] font-secondary">+91 99998 90667</p>
                  </div>
                </a>
                <a href="mailto:info@autocarwellness.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[#FFF7ED] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#F47A20] transition-colors">
                    <Mail size={18} className="text-[#F47A20] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] font-secondary">Email</p>
                    <p className="font-medium text-[#111827] font-secondary">info@autocarwellness.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FFF7ED] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#F47A20]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] font-secondary">Location</p>
                    <p className="font-medium text-[#111827] font-secondary">India</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919999890667"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold font-primary rounded-2xl p-5 transition-colors"
            >
              <MessageCircle size={24} />
              <div>
                <p className="text-base">Chat on WhatsApp</p>
                <p className="text-sm font-normal opacity-80">Fastest response — usually within minutes</p>
              </div>
            </a>

            <div className="bg-[#FFF7ED] border border-[#F47A20]/20 rounded-2xl p-5">
              <p className="font-primary font-semibold text-[#111827] mb-1">Business Hours</p>
              <p className="text-[#6B7280] font-secondary text-sm">Monday – Saturday: 9:00 AM – 7:00 PM</p>
              <p className="text-[#6B7280] font-secondary text-sm">Sunday: 10:00 AM – 4:00 PM</p>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center shadow-card">
                <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
                <h2 className="font-primary font-bold text-[#111827] text-xl">Message Sent!</h2>
                <p className="text-[#6B7280] font-secondary mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-card">
                <h3 className="font-primary font-semibold text-[#111827] text-lg mb-5">Send a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input label="Your Name *" {...register('name')} placeholder="Rahul Sharma" error={errors.name?.message} />
                  <Input label="Phone Number *" {...register('phone')} placeholder="9999890667" error={errors.phone?.message} />
                  <Input label="Email (optional)" type="email" {...register('email')} placeholder="rahul@email.com" error={errors.email?.message} />
                  <Textarea label="Message *" {...register('message')} rows={4} placeholder="How can we help you?" error={errors.message?.message} />
                  <Button type="submit" loading={isPending} className="w-full">Send Message</Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
