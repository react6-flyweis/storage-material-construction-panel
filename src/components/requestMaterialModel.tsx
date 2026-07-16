import { useState } from "react";
import CustomSelect from "./common/CustomSelect";
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

export default function RequestMaterialModel({
  open,
  onClose,
  onCreate,
}: IssueReportingModalProps) {
  if (!open) return null;
  const [date, setDate] = useState<Dayjs | null>(null);
  const [project, setProject] = useState("PRJ-001");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materialError, setMaterialError] = useState("");

  return (
    <>
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
              <h2 className="text-lg font-bold text-[#111827]">
                Request Material
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="text-sm font-medium text-[#111827] mb-2 block">
                    Requested Date (Auto-fill)
                  </label>
                  <input
                    readOnly
                    value="12-09-2026"
                    className="w-full h-[44px] rounded-[10px] border border-gray-200 px-4 outline-none text-sm bg-white text-gray-700"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#111827] mb-2 block">
                    Required By
                  </label>
                  <DatePicker
                    value={date}
                    onChange={setDate}
                    format="DD-MM-YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        placeholder: "dd - mm - yyyy",
                        sx: {
                          ...inputStyle,
                          "& .MuiOutlinedInput-root": {
                            ...inputStyle["& .MuiOutlinedInput-root"],
                            borderRadius: "10px",
                            height: "44px",
                          }
                        },
                      },
                    }}
                  />
                </div>

                <div className="md:col-start-1">
                   <label className="text-sm font-medium text-[#111827] block mb-2">
                    Project
                  </label>
                  <CustomSelect
                    title="Select Project"
                    options={projectFilterOptions}
                    value={project}
                    onChange={setProject}
                    width="100%"
                  />
                </div>

                 <div>
                  <label className="text-sm font-medium text-[#111827] block mb-2">
                    Select Priority
                  </label>
                  <CustomSelect
                    title="Select Priority"
                    options={[
                      { label: "High", value: "high" },
                      { label: "Medium", value: "medium" },
                      { label: "Low", value: "low" },
                    ]}
                    value="high"
                    onChange={() => {}}
                    width="100%"
                  />
                </div>

                <div>
                   <label className="text-sm font-medium text-[#111827] block mb-2">
                    Site
                  </label>
                  <CustomSelect
                    title="Select Site"
                    options={[
                      { label: "Site A", value: "site-a" },
                      { label: "Site B", value: "site-b" },
                    ]}
                    value="site-a"
                    onChange={() => {}}
                    width="100%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="text-sm font-medium text-[#111827] mb-2 block">Material Name</label>
                  <input
                    placeholder="e.g., Steel Beams"
                    className="w-full h-[44px] rounded-[10px] border border-gray-200 px-4 outline-none text-sm"
                    value={material}
                    onChange={(e) => {
                      setMaterial(e.target.value);
                      if (materialError) setMaterialError("");
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#111827] mb-2 block">Quantity</label>
                  <input
                    placeholder="e.g., 50 unites"
                    className="w-full h-[44px] rounded-[10px] border border-gray-200 px-4 outline-none text-sm"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-6 border-t flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-8 py-2.5 rounded-[12px] bg-[#F3F4F6] text-[#111827] font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!material.trim()) {
                    setMaterialError("Material name is required");
                    return;
                  }
                  onCreate?.({
                    material,
                    quantity,
                    date: date ? dayjs(date).format("DD-MM-YYYY") : "TBD",
                  });
                  onClose();
                }}
                className="px-8 py-2.5 rounded-[12px] bg-[#2563EB] text-white font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </LocalizationProvider>
      </div>
    
    </>
  );
}
