import React, { useState } from "react";
import DailyLogModel from "../dailyLogModel";
import NewTaskModel from "../newTaskModel";
import RightCheckIcon from "../../assets/RightTickIcon";
import { useSearch } from "../../context/SearchContext";
import SuccessModal from "./SuccessModal";

type TaskPriority = "High" | "Medium" | "Low";

type Task = {
  id: string;
  title: string;
  project: string;
  description: string;
  priority: TaskPriority;
  due?: string;
  assignee: string;
  progress?: number;
  status?: "todo" | "inProgress" | "done"; // ✅ add status field
};

const initialTasks: {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
} = {
  todo: [
    {
      id: "1",
      title: "Steel Frame Installation",
      project: "Downtown Office Complex",
      description: "Install steel frame structure for floors 1-5",
      priority: "High",
      due: "2024-02-15",
      assignee: "Sarah Wilson",
      status: "todo",
    },
  ],

  inProgress: [
    {
      id: "2",
      title: "Steel Frame Installation",
      project: "Downtown Office Complex",
      description:
        "Complete excavation for building foundation according to architectural plans",
      priority: "High",
      due: "2024-02-15",
      assignee: "Sarah Wilson",
      progress: 75,
      status: "inProgress",
    },
    {
      id: "3",
      title: "Plumbing Installation",
      project: "Residential Tower A",
      description: "Install plumbing systems for residential units",
      priority: "Medium",
      due: "2024-02-15",
      assignee: "Sarah Wilson",
      progress: 75,
      status: "inProgress",
    },
  ],

  done: [
    {
      id: "4",
      title: "Electrical Wiring - Floor 1",
      project: "Residential Tower A",
      description:
        "Complete electrical wiring installation for first floor units",
      priority: "Low",
      due: "NA",
      assignee: "Robert Chen",
      status: "done",
    },
  ],
};

const priorityStyles: Record<TaskPriority, string> = {
  High: "bg-red-100 text-red-500",
  Medium: "bg-yellow-100 text-yellow-600",
  Low: "bg-green-100 text-green-600",
};

export default function TaskBoard() {
  const [openDailyLogModel, setDailyLogModel] = useState(false);
  const [openNewTaskModel, setNewTaskModel] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [afterSuccessAction, setAfterSuccessAction] = useState<
    (() => void) | null
  >(null);

  const { search } = useSearch();
  const filterTasksBySearch = (list: Task[]) => {
    if (!search.trim()) return list;

    const q = search.toLowerCase();

    return list.filter((task) =>
      `${task.title}
     ${task.project}
     ${task.description}
     ${task.assignee}
     ${task.priority}`
        .toLowerCase()
        .includes(q)
    );
  };

  const handleNewTask = (data: any) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.taskName,
      project: data.project,
      description: data.description,
      priority: capitalizeFirstLetter(data.priority) as TaskPriority,
      due: data.deadline || "NA",
      assignee: data.assignedTo,
      status: data.status,
    };

    setTasks((prev) => {
      const updated = { ...prev };
      if (newTask.status === "todo") updated.todo = [newTask, ...prev.todo];
      else if (newTask.status === "inProgress")
        updated.inProgress = [newTask, ...prev.inProgress];
      else if (newTask.status === "done")
        updated.done = [newTask, ...prev.done];
      return updated;
    });
  };
  const handleDailyLogSubmit = (data: any) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.task,
      project: data.project,
      description: data.description,
      progress: Number(data.progress),
      priority: "Medium",
      due: "NA",
      assignee: "You",
    };

    setTasks((prev) => ({
      ...prev,
      inProgress: [newTask, ...prev.inProgress],
    }));
  };

  return (
    <div
      className="bg-white rounded-[8px] lg:p-6 p-3 border border-[#F3F4F6]
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center mb-6">
        <h2 className="text-[17px] font-semibold">Task Board</h2>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={() => setDailyLogModel(true)}
            className="flex-1 sm:flex-none bg-[#3AB449] text-white px-4 sm:px-6 py-2 rounded-[8px] text-sm sm:text-[16px] font-normal"
          >
            Daily Work Log
          </button>
          <button
            onClick={() => setNewTaskModel(true)}
            className="flex-1 sm:flex-none bg-[#2563EB] text-white px-4 sm:px-6 py-2 rounded-[8px] text-sm sm:text-[16px] font-normal"
          >
            Add Task
          </button>

          <DailyLogModel
            open={openDailyLogModel}
            onClose={() => setDailyLogModel(false)}
            onSubmit={(data) => {
              setAfterSuccessAction(() => () => {
                handleDailyLogSubmit(data);
                setDailyLogModel(false);
              });
              setSuccessTitle("Work Log Added Successfully");
              setSuccessOpen(true);
            }}
          />

          <NewTaskModel
            open={openNewTaskModel}
            onSubmit={(data) => {
              setAfterSuccessAction(() => () => {
                handleNewTask(data);
                setNewTaskModel(false);
              });
              setSuccessTitle("Task Added Successfully");
              setSuccessOpen(true);
            }}
            onClose={() => setNewTaskModel(false)}
          />

          <SuccessModal
            open={successOpen}
            title={successTitle}
            onClose={() => {
              setSuccessOpen(false);
              if (afterSuccessAction) {
                afterSuccessAction();
                setAfterSuccessAction(null);
              }
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto scroll-hide -mx-3 px-3 sm:mx-0 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0 md:min-w-[800px]">
          <Column
            title={`To Do (${filterTasksBySearch(tasks.todo).length})`}
            bg="bg-[#F9FAFB]"
          >
            {filterTasksBySearch(tasks.todo).map(renderTask)}
          </Column>

          <Column
            title={`In Progress (${
              filterTasksBySearch(tasks.inProgress).length
            })`}
            bg="bg-[#EFF6FF]"
          >
            {filterTasksBySearch(tasks.inProgress).map(renderTask)}
          </Column>

          <Column
            title={`Done (${filterTasksBySearch(tasks.done).length})`}
            bg="bg-[#F0FDF4]"
          >
            {filterTasksBySearch(tasks.done).map(renderTask)}
          </Column>
        </div>
      </div>
    </div>
  );
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderTask(task: Task) {
  return (
    <div key={task.id} className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-[14px] text-[#111827]">{task.title}</h3>
        {task.status === "done" ? (
          <RightCheckIcon />
        ) : (
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              priorityStyles[task.priority]
            }`}
          >
            {task.priority}
          </span>
        )}
      </div>

      <p className="text-[#6B7280] text-xs mb-2">{task.project}</p>
      <p className="text-[#6B7280] text-xs mb-4">{task.description}</p>

      {typeof task.progress === "number" && (
        <>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded mb-3">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between text-xs ">
        <span className="text-[#6B7280]">
          {task.due && task.due !== "NA" ? `Due ${task.due}` : "Completed"}
        </span>

        <span className="text-[#000000]">{task.assignee}</span>
      </div>
    </div>
  );
}

function Column({
  title,
  bg,
  children,
}: {
  title: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bg} rounded-[8px] p-4 min-h-[600px] max-h-[80vh] overflow-auto scroll-hide`}
    >
      <h3 className="font-semibold mb-4 text-sm text-[#111827]">{title}</h3>
      {children}
    </div>
  );
}
