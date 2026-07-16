import React from "react";
import { X, Download, FileSpreadsheet, FileText } from "lucide-react";

type MaterialRequestDetailsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function MaterialRequestDetailsModal({
  open,
  onClose,
}: MaterialRequestDetailsModalProps) {
  if (!open) return null;

  const items = [
    { id: 1, desc: "Steel Beans", unit: "kg", qty: "5,000", remarks: "For Ground Floor" },
    { id: 2, desc: "Cement 50 kg", unit: "Bags", qty: "300", remarks: "Ordinary Portland" },
    { id: 3, desc: "Rebar 12 mm", unit: "kg", qty: "3,000", remarks: "Fe 500" },
    { id: 4, desc: "Bricks (Red)", unit: "Nos", qty: "10,000", remarks: "Standard Quality" },
    { id: 5, desc: "Sand", unit: "CFT", qty: "500", remarks: "River Sand" },
    { id: 6, desc: "Gravel", unit: "CFT", qty: "400", remarks: "-" },
    { id: 7, desc: "Shuttering Plywood", unit: "Sheets", qty: "50", remarks: "18 mm" },
    { id: 8, desc: "Binding Wire", unit: "Kg", qty: "25", remarks: "GI Wire" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="bg-white rounded-xl w-full max-w-[650px] flex flex-col max-h-full shadow-xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Material Request Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-8 py-6 custom-scrollbar">
          {/* Status Badge */}
          <div className="mb-6 mt-2">
             <span className="bg-[#FFF8E6] text-[#D97706] px-3 py-1 rounded-md text-sm font-medium">
                Pending
              </span>
          </div>

          {/* Grid Details */}
          <div className="grid grid-cols-2 gap-y-6 mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Request ID</p>
              <p className="text-base font-bold text-gray-900">MR-2025-0031</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Priority</p>
              <span className="bg-[#FEF2F2] text-[#EF4444] px-3 py-1 rounded-md text-sm font-medium inline-block">
                High
              </span>
            </div>

            <div className="col-span-1">
              <p className="text-sm text-gray-500 mb-1">Project / Site</p>
              <p className="text-base font-bold text-gray-900">Downtown Office Complex</p>
              <p className="text-sm text-gray-500 mt-0.5">Construction Site A</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className="bg-[#FFF8E6] text-[#D97706] px-3 py-1 rounded-md text-sm font-medium inline-block">
                Pending
              </span>
            </div>

            <div className="grid grid-cols-3 col-span-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500 mb-1">Requested By</p>
                <p className="text-base font-bold text-gray-900">John Smith</p>
                <p className="text-sm text-gray-500">Site Engineer</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Request Date</p>
                <p className="text-base font-bold text-gray-900">May 19,2025</p>
                <p className="text-sm text-gray-500">04:30 PM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Required By</p>
                <p className="text-base font-bold text-gray-900">May 22,2025</p>
              </div>
            </div>
          </div>

          {/* Requested Items */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Requested Items (8)</h3>
            <div className="overflow-x-auto overflow-visible">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-900 border-b border-gray-100">
                    <th className="pb-3 pr-4 font-bold">#</th>
                    <th className="pb-3 pr-6 font-bold">Item Description</th>
                    <th className="pb-3 pr-6 font-bold">Unit</th>
                    <th className="pb-3 pr-6 font-bold">Requested Qty</th>
                    <th className="pb-3 font-bold">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="py-4 text-gray-500">{item.id}</td>
                      <td className="py-4 text-gray-600 pr-6">{item.desc}</td>
                      <td className="py-4 text-gray-500 pr-6">{item.unit}</td>
                      <td className="py-4 text-gray-600 pr-6">{item.qty}</td>
                      <td className="py-4 text-gray-500">{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Request Notes */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-2">Request Notes</h3>
            <p className="text-sm text-gray-500">
              Additional materials required for columns ans slab casting on ground floor.
            </p>
          </div>

          {/* Attachments */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-gray-900 mb-3">Attachment (2)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AttachmentItem icon={<FileSpreadsheet className="w-5 h-5 text-emerald-600" />} name="Material_List_xlsx" size="12KB" color="bg-emerald-50" />
              <AttachmentItem icon={<FileText className="w-5 h-5 text-red-500" />} name="Site_Drawing.Pdf" size="2.4 MB" color="bg-red-50" />
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-8 flex justify-center">
            <button className="px-12 py-2.5 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 transition-colors">
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttachmentItem({ icon, name, size, color }: { icon: React.ReactNode, name: string, size: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-gray-700 truncate">{name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{size}</p>
        </div>
      </div>
      <div className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors ml-1">
        <Download className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
      </div>
    </div>
  );
}

