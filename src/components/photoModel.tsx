import { useRef, useState } from "react";
import cameraicon from "../assets/uploadcameraicon.svg";

type IssueReportingModalProps = {
  open: boolean;
  onClose: () => void;
  requestId?: string | null;
  onUpload: (
    file: File,
    preview: string,
    requestId?: string | null
  ) => void;
};


export default function PhotoModel({
  open,
  onClose,
  onUpload,
  requestId,
}: IssueReportingModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (!open) return null;

const handleFileChange = (file: File) => {
  setError("");

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    setError("Only JPG and PNG files are allowed");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    setError("File size should be less than 10MB");
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  setPreview(previewUrl);

  onUpload(file, previewUrl, requestId);
};


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="md:max-w-[640px] w-[96%] bg-white rounded-xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:px-6 px-3 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#111827]">
            Send Photo
          </h2>
        </div>

        <div className="p-6 space-y-3">
          <p>Upload Photo</p>

          <div
            className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="max-h-[200px] rounded-lg object-contain"
              />
            ) : (
              <div className="flex flex-col gap-3 items-center">
                <img src={cameraicon} alt="" className="w-10" />
                <p className="text-sm text-[#6B7280]">
                  Click to upload photos or drag and drop
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  PNG, JPG up to 10MB
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileChange(file);
              }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#F3F4F6] text-[#111827]"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#2563EB] text-white"
            disabled={!preview}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
