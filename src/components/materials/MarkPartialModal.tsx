import { X } from "lucide-react";
import { useState } from "react";
import Modal from "../common/Modal";

type MarkPartialModalProps = {
  open: boolean;
  onClose: () => void;
  deliveryId: string;
  deliveryNumber: string;
  onConfirm: (notes: string) => void;
  isPending: boolean;
};

export default function MarkPartialModal({
  open,
  onClose,
  deliveryNumber,
  onConfirm,
  isPending,
}: MarkPartialModalProps) {
  const [notes, setNotes] = useState("Only 3 out of 4 bundles received");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(notes);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      containerClassName="max-w-[500px]"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-8 pt-8 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#111827] mb-1">Mark Delivery Partial</h2>
          <p className="text-sm font-medium text-gray-400">ID: {deliveryNumber}</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors mt-1">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6 mt-4">
        <div>
          <label className="text-sm font-bold text-[#111827] mb-2.5 block">Notes / Reason</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Explain the reason for partial delivery receipt..."
            rows={4}
            required
            className="w-full rounded-xl border border-gray-200 px-5 py-4 outline-none text-base placeholder:text-gray-400 focus:border-blue-500 transition-colors shadow-sm resize-none"
          />
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="w-full py-3.5 bg-[#D1D1D1] text-white font-bold rounded-xl text-sm uppercase tracking-wider hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || !notes.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white font-bold rounded-xl text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
          >
            {isPending ? "Marking..." : "Confirm"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
