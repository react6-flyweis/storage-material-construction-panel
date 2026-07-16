import { Outlet } from "react-router-dom";
import Layout from "../app/layout";

const PublicRoute = () => {
  return <Layout><Outlet /></Layout>;
};

export default PublicRoute;
