import { useState, useRef, useEffect } from 'react';
import { Phone, ArrowRight, RefreshCw } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useAuthStore } from '../../stores/authStore';

interface OtpLoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Step = 'mobile' | 'otp';

export function OtpLoginModal({ open, onClose, onSuccess }: OtpLoginModalProps) {
  const [step, setStep] = useState<Step>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { requestOtp, verifyOtp } = useAuthStore();

  useEffect(() => {
    if (!open) {
      setStep('mobile');
      setMobile('');
      setOtp(['', '', '', '', '', '']);
      setError('');
      setResendCooldown(0);
    }
  }, [open]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleRequestOtp = async () => {
    setError('');
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      await requestOtp(mobile);
      setStep('otp');
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpStr = otp.join('');
    if (otpStr.length < 6) {
      setError('Enter the complete 6-digit OTP.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await verifyOtp(mobile, otpStr);
      onSuccess?.();
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setLoading(true);
    try {
      await requestOtp(mobile);
      setOtp(['', '', '', '', '', '']);
      setResendCooldown(60);
      otpRefs.current[0]?.focus();
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-[#FFF7ED] rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone size={24} className="text-[#F47A20]" />
        </div>
        <h2 className="font-primary font-bold text-[#111827] text-xl">
          {step === 'mobile' ? 'Login to Continue' : 'Enter OTP'}
        </h2>
        <p className="text-[#6B7280] text-sm mt-1 font-secondary">
          {step === 'mobile'
            ? 'We\'ll send a verification code to your mobile number.'
            : `OTP sent to +91 ${mobile}`}
        </p>
      </div>

      {step === 'mobile' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2 font-secondary">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 h-11 border border-[#D1D5DB] rounded-[10px] bg-gray-50 text-[#6B7280] text-sm font-secondary flex-shrink-0">
                +91
              </span>
              <Input
                type="tel"
                placeholder="9999890667"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                onKeyDown={(e) => e.key === 'Enter' && handleRequestOtp()}
                maxLength={10}
                autoFocus
              />
            </div>
          </div>
          {error && <p className="text-sm text-[#E9342D] font-secondary">{error}</p>}
          <Button onClick={handleRequestOtp} loading={loading} className="w-full">
            Send OTP <ArrowRight size={16} />
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-3 font-secondary text-center">
              Enter 6-digit OTP
            </label>
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-11 h-12 text-center border border-[#D1D5DB] rounded-[10px] text-[#111827] text-lg font-semibold font-secondary focus:outline-none focus:border-[#F47A20] focus:ring-2 focus:ring-[#F47A20]/10"
                />
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-[#E9342D] font-secondary text-center">{error}</p>}
          <Button onClick={handleVerifyOtp} loading={loading} className="w-full">
            Verify OTP
          </Button>
          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="text-sm text-[#F47A20] hover:underline disabled:text-[#6B7280] disabled:no-underline font-secondary flex items-center gap-1 mx-auto"
            >
              <RefreshCw size={12} />
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
            </button>
          </div>
          <button
            onClick={() => { setStep('mobile'); setOtp(['', '', '', '', '', '']); setError(''); }}
            className="w-full text-sm text-[#6B7280] hover:text-[#111827] font-secondary"
          >
            Change number
          </button>
        </div>
      )}
    </Modal>
  );
}
