import { X, Calendar, Upload, ChevronDown } from "lucide-react";

type AddDeliveryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddDeliveryDrawer({ open, onClose }: AddDeliveryDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-[70] w-full max-w-[500px] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Add Delivery</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Delivery Information</h3>
          
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-xs font-bold text-gray-900 mb-1.5 block uppercase tracking-wider">Title</label>
              <input
                type="text"
                placeholder="Enter delivery title"
                className="w-full h-11 border border-gray-200 rounded-xl px-4 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
              />
            </div>

              {/* Project */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Project</label>
                <div className="relative">
                  <select className="w-full h-12 border border-gray-200 rounded-xl px-4 outline-none appearance-none focus:border-blue-500 transition-colors text-sm font-medium text-gray-500 bg-white">
                    <option value="">Select Project</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Section/Location */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Section/Location</label>
                <div className="relative">
                  <select className="w-full h-12 border border-gray-200 rounded-xl px-4 outline-none appearance-none focus:border-blue-500 transition-colors text-sm font-medium text-gray-500 bg-white">
                    <option value="">Select section or location</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Delivery Date</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="May 19, 2025"
                    className="w-full h-12 border border-gray-200 rounded-xl px-4 outline-none focus:border-blue-500 transition-colors text-sm font-medium text-gray-900"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900 pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Description (optional)</label>
                <textarea
                  placeholder="Enter delivery description"
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors text-sm font-medium resize-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Notes (optional)</label>
                <textarea
                  placeholder="Enter any additional notes"
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors text-sm font-medium resize-none"
                />
              </div>

            {/* Attachments */}
            <div>
              <label className="text-xs font-bold text-gray-900 mb-1.5 block uppercase tracking-wider">Attachments (optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <p className="text-xs font-bold text-gray-400">
                  <span className="text-gray-600">Click to Upload</span> or drag and drop
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button className="flex-1 h-11 bg-blue-600 rounded-xl font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-sm">
            Save Delivery
          </button>
        </div>
      </div>
    </>
  );
}
