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

export interface DeliverySchedule {
  pickupDate: string | null;
  pickupTime: string;
  deliveryDate: string | null;
  deliveryTime: string;
  timings: string;
}

export interface DeliveryCarrier {
  phone: string;
  email: string;
  truckNumber: string;
  driverName: string;
  driverPhone: string;
}

export interface DeliveryProject {
  leadId: string;
  projectName: string;
  jobId: string;
  location: string;
}

export interface ConstructionDelivery {
  deliveryId: string;
  deliveryNumber: string;
  status: string;
  description: string;
  materialType: string;
  loadWeight: number;
  packageCount: number | null;
  loadingEquipment: string[];
  schedule: DeliverySchedule;
  pickupLocation: string;
  deliveryLocation: string;
  stagingArea: string;
  notes: string;
  receivingPoc: string;
  pickupContactPhone: string;
  carrier: DeliveryCarrier | null;
  project: DeliveryProject;
}

export interface DeliveriesStats {
  inTransit: number;
  staged: number;
  ready: number;
  totalToday: number;
}

export interface DeliveriesResponseData {
  deliveries: ConstructionDelivery[];
  total: number;
  stats: DeliveriesStats;
}

export interface DeliveriesApiResponse {
  success: boolean;
  message: string;
  data: DeliveriesResponseData;
}

export interface BundleProject {
  leadId: string;
  projectName: string;
  jobId: string;
}

export interface BundleLabel {
  bundleId: string;
  bundleNo: string;
  bundleType: string;
  title: string;
  parts: string;
  totalWeight: number;
  maxLengthFeet: number;
  status: string;
  packingListId: string;
  project: BundleProject;
}

export interface LabelStats {
  totalBundles: number;
  labelsPrinted: number;
  labelsPending: number;
  labelsPrintedToday: number;
}

export interface LabelsResponseData {
  bundles: BundleLabel[];
  total: number;
  stats: LabelStats;
}

export interface LabelsApiResponse {
  success: boolean;
  message: string;
  data: LabelsResponseData;
}

export interface LabelsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  status?: string;
}

export interface ScannedBundleProject {
  leadId: string;
  projectName: string;
  jobId: string;
}

export interface ScannedBundle {
  bundleId: string;
  bundleNo: string;
  parts: string;
  totalWeight: number;
  status: string;
  scannedAt: string;
  project: ScannedBundleProject;
}

export interface BundleScanStats {
  bundlesScanned: number;
  bundlesRemaining: number;
  bundlesLoaded: number;
}

export interface BundleScanResponseData {
  bundles: ScannedBundle[];
  total: number;
  stats: BundleScanStats;
}

export interface BundleScanApiResponse {
  success: boolean;
  message: string;
  data: BundleScanResponseData;
}

export interface BundleScanQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  status?: string;
}

export interface PackingListProject {
  leadId: string;
  projectName: string;
  jobId: string;
}

export interface PackingListItem {
  packingListId: string;
  packingListNo: string;
  truck: string;
  totalBundles: number;
  totalWeight: number;
  destination: string;
  status: string;
  project: PackingListProject;
}

export interface PackingListStats {
  totalPackingList: number;
  loadsReadyForDispatch: number;
  bundlesAssigned: number;
  loadsDispatchedToday: number;
}

export interface PackingListResponseData {
  packingLists: PackingListItem[];
  total: number;
  stats: PackingListStats;
}

export interface PackingListApiResponse {
  success: boolean;
  message: string;
  data: PackingListResponseData;
}

export interface PackingListsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  status?: string;
}

export interface DispatchLoadProject {
  leadId: string;
  projectName: string;
  jobId: string;
}

export interface DispatchLoad {
  loadId: string;
  packingListNo: string;
  truck: string;
  totalBundles: number;
  bundleIds: string[];
  totalWeight: number;
  destination: string;
  status: string;
  project: DispatchLoadProject;
}

export interface DispatchVerificationStats {
  loadsReadyForDispatch: number;
  bundlesVerified: number;
  bundlesMissing: number;
  leadsDispatchedToday: number;
}

export interface DispatchVerificationResponseData {
  loads: DispatchLoad[];
  total: number;
  stats: DispatchVerificationStats;
}

export interface DispatchVerificationApiResponse {
  success: boolean;
  message: string;
  data: DispatchVerificationResponseData;
}

export interface DispatchVerificationQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  status?: string;
}
