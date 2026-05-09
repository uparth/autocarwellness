export interface Car {
  id: string;
  dealerId: string;
  carName: string;
  carCompany: string;
  carFuelType: string;
  carManufactureYear: number;
  carRegistrationDate?: string;
  carRegistrationState?: string;
  carRegistrationNumber?: string;
  carVariant?: string;
  kmsDriven: number;
  transmission: string;
  color?: string;
  expectedPrice: number;
  numberOfOwners: number;
  insuranceValidUpto?: string;
  status: 'available' | 'sold';
  reportUrl?: string;
  createdAt: string;
  updatedAt: string;
  dealer?: Dealer;
  images?: CarImage[];
}

export interface CarImage {
  id: string;
  carId: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface Dealer {
  id: string;
  dealerName: string;
  dealerAddressLine1?: string;
  dealerAddressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email?: string;
  mobileNumber?: string;
  name?: string;
  role: 'OWNER' | 'CUSTOMER';
}

export interface CustomerInterest {
  id: string;
  carId: string;
  customerId?: string;
  customerName: string;
  email?: string;
  phone: string;
  location?: string;
  status: 'new' | 'contacted' | 'follow_up' | 'closed';
  createdAt: string;
  updatedAt: string;
  car?: Car;
}

export interface SellCarRequest {
  id: string;
  customerId?: string;
  customerName: string;
  phone: string;
  email?: string;
  city?: string;
  carCompany: string;
  carModel: string;
  manufactureYear: number;
  kmsDriven: number;
  fuelType: string;
  expectedPrice?: number;
  description?: string;
  status: 'new' | 'contacted' | 'inspection_scheduled' | 'offer_given' | 'closed' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface FinanceEnquiry {
  id: string;
  customerId?: string;
  customerName: string;
  phone: string;
  email?: string;
  carId?: string;
  loanAmount?: number;
  monthlyIncome?: number;
  city?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'approved' | 'rejected' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface InsuranceEnquiry {
  id: string;
  customerId?: string;
  customerName: string;
  phone: string;
  email?: string;
  registrationNumber?: string;
  insuranceType: 'new' | 'renewal' | 'used_car_transfer';
  city?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRequest {
  id: string;
  customerId?: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceType: 'repair' | 'maintenance' | 'denting' | 'painting';
  carCompany?: string;
  carModel?: string;
  description?: string;
  preferredDate?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalCars: number;
  availableCars: number;
  soldCars: number;
  totalDealers: number;
  totalInterests: number;
  newInterests: number;
  totalSellRequests: number;
  totalFinanceEnquiries: number;
  totalInsuranceEnquiries: number;
  totalServiceRequests: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
