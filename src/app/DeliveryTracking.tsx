import {
  Info,
  Truck,
  Package,
  CheckSquare,
  ChevronDown,
  Download,
  MapPin,
  Calendar,
  User,
  Clock,
  QrCode,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import UpdateSiteContactModal from "../components/common/UpdateSiteContactModal";
import ScanQRCodeModal from "../components/common/ScanQRCodeModal";
import DeliveryDetailsModal from "../components/materials/DeliveryDetailsModal";
import AddDeliveryDrawer from "../components/materials/AddDeliveryDrawer";

export default function DeliveryTracking() {
  const [updateContactOpen, setUpdateContactOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addDeliveryOpen, setAddDeliveryOpen] = useState(false);

  const stats = [
    { label: "In Transit", value: 1, icon: <Truck className="w-5 h-5" />, bg: "bg-[#1D51A4]", sub: "Arriving at Plant" },
    { label: "Staged", value: 1, icon: <Package className="w-5 h-5" />, bg: "bg-[#3AB449]", sub: "At Plant/Yard" },
    { label: "Ready", value: 1, icon: <CheckSquare className="w-5 h-5" />, bg: "bg-[#F97316]", sub: "For Departure" },
    { label: "Total Today", value: 4, icon: <Package className="w-5 h-5" />, bg: "bg-[#4B5563]", sub: "All Deliveries" },
  ];

  const deliveries = [
    {
      id: "DEL-2001",
      title: "Primary Frame Steel",
      subtitle: "ABC Logistics Warehouse",
      badges: [
        { label: "In Transit to Plant", bg: "bg-[#1D51A4] text-white" },
        { label: "High Priority", bg: "bg-red-500 text-white" },
        { label: "ETA 45 min", bg: "bg-[#FEFCE8] text-yellow-700", icon: <Clock className="w-3 h-3" /> },
      ],
      material: { qty: "45,000 lbs", area: "Yard-A" },
      schedule: { arrival: "Mar 24, 10:00 AM", departure: "Mar 24, 02:00 PM" },
      carrier: { name: "FastFreight Logistics", address: "Construction Site A" },
      truck: { id: "TX-4582", driver: "John Miller", phone: "+1 555-812-9921" },
      notes: "Fragile - handle with care",
    },
    {
        id: "DEL-2002",
        title: "Glass Panels",
        subtitle: "Downtown Office Complex",
        badges: [
          { label: "Staged at Plant", bg: "bg-[#3AB449] text-white" },
          { label: "Delayed 30 minutes", bg: "bg-[#FEFCE8] text-yellow-700", icon: <Clock className="w-3 h-3" /> },
        ],
        material: { qty: "8,500 lbs", area: "Warehouse-2" },
        schedule: { arrival: "Mar 24, 08:30 AM", departure: "Mar 24, 11:00 AM" },
        carrier: { name: "Regional Freight", address: "Construction Site B" },
        truck: { id: "TX-4582", driver: "John Miller", phone: "+1 555-812-9921" },
        notes: "Fragile - handle with care",
    },
    {
        id: "DEL-2003",
        title: "Concrete Blocks",
        subtitle: "Industrial Park Phase 2",
        badges: [
          { label: "Scheduled", bg: "bg-gray-400 text-white" },
        ],
        material: { qty: "15,000 lbs", area: "Yard-B" },
        schedule: { arrival: "Mar 25, 09:00 AM", departure: "Mar 25, 01:00 PM" },
        carrier: { name: "Local Delivery Services", address: "Construction Site C" },
        truck: { id: "TX-4582", driver: "John Miller", phone: "+1 555-812-9921" },
        notes: "Standard handling",
    },
    {
        id: "DEL-2004",
        title: "Roll-up Doors (3 units)",
        subtitle: "ABC Logistics Warehouse",
        badges: [
          { label: "Ready for Departure", bg: "bg-[#F97316] text-white" },
          { label: "High Priority", bg: "bg-red-500 text-white" },
        ],
        material: { qty: "2,500 lbs", area: "Warehouse-1" },
        schedule: { arrival: "Mar 23, 03:00 PM", departure: "Mar 24, 07:00 AM" },
        carrier: { name: "QuickTransport Co.", address: "Construction Site A" },
        truck: { id: "TX-4582", driver: "John Miller", phone: "+1 555-812-9921" },
        notes: "Pickup scheduled for tomorrow",
    },
  ];

  return (
    <div className="mx-auto pb-10 space-y-6">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Delivery Tracking
          </h1>
          <p className="text-[13px] font-bold text-gray-500">
            Read-only view of deliveries routed through plant/yard/warehouse
          </p>
        </div>
        <button
          onClick={() => setAddDeliveryOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#1D51A4] text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-blue-800 transition-all shadow-lg shadow-blue-200"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Delivery
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`${stat.bg} rounded-xl p-4 text-white flex justify-between items-center shadow-lg shadow-blue-200/20`}
          >
            <div>
              <p className="text-[9px] font-bold opacity-70 uppercase mb-0.5 tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold mb-0.5 tracking-tight">{stat.value}</h3>
              <p className="text-[9px] font-bold opacity-60 italic">{stat.sub}</p>
            </div>
            <div className="p-2.5 bg-white/20 rounded-lg">
              {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-4 h-4" })}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <ChevronDown className="w-4 h-4" />
            Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <p className="sm:ml-auto text-xs font-bold text-gray-400 italic">
          Last updated: Just now
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#EFF6FF] border border-blue-100 rounded-[18px] p-4 flex items-start gap-3 shadow-sm">
        <div className="p-1.5 bg-blue-100 rounded-lg shrink-0">
          <Info className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-blue-900 mb-0.5 uppercase tracking-tight">
            Read-Only Access
          </h4>
          <p className="text-[11px] font-bold text-blue-700 leading-relaxed opacity-80">
            This is a read-only view for plant coordination. You can view deliveries routed through the plant/yard/warehouse but cannot modify delivery information.
          </p>
        </div>
      </div>

      {/* Delivery Cards */}
      <div className="space-y-6">
        {deliveries.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-[20px] shadow-sm border border-gray-50 overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1D51A4] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 flex-shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-tight">
                        {item.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.badges.map((badge, j) => (
                          <span
                            key={j}
                            className={`${badge.bg} text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1`}
                          >
                            {badge.icon && React.cloneElement(badge.icon as React.ReactElement<any>, { className: "w-2.5 h-2.5" })}
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">{item.subtitle}</p>
                      </div>
                      <span className="hidden sm:inline text-gray-200">|</span>
                      <p className="text-[10px] font-bold text-gray-900 leading-none">ID: {item.id}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setDetailsOpen(true)} className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-50 rounded-lg text-[9px] font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-100 transition-all shadow-sm w-full lg:w-auto">
                  <CheckSquare className="w-3.5 h-3.5" />
                  View Details
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div>
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-wider">
                    Material Details
                  </h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Quantity</p>
                        <p className="text-[13px] font-bold text-gray-900">
                          {item.material.qty}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                          Staging Area
                        </p>
                        <p className="text-[13px] font-bold text-gray-900">
                          {item.material.area}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-wider">
                    Schedule
                  </h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                          Arrival
                        </p>
                        <p className="text-[13px] font-bold text-gray-900">
                          {item.schedule.arrival}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                          Departure
                        </p>
                        <p className="text-[13px] font-bold text-gray-900">
                          {item.schedule.departure}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-wider">
                    Carrier & Route
                  </h5>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                          Carrier
                        </p>
                        <p className="text-[13px] font-bold text-gray-900 leading-tight">
                          {item.carrier.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                          Destination
                        </p>
                        <p className="text-[13px] font-bold text-gray-900 leading-tight">
                          {item.carrier.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                      <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-wider">
                      Notes
                      </h5>
                      <div className="bg-[#FFFBEB] border border-yellow-100 rounded-xl p-3.5">
                      <p className="text-[11px] font-bold text-yellow-800 leading-tight">
                          {item.notes}
                      </p>
                      </div>
                  </div>
                  <div>
                      <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Truck className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Truck</p>
                                  <p className="text-[8px] font-bold text-gray-900 leading-none">{item.truck.id}</p>
                                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Driver</p>
                                  <p className="text-[8px] font-bold text-gray-900 leading-none">{item.truck.driver}</p>
                                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                                  <p className="text-[8px] font-bold text-gray-900 leading-none">{item.truck.phone}</p>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <button className="bg-[#10B981] text-white py-3 rounded-xl text-[9px] font-bold uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5" />
                  Mark as Received
                </button>
                <button onClick={() => setScanOpen(true)} className="bg-[#F97316] text-white py-3 rounded-xl text-[9px] font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2">
                  <QrCode className="w-3.5 h-3.5" />
                  Scan QR Code
                </button>
                <button className="bg-[#1D51A4] text-white py-3 rounded-xl text-[9px] font-bold uppercase tracking-wider hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                  <Info className="w-3.5 h-3.5" />
                  Partial Received
                </button>
              </div>

              {/* Links Footer */}
              <div className="flex items-center gap-3 border-t border-gray-50 pt-6">
                <button
                  onClick={() => setUpdateContactOpen(true)}
                  className="flex items-center gap-2 text-[9px] font-bold text-[#8B5CF6] border border-purple-50 rounded-lg px-4 py-2 uppercase tracking-wider hover:bg-purple-50 transition-all"
                >
                  <User className="w-3.5 h-3.5" />
                  Update Site Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <UpdateSiteContactModal
        open={updateContactOpen}
        onClose={() => setUpdateContactOpen(false)}
      />
      <ScanQRCodeModal open={scanOpen} onClose={() => setScanOpen(false)} />
      <DeliveryDetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} />
      <AddDeliveryDrawer open={addDeliveryOpen} onClose={() => setAddDeliveryOpen(false)} />
    </div>
  );
}
