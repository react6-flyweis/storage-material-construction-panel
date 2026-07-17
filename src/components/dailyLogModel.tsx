import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomSelect from "./common/CustomSelect";
import ProjectSelector from "./common/ProjectSelector";
import UploadCameraIcon from "../assets/uploadcameraicon.svg";
import { createWorkLogApi, getTasksApi, getProjectsApi } from "../api/projects.api";

type DailyLogModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

const dailyWorkLogSchema = z.object({
  date: z.string().min(1, "Date is required"),
  selectedProject: z.string().min(1, "Project is required"),
  taskId: z.string().nullable().optional(),
  progress: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ error: "Progress must be a number" })
      .min(0, "Progress must be at least 0")
      .max(100, "Progress cannot exceed 100")
  ),
  description: z.string().min(1, "Description is required"),
  issues: z.string().optional(),
});

type DailyWorkLogFormValues = z.infer<typeof dailyWorkLogSchema>;

export default function DailyLogModel({
  open,
  onClose,
  onSubmit,
}: DailyLogModalProps) {
  const [serverError, setServerError] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dailyWorkLogSchema),
    defaultValues: {
      date: "",
      selectedProject: "",
      taskId: "null",
      progress: undefined,
      description: "",
      issues: "",
    },
  });

  const selectedProject = watch("selectedProject");

  // Reset task choice when project changes
  useEffect(() => {
    setValue("taskId", "null");
  }, [selectedProject, setValue]);

  // Fetch projects list so we can lookup the project name for local onSubmit fallback
  const { data: projectsData } = useQuery({
    queryKey: ["projects-selector-list"],
    queryFn: () => getProjectsApi({ page: 1, limit: 100 }),
    enabled: open,
  });

  // Fetch tasks list
  const { data: tasksData } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksApi,
    enabled: open,
  });

  const allTasks = tasksData?.data?.data?.tasks || [];
  const filteredTasks = allTasks.filter(
    (t) => t.leadId?._id === selectedProject
  );

  const taskOptions = filteredTasks.map((t) => ({
    label: t.title,
    value: t._id,
  }));
  taskOptions.unshift({ label: "None / General Work", value: "null" });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWorkLogApi,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      const selectedProjectName = projectsData?.data?.data?.projects?.find(
        (p) => p._id === variables.leadId
      )?.projectName || "Unknown Project";

      const selectedTaskTitle = allTasks.find(
        (t) => t._id === variables.taskId
      )?.title || "Daily Work Log";

      onSubmit({
        task: selectedTaskTitle,
        project: selectedProjectName,
        description: variables.description,
        progress: variables.progress,
      });

      onClose();
      reset();
      setFile(null);
      setServerError("");
    },
    onError: (err: unknown) => {
      const responseErr = err as { response?: { data?: { message?: string } } };
      const errMsg = responseErr?.response?.data?.message
        || (err instanceof Error ? err.message : "Failed to create daily work log");
      setServerError(errMsg);
    },
  });

  const onFormSubmit = (values: DailyWorkLogFormValues) => {
    mutation.mutate({
      leadId: values.selectedProject,
      taskId: values.taskId === "null" ? null : (values.taskId || null),
      date: values.date,
      progress: values.progress,
      description: values.description,
      photos: [],
      issues: values.issues || "",
    });
  };

  const handleCancel = () => {
    reset();
    setFile(null);
    setServerError("");
    onClose();
  };

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleCancel}
    >
      <div
        className="w-[96%] max-h-[98vh] max-w-[550px] bg-white rounded-xl shadow-lg overflow-auto scroll-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:px-6 px-3 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#111827]">
            Daily Work Log
          </h2>
          {serverError && (
            <p className="text-sm text-red-600 mt-2 font-medium">{serverError}</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="px-6 py-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827]">Date</label>
              <input
                type="date"
                {...register("date")}
                className={`mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm ${errors.date ? "border-red-500 focus:border-red-500" : "border-gray-200"
                  }`}
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Project
              </label>
              <Controller
                name="selectedProject"
                control={control}
                render={({ field }) => (
                  <ProjectSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.selectedProject && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.selectedProject.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#111827] inline-block mb-2">
                Task
              </label>
              <Controller
                name="taskId"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    title={selectedProject ? "Select Task" : "Select Project First"}
                    options={taskOptions}
                    value={field.value || "null"}
                    onChange={field.onChange}
                    width="100%"
                    searchable
                    disabled={!selectedProject}
                  />
                )}
              />
              {errors.taskId && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.taskId.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-[#111827]">Progress (%)</label>
              <input
                type="number"
                {...register("progress")}
                max={100}
                min={0}
                placeholder="Enter"
                className={`mt-2 w-full h-[40px] rounded-[8px] border px-4 outline-none text-sm ${errors.progress ? "border-red-500 focus:border-red-500" : "border-gray-200"
                  }`}
              />
              {errors.progress && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.progress.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm text-[#111827]">Work Description</label>
            <textarea
              {...register("description")}
              placeholder="Describe the work completed today..."
              rows={4}
              className={`mt-2 w-full rounded-[8px] border px-4 py-3 outline-none resize-none text-sm ${errors.description ? "border-red-500 focus:border-red-500" : "border-gray-200"
                }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.description.message}</p>
            )}
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
              {...register("issues")}
              placeholder="Any issues, delays, or important notes..."
              rows={4}
              className={`mt-2 w-full rounded-[8px] border px-4 py-3 outline-none resize-none text-sm ${errors.issues ? "border-red-500 focus:border-red-500" : "border-gray-200"
                }`}
            />
            {errors.issues && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.issues.message}</p>
            )}
          </div>

          <div className="pt-3 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg bg-[#F3F4F6] text-[#111827]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-2 rounded-lg bg-[#2563EB] text-white flex items-center gap-2 disabled:opacity-50"
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
