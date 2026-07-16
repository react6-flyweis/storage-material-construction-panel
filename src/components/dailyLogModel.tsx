import { useState } from "react";
import CustomSelect from "./common/CustomSelect";
import UploadCameraIcon from "../assets/uploadcameraicon.svg";

type DailyLogModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void; // parent ko data bhejne ke liye
};

const projectOptions = [
  { label: "Downtown Office Complex", value: "Downtown Office Complex" },
  { label: "Residential Tower A", value: "Residential Tower A" },
  { label: "Shopping Mall Renovation", value: "Shopping Mall Renovation" },
  { label: "Industrial Warehouse", value: "Industrial Warehouse" },
];

const taskOptions = [
  { label: "Foundation Work", value: "Foundation Work" },
  { label: "Electrical Installation", value: "Electrical Installation" },
  { label: "Plumbing Work", value: "Plumbing Work" },
  { label: "Roofing", value: "Roofing" },
];

export default function DailyLogModel({
  open,
  onClose,
  onSubmit,
}: DailyLogModalProps) {
  if (!open) return null;

  // ✅ individual states
  const [date, setDate] = useState("");
  const [project, setProject] = useState("All Projects");
  const [task, setTask] = useState("All Tasks");
  const [progress, setProgress] = useState("");
  const [description, setDescription] = useState("");
  const [issues, setIssues] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [error, setError] = useState("");

  // ✅ handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop()?.toLowerCase();
      if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        setFile(selectedFile);
      } else {
        alert("Only PNG and JPG files are allowed!");
      }
    }
  };

  const handleSubmit = () => {
    if (
      !date ||
      !project ||
      !task ||
      !progress ||
      !description.trim() ||
      !issues.trim()
    ) {
      setError("Please fill all required fields!");
      return;
    }

    const data = {
      date,
      project,
      task,
      progress,
      description,
      issues,
      fileName: file?.name || null,
    };

    onSubmit(data);
    onClose();

    // reset all
    setDate("");
    setProject("All Projects");
    setTask("All Tasks");
    setProgress("");
    setDescription("");
    setIssues("");
    setFile(null);
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[96%] max-h-[98vh] max-w-[550px] bg-white rounded-xl shadow-lg overflow-auto scroll-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:px-6 px-3 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#111827]">
            Daily Work Log
          </h2>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <div className="px-6 py-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827]">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Project
              </label>
              <CustomSelect
                title="Select Project"
                options={projectOptions}
                value={project}
                onChange={setProject}
                width="100%"
                searchable
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Task
              </label>
              <CustomSelect
                title="Select Task"
                options={taskOptions}
                value={task}
                onChange={setTask}
                width="100%"
                searchable
              />
            </div>

            <div>
              <label className="text-sm text-[#111827]">Progress (%)</label>
              <input
                type="number"
                value={progress}
                max={100}
                min={0}
                placeholder="Enter"
                className="mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm"
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value <= 100) {
                    setProgress(e.target.value);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#111827]">Work Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the work completed today..."
              rows={4}
              className="mt-2 w-full rounded-[8px] border px-4 py-3 outline-none resize-none text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-[#111827]">Upload Photos</label>
            <div
              className="border-2 border-dashed rounded-lg mt-2 p-6 flex flex-col items-center justify-center text-center gap-2 cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {file ? (
                <p className="text-sm mt-2">{file.name}</p>
              ) : (
                <>
                  <img
                    src={UploadCameraIcon}
                    alt=""
                    className="text-2xl mb-1"
                  />
                  <p className="text-sm text-[#6B7280]">
                    Click to upload photos or drag and drop
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    PNG,JPG up to 10MB each
                  </p>
                </>
              )}

              <input
                id="fileInput"
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#111827]">Issues/Notes</label>
            <textarea
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
              placeholder="Any issues, delays, or important notes..."
              rows={4}
              className="mt-2 w-full rounded-[8px] border px-4 py-3 outline-none resize-none text-sm"
            />
          </div>
        </div>

        <div className="px-6 py-3 border-t flex justify-end gap-3">
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
