import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { CustomerInterest, SellCarRequest, FinanceEnquiry, InsuranceEnquiry, ServiceRequest } from '../lib/types';

export function useCustomerInterests() {
  return useQuery({
    queryKey: ['admin', 'interests'],
    queryFn: async (): Promise<CustomerInterest[]> => {
      const res = await api.get('/admin/customer-interests');
      return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
    },
    staleTime: 30000,
  });
}

export function useSellCarRequests() {
  return useQuery({
    queryKey: ['admin', 'sell-car-requests'],
    queryFn: async (): Promise<SellCarRequest[]> => {
      const res = await api.get('/sell-car-requests');
      return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
    },
    staleTime: 30000,
  });
}

export function useFinanceEnquiries() {
  return useQuery({
    queryKey: ['admin', 'finance-enquiries'],
    queryFn: async (): Promise<FinanceEnquiry[]> => {
      const res = await api.get('/finance-enquiries');
      return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
    },
    staleTime: 30000,
  });
}

export function useInsuranceEnquiries() {
  return useQuery({
    queryKey: ['admin', 'insurance-enquiries'],
    queryFn: async (): Promise<InsuranceEnquiry[]> => {
      const res = await api.get('/insurance-enquiries');
      return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
    },
    staleTime: 30000,
  });
}

export function useServiceRequests() {
  return useQuery({
    queryKey: ['admin', 'service-requests'],
    queryFn: async (): Promise<ServiceRequest[]> => {
      const res = await api.get('/service-requests');
      return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
    },
    staleTime: 30000,
  });
}

export function useUpdateLeadStatus(endpoint: string, queryKey: string[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.put(`${endpoint}/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', ...queryKey] }),
  });
}

export function useSubmitInterest() {
  return useMutation({
    mutationFn: ({ carId, data }: { carId: string; data: any }) =>
      api.post(`/car-interest/${carId}`, data),
  });
}

export function useSubmitSellCar() {
  return useMutation({
    mutationFn: (data: any) => api.post('/sell-car-requests', data),
  });
}

export function useSubmitFinance() {
  return useMutation({
    mutationFn: (data: any) => api.post('/finance-enquiries', data),
  });
}

export function useSubmitInsurance() {
  return useMutation({
    mutationFn: (data: any) => api.post('/insurance-enquiries', data),
  });
}

export function useSubmitService() {
  return useMutation({
    mutationFn: (data: any) => api.post('/service-requests', data),
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: any) => api.post('/contact-us', data),
  });
}
