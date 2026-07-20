import { X } from "lucide-react";

type UpdateSiteContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function UpdateSiteContactModal({
  open,
  onClose,
}: UpdateSiteContactModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl max-h-[85vh] w-full max-w-[600px] shadow-xl overflow-y-scroll">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-1">Update Site Contact</h2>
            <p className="text-sm font-medium text-gray-400">DEL-2001 - ABC Building</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors mt-1">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <label className="text-sm font-bold text-[#111827] mb-2.5 block">Contact Name</label>
              <input
                placeholder="Enter contact name"
                className="w-full h-[52px] rounded-xl border border-gray-200 px-5 outline-none text-base placeholder:text-gray-400 focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-[#111827] mb-2.5 block">Contact Title</label>
              <input
                placeholder="Enter job title"
                className="w-full h-[52px] rounded-xl border border-gray-200 px-5 outline-none text-base placeholder:text-gray-400 focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-[#111827] mb-2.5 block">Phone number</label>
              <input
                placeholder="(555) 123-4567"
                className="w-full h-[52px] rounded-xl border border-gray-200 px-5 outline-none text-base placeholder:text-gray-400 focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-[#111827] mb-2.5 block">Email Address</label>
              <input
                placeholder="contact@company.com"
                className="w-full h-[52px] rounded-xl border border-gray-200 px-5 outline-none text-base placeholder:text-gray-400 focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-[#111827] mb-2.5 block">Available hours</label>
            <input
              placeholder="e.g., 7:00 AM - 5:00 PM, Mon-Fri"
              className="w-full h-[52px] rounded-xl border border-gray-200 px-5 outline-none text-base placeholder:text-gray-400 focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-[#111827] mb-2.5 block">Additional Notes</label>
            <textarea
              placeholder="Additional notes about this contact..."
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-5 py-4 outline-none text-base placeholder:text-gray-400 focus:border-blue-500 transition-colors shadow-sm resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
