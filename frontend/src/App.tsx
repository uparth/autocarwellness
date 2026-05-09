import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { CarListPage } from './pages/public/CarListPage';
import { CarDetailPage } from './pages/public/CarDetailPage';
import { SellCarPage } from './pages/public/SellCarPage';
import { FinancePage } from './pages/public/FinancePage';
import { InsurancePage } from './pages/public/InsurancePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { AuthPage } from './pages/AuthPage';

// Admin pages
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminCarsPage } from './pages/admin/CarsPage';
import { CarFormPage } from './pages/admin/CarFormPage';
import { DealersPage } from './pages/admin/DealersPage';
import {
  CustomerInterestsPage,
  SellCarRequestsPage,
  FinanceEnquiriesPage,
  InsuranceEnquiriesPage,
  ServiceRequestsPage,
} from './pages/admin/LeadsPage';

function OwnerRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || user?.role !== 'OWNER') {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

function App() {
  const { verifyToken } = useAuthStore();

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarListPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/sell-car" element={<SellCarPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <OwnerRoute>
            <AdminLayout />
          </OwnerRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="cars" element={<AdminCarsPage />} />
        <Route path="cars/new" element={<CarFormPage />} />
        <Route path="cars/:id/edit" element={<CarFormPage />} />
        <Route path="dealers" element={<DealersPage />} />
        <Route path="customer-interests" element={<CustomerInterestsPage />} />
        <Route path="sell-car-requests" element={<SellCarRequestsPage />} />
        <Route path="finance-enquiries" element={<FinanceEnquiriesPage />} />
        <Route path="insurance-enquiries" element={<InsuranceEnquiriesPage />} />
        <Route path="service-requests" element={<ServiceRequestsPage />} />
      </Route>

      {/* Admin login redirect */}
      <Route path="/admin/login" element={<Navigate to="/auth" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
