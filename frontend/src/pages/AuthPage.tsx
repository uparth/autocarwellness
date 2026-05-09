import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Lock, Mail } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { OtpLoginModal } from '../components/Auth/OtpLoginModal';
import { useAuthStore } from '../stores/authStore';

export function AuthPage() {
  const [tab, setTab] = useState<'customer' | 'owner'>('customer');
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { ownerLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Enter email and password.'); return; }
    setLoading(true);
    try {
      await ownerLogin(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F5F5F5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#050505] rounded-full flex items-center justify-center mx-auto mb-4">
            <Car size={28} className="text-[#F47A20]" />
          </div>
          <h1 className="font-primary font-bold text-[#111827] text-2xl">Welcome Back</h1>
          <p className="text-[#6B7280] text-sm mt-1 font-secondary">Sign in to your Autocarwellness account</p>
        </div>

        {/* Tab switcher */}
        <div className="bg-white rounded-2xl p-1 flex gap-1 mb-6 border border-[#E5E7EB]">
          <button
            onClick={() => setTab('customer')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold font-primary transition-colors ${
              tab === 'customer'
                ? 'bg-[#F47A20] text-white'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setTab('owner')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold font-primary transition-colors ${
              tab === 'owner'
                ? 'bg-[#050505] text-white'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Owner
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-card p-6">
          {tab === 'customer' ? (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-[#111827] font-medium font-primary">Login with Mobile Number</p>
                <p className="text-[#6B7280] text-sm font-secondary mt-1">
                  We'll send an OTP to verify your identity.
                </p>
              </div>
              <Button onClick={() => setOtpModalOpen(true)} className="w-full">
                Continue with Mobile OTP
              </Button>
            </div>
          ) : (
            <form onSubmit={handleOwnerLogin} className="space-y-4">
              <div className="text-center mb-2">
                <div className="w-10 h-10 bg-[#FFF7ED] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock size={18} className="text-[#F47A20]" />
                </div>
                <p className="text-[#111827] font-medium font-primary">Owner Login</p>
              </div>
              <Input
                label="Email Address"
                type="email"
                placeholder="owner@autocarwellness.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-sm text-[#E9342D] font-secondary">{error}</p>}
              <Button type="submit" variant="secondary" loading={loading} className="w-full">
                <Mail size={16} /> Login as Owner
              </Button>
            </form>
          )}
        </div>
      </div>

      <OtpLoginModal
        open={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onSuccess={() => navigate('/')}
      />
    </div>
  );
}
