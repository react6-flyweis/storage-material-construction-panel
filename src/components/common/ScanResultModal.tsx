import { Check, ArrowLeft, X } from "lucide-react";
import toast from "react-hot-toast";

type ScanResultModalProps = {
  open: boolean;
  onClose: () => void;
  bundleId: string;
  onBack?: () => void;
};

const mockBundlesData: Record<string, {
  bundleId: string;
  project: string;
  loadId: string;
  truck: string;
  destination: string;
  parts: string;
  quantity: number;
  weight: string;
  length: string;
  shipper: string;
  driver: string;
  totalBundles: number;
  list: Array<{ id: string; parts: string; time: string; weight: string; status: string }>;
}> = {
  "BND-001": {
    bundleId: "BND-001",
    project: "Riverside Complex",
    loadId: "LOAD-001",
    truck: "TX-9876",
    destination: "Construction Site A",
    parts: "STL-B12",
    quantity: 30,
    weight: "36,000 IBS",
    length: "20 ft",
    shipper: "shipper=SHP-1044",
    driver: "John Miler",
    totalBundles: 4,
    list: [
      { id: "BND-001", parts: "STL-B12 × 30", time: "10:32 AM", weight: "3600 IBS", status: "Staged" },
      { id: "BND-002", parts: "STL-B12 × 30", time: "-", weight: "2400 IBS", status: "Pending" },
      { id: "BND-003", parts: "STL-B12 × 30", time: "-", weight: "4500 IBS", status: "Pending" },
      { id: "BND-004", parts: "STL-B12 × 30", time: "-", weight: "2700 IBS", status: "Pending" }
    ]
  },
  "BND-002": {
    bundleId: "BND-002",
    project: "Riverside Complex",
    loadId: "LOAD-001",
    truck: "TX-9876",
    destination: "Construction Site A",
    parts: "STL-B12",
    quantity: 30,
    weight: "24,000 IBS",
    length: "20 ft",
    shipper: "shipper=SHP-1044",
    driver: "John Miler",
    totalBundles: 4,
    list: [
      { id: "BND-001", parts: "STL-B12 × 30", time: "10:32 AM", weight: "3600 IBS", status: "Staged" },
      { id: "BND-002", parts: "STL-B12 × 30", time: "10:35 AM", weight: "2400 IBS", status: "Staged" },
      { id: "BND-003", parts: "STL-B12 × 30", time: "-", weight: "4500 IBS", status: "Pending" },
      { id: "BND-004", parts: "STL-B12 × 30", time: "-", weight: "2700 IBS", status: "Pending" }
    ]
  },
  "BND-003": {
    bundleId: "BND-003",
    project: "Riverside Complex",
    loadId: "LOAD-001",
    truck: "TX-9876",
    destination: "Construction Site A",
    parts: "STL-B12",
    quantity: 30,
    weight: "45,000 IBS",
    length: "20 ft",
    shipper: "shipper=SHP-1044",
    driver: "John Miler",
    totalBundles: 4,
    list: [
      { id: "BND-001", parts: "STL-B12 × 30", time: "10:32 AM", weight: "3600 IBS", status: "Staged" },
      { id: "BND-002", parts: "STL-B12 × 30", time: "-", weight: "2400 IBS", status: "Pending" },
      { id: "BND-003", parts: "STL-B12 × 30", time: "10:40 AM", weight: "4500 IBS", status: "Staged" },
      { id: "BND-004", parts: "STL-B12 × 30", time: "-", weight: "2700 IBS", status: "Pending" }
    ]
  },
  "BND-004": {
    bundleId: "BND-004",
    project: "Riverside Complex",
    loadId: "LOAD-001",
    truck: "TX-9876",
    destination: "Construction Site A",
    parts: "STL-B12",
    quantity: 30,
    weight: "27,000 IBS",
    length: "20 ft",
    shipper: "shipper=SHP-1044",
    driver: "John Miler",
    totalBundles: 4,
    list: [
      { id: "BND-001", parts: "STL-B12 × 30", time: "10:32 AM", weight: "3600 IBS", status: "Staged" },
      { id: "BND-002", parts: "STL-B12 × 30", time: "-", weight: "2400 IBS", status: "Pending" },
      { id: "BND-003", parts: "STL-B12 × 30", time: "-", weight: "4500 IBS", status: "Pending" },
      { id: "BND-004", parts: "STL-B12 × 30", time: "10:42 AM", weight: "2700 IBS", status: "Staged" }
    ]
  }
};

