import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, Heart, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/cars', label: 'Buy Car' },
    { to: '/sell-car', label: 'Sell Car' },
    { to: '/finance', label: 'Finance' },
    { to: '/insurance', label: 'Insurance' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <header className="bg-secondary-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <Car size={18} className="text-white" />
            </div>
            <span className="font-primary font-bold text-lg tracking-tight">
              Auto<span className="text-primary-500">car</span>wellness
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium font-primary transition-colors duration-150 ${
                    isActive
                      ? 'text-primary-500 bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user?.role === 'OWNER' && (
              <Link
                to="/admin/dashboard"
                className="px-3 py-2 text-sm font-medium font-primary text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                    <User size={14} />
                  </div>
                  <span className="text-sm font-medium">{user?.name || user?.mobileNumber || 'Account'}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={14} /> Profile
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Heart size={14} /> Favourites
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="btn-primary text-sm h-9 px-4">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-secondary-900 px-4 pb-4">
          <nav className="flex flex-col gap-1 mt-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium font-primary transition-colors ${
                    isActive ? 'text-primary-500 bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                {user?.role === 'OWNER' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10">
                  Profile
                </Link>
                <button onClick={handleLogout} className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-white/10">
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-sm mt-2"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
