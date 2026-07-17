export interface CustomerId {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
}

export interface Project {
  _id: string;
  customerId: CustomerId | null;
  buildingType: string;
  location: string;
  lifecycleStatus: string;
  jobId: string;
  projectName: string;
  endDate: string | null;
  plannedStartDate?: string | null;
  leadId?: string;
}

export interface ProjectsResponseData {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}

export interface ProjectsApiResponse {
  success: boolean;
  message: string;
  data: ProjectsResponseData;
}

export interface Delivery {
  _id: string;
  deliveryNumber: string;
  status: string;
  description: string;
  deliveryDate: string;
}

export interface Task {
  _id: string;
  title: string;
  assignedTo: string;
  priority: string;
  status: string;
  dueDate: string;
}

export interface ProjectDetails {
  project: Project & { numberOfBuildings?: number };
  deliveries: Delivery[];
  tasks: Task[];
}

export interface ProjectDetailsApiResponse {
  success: boolean;
  message: string;
  data: ProjectDetails;
}
export interface CalendarDeliveryProject {
  leadId: string;
  projectName: string;
  jobId: string;
  location: string;
}

export interface CalendarDelivery {
  deliveryId: string;
  deliveryNumber: string;
  status: string;
  description: string;
  project: CalendarDeliveryProject;
}

export interface CalendarResponseData {
  month: number;
  year: number;
  calendar: Record<string, CalendarDelivery[]>;
  totalDeliveries: number;
}

export interface CalendarApiResponse {
  success: boolean;
  message: string;
  data: CalendarResponseData;
}

export interface DrawingDocument {
  _id: string;
  url: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface DrawingProject {
  leadId: string;
  projectId: string;
  projectName: string;
  location: string;
  uploadedBy: string;
  lastUpdate: string;
  documents: DrawingDocument[];
}

export interface DrawingsResponseData {
  projects: DrawingProject[];
  total: number;
}

export interface DrawingsApiResponse {
  success: boolean;
  message: string;
  data: DrawingsResponseData;
}

export interface AssignedToUser {
  _id: string;
  name: string;
  email: string;
}

export interface CreatedByUser {
  _id: string;
  name: string;
  email: string;
}

export interface LeadProjectInfo {
  _id: string;
  jobId: string;
  projectName: string;
}

export interface ConstructionTask {
  _id: string;
  title: string;
  description: string;
  leadId: LeadProjectInfo | null;
  assignedTo: AssignedToUser | null;
  createdBy: CreatedByUser | null;
  priority: string;
  status: string;
  dueDate: string;
  completedAt: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
}

export interface TasksResponseData {
  tasks: ConstructionTask[];
  total: number;
  stats: TasksStats;
}

export interface TasksApiResponse {
  success: boolean;
  message: string;
  data: TasksResponseData;
}


