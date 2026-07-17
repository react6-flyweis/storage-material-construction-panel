import { useState, useMemo } from "react";
import SearchIcon from "../assets/searchIcon.svg";
import PlusIcon from "../assets/plusicon.svg";
import PdfIcon from "../assets/pdficon.svg";
import EyeIcon from "../assets/EyeIcon.svg";
import DownloadIcon from "../assets/downloadicon.svg";
import DrawingModel from "../components/drawingModel";
import DrawingPreviewModal from "../components/drawingPreviewModel";
import { useSearch } from "../context/SearchContext";
import SuccessModal from "../components/common/SuccessModal";
import { useQuery } from "@tanstack/react-query";
import { getDrawingsApi } from "../api/projects.api";

type UploadedFile = {
  id: string;
  name: string;
  size: string;
  status: string;
  key?: string;
};

type Project = {
  name: string;
  code: string;
  uploadedBy: string;
  location: string;
  updatedOn: string;
  files: UploadedFile[];
};

const statusStyle: Record<string, string> = {
  "Pending Review": "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  "Revision Required": "bg-red-100 text-red-600",
  Drawing: "bg-blue-100 text-blue-700",
  Contract: "bg-purple-100 text-purple-700",
  Approval: "bg-green-100 text-green-700",
};

export default function DrawingAttachment() {
  const [openDrawingPreviewModel, setDrawingPreviewModel] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const { search } = useSearch();
  const [localSearch, setLocalSearch] = useState("");
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [pendingData, setPendingData] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [openDrawingModel, setDrawingModel] = useState(false);

  const { data: drawingsData, isLoading } = useQuery({
    queryKey: ["drawings"],
    queryFn: getDrawingsApi,
  });

  const projects = useMemo(() => {
    const apiProjects: Project[] = (drawingsData?.data?.data?.projects || []).map((p) => ({
      name: p.projectName || "Project —",
      code: p.projectId || p.leadId || "—",
      uploadedBy: p.uploadedBy || "—",
      location: p.location || "—",
      updatedOn: p.lastUpdate ? new Date(p.lastUpdate).toLocaleDateString("en-GB") : "—",
      files: (p.documents || []).map((d) => ({
        id: d._id,
        name: d.name,
        size: "-",
        status: d.type ? d.type.charAt(0).toUpperCase() + d.type.slice(1) : "Approved",
        key: d.url,
      })),
    }));

    let merged = [...apiProjects];
    for (const localProj of localProjects) {
      const existingIdx = merged.findIndex((p) => p.code === localProj.code);
      if (existingIdx > -1) {
        merged[existingIdx] = {
          ...merged[existingIdx],
          updatedOn: localProj.updatedOn,
          files: [...localProj.files, ...merged[existingIdx].files],
        };
      } else {
        merged = [localProj, ...merged];
      }
    }
    return merged;
  }, [drawingsData, localProjects]);

  const onDrawingSubmit = (data: any) => {
    setPendingData(data);
    setDrawingModel(false);
    setSuccessOpen(true);
  };

  const onSuccessClose = () => {
    setSuccessOpen(false);

    if (pendingData) {
      handleUpload(pendingData);
      setPendingData(null);
    }
  };

  const filteredProjects = projects
    .map((project) => {
      const query = `${search} ${localSearch}`.trim().toLowerCase();

      if (!query) return project;

      const projectMatch =
        project.name.toLowerCase().includes(query) ||
        project.code.toLowerCase().includes(query) ||
        project.uploadedBy.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.updatedOn.toLowerCase().includes(query);

      const matchedFiles = project.files.filter((file) =>
        file.name.toLowerCase().includes(query)
      );

      if (projectMatch) return project;

      if (matchedFiles.length > 0) {
        return {
          ...project,
          files: matchedFiles,
        };
      }

      return null;
    })
    .filter(Boolean) as Project[];

  const handleUpload = ({
    file,
    projectName,
    projectCode,
  }: {
    file: File;
    projectName: string;
    projectCode: string;
  }) => {
    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      status: "Pending Review",
      key: URL.createObjectURL(file),
    };

    setLocalProjects((prev) => {
      const projectExists = prev.find(
        (project) => project.code === projectCode
      );

      if (projectExists) {
        return prev.map((project) =>
          project.code === projectCode
            ? {
              ...project,
              updatedOn: new Date().toLocaleDateString("en-GB"),
              files: [newFile, ...project.files],
            }
            : project
        );
      }

      const newProject: Project = {
        name: projectName,
        code: projectCode,
        uploadedBy: "Rahul Sharma",
        location: "—",
        updatedOn: new Date().toLocaleDateString("en-GB"),
        files: [newFile],
      };

      return [newProject, ...prev];
    });
  };


  return (
    <>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            Project Drawings
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            All structural, fabrication, and erection drawings for this project.
          </p>
        </div>
        <div
          className="rounded-[8px] bg-white border border-[#F3F4F6]
                shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]
                overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 lg:px-6 px-3 py-4 border-b border-[#0000001A]">
            <p>Projects & Drawings</p>
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={() => {
                  setDrawingModel(true);
                }}
                className="bg-[#3F63E1] h-[38px] flex items-center gap-1 text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                <img src={PlusIcon} alt="" />
                Upload Drawings & images
              </button>
              <div className="flex gap-2 items-center px-2 border border-[#D1D5DB] rounded-[8px] h-[38px]">
                <img src={SearchIcon} alt="" />
                <input
                  type="text"
                  placeholder="Search leads, projects..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="text-[14px] outline-none lg:min-w-[256px] w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:px-6 px-3 py-4">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className="
                        rounded-[8px] lg:p-6 p-3 border !bg-white border-[#F3F4F6]
                        !shadow-[0px_0px_4px_0px_rgba(0,0,0,0.26)]
                    "
              >
                <div className="flex md:flex-row flex-col gap-6 justify-between items-start mb-6">
                  <div>
                    <p className="text-lg font-semibold text-[#111827]">
                      {project.name}
                    </p>
                    <p className="text-sm text-[#6B7280] mt-1">
                      {project.code}
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:gap-10 gap-4 text-sm">
                    <div className="sm:w-[100px] w-full">
                      <p className="text-[#4B5563] text-xs leading-[21px]">
                        Uploaded By:
                      </p>
                      <p className="text-black text-[14px] leading-[21px]">
                        {project.uploadedBy}
                      </p>
                    </div>
                    <div className="sm:w-[100px] w-full">
                      <p className="text-[#4B5563] text-xs leading-[21px]">
                        Location:
                      </p>
                      <p className="text-black text-[14px] leading-[21px]">
                        {project.location}
                      </p>
                    </div>
                    <div className="sm:w-[100px] w-full">
                      <p className="text-[#4B5563] text-xs leading-[21px]">
                        Last Update on
                      </p>
                      <p className="text-black text-[14px] leading-[21px]">
                        {project.updatedOn}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#111827] md:mb-4 mb-6">
                  Attachments & Drawings
                </p>

                <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-6">
                  {project.files.map((file) => (
                    <div
                      key={file.id}
                      className="relative flex items-center justify-between gap-2 rounded-xl border border-[#E5E7EB] px-5 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="min-w-10 w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                          <img src={PdfIcon} alt="" />
                        </div>

                        <div>
                          <p
                            className="text-sm font-medium text-[#111827]"
                            style={{ wordBreak: "break-all" }}
                          >
                            {file.name}
                          </p>
                          <p className="text-sm text-[#6B7280] mt-1">
                            {file.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 min-w-[80px]">
                        <button className="hover:opacity-70">
                          <img
                            src={DownloadIcon}
                            alt=""
                            className="min-w-fit"
                          />
                        </button>

                        <button
                          className="hover:opacity-70"
                          onClick={() => {
                            setSelectedFile(file);
                            setSelectedFileId(file.key ?? "");
                            setDrawingPreviewModel(true);
                          }}
                        >
                          <img src={EyeIcon} alt="" className="min-w-fit" />
                        </button>
                      </div>

                      <span
                        className={`absolute -top-3 right-4 px-4 py-1 rounded-full text-xs font-medium ${statusStyle[file.status]
                          }`}
                      >
                        {file.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {isLoading ? (
              <p className="text-center text-sm text-[#6B7280] py-8">
                Loading drawings...
              </p>
            ) : filteredProjects.length === 0 ? (
              <p className="text-center text-sm text-[#6B7280] py-8">
                No projects found
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <DrawingModel
        open={openDrawingModel}
        onSubmit={onDrawingSubmit}
        onClose={() => setDrawingModel(false)}
      />

      <SuccessModal
        open={successOpen}
        title="File Uploaded Successfully"
        onClose={onSuccessClose}
      />

      <DrawingPreviewModal
        open={openDrawingPreviewModel}
        fileId={selectedFileId ?? ""}
        onClose={() => {
          setDrawingPreviewModel(false);
          setSelectedFile(null);
        }}
        file={selectedFile}
      />
    </>
  );
}
