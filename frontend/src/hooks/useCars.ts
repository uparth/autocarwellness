import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { Car, PaginatedResponse } from '../lib/types';

interface CarFilters {
  fuelType?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  transmission?: string;
  brand?: string;
  year?: number;
  status?: string;
  page?: number;
  pageSize?: number;
}

const fetchCars = async (filters: CarFilters = {}): Promise<Car[]> => {
  const params: Record<string, any> = {
    page: filters.page || 1,
    page_size: filters.pageSize || 12,
  };
  if (filters.fuelType) params.fuel_type = filters.fuelType;
  if (filters.city) params.city = filters.city;
  if (filters.minPrice) params.min_price = filters.minPrice;
  if (filters.maxPrice) params.max_price = filters.maxPrice;
  if (filters.search) params.search = filters.search;
  if (filters.transmission) params.transmission = filters.transmission;
  if (filters.brand) params.brand = filters.brand;
  if (filters.year) params.year = filters.year;
  if (filters.status) params.status = filters.status;

  const response = await api.get('/cars', { params });
  return Array.isArray(response.data) ? response.data : response.data?.data ?? [];
};

const fetchCar = async (id: string): Promise<Car> => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
};

export function useCars(filters: CarFilters = {}) {
  return useQuery({
    queryKey: ['cars', filters],
    queryFn: () => fetchCars(filters),
    staleTime: 1000 * 60,
    retry: 1,
  });
}

export function useCar(id: string) {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCar(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/cars/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cars'] }),
  });
}

export function useUpdateCarStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'available' | 'sold' }) =>
      api.put(`/cars/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
}
