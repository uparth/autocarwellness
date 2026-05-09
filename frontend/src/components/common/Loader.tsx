import { Loader2 } from 'lucide-react';

interface LoaderProps {
  fullPage?: boolean;
  text?: string;
}

export function Loader({ fullPage = false, text = 'Loading...' }: LoaderProps) {
  if (fullPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 size={36} className="animate-spin text-[#F47A20]" />
        <p className="text-[#6B7280] text-sm font-secondary">{text}</p>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Loader2 size={24} className="animate-spin text-[#F47A20]" />
      <span className="text-[#6B7280] text-sm font-secondary">{text}</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-5 bg-gray-200 rounded w-1/3 mt-4" />
      </div>
    </div>
  );
}
