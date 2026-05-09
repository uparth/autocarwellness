import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { Dealer } from '../lib/types';

const fetchDealers = async (): Promise<Dealer[]> => {
  const response = await api.get('/dealers');
  return Array.isArray(response.data) ? response.data : response.data?.data ?? [];
};

export function useDealers() {
  return useQuery({
    queryKey: ['dealers'],
    queryFn: fetchDealers,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateDealer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Dealer, 'id' | 'createdAt' | 'updatedAt'>) =>
      api.post('/dealers', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dealers'] }),
  });
}

export function useUpdateDealer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Dealer> }) =>
      api.put(`/dealers/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dealers'] }),
  });
}

export function useDeleteDealer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/dealers/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dealers'] }),
  });
}
