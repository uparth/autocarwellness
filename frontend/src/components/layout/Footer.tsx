import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-gray-300 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <Car size={18} className="text-white" />
              </div>
              <span className="font-primary font-bold text-white text-lg">
                Auto<span className="text-primary-500">car</span>wellness
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Trusted automobile solutions for buying, selling, finance, insurance, and car care.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-primary font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cars" className="hover:text-primary-500 transition-colors">Buy a Car</Link></li>
              <li><Link to="/sell-car" className="hover:text-primary-500 transition-colors">Sell Your Car</Link></li>
              <li><Link to="/finance" className="hover:text-primary-500 transition-colors">Car Finance</Link></li>
              <li><Link to="/insurance" className="hover:text-primary-500 transition-colors">Car Insurance</Link></li>
              <li><Link to="/services" className="hover:text-primary-500 transition-colors">Car Services</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-primary font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/cars" className="hover:text-primary-500 transition-colors">Browse Cars</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-primary font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
                <span>+91 99998 90667</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
                <span>info@autocarwellness.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Autocarwellness. All rights reserved.</p>
          <p>Trusted automobile solutions across India</p>
        </div>
      </div>
    </footer>
  );
}
