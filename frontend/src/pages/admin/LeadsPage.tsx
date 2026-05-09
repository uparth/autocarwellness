import { useState } from 'react';
import {
  useCustomerInterests, useSellCarRequests, useFinanceEnquiries,
  useInsuranceEnquiries, useServiceRequests, useUpdateLeadStatus,
} from '../../hooks/useLeads';
import { StatusBadge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';
import { Modal } from '../../components/common/Modal';
import { Select } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { AlertCircle, Eye } from 'lucide-react';

type LeadType = 'interests' | 'sell' | 'finance' | 'insurance' | 'service';

const tabs: { key: LeadType; label: string }[] = [
  { key: 'interests', label: 'Customer Interests' },
  { key: 'sell', label: 'Sell Requests' },
  { key: 'finance', label: 'Finance' },
  { key: 'insurance', label: 'Insurance' },
  { key: 'service', label: 'Services' },
];

const statusOptions: Record<LeadType, string[]> = {
  interests: ['new', 'contacted', 'follow_up', 'closed'],
  sell: ['new', 'contacted', 'inspection_scheduled', 'offer_given', 'closed', 'rejected'],
  finance: ['new', 'contacted', 'in_progress', 'approved', 'rejected', 'closed'],
  insurance: ['new', 'contacted', 'in_progress', 'closed'],
  service: ['new', 'contacted', 'scheduled', 'completed', 'cancelled'],
};

const endpointMap: Record<LeadType, string> = {
  interests: '/car-interest',
  sell: '/sell-car-requests',
  finance: '/finance-enquiries',
  insurance: '/insurance-enquiries',
  service: '/service-requests',
};

function LeadRow({ lead, onView }: { lead: any; onView: () => void }) {
  return (
    <tr className="hover:bg-[#F5F5F5] transition-colors">
      <td className="px-4 py-3">
        <p className="font-medium text-[#111827] font-secondary text-sm">{lead.customerName}</p>
        <p className="text-xs text-[#6B7280] font-secondary">{lead.phone}</p>
      </td>
      <td className="px-4 py-3 text-sm text-[#6B7280] font-secondary">{lead.email || '—'}</td>
      <td className="px-4 py-3 text-sm text-[#6B7280] font-secondary">
        {lead.city || lead.location || '—'}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={lead.status} />
      </td>
      <td className="px-4 py-3 text-xs text-[#6B7280] font-secondary">
        {new Date(lead.createdAt).toLocaleDateString('en-IN')}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={onView}
          className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#F47A20] hover:bg-[#FFF7ED] transition-colors"
        >
          <Eye size={15} />
        </button>
      </td>
    </tr>
  );
}

function LeadsTable({ leads, type, isLoading, isError }: { leads: any[]; type: LeadType; isLoading: boolean; isError: boolean }) {
  const [selected, setSelected] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const { mutate: updateStatus, isPending } = useUpdateLeadStatus(endpointMap[type], [type]);

  const handleStatusChange = () => {
    if (!selected || !newStatus) return;
    updateStatus({ id: selected.id, status: newStatus }, {
      onSuccess: () => {
        setSelected(null);
        setNewStatus('');
      },
    });
  };

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-3 text-red-600">
        <AlertCircle size={18} />
        <p className="font-secondary text-sm">Failed to load leads.</p>
      </div>
    );
  }
  if (leads.length === 0) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-2xl py-12 text-center shadow-card">
        <p className="font-primary font-semibold text-[#111827]">No records found</p>
        <p className="text-[#6B7280] text-sm font-secondary mt-1">New leads will appear here</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
              <tr>
                {['Name', 'Email', 'City', 'Status', 'Date', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] font-secondary uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {leads.map((lead) => (
                <LeadRow key={lead.id} lead={lead} onView={() => { setSelected(lead); setNewStatus(lead.status); }} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <Modal open={!!selected} onClose={() => setSelected(null)} title="Lead Details">
          <div className="space-y-3 mb-5">
            {Object.entries(selected)
              .filter(([k]) => !['id', 'customerId', 'carId', 'updatedAt'].includes(k))
              .map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 text-sm">
                  <span className="text-[#6B7280] font-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-[#111827] font-secondary font-medium text-right">
                    {typeof value === 'string' && value.includes('T')
                      ? new Date(value).toLocaleDateString('en-IN')
                      : String(value || '—')}
                  </span>
                </div>
              ))}
          </div>
          <div className="border-t border-[#E5E7EB] pt-4">
            <p className="text-sm font-medium text-[#111827] font-secondary mb-2">Update Status</p>
            <div className="flex gap-3">
              <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                {statusOptions[type].map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
                ))}
              </Select>
              <Button onClick={handleStatusChange} loading={isPending} className="flex-shrink-0 h-11 px-4 text-sm">
                Update
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export function CustomerInterestsPage() {
  const { data: leads = [], isLoading, isError } = useCustomerInterests();
  return (
    <LeadPageWrapper title="Customer Interests" type="interests">
      <LeadsTable leads={leads} type="interests" isLoading={isLoading} isError={isError} />
    </LeadPageWrapper>
  );
}

export function SellCarRequestsPage() {
  const { data: leads = [], isLoading, isError } = useSellCarRequests();
  return (
    <LeadPageWrapper title="Sell Car Requests" type="sell">
      <LeadsTable leads={leads} type="sell" isLoading={isLoading} isError={isError} />
    </LeadPageWrapper>
  );
}

export function FinanceEnquiriesPage() {
  const { data: leads = [], isLoading, isError } = useFinanceEnquiries();
  return (
    <LeadPageWrapper title="Finance Enquiries" type="finance">
      <LeadsTable leads={leads} type="finance" isLoading={isLoading} isError={isError} />
    </LeadPageWrapper>
  );
}

export function InsuranceEnquiriesPage() {
  const { data: leads = [], isLoading, isError } = useInsuranceEnquiries();
  return (
    <LeadPageWrapper title="Insurance Enquiries" type="insurance">
      <LeadsTable leads={leads} type="insurance" isLoading={isLoading} isError={isError} />
    </LeadPageWrapper>
  );
}

export function ServiceRequestsPage() {
  const { data: leads = [], isLoading, isError } = useServiceRequests();
  return (
    <LeadPageWrapper title="Service Requests" type="service">
      <LeadsTable leads={leads} type="service" isLoading={isLoading} isError={isError} />
    </LeadPageWrapper>
  );
}

function LeadPageWrapper({ title, type, children }: { title: string; type: LeadType; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h1 className="font-primary font-bold text-[#111827] text-2xl">{title}</h1>
          <div className="flex gap-2 mt-2">
            {tabs.map((t) => (
              <a
                key={t.key}
                href={`/admin/${t.key === 'interests' ? 'customer-interests' : t.key === 'sell' ? 'sell-car-requests' : t.key + '-enquiries'}`}
                className={`text-xs font-medium font-secondary px-3 py-1 rounded-full transition-colors ${
                  t.key === type
                    ? 'bg-[#F47A20] text-white'
                    : 'bg-[#F5F5F5] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
