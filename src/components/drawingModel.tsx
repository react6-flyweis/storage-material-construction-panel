import { useRef, useState } from "react";
import UploadIcon from "../assets/uploadicon copy.svg";
import CloseIcon from "../assets/closeicon.svg";
import CustomSelect from "./common/CustomSelect";
import Modal from "./common/Modal";

const allowedTypes = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const maxSizeMB = 50;

type IssueReportingModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    file: File;
    projectCode: string;
    projectName: string;
  }) => void;
  requestId?: string | null;
};

const projectFilterOptions = [
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];

export default function DrawingModel({
  open,
  onClose,
  onSubmit,
}: IssueReportingModalProps) {

  const [status, setStatus] = useState("all");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;
  const selectedProject = projectFilterOptions.find(
    (p) => p.value === status
  );

  const handleFile = (selectedFile: File) => {
    setError(null);

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only CSV or Excel files are allowed");
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError("File size must be less than 10MB");
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setError("Please upload a file");
      return;
    }

    onSubmit?.({
      file,
      projectCode: status,
      projectName: selectedProject?.label ?? "New Project",
    });

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      containerClassName="max-w-[486px]"
    >
      <div className="lg:px-6 px-3 py-4 border-b flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-[#111827]">
          Upload Drawings & Images
        </h2>
        <img
          src={CloseIcon}
          alt=""
          className="w-3 cursor-pointer"
          onClick={onClose}
        />
      </div>

      <div className="p-6 space-y-3">
        <div
          className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center text-center gap-2 cursor-pointer"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex-1 flex flex-col gap-3 items-center justify-center">
            <div className="text-2xl">
              <img src={UploadIcon} alt="" />
            </div>

            {!file ? (
              <>
                <p className="text-sm text-[#6B7280]">Drop your file here</p>
                <p className="text-xs text-[#9CA3AF]">or click to browse</p>
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

          <div className="flex-1 flex justify-center items-center">
            <button
              type="button"
              className="mt-2 bg-[#2563EB] text-white px-6 py-2 rounded-lg text-sm"
            >
              Choose file
            </button>
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
          <p className="text-xs text-red-500 mt-2">{error}</p>
        ) : (
          <div className="text-xs text-[#9CA3AF] mt-2">
            Supported formats: CSV, Excel (.xlsx, .xls) <br />
            Required columns: Company, Contact, Email
          </div>
        )}

        <div>
          <label
            className="text-sm text-[#111827] mb-2 inline-block"
            htmlFor=""
          >
            Projects
          </label>
          <CustomSelect
            title="All Projects"
            options={projectFilterOptions}
            value={status}
            onChange={setStatus}
            width="100%"
            upperSide
            searchable
          />
        </div>
      </div>

      <div className="px-6 py-4 border-t flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-[#F3F4F6] text-[#111827]"
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
    </Modal>
  );
}
