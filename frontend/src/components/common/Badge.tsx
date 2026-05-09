import { type ReactNode } from 'react';

type BadgeVariant =
  | 'new' | 'contacted' | 'in_progress' | 'follow_up' | 'closed'
  | 'rejected' | 'approved' | 'scheduled' | 'completed' | 'cancelled'
  | 'available' | 'sold' | 'offer_given' | 'inspection_scheduled'
  | 'used_car_transfer' | 'renewal' | 'orange' | 'gray' | 'green' | 'red' | 'blue' | 'yellow';

const variantStyles: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  in_progress: 'bg-orange-100 text-orange-700',
  follow_up: 'bg-purple-100 text-purple-700',
  closed: 'bg-gray-100 text-gray-600',
  rejected: 'bg-red-100 text-red-700',
  approved: 'bg-green-100 text-green-700',
  scheduled: 'bg-indigo-100 text-indigo-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  available: 'bg-green-100 text-green-700',
  sold: 'bg-gray-100 text-gray-600',
  offer_given: 'bg-teal-100 text-teal-700',
  inspection_scheduled: 'bg-indigo-100 text-indigo-700',
  used_car_transfer: 'bg-blue-100 text-blue-700',
  renewal: 'bg-yellow-100 text-yellow-700',
  orange: 'bg-[#FFF7ED] text-[#F47A20]',
  gray: 'bg-gray-100 text-gray-600',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-yellow-100 text-yellow-700',
};

interface BadgeProps {
  variant?: BadgeVariant | string;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'gray', children, className = '' }: BadgeProps) {
  const style = variantStyles[variant] ?? 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-secondary ${style} ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    new: 'New',
    contacted: 'Contacted',
    in_progress: 'In Progress',
    follow_up: 'Follow Up',
    closed: 'Closed',
    rejected: 'Rejected',
    approved: 'Approved',
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    available: 'Available',
    sold: 'Sold',
    offer_given: 'Offer Given',
    inspection_scheduled: 'Inspection Scheduled',
  };
  return <Badge variant={status}>{labels[status] ?? status}</Badge>;
}
