import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Car, Users, UserCheck, DollarSign,
  ShieldCheck, Wrench, Menu, X, LogOut, ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/cars', icon: Car, label: 'Cars' },
  { to: '/admin/dealers', icon: Users, label: 'Dealers' },
  { to: '/admin/customer-interests', icon: UserCheck, label: 'Interests' },
  { to: '/admin/sell-car-requests', icon: Car, label: 'Sell Requests' },
  { to: '/admin/finance-enquiries', icon: DollarSign, label: 'Finance' },
  { to: '/admin/insurance-enquiries', icon: ShieldCheck, label: 'Insurance' },
  { to: '/admin/service-requests', icon: Wrench, label: 'Services' },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`flex flex-col bg-[#050505] text-white ${
        mobile ? 'w-64' : 'w-64 hidden lg:flex'
      } min-h-screen`}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-[#F47A20] rounded-full flex items-center justify-center">
          <Car size={16} className="text-white" />
        </div>
        <span className="font-primary font-bold text-base">
          Auto<span className="text-[#F47A20]">car</span>wellness
        </span>
      </div>

      {/* Owner label */}
      <div className="px-6 py-4 border-b border-white/10">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Admin</p>
        <p className="text-sm font-medium mt-1 text-gray-200">{user?.email || user?.name || 'Owner'}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium font-primary transition-colors ${
                isActive
                  ? 'bg-[#F47A20] text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            {label}
            <ChevronRight size={14} className="ml-auto opacity-40" />
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[10px] text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar mobile />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-white z-20"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center gap-3 bg-[#050505] text-white px-4 py-3 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="p-1">
            <Menu size={22} />
          </button>
          <span className="font-primary font-bold text-base">
            Auto<span className="text-[#F47A20]">car</span>wellness
          </span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
