import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <SidebarProvider>
      <AppRoutes />
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
