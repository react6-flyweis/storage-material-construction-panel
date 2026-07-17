import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Layout from "../app/layout";

const PublicRoute = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Navigate to="/dashboard" replace /> : <Layout><Outlet /></Layout>;
};

export default PublicRoute;
