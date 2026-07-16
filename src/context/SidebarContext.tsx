import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  toggleSidebar: () => void;
  activeDate: string;
  setActiveDate: (v: string) => void;
  handleActiveDate: (v: string) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDate, setActiveDate] = useState("today");

  const toggleSidebar = () => setSidebarOpen((p) => !p);
const handleActiveDate = (date: string) => setActiveDate(date);
  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, setSidebarOpen, toggleSidebar, activeDate, setActiveDate, handleActiveDate }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
};
