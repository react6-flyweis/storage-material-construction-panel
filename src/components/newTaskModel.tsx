import { useState } from "react";
import CustomSelect from "./common/CustomSelect";

type IssueReportingModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

const projectOptions = [
  { label: "Downtown Office Complex", value: "Downtown Office Complex" },
  { label: "Residential Tower A", value: "Residential Tower A" },
  { label: "Shopping Mall Renovation", value: "Shopping Mall Renovation" },
  { label: "Industrial Warehouse", value: "Industrial Warehouse" },
];

const assigneeOptions = [
  { label: "John Doe", value: "john" },
  { label: "Sarah Smith", value: "sarah" },
  { label: "Michael Lee", value: "michael" },
];

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const statusOptions = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "inProgress" },
  { label: "Done", value: "done" },
];

export default function NewTaskModel({
  open,
  onClose,
  onSubmit,
}: IssueReportingModalProps) {
  if (!open) return null;

  const [taskName, setTaskName] = useState("");
  const [selectedProject, setSelectedProject] = useState("PRJ-001");
  const [assignedTo, setAssignedTo] = useState("john");
  const [priority, setPriority] = useState("medium");
  const [taskStatus, setTaskStatus] = useState("todo");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(""); 

  const handleCreate = () => {
    if (
      !taskName.trim() ||
      !selectedProject ||
      !assignedTo ||
      !priority ||
      !taskStatus ||
      !deadline ||
      !description.trim()
    ) {
      setError("Please fill all required fields!");
      return;
    }

    const data = {
      taskName,
      project: selectedProject,
      assignedTo,
      priority,
      status: taskStatus,
      deadline,
      description,
    };

    onSubmit(data);
    onClose();

    setTaskName("");
    setSelectedProject("PRJ-001");
    setAssignedTo("unassigned");
    setPriority("medium");
    setTaskStatus("todo");
    setDeadline("");
    setDescription("");
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
          <h2 className="text-lg font-semibold text-[#111827]">New Task</h2>
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </div>

        <div className="px-6 py-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827]">Task Name</label>
              <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter"
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
                value={selectedProject}
                onChange={setSelectedProject}
                width="100%"
                searchable
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Assigned To
              </label>
              <CustomSelect
                title="Select Assignee"
                options={assigneeOptions}
                value={assignedTo}
                onChange={setAssignedTo}
                width="100%"
                searchable
              />
            </div>

            <div>
              <label className="text-sm text-[#111827]">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="dd - mm - yyyy"
                className="mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Priority
              </label>
              <CustomSelect
                title="Select Priority"
                options={priorityOptions}
                value={priority}
                onChange={setPriority}
                width="100%"
              />
            </div>

            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Status
              </label>
              <CustomSelect
                title="Select Status"
                options={statusOptions}
                value={taskStatus}
                onChange={setTaskStatus}
                width="100%"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#111827]">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the work"
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
            onClick={handleCreate}
            className="px-6 py-2 rounded-lg bg-[#2563EB] text-white"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
