import { axiosInstance } from "./axiosInstance";
import type { ProjectsApiResponse, ProjectDetailsApiResponse, CalendarApiResponse, DrawingsApiResponse, TasksApiResponse, DeliveriesApiResponse, LabelsApiResponse, LabelsQueryParams, BundleScanApiResponse, BundleScanQueryParams, PackingListApiResponse, PackingListsQueryParams, DispatchVerificationApiResponse, DispatchVerificationQueryParams } from "../types/projects.types";


export interface ProjectsQueryParams {
  page?: number;
  limit?: number;
}

export interface CalendarQueryParams {
  month: number;
  year: number;
  leadId?: string;
}

export const getProjectsApi = (params?: ProjectsQueryParams) => {
  return axiosInstance.get<ProjectsApiResponse>("/construction/projects", { params });
};

export const getProjectDetailsApi = (id: string) => {
  return axiosInstance.get<ProjectDetailsApiResponse>(`/construction/projects/${id}`);
};

export const getCalendarApi = (params: CalendarQueryParams) => {
  return axiosInstance.get<CalendarApiResponse>("/construction/projects/calendar", { params });
};

export const getDrawingsApi = () => {
  return axiosInstance.get<DrawingsApiResponse>("/construction/drawings");
};

export const getTasksApi = () => {
  return axiosInstance.get<TasksApiResponse>("/construction/tasks");
};

export const getDeliveriesApi = () => {
  return axiosInstance.get<DeliveriesApiResponse>("/construction/deliveries");
};

export interface CreateTaskPayload {
  title: string;
  description: string;
  leadId: string | null;
  assignedTo: string | null;
  priority: string;
  status: string;
  dueDate: string;
}

export const createTaskApi = (payload: CreateTaskPayload) => {
  return axiosInstance.post("/construction/tasks", payload);
};

export interface CreateWorkLogPayload {
  leadId: string;
  taskId: string | null;
  date: string;
  progress: number;
  description: string;
  photos: string[];
  issues: string;
}

export const createWorkLogApi = (payload: CreateWorkLogPayload) => {
  return axiosInstance.post("/construction/work-logs", payload);
};

export const markDeliveryReceivedApi = (deliveryId: string) => {
  return axiosInstance.post(`/construction/deliveries/${deliveryId}/mark-received`);
};

export const markDeliveryPartialApi = (deliveryId: string, payload?: { notes?: string }) => {
  return axiosInstance.post(`/construction/deliveries/${deliveryId}/mark-partial`, payload);
};

export interface ScanBundlePayload {
  bundleId: string;
}

export const scanBundleApi = (payload: ScanBundlePayload) => {
  return axiosInstance.post("/construction/deliveries/scan-bundle", payload);
};

export const getLabelsApi = (params?: LabelsQueryParams) => {
  return axiosInstance.get<LabelsApiResponse>("/construction/labels", { params });
};

export const getBundleScansApi = (params?: BundleScanQueryParams) => {
  return axiosInstance.get<BundleScanApiResponse>("/construction/bundle-scan", { params });
};

export const getPackingListsApi = (params?: PackingListsQueryParams) => {
  return axiosInstance.get<PackingListApiResponse>("/construction/packing-lists", { params });
};

export const getDispatchVerificationApi = (params?: DispatchVerificationQueryParams) => {
  return axiosInstance.get<DispatchVerificationApiResponse>("/construction/dispatch-verification", { params });
};






