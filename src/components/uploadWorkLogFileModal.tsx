import { useRef, useState } from "react";
import UploadIcon from "../assets/uploadicon copy.svg";
import CloseIcon from "../assets/closeicon.svg";

const allowedTypes = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const maxSizeMB = 50;

type UploadWorkLogFileModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    file: File;
  }) => void;
};

export default function UploadWorkLogFileModal({
  open,
  onClose,
  onSubmit,
}: UploadWorkLogFileModalProps) {
  if (!open) return null;

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    setError(null);

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only CSV or Excel files are allowed");
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setError("Please upload a file");
      return;
    }

    onSubmit({ file });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[96%] max-w-[486px] bg-white rounded-xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:px-6 px-3 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#111827]">
            Upload Drawings & Images
          </h2>
          <img
            src={CloseIcon}
            alt="close"
            className="w-3 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="p-6 space-y-3">
          <div
            className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center cursor-pointer"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <img src={UploadIcon} alt="" />

              {!file ? (
                <>
                  <p className="text-sm text-[#6B7280]">
                    Drop your file here
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    or click to browse
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-[#111827]">
                    {file.name}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                    {new Date().toLocaleDateString("en-GB")}
                  </p>
                </>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xls,.xlsx"
              className="hidden"
              onChange={handleChange}
            />
          </div>

          {error ? (
            <p className="text-xs text-red-500">{error}</p>
          ) : (
            <p className="text-xs text-[#9CA3AF]">
              Supported formats: CSV, Excel (.xlsx, .xls)
              <br />
              Required columns: Company, Contact, Email
            </p>
          )}
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#F3F4F6]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-[#2563EB] text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
