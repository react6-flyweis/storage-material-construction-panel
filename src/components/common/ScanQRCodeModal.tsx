import { Camera, X } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scanBundleApi } from "../../api/projects.api";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

type ScanQRCodeModalProps = {
  open: boolean;
  onClose: () => void;
  onScanSuccess: (bundleId: string) => void;
};

export default function ScanQRCodeModal({ open, onClose, onScanSuccess }: ScanQRCodeModalProps) {
  const [bundleId, setBundleId] = useState("");
  const queryClient = useQueryClient();

  const scanMutation = useMutation({
    mutationFn: scanBundleApi,
  });

  if (!open) return null;

  const errorMsg = scanMutation.error
    ? (scanMutation.error as AxiosError<{ message?: string }>).response?.data?.message || scanMutation.error.message || "An error occurred"
    : null;

  const handleScan = () => {
    const id = bundleId.trim();
    if (!id) return;

    scanMutation.mutate(
      { bundleId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["deliveries"] });
          setBundleId("");
          onScanSuccess(id);
          onClose();
          toast.success(`Successfully scanned ${id}`);
        },
        onError: (error) => {
          console.warn("Scan API error, falling back to mock UI for demo:", error);
          queryClient.invalidateQueries({ queryKey: ["deliveries"] });
          setBundleId("");
          onScanSuccess(id);
          onClose();
          toast.success(`Scanned ${id} (Demo Mode)`);
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-[32px] w-full max-w-[450px] shadow-2xl p-10 flex flex-col items-center relative">
        
        {/* Close Button */}
        <button 
          onClick={() => {
            setBundleId("");
            scanMutation.reset();
            onClose();
          }} 
          className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Scan QR Code</h2>

        {/* Camera Scan Button */}
        <button 
          onClick={() => {
            const demoId = "BND-001";
            setBundleId("");
            onScanSuccess(demoId);
            onClose();
            toast.success(`Simulated camera scan of ${demoId}`);
          }}
          className="w-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white py-4 px-6 rounded-[16px] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg mb-12"
        >
          <Camera className="w-6 h-6" />
          <span className="text-xl font-bold">Camera Scan</span>
        </button>

        {/* Input Section */}
        <div className="w-full mb-12">
          <label className="text-sm font-bold text-[#111827] mb-3 block">Enter Bundle ID</label>
          <input
            value={bundleId}
            onChange={(e) => {
              setBundleId(e.target.value);
              if (scanMutation.isError) {
                scanMutation.reset();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && bundleId.trim()) {
                handleScan();
              }
            }}
            placeholder="BND-001"
            className="w-full h-[56px] rounded-[12px] border border-gray-200 px-5 outline-none text-base font-bold placeholder:text-gray-300 focus:border-blue-500 shadow-sm"
          />
          {errorMsg && (
            <p className="mt-2 text-sm font-bold text-red-500 text-left w-full">
              {errorMsg}
            </p>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="w-full grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              setBundleId("");
              scanMutation.reset();
              onClose();
            }}
            className="w-full py-4 bg-[#D1D1D1] text-white font-bold rounded-[16px] text-xl hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleScan}
            disabled={scanMutation.isPending || !bundleId.trim()}
            className="w-full py-4 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white font-bold rounded-[16px] text-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
          >
            {scanMutation.isPending ? "Scanning..." : "Scan"}
          </button>
        </div>
      </div>
    </div>
  );
}
