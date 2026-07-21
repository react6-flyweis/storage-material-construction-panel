import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { reportBundleMismatchApi } from "../../api/projects.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Modal from "./Modal";

type ReportMismatchModalProps = {
  open: boolean;
  onClose: () => void;
  bundleId: string;
  onSuccess: (message: string) => void;
};

export default function ReportMismatchModal({
  open,
  onClose,
  bundleId,
  onSuccess,
}: ReportMismatchModalProps) {
  const [mismatchNotes, setMismatchNotes] = useState("");

  const mismatchMutation = useMutation({
    mutationFn: (notes: string) => reportBundleMismatchApi(bundleId, { notes }),
    onSuccess: () => {
      onSuccess("Mismatch report submitted.");
      setMismatchNotes("");
      onClose();
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      toast.error(err?.response?.data?.message || "Failed to report mismatch");
    },
  });

  const handleClose = () => {
    onClose();
    setMismatchNotes("");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      containerClassName="max-w-md"
    >
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>

      <h3 className="text-lg font-bold text-gray-900 mb-4">Report Mismatch</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Mismatch Notes
          </label>
          <textarea
            placeholder="Describe the mismatch (e.g. Quantity received does not match packing list)..."
            rows={4}
            className="w-full rounded-lg border border-gray-200 p-3 outline-none resize-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            value={mismatchNotes}
            onChange={(e) => setMismatchNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={handleClose}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!mismatchNotes.trim()) {
              toast.error("Please enter mismatch notes");
              return;
            }
            mismatchMutation.mutate(mismatchNotes);
          }}
          disabled={mismatchMutation.isPending}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center min-w-[100px]"
        >
          {mismatchMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Report Now"
          )}
        </button>
      </div>
    </Modal>
  );
}
