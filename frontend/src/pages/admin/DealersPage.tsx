import { useState } from 'react';
import { Plus, Pencil, Trash2, Users, MapPin } from 'lucide-react';
import { useDealers, useCreateDealer, useUpdateDealer, useDeleteDealer } from '../../hooks/useDealers';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Loader } from '../../components/common/Loader';
import type { Dealer } from '../../lib/types';

type DealerForm = Omit<Dealer, 'id' | 'createdAt' | 'updatedAt'>;

const emptyForm: DealerForm = {
  dealerName: '', dealerAddressLine1: '', dealerAddressLine2: '',
  city: '', state: '', pincode: '',
};

export function DealersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Dealer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Dealer | null>(null);
  const [form, setForm] = useState<DealerForm>(emptyForm);

  const { data: dealers, isLoading } = useDealers();
  const { mutate: create, isPending: isCreating } = useCreateDealer();
  const { mutate: update, isPending: isUpdating } = useUpdateDealer();
  const { mutate: remove, isPending: isDeleting } = useDeleteDealer();

  const set = (key: keyof DealerForm, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const openAdd = () => { setEditTarget(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (d: Dealer) => {
    setEditTarget(d);
    setForm({ dealerName: d.dealerName, dealerAddressLine1: d.dealerAddressLine1 ?? '', dealerAddressLine2: d.dealerAddressLine2 ?? '', city: d.city ?? '', state: d.state ?? '', pincode: d.pincode ?? '' });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.dealerName) return;
    if (editTarget) {
      update({ id: editTarget.id, data: form }, { onSuccess: () => setModalOpen(false) });
    } else {
      create(form, { onSuccess: () => setModalOpen(false) });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-primary font-bold text-[#111827] text-2xl">Dealers</h1>
          <p className="text-[#6B7280] font-secondary text-sm mt-0.5">Manage your dealer network</p>
        </div>
        <Button onClick={openAdd} className="h-9 px-4 text-sm gap-1.5">
          <Plus size={16} /> Add Dealer
        </Button>
      </div>

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(dealers?.length ?? 0) === 0 ? (
            <div className="col-span-full bg-white border border-[#E5E7EB] rounded-2xl py-16 text-center shadow-card">
              <Users size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="font-primary font-semibold text-[#111827]">No dealers yet</p>
              <p className="text-[#6B7280] text-sm font-secondary mt-1">Add your first dealer to get started</p>
            </div>
          ) : (
            (dealers ?? []).map((d) => (
              <div key={d.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-card">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-primary font-semibold text-[#111827]">{d.dealerName}</h3>
                    {(d.city || d.state) && (
                      <p className="flex items-center gap-1 text-xs text-[#6B7280] font-secondary mt-1">
                        <MapPin size={11} />
                        {[d.city, d.state].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#F47A20] hover:bg-[#FFF7ED] transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteTarget(d)} className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#E9342D] hover:bg-red-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {d.dealerAddressLine1 && (
                  <p className="text-xs text-[#6B7280] font-secondary mt-2">{d.dealerAddressLine1}</p>
                )}
                {d.pincode && (
                  <p className="text-xs text-[#6B7280] font-secondary">{d.pincode}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Add/Edit modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Dealer' : 'Add Dealer'}>
        <div className="space-y-4">
          <Input label="Dealer Name *" value={form.dealerName} onChange={(e) => set('dealerName', e.target.value)} placeholder="XYZ Motors" />
          <Input label="Address Line 1" value={form.dealerAddressLine1} onChange={(e) => set('dealerAddressLine1', e.target.value)} placeholder="Shop No. 1, Main Road" />
          <Input label="Address Line 2" value={form.dealerAddressLine2} onChange={(e) => set('dealerAddressLine2', e.target.value)} placeholder="Near Bus Stand" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="City" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Mumbai" />
            <Input label="State" value={form.state} onChange={(e) => set('state', e.target.value)} placeholder="Maharashtra" />
          </div>
          <Input label="Pincode" value={form.pincode} onChange={(e) => set('pincode', e.target.value)} placeholder="400001" />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} loading={isCreating || isUpdating} className="flex-1">
              {editTarget ? 'Save Changes' : 'Add Dealer'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Dealer" maxWidth="sm">
        <p className="text-[#6B7280] font-secondary text-sm mb-5">
          Delete <strong className="text-[#111827]">{deleteTarget?.dealerName}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1">Cancel</Button>
          <button
            onClick={() => remove(deleteTarget!.id, { onSuccess: () => setDeleteTarget(null) })}
            disabled={isDeleting}
            className="flex-1 h-11 bg-[#E9342D] hover:bg-red-700 text-white font-semibold font-primary rounded-[10px] transition-colors disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
