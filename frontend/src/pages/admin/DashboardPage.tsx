import { useQuery } from '@tanstack/react-query';
import { Car, Users, UserCheck, DollarSign, ShieldCheck, Wrench, TrendingUp, AlertCircle } from 'lucide-react';
import api from '../../lib/api';
import { Loader } from '../../components/common/Loader';
import type { DashboardSummary } from '../../lib/types';

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: typeof Car; label: string; value: number | string; sub?: string; color: string;
}) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#6B7280] text-sm font-secondary">{label}</p>
          <p className={`font-primary font-bold text-3xl mt-1 ${color}`}>{value}</p>
          {sub && <p className="text-[#6B7280] text-xs font-secondary mt-1">{sub}</p>}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color === 'text-[#F47A20]' ? 'bg-[#FFF7ED]' : 'bg-gray-50'}`}>
          <Icon size={22} className={color} />
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async (): Promise<DashboardSummary> => {
      const res = await api.get('/admin/dashboard/summary');
      return res.data;
    },
    staleTime: 30000,
  });

  if (isLoading) return <Loader />;

  const stats = summary ? [
    { icon: Car, label: 'Total Cars', value: summary.totalCars, sub: `${summary.availableCars} available · ${summary.soldCars} sold`, color: 'text-[#F47A20]' },
    { icon: Users, label: 'Total Dealers', value: summary.totalDealers, color: 'text-blue-600' },
    { icon: UserCheck, label: 'Customer Interests', value: summary.totalInterests, sub: `${summary.newInterests} new`, color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Sell Requests', value: summary.totalSellRequests, color: 'text-green-600' },
    { icon: DollarSign, label: 'Finance Enquiries', value: summary.totalFinanceEnquiries, color: 'text-yellow-600' },
    { icon: ShieldCheck, label: 'Insurance Enquiries', value: summary.totalInsuranceEnquiries, color: 'text-indigo-600' },
    { icon: Wrench, label: 'Service Requests', value: summary.totalServiceRequests, color: 'text-red-600' },
  ] : [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-primary font-bold text-[#111827] text-2xl">Dashboard</h1>
        <p className="text-[#6B7280] font-secondary text-sm mt-1">Overview of your Autocarwellness platform</p>
      </div>

      {isError ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <p className="font-secondary text-sm">Failed to load dashboard data.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      )}

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-card">
          <h2 className="font-primary font-semibold text-[#111827] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to: '/admin/cars/new', label: 'Add New Car', icon: Car },
              { to: '/admin/dealers', label: 'Manage Dealers', icon: Users },
              { to: '/admin/customer-interests', label: 'View Interests', icon: UserCheck },
              { to: '/admin/service-requests', label: 'Service Requests', icon: Wrench },
            ].map(({ to, label, icon: Icon }) => (
              <a
                key={to}
                href={to}
                className="flex items-center gap-2 bg-[#F5F5F5] hover:bg-[#FFF7ED] border border-[#E5E7EB] hover:border-[#F47A20]/30 rounded-xl p-3 transition-colors"
              >
                <Icon size={16} className="text-[#F47A20]" />
                <span className="text-[#111827] text-sm font-medium font-secondary">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-[#050505] text-white rounded-2xl p-6">
          <h2 className="font-primary font-semibold mb-4 text-[#F47A20]">Pending Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'New Interests', count: summary?.newInterests ?? 0, urgent: true },
              { label: 'New Sell Requests', count: summary?.totalSellRequests ?? 0, urgent: false },
              { label: 'Finance Enquiries', count: summary?.totalFinanceEnquiries ?? 0, urgent: false },
            ].map(({ label, count, urgent }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm font-secondary">{label}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  urgent && count > 0 ? 'bg-[#F47A20] text-white' : 'bg-white/10 text-gray-300'
                }`}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