const getBundleData = (id: string) => {
  const normalized = id.trim().toUpperCase();
  if (mockBundlesData[normalized]) {
    return mockBundlesData[normalized];
  }
  return {
    bundleId: normalized || "BND-001",
    project: "Riverside Complex",
    loadId: "LOAD-001",
    truck: "TX-9876",
    destination: "Construction Site A",
    parts: "STL-B12",
    quantity: 30,
    weight: "36,000 IBS",
    length: "20 ft",
    shipper: "shipper=SHP-1044",
    driver: "John Miler",
    totalBundles: 4,
    list: [
      { id: normalized || "BND-001", parts: "STL-B12 × 30", time: "10:32 AM", weight: "3600 IBS", status: "Staged" },
      { id: "BND-002", parts: "STL-B12 × 30", time: "-", weight: "2400 IBS", status: "Pending" },
      { id: "BND-003", parts: "STL-B12 × 30", time: "-", weight: "4500 IBS", status: "Pending" },
      { id: "BND-004", parts: "STL-B12 × 30", time: "-", weight: "2700 IBS", status: "Pending" }
    ]
  };
};

export default function ScanResultModal({ open, onClose, bundleId, onBack }: ScanResultModalProps) {
  if (!open) return null;

  const currentBundle = getBundleData(bundleId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 overflow-y-auto">
      <div className="bg-white rounded-xl w-full shadow-2xl p-6 flex flex-col max-h-[85vh] overflow-y-auto relative max-w-4xl">

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-10 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          {/* Header Action Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-100 pb-6 mb-6">
            <button
              onClick={onBack || onClose}
              className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => toast.success("Downloading bundle summary...")}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Download
              </button>
              <button
                onClick={() => toast.success("Reprint request queued for BND-" + currentBundle.bundleId)}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Reprint Label
              </button>
              <button
                onClick={() => toast.error("Mismatch report submitted.")}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Report Mismatch
              </button>
              <button
                onClick={() => toast.success("Bundle verified successfully!")}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Verify Bundle
              </button>
              <button
                onClick={() => toast.success("Bundle marked as Loaded!")}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Mark Loaded
              </button>
              <button
                onClick={() => toast.success("Bundle marked as Staged!")}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Mark Staged
              </button>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 mb-8">

            {/* Bundle Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bundle Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Bundle ID</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.bundleId}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Project</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.project}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Load ID</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.loadId}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Truck</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.truck}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Destination</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.destination}</span>
                </div>
              </div>
            </div>

            {/* Bundle Details */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bundle Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Parts</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.parts}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Quantity</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.quantity}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Weight</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.weight}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Length</span>
                  <span className="text-sm font-bold text-gray-900">{currentBundle.length}</span>
                </div>
              </div>
            </div>

          </div>

          {/* QR Code and Context Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 mb-8">

            {/* Scanned QR Code Panel */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scanned QR Code</h3>
              <div className="flex items-start gap-6">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="border border-gray-200 p-2 rounded-lg bg-white shadow-sm flex-shrink-0">
                  <rect x="10" y="10" width="30" height="30" stroke="black" strokeWidth="6" fill="none" />
                  <rect x="18" y="18" width="14" height="14" fill="black" />

                  <rect x="80" y="10" width="30" height="30" stroke="black" strokeWidth="6" fill="none" />
                  <rect x="88" y="18" width="14" height="14" fill="black" />

                  <rect x="10" y="80" width="30" height="30" stroke="black" strokeWidth="6" fill="none" />
                  <rect x="18" y="88" width="14" height="14" fill="black" />

                  <rect x="50" y="20" width="10" height="10" fill="black" />
                  <rect x="60" y="35" width="10" height="10" fill="black" />
                  <rect x="20" y="55" width="10" height="15" fill="black" />
                  <rect x="40" y="50" width="15" height="10" fill="black" />
                  <rect x="55" y="65" width="10" height="10" fill="black" />
                  <rect x="85" y="55" width="10" height="10" fill="black" />
                  <rect x="95" y="70" width="15" height="10" fill="black" />
                  <rect x="70" y="80" width="10" height="10" fill="black" />
                  <rect x="60" y="95" width="15" height="15" fill="black" />
                  <rect x="85" y="90" width="10" height="10" fill="black" />
                  <rect x="100" y="95" width="10" height="10" fill="black" />
                </svg>

                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-gray-900 mb-2 truncate">project={currentBundle.project.replace(/\s+/g, '')}</h4>
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-400 font-semibold truncate">Shipper : <span className="text-gray-800 font-bold">{currentBundle.shipper}</span></p>
                    <p className="text-gray-400 font-semibold truncate">Load : <span className="text-gray-800 font-bold">load_id={currentBundle.loadId}</span></p>
                    <p className="text-gray-400 font-semibold truncate">Bundle : <span className="text-gray-800 font-bold">bundle_id={currentBundle.bundleId}</span></p>
                    <p className="text-gray-400 font-semibold truncate">Parts : <span className="text-gray-800 font-bold">parts={currentBundle.parts}</span></p>
                    <p className="text-gray-400 font-semibold truncate">Weight : <span className="text-gray-800 font-bold">weight={currentBundle.weight.replace(/[^0-9]/g, '')}</span></p>
                    <p className="text-gray-400 font-semibold truncate">Length : <span className="text-gray-800 font-bold">Length={currentBundle.length.replace(/[^0-9]/g, '')}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Load Context Panel */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bundle Verification Status</h3>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 mb-4">
                  <span className="text-sm font-bold text-gray-900">Bundle assigned to load</span>
                  <Check className="w-5 h-5 text-gray-900 stroke-[3]" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Load Context Panel</h3>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Load ID</span>
                  <span className="text-right font-bold text-gray-900">{currentBundle.loadId}</span>

                  <span className="text-gray-400 font-bold uppercase tracking-wider">Truck</span>
                  <span className="text-right font-bold text-gray-900">{currentBundle.truck}</span>

                  <span className="text-gray-400 font-bold uppercase tracking-wider">Driver</span>
                  <span className="text-right font-bold text-gray-900">{currentBundle.driver}</span>

                  <span className="text-gray-400 font-bold uppercase tracking-wider">Total Bundles</span>
                  <span className="text-right font-bold text-gray-900">{currentBundle.totalBundles}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bundle List Table */}
          <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bundle List</h3>
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1C1F25] text-white">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider w-12">#</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Bundle ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Parts</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Weight</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {currentBundle.list.map((row, index) => {
                    const isScanned = row.id.toUpperCase() === currentBundle.bundleId.toUpperCase();
                    return (
                      <tr
                        key={row.id}
                        className={`hover:bg-gray-50/50 transition-colors ${isScanned ? "bg-blue-50/30" : ""
                          }`}
                      >
                        <td className="px-4 py-4 text-sm font-bold text-gray-400">{index + 1}</td>
                        <td className={`px-4 py-4 text-sm font-bold ${isScanned ? "text-[#1D51A4]" : "text-gray-700"}`}>
                          {row.id}
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-600">{row.parts}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-gray-500">{row.time}</td>
                        <td className="px-4 py-4 text-sm font-bold text-gray-700">{row.weight}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`font-bold ${row.status === "Staged" ? "text-gray-700" : "text-gray-400"
                            }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
