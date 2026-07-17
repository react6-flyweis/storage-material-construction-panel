import { axiosInstance } from "./axiosInstance";
import type { ProjectsApiResponse, ProjectDetailsApiResponse, CalendarApiResponse, DrawingsApiResponse, TasksApiResponse } from "../types/projects.types";

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




