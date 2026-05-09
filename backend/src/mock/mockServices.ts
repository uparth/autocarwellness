import {
  MOCK_DEALERS,
  MOCK_CARS,
  MOCK_USERS,
  MOCK_CUSTOMER_INTERESTS,
  MOCK_SELL_CAR_REQUESTS,
  MOCK_FINANCE_ENQUIRIES,
  MOCK_INSURANCE_ENQUIRIES,
  MOCK_SERVICE_REQUESTS,
  OWNER_CREDENTIALS,
} from './mockData.js';

// ─── Mutable in-memory stores (reset on server restart) ──────────────────────

let dealers = structuredClone(MOCK_DEALERS) as any[];
let cars = structuredClone(MOCK_CARS) as any[];
let customerInterests = structuredClone(MOCK_CUSTOMER_INTERESTS) as any[];
let sellCarRequests = structuredClone(MOCK_SELL_CAR_REQUESTS) as any[];
let financeEnquiries = structuredClone(MOCK_FINANCE_ENQUIRIES) as any[];
let insuranceEnquiries = structuredClone(MOCK_INSURANCE_ENQUIRIES) as any[];
let serviceRequests = structuredClone(MOCK_SERVICE_REQUESTS) as any[];

// token → user map (populated on login)
const tokenStore = new Map<string, any>();

// Pre-seed the owner token so /auth/verify works without logging in first
const ownerUser = MOCK_USERS[0];
tokenStore.set('mock-owner-token', ownerUser);

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function now() {
  return new Date().toISOString();
}

// ─── Auth service ─────────────────────────────────────────────────────────────

export const authService = {
  requestOtp(mobileNumber: string) {
    const existing = MOCK_USERS.find((u) => u.mobileNumber === mobileNumber);
    return { is_new_customer: !existing, message: 'OTP sent successfully' };
  },

  verifyOtp(mobileNumber: string, otp: string) {
    // Accept any 6-digit OTP (or specifically "123456") for mock
    if (otp.length !== 6) return null;

    let user = MOCK_USERS.find((u) => u.mobileNumber === mobileNumber);
    if (!user) {
      // Auto-create a new customer if mobile not found
      user = {
        id: newId('user'),
        email: null,
        mobileNumber,
        name: 'New Customer',
        role: 'CUSTOMER' as const,
        isActive: true,
        createdAt: now(),
      };
    }

    const token = `mock-customer-${mobileNumber}`;
    tokenStore.set(token, user);
    return { user: { id: user.id, name: user.name, mobileNumber: user.mobileNumber, role: user.role }, token };
  },

  ownerLogin(email: string, password: string) {
    if (email !== OWNER_CREDENTIALS.email || password !== OWNER_CREDENTIALS.password) return null;
    const token = 'mock-owner-token';
    tokenStore.set(token, ownerUser);
    return { user: { id: ownerUser.id, name: ownerUser.name, email: ownerUser.email, role: ownerUser.role }, token };
  },

  verifyToken(authHeader: string | undefined) {
    if (!authHeader?.startsWith('Bearer ')) return null;
    const token = authHeader.slice(7);
    return tokenStore.get(token) ?? null;
  },

  logout(authHeader: string | undefined) {
    if (authHeader?.startsWith('Bearer ')) {
      tokenStore.delete(authHeader.slice(7));
    }
  },
};

// ─── Car service ──────────────────────────────────────────────────────────────

