import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import { SearchProvider } from "../context/SearchContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const location = useLocation();

  const isAuthPage = ["/", "/login", "/register", "/forgot-password"].includes(
    location.pathname
  );

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const togglePanel = () => setIsPanelCollapsed((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-[#E5ECFF]">
      {!isAuthPage && (
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          isCollapsed={isPanelCollapsed}
        />
      )}
      <SearchProvider>
        <div className="flex flex-1 flex-col min-w-0 transition-all duration-300">
          {!isAuthPage && (
            <Header
              onToggleSidebar={() => setSidebarOpen((p) => !p)}
              isPanelCollapsed={isPanelCollapsed}
              onPanelToggle={togglePanel}
            />
          )}

          <main className={`${isAuthPage ? "h-svh" : "h-[calc(100vh-81px)] lg:px-8 px-4 py-6"} overflow-auto `}>
            {children}
          </main>
        </div>
      </SearchProvider>
    </div>
  );
}

