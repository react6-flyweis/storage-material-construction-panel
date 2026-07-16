import React from "react";
import { X, Truck, Package, MapPin, Calendar, Phone, Check, ArrowRight, Download, Warehouse } from "lucide-react";

type DeliveryDetailsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function DeliveryDetailsModal({ open, onClose }: DeliveryDetailsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-[24px] w-full max-w-[900px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3F69B0] rounded-full flex items-center justify-center text-white">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">Delivery Details</h2>
                <span className="bg-[#EF4444] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  High Priority
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-400">DEL-2001</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[75vh] custom-scrollbar">
          {/* Status Banner */}
          <div className="border border-[#3F69B0]/30 rounded-[15px] p-4 flex items-center justify-between mb-5 bg-[#F8FAFF]">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <p className="text-xs font-semibold text-[#3F69B0]">Current Status</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-[#FFC107] rounded-full" />
                  <p className="text-[10px] font-bold text-[#3F69B0] uppercase">ETA 10:45 AM</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#3F69B0]">In Transit to Plant</h3>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-gray-400">Staging Area</p>
              <h4 className="text-lg font-bold text-gray-900">Yard-A</h4>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="border border-[#3F69B0]/20 rounded-[15px] p-4 mb-5 bg-gray-50/30">
            <div className="grid grid-cols-5 gap-y-3">
              {[
                { label: "Scheduled", status: "completed" },
                { label: "Material Prepared", status: "completed" },
                { label: "Loaded", status: "completed" },
                { label: "Picked Up", status: "completed" },
                { label: "In Transit", status: "current" },
                { label: "Arrived at Plant", status: "pending" },
                { label: "Staged", status: "pending" },
                { label: "Dispatched to Site", status: "pending" },
                { label: "Delivered", status: "pending" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="flex-shrink-0">
                    {step.status === "completed" ? (
                      <Check className="w-3 h-3 text-gray-900 stroke-[4]" />
                    ) : step.status === "current" ? (
                      <div className="w-3 h-3 bg-[#FFC107] rounded-full border border-white shadow-sm" />
                    ) : (
                      <div className="w-3 h-3 border border-[#3F69B0] rounded-full" />
                    )}
                  </div>
                  <span className={`text-[12px] font-bold ${step.status === "pending" ? "text-[#3F69B0]/60" : "text-[#3F69B0]"}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Flow */}
          <div className="bg-[#F0F9FF] border border-[#BEE3F8]/50 rounded-[15px] p-4 mb-6">
            <p className="text-sm font-bold text-gray-900 mb-4 tracking-tight">Delivery Flow</p>
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#3182CE] rounded-full flex items-center justify-center text-white">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Origin</p>
                  <p className="text-sm font-bold text-gray-900 leading-none">FastFreight</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#22C55E] rounded-full flex items-center justify-center text-white">
                  <Warehouse className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Plant</p>
                  <p className="text-sm font-bold text-gray-900 leading-none">Yard-A</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F97316] rounded-full flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Destination</p>
                  <p className="text-sm font-bold text-gray-900 leading-none">Site A</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Material Information */}
            <div>
              <h5 className="text-sm font-bold text-gray-900 mb-3 tracking-tight">Material Information</h5>
              <div className="space-y-3">
                <DetailItem icon={<Package />} label="Material" value="Primary Frame Steel" color="bg-purple-50 text-purple-600" />
                <DetailItem icon={<MapPin />} label="Project" value="Logistics Warehouse" color="bg-blue-50 text-blue-600" />
                <DetailItem icon={<Package />} label="Quantity" value="45,000 lbs" color="bg-orange-50 text-orange-600" />
              </div>
            </div>

            {/* Plant Schedule */}
            <div>
              <h5 className="text-sm font-bold text-gray-900 mb-3 tracking-tight">Plant Schedule</h5>
              <div className="space-y-3">
                <DetailItem icon={<Calendar />} label="Arrival" value="Mar 24, 10:00 AM" color="bg-green-50 text-green-600" />
                <DetailItem icon={<Calendar />} label="Departure" value="Mar 24, 02:00 PM" color="bg-orange-50 text-orange-600" />
              </div>
            </div>

            {/* Carrier & Route */}
            <div>
              <h5 className="text-sm font-bold text-gray-900 mb-3 tracking-tight">Carrier & Route</h5>
              <div className="space-y-3">
                <DetailItem icon={<Truck />} label="Carrier" value="FastFreight" color="bg-blue-50 text-blue-600" />
                <DetailItem icon={<Truck />} label="Driver: John" value="" color="bg-blue-50 text-blue-600" hideLabel />
                <DetailItem icon={<Phone />} label="Ph: +1 555-812" value="" color="bg-blue-50 text-blue-600" hideLabel />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Weight Units */}
            <div>
              <h5 className="text-sm font-bold text-gray-900 mb-3 tracking-tight">Material Info</h5>
              <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-[12px] p-3">
                <p className="text-xs font-bold text-gray-700">45,000 lbs • Structural Steel</p>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider leading-tight">Bundled Components</p>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h5 className="text-sm font-bold text-gray-900 mb-3 tracking-tight">Documents</h5>
              <div className="flex gap-3">
                <DocumentButton label="Packing list" />
                <DocumentButton label="Bill of loading" />
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-6">
            <h5 className="text-sm font-bold text-gray-900 mb-3 tracking-tight">Special Instructions</h5>
            <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-[12px] p-3">
              <p className="text-xs font-bold text-gray-700 italic tracking-tight">Requires forklift for unloading</p>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-1.5 border border-gray-200 rounded-[8px] text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors tracking-tight uppercase"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value, color, hideLabel = false }: { icon: React.ReactNode, label: string, value: string, color: string, hideLabel?: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 ${color} rounded-[10px] flex items-center justify-center flex-shrink-0`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5" })}
      </div>
      <div>
        {hideLabel ? (
          <p className="text-sm font-bold text-gray-700">{label}</p>
        ) : (
          <>
            <p className="text-[11px] font-bold text-gray-400 uppercase leading-tight">{label}</p>
            <p className="text-sm font-bold text-gray-700">{value}</p>
          </>
        )}
      </div>
    </div>
  );
}

function DocumentButton({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-between gap-4 px-4 py-3 border-[1.5px] border-[#3F69B0]/30 rounded-[12px] bg-[#F8FAFF] hover:bg-blue-50 transition-colors w-full">
      <span className="text-sm font-bold text-gray-700">{label}</span>
      <Download className="w-5 h-5 text-gray-700" />
    </button>
  );
}
