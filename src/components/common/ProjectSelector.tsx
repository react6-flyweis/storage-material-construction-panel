import { useQuery } from "@tanstack/react-query";
import { getProjectsApi } from "../../api/projects.api";
import CustomSelect from "./CustomSelect";

interface ProjectSelectorProps {
  value: string;
  onChange: (val: string) => void;
  showAllOption?: boolean;
  width?: string;
}

export default function ProjectSelector({
  value,
  onChange,
  showAllOption = false,
  width = "100%",
}: ProjectSelectorProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["projects-selector-list"],
    queryFn: () => getProjectsApi({ page: 1, limit: 100 }),
  });

  const projects = data?.data?.data?.projects || [];

  const options = projects.map((proj) => ({
    label: proj.projectName || `${proj.buildingType || "Project"} - ${proj.location || "Site"} (${proj.jobId})`,
    value: proj._id,
  }));

  if (showAllOption) {
    options.unshift({ label: "All Projects", value: "" });
  }

  return (
    <CustomSelect
      title="Select Project"
      options={options}
      value={value}
      onChange={onChange}
      width={width}
      searchable
      loading={isLoading}
    />
  );
}
