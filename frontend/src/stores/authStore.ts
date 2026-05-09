import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';
import type { User } from '../lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  requestOtp: (mobileNumber: string) => Promise<{ isNewCustomer: boolean }>;
  verifyOtp: (mobileNumber: string, otp: string) => Promise<void>;
  ownerLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      requestOtp: async (mobileNumber) => {
        const res = await api.post('/auth/customer/request-otp', { mobile_number: mobileNumber });
        return { isNewCustomer: res.data.is_new_customer ?? false };
      },

      verifyOtp: async (mobileNumber, otp) => {
        const res = await api.post('/auth/customer/verify-otp', {
          mobile_number: mobileNumber,
          otp,
        });
        set({ user: res.data.user, isAuthenticated: true });
      },

      ownerLogin: async (email, password) => {
        const res = await api.post('/auth/owner/login', { email, password });
        set({ user: res.data.user, isAuthenticated: true });
      },

      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch {
          // ignore
        }
        set({ user: null, isAuthenticated: false });
      },

      verifyToken: async () => {
        try {
          const res = await api.get('/auth/verify');
          set({ user: res.data.user, isAuthenticated: true });
        } catch {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'acw-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
