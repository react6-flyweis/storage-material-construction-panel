import { useState } from "react";
import CustomSelect from "./common/CustomSelect";
import UploadIcon from "../assets/uploadicon copy.svg";
import { inputStyle } from "./projects/RecentProjects";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type IssueReportingModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate?: (data: any) => void;
};

const projectFilterOptions = [
  { label: "All Projects", value: "all" },
  { label: "Downtown Office Complex", value: "PRJ-001" },
  { label: "Residential Tower A", value: "PRJ-002" },
  { label: "Shopping Mall Renovation", value: "PRJ-003" },
  { label: "Industrial Warehouse", value: "PRJ-004" },
];

export default function IssueReportingModal({
  open,
  onClose,
  onCreate,
}: IssueReportingModalProps) {
  if (!open) return null;
  const [date, setDate] = useState<Dayjs | null>(null);
  const [project, setProject] = useState("PRJ-001");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [materialError, setMaterialError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [file, setFile] = useState<File | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          className="md:max-w-[640px] w-[96%] bg-white rounded-xl shadow-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="lg:px-6 px-3 py-4 border-b">
            <h2 className="text-lg font-semibold text-[#111827]">
              Issue Reporting
            </h2>
          </div>

          <div className="p-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#111827] inline-block mb-2">
                  Date
                </label>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: inputStyle,
                    },
                  }}
                />
              </div>

              <div>
                <label className="text-sm text-[#111827] inline-block mb-2">
                  Project
                </label>
                <CustomSelect
                  title="All Requests"
                  options={projectFilterOptions}
                  value={project}
                  onChange={setProject}
                  width="100%"
                  searchable
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#111827]">Material Name</label>
                <input
                  placeholder="e.g., Steel Beams"
                  className="mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm"
                  value={material}
                  onChange={(e) => {
                    setMaterial(e.target.value);
                    if (materialError) setMaterialError("");
                  }}
                />
                {materialError && (
                  <p className="text-xs text-red-500 mt-1">{materialError}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-[#111827]">Quantity</label>
                <input
                  placeholder="e.g., 50 units"
                  className="mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#111827]">Description</label>
              <textarea
                placeholder="Describe the material..."
                rows={4}
                className="mt-2 w-full rounded-[8px] border px-4 py-3 outline-none resize-none text-sm"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (descriptionError) setDescriptionError("");
                }}
              />
              {descriptionError && (
                <p className="text-xs text-red-500 mt-1">{descriptionError}</p>
              )}
            </div>

            <div className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center text-center gap-2 relative">
              <input
                type="file"
                hidden
                id="issue-file-upload"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) setFile(selected);
                }}
              />

              <div className="flex-1 flex flex-col gap-3 items-center justify-center">
                {file ? (
                  <>
                    <p className="text-sm font-medium text-[#111827]">
                      {file.name}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl">
                      <img src={UploadIcon} alt="" />
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      Drop your file here
                    </p>
                    <p className="text-xs text-[#9CA3AF]">or click to browse</p>
                  </>
                )}
              </div>

              <div className="flex-1 flex justify-center items-center">
                <button
                  onClick={() =>
                    document.getElementById("issue-file-upload")?.click()
                  }
                  className="mt-2 bg-[#6B7280] text-white px-6 py-2 rounded-lg text-sm"
                >
                  Choose file
                </button>
              </div>
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
              onClick={() => {
                let hasError = false;

                if (!material.trim()) {
                  setMaterialError("Material name is required");
                  hasError = true;
                }

                if (!description.trim()) {
                  setDescriptionError("Description is required");
                  hasError = true;
                }

                if (hasError) return;

                onCreate?.({
                  id: Date.now().toString(),
                  requestNo: `IR-${Math.floor(100 + Math.random() * 900)}`,
                  requestedBy: "You",
                  projectName:
                    project === "PRJ-001"
                      ? "Downtown Office Complex"
                      : project === "PRJ-002"
                      ? "Residential Tower A"
                      : "Other Project",
                  projectCode: project,
                  material,
                  quantity,
                  spec: description,
                  attachment: file ? file.name : null,
                  needBy: date ? dayjs(date).format("DD-MM-YYYY") : "TBD",
                  delivery: "TBD",
                  status: "Pending",
                  supplier: "—",
                });

                onClose();
              }}
              className="px-6 py-2 rounded-lg bg-[#2563EB] text-white"
            >
              Report Now
            </button>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
}
