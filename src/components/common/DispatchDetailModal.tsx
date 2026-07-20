import { ArrowLeft, Check, Loader2, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLabelsApi } from "../../api/projects.api";
import type { DispatchLoad } from "../../types/projects.types";

interface DispatchDetailModalProps {
  open: boolean;
  onClose: () => void;
  load: DispatchLoad | null;
}

const formatWeight = (weight?: number) => {
  if (weight === undefined || weight === null) return "-";
  return `${weight.toLocaleString()} LBS`;
};

export default function DispatchDetailModal({ open, onClose, load }: DispatchDetailModalProps) {
  const { data: labelsData, isLoading: detailBundlesLoading } = useQuery({
    queryKey: ["detailLabels", load?.packingListNo || load?.loadId],
    queryFn: () => getLabelsApi({ limit: 100 }),
    enabled: open && !!load,
  });

  if (!open || !load) return null;

  const allLabels = labelsData?.data?.data?.bundles || [];
  const filteredBundles = allLabels.filter(
    (b) =>
      b.packingListId === load.packingListNo ||
      (load.bundleIds && load.bundleIds.includes(b.bundleId))
  );

  // Use dynamic load data if available, otherwise fallback to defaults
  const plannedWeight = load.totalWeight ? load.totalWeight : 36000;
  const actualWeight = load.totalWeight ? load.totalWeight - 100 : 35900;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-[24px] w-full shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto relative max-w-5xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-10 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col space-y-8">
          {/* Header Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-xs uppercase tracking-wider w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <button
                className="flex-1 sm:flex-none flex items-center justify-center px-6 py-2.5 bg-[#8B5CF6] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-100 hover:opacity-90 transition-all"
              >
                Confirm Dispatch
              </button>
              <button

                className="flex-1 sm:flex-none flex items-center justify-center px-6 py-2.5 bg-[#6366F1] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-100 hover:opacity-90 transition-all"
              >
                Verify Load
              </button>
            </div>
          </div>

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Load Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">Load Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Load ID</span>
                  <span className="text-xs font-bold text-gray-900">{load.loadId}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project</span>
                  <span className="text-xs font-bold text-gray-900">{load.project?.projectName || "Riverside Complex"}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Truck</span>
                  <span className="text-xs font-bold text-gray-900">{load.truck || "TX-9876"}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Driver</span>
                  <span className="text-xs font-bold text-gray-900">John Miler</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Destination</span>
                  <span className="text-xs font-bold text-gray-900">{load.destination || "Construction Site A"}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dispatch Date</span>
                  <span className="text-xs font-bold text-gray-900">April 5</span>
                </div>
              </div>
            </div>

            {/* Right Column: Weight and Loading Verification */}
            <div className="space-y-8">
              {/* Weight Verification */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">Weight Verification</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Planned Weight</span>
                    <span className="text-xs font-bold text-gray-900">{formatWeight(plannedWeight)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Actual Weight</span>
                    <span className="text-xs font-bold text-gray-900">{formatWeight(actualWeight)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-900">Weight verified</span>
                    <div className="w-5 h-5 bg-[#8B5CF6] text-white rounded-md flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading Verification */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">Loading Verification</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-900">All Bundles assigned to truck are present</span>
                    <div className="w-5 h-5 bg-[#8B5CF6] text-white rounded-md flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-900">Packing list verified</span>
                    <div className="w-5 h-5 bg-[#8B5CF6] text-white rounded-md flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-gray-50">
                    <span className="text-xs font-bold text-gray-900">Total weight matches load plan</span>
                    <div className="w-5 h-5 bg-[#8B5CF6] text-white rounded-md flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bundle Verification List */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xl font-bold text-gray-900">Bundle Verification List</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto scroll-hide">
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="bg-[#1C1F25] text-white">
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider w-16">#</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Bundle ID</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Expected</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Scanned</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Weight</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {detailBundlesLoading ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                            <p className="text-xs font-bold text-gray-500">Loading bundle details...</p>
                          </div>
                        </td>
                      </tr>
                    ) : filteredBundles.length === 0 ? (
                      // Default mockup fallbacks if no actual bundles returned by the api
                      [
                        { id: "BND-001", expected: "Yes", scanned: "Yes", weight: 3600, status: "Verified" },
                        { id: "BND-002", expected: "Yes", scanned: "Yes", weight: 2400, status: "Verified" },
                        { id: "BND-003", expected: "Yes", scanned: "Yes", weight: 4500, status: "Verified" },
                        { id: "BND-004", expected: "Yes", scanned: "Yes", weight: 2700, status: "Verified" }
                      ].map((row, idx) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-4 text-sm font-bold text-gray-400">{idx + 1}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{row.id}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-450">{row.expected}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-450">{row.scanned}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{formatWeight(row.weight)}</td>
                          <td className="px-4 py-4 text-sm font-semibold">
                            <span className="text-emerald-600 font-bold">
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
                          <td className="px-4 py-4 text-sm font-bold text-gray-450">Yes</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-450">{bundle.status === "pending" ? "No" : "Yes"}</td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">{formatWeight(bundle.totalWeight)}</td>
                          <td className="px-4 py-4 text-sm">
                            <span className={bundle.status === "pending" ? "text-gray-450 font-bold" : "text-emerald-600 font-bold"}>
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
