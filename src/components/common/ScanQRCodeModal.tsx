import { Camera } from "lucide-react";

type ScanQRCodeModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ScanQRCodeModal({ open, onClose }: ScanQRCodeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-[32px] w-full max-w-[450px] shadow-2xl p-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Scan QR Code</h2>

        {/* Camera Scan Button */}
        <button className="w-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white py-4 px-6 rounded-[16px] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg mb-12">
          <Camera className="w-6 h-6" />
          <span className="text-xl font-bold">Camera Scan</span>
        </button>

        {/* Input Section */}
        <div className="w-full mb-12">
          <label className="text-sm font-bold text-[#111827] mb-3 block">Enter Bundle ID</label>
          <input
            placeholder="BND-001"
            className="w-full h-[56px] rounded-[12px] border border-gray-200 px-5 outline-none text-base font-bold placeholder:text-gray-300 focus:border-blue-500 shadow-sm"
          />
        </div>

        {/* Footer Buttons */}
        <div className="w-full grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="w-full py-4 bg-[#D1D1D1] text-white font-bold rounded-[16px] text-xl hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button className="w-full py-4 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white font-bold rounded-[16px] text-xl hover:opacity-90 transition-all shadow-lg">
            Scan
          </button>
        </div>
      </div>
    </div>
  );
}
