import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Car, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import { useCars, useDeleteCar, useUpdateCarStatus } from '../../hooks/useCars';
import { Input, Select } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';
import { Modal } from '../../components/common/Modal';
import type { Car as CarType } from '../../lib/types';

export function AdminCarsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<CarType | null>(null);

  const { data: cars, isLoading, isError } = useCars({
    search: search || undefined,
    status: statusFilter || undefined,
  });

  const { mutate: deleteCar, isPending: isDeleting } = useDeleteCar();
  const { mutate: updateStatus } = useUpdateCarStatus();

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteCar(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  const toggleStatus = (car: CarType) => {
    updateStatus({ id: car.id, status: car.status === 'available' ? 'sold' : 'available' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-primary font-bold text-[#111827] text-2xl">Cars</h1>
          <p className="text-[#6B7280] font-secondary text-sm mt-0.5">Manage your car inventory</p>
        </div>
        <Link to="/admin/cars/new" className="btn-primary text-sm h-9 px-4 inline-flex items-center gap-2">
          <Plus size={16} /> Add Car
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1">
          <Input
            placeholder="Search cars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40">
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </Select>
      </div>

      {isLoading && <Loader />}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-3 text-red-600">
          <AlertCircle size={18} />
          <p className="font-secondary text-sm">Failed to load cars.</p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-card overflow-hidden">
          {(cars?.length ?? 0) === 0 ? (
            <div className="py-16 text-center">
              <Car size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="font-primary font-semibold text-[#111827]">No cars found</p>
              <p className="text-[#6B7280] text-sm font-secondary mt-1">Add your first car to get started</p>
              <Link to="/admin/cars/new" className="btn-primary text-sm h-9 px-4 inline-flex mt-4">Add Car</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
                  <tr>
                    {['Car', 'Company', 'Price', 'Fuel', 'KMs', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] font-secondary uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {(cars ?? []).map((car) => (
                    <tr key={car.id} className="hover:bg-[#F5F5F5] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#111827] font-secondary text-sm">{car.carName}</p>
                        <p className="text-xs text-[#6B7280] font-secondary">{car.carManufactureYear}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6B7280] font-secondary">{car.carCompany}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#111827] font-primary">
                        ₹{Number(car.expectedPrice).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6B7280] font-secondary">{car.carFuelType}</td>
                      <td className="px-4 py-3 text-sm text-[#6B7280] font-secondary">
                        {Number(car.kmsDriven).toLocaleString()} km
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={car.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleStatus(car)}
                            title={car.status === 'available' ? 'Mark as Sold' : 'Mark as Available'}
                            className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#F47A20] hover:bg-[#FFF7ED] transition-colors"
                          >
                            {car.status === 'available'
                              ? <ToggleRight size={18} className="text-green-500" />
                              : <ToggleLeft size={18} />}
                          </button>
                          <Link
                            to={`/admin/cars/${car.id}/edit`}
                            className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#F47A20] hover:bg-[#FFF7ED] transition-colors"
                          >
                            <Pencil size={15} />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(car)}
                            className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#E9342D] hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Delete confirmation */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Car" maxWidth="sm">
        <p className="text-[#6B7280] font-secondary text-sm mb-5">
          Are you sure you want to delete <strong className="text-[#111827]">{deleteTarget?.carName}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1">Cancel</Button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 h-11 bg-[#E9342D] hover:bg-red-700 text-white font-semibold font-primary rounded-[10px] transition-colors disabled:opacity-60"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