export const carService = {
  getAll(query: Record<string, any>) {
    let result = [...cars];

    if (query.fuel_type) {
      result = result.filter((c) => c.carFuelType.toLowerCase() === query.fuel_type.toLowerCase());
    }
    if (query.transmission) {
      result = result.filter((c) => c.transmission?.toLowerCase() === query.transmission.toLowerCase());
    }
    if (query.brand) {
      result = result.filter((c) => c.carCompany.toLowerCase().includes(query.brand.toLowerCase()));
    }
    if (query.status) {
      result = result.filter((c) => c.status === query.status);
    }
    if (query.min_price) {
      result = result.filter((c) => c.expectedPrice >= Number(query.min_price));
    }
    if (query.max_price) {
      result = result.filter((c) => c.expectedPrice <= Number(query.max_price));
    }
    if (query.year) {
      result = result.filter((c) => c.carManufactureYear === Number(query.year));
    }
    if (query.search) {
      const s = query.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.carName.toLowerCase().includes(s) ||
          c.carCompany.toLowerCase().includes(s) ||
          c.dealer?.dealerName?.toLowerCase().includes(s),
      );
    }
    if (query.city) {
      result = result.filter((c) => c.dealer?.city?.toLowerCase().includes(query.city.toLowerCase()));
    }

    const sortBy: Record<string, string> = {
      expected_price: 'expectedPrice',
      price: 'expectedPrice',
      kms: 'kmsDriven',
      year: 'carManufactureYear',
      created_at: 'createdAt',
    };
    const field = sortBy[query.sort_by ?? ''] ?? 'expectedPrice';
    const order = query.order === 'desc' ? -1 : 1;
    result.sort((a, b) => (a[field] > b[field] ? order : -order));

    const page = Number(query.page ?? 1);
    const pageSize = Math.min(Number(query.page_size ?? 12), 100);
    return result.slice((page - 1) * pageSize, page * pageSize);
  },

  getById(id: string) {
    return cars.find((c) => c.id === id) ?? null;
  },

  create(body: any) {
    const dealer = dealers.find((d) => d.id === body.dealerId);
    const car = {
      id: newId('car'),
      ...body,
      carManufactureYear: Number(body.carManufactureYear),
      kmsDriven: Number(body.kmsDriven),
      expectedPrice: Number(body.expectedPrice),
      numberOfOwners: body.numberOfOwners ? Number(body.numberOfOwners) : null,
      status: body.status || 'available',
      images: [],
      dealer: dealer ?? null,
      createdAt: now(),
      updatedAt: now(),
    };
    cars.push(car);
    return car;
  },

  update(id: string, body: any) {
    const idx = cars.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    const updated = { ...cars[idx], ...body, updatedAt: now() };
    cars[idx] = updated;
    return updated;
  },

  delete(id: string) {
    const idx = cars.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    cars.splice(idx, 1);
    return true;
  },
};

// ─── Dealer service ───────────────────────────────────────────────────────────

export const dealerService = {
  getAll() {
    return dealers;
  },

  getById(id: string) {
    return dealers.find((d) => d.id === id) ?? null;
  },

  create(body: any) {
    const dealer = {
      id: newId('dealer'),
      ...body,
      carsCount: 0,
      createdAt: now(),
      updatedAt: now(),
    };
    dealers.push(dealer);
    return dealer;
  },

  update(id: string, body: any) {
    const idx = dealers.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    const updated = { ...dealers[idx], ...body, updatedAt: now() };
    dealers[idx] = updated;
    return updated;
  },

  delete(id: string) {
    const idx = dealers.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    dealers.splice(idx, 1);
    return true;
  },
};

// ─── Generic lead service factory ────────────────────────────────────────────

function makeLeadService(store: () => any[], setter: (v: any[]) => void) {
  return {
    getAll() { return store(); },

    getById(id: string) { return store().find((r: any) => r.id === id) ?? null; },

    create(body: any) {
      const record = {
        id: newId('lead'),
        customerId: null,
        ...body,
        status: 'new',
        createdAt: now(),
        updatedAt: now(),
      };
      setter([...store(), record]);
      return record;
    },

    updateStatus(id: string, status: string) {
      const arr = store();
      const idx = arr.findIndex((r: any) => r.id === id);
      if (idx === -1) return null;
      const updated = { ...arr[idx], status, updatedAt: now() };
      arr[idx] = updated;
      setter([...arr]);
      return updated;
    },
  };
}

export const customerInterestService = makeLeadService(
  () => customerInterests,
  (v) => { customerInterests = v; },
);

export const sellCarRequestService = makeLeadService(
  () => sellCarRequests,
  (v) => { sellCarRequests = v; },
);

export const financeEnquiryService = makeLeadService(
  () => financeEnquiries,
  (v) => { financeEnquiries = v; },
);

export const insuranceEnquiryService = makeLeadService(
  () => insuranceEnquiries,
  (v) => { insuranceEnquiries = v; },
);

export const serviceRequestService = makeLeadService(
  () => serviceRequests,
  (v) => { serviceRequests = v; },
);

// ─── Dashboard service ────────────────────────────────────────────────────────

export const dashboardService = {
  getSummary() {
    const allCars = carService.getAll({});
    const available = cars.filter((c) => c.status === 'available').length;
    const sold = cars.filter((c) => c.status === 'sold').length;
    const newInterests = customerInterests.filter((i) => i.status === 'new').length;

    return {
      totalCars: cars.length,
      availableCars: available,
      soldCars: sold,
      totalDealers: dealers.length,
      totalInterests: customerInterests.length,
      newInterests,
      totalSellRequests: sellCarRequests.length,
      totalFinanceEnquiries: financeEnquiries.length,
      totalInsuranceEnquiries: insuranceEnquiries.length,
      totalServiceRequests: serviceRequests.length,
    };
  },
};
