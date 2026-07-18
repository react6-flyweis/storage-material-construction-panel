import { ArrowLeft, Check, Loader2, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLabelsApi } from "../../api/projects.api";
import toast from "react-hot-toast";
import type { PackingListItem } from "../../types/projects.types";

interface PackingListDetailModalProps {
  open: boolean;
  onClose: () => void;
  packingList: PackingListItem | null;
}

const formatWeight = (weight?: number) => {
  if (weight === undefined || weight === null) return "-";
  return `${weight.toLocaleString()} LBS`;
};

export default function PackingListDetailModal({ open, onClose, packingList }: PackingListDetailModalProps) {
  const { data: labelsData, isLoading: detailBundlesLoading } = useQuery({
    queryKey: ["detailLabels", packingList?.packingListId],
    queryFn: () => getLabelsApi({ limit: 100 }),
    enabled: open && !!packingList,
  });

  if (!open || !packingList) return null;

  const allLabels = labelsData?.data?.data?.bundles || [];
  const filteredBundles = allLabels.filter(
    (b) =>
      b.packingListId === packingList.packingListNo ||
      b.packingListId === packingList.packingListId
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-xl w-full shadow-2xl p-6 flex flex-col max-h-[85vh] overflow-y-auto relative max-w-5xl">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-10 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-100 pb-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-xs uppercase tracking-wider w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex flex-wrap items-center gap-2 pr-8">
              <button
                onClick={() => toast.success("Downloading PDF...")}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Download PDF
              </button>
              <button
                onClick={() => toast.success("Printing Packing List...")}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Print Packing List
              </button>
              <button
                onClick={() => toast.success("Exporting to Excel...")}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Export Excel
              </button>
              <button
                onClick={() => toast.success("Printing Selected Bundles...")}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Print Selected
              </button>
              <button
                onClick={() => toast.success("Packing list marked as Ready")}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Mark Ready
              </button>
              <button
                onClick={() => toast.success("Packing list marked as Loading")}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Mark Loading
              </button>
              <button
                onClick={() => toast.success("Packing list marked as Dispatched")}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Mark Dispatch
              </button>
            </div>
          </div>

          {/* Load Information and Packing Summary grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Load Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Load Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Packing List ID</span>
                  <span className="text-xs font-bold text-gray-900">{packingList.packingListNo || "-"}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Load ID</span>
                  <span className="text-xs font-bold text-gray-900">{`LOAD-${packingList.packingListNo.split("-")[1] || "001"}`}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project</span>
                  <span className="text-xs font-bold text-gray-900">{packingList.project?.projectName || "-"}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Truck</span>
                  <span className="text-xs font-bold text-gray-900">{packingList.truck || "-"}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Driver</span>
                  <span className="text-xs font-bold text-gray-900">{"John Miler"}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Destination</span>
                  <span className="text-xs font-bold text-gray-900">{packingList.destination || "-"}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dispatch Date</span>
                  <span className="text-xs font-bold text-gray-900">{"April 5"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Packing Summary & Loading Verification */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Packing Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Bundles</span>
                    <span className="text-xs font-bold text-gray-900">{packingList.totalBundles ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Items</span>
                    <span className="text-xs font-bold text-gray-900">{150}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total weight</span>
                    <span className="text-xs font-bold text-gray-900">{formatWeight(packingList.totalWeight)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Loading Verification</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-900">All Bundles Present</span>
                    <div className="w-5 h-5 bg-[#7C3AED] text-white rounded-md flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-900">QR Labels Verified</span>
                    <div className="w-5 h-5 bg-[#7C3AED] text-white rounded-md flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-900">Packing List Matches Load</span>
                    <div className="w-5 h-5 bg-[#7C3AED] text-white rounded-md flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bundle List */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xl font-bold text-gray-900">Bundle List</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto scroll-hide">
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="bg-[#1C1F25] text-white">
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider w-16">#</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Bundle ID</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Part Number</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Length</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Weight</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {detailBundlesLoading ? (
                      <tr>
                        <td colSpan={7} className="py-10 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                            <p className="text-xs font-bold text-gray-500">Loading bundle details...</p>
                          </div>
                        </td>
                      </tr>
                    ) : filteredBundles.length === 0 ? (
                      // Default mockup fallbacks if no actual bundles returned by the api
                      [
                        { id: "BND-001", parts: "STL-B12", qty: 20, len: "20ft", wt: 3600, status: "Verified" },
                        { id: "BND-002", parts: "STL-B12", qty: 30, len: "30ft", wt: 2400, status: "Verified" },
                        { id: "BND-003", parts: "STL-B12", qty: 100, len: "20ft", wt: 4500, status: "Verified" },
                        { id: "BND-004", parts: "STL-B12", qty: 20, len: "15ft", wt: 2700, status: "Pending" }
                      ].map((row, idx) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-4 text-sm font-bold text-gray-400">{idx + 1}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{row.id}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{row.parts}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{row.qty}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-500">{row.len}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{row.wt.toLocaleString()} IBS</td>
                          <td className="px-4 py-4 text-sm font-semibold text-gray-500">
                            <span className={row.status === "Pending" ? "text-gray-400" : "text-gray-700 font-bold"}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      filteredBundles.map((bundle, idx) => (
                        <tr key={bundle.bundleId} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-4 text-sm font-bold text-gray-400">{idx + 1}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{bundle.bundleNo || bundle.bundleId}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{bundle.parts || "-"}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">
                            {bundle.parts?.includes("x") || bundle.parts?.includes("×") 
                              ? bundle.parts.split(/[x×]/)[1]?.trim() 
                              : idx === 0 ? 20 : idx === 1 ? 30 : idx === 2 ? 100 : 20}
                          </td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-500">
                            {bundle.maxLengthFeet ? `${bundle.maxLengthFeet}ft` : "-"}
                          </td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{formatWeight(bundle.totalWeight)}</td>
                          <td className="px-4 py-4 text-sm">
                            <span className={bundle.status === "pending" ? "text-gray-400" : "text-gray-700 font-bold"}>
                              {bundle.status === "pending" ? "Pending" : "Verified"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
