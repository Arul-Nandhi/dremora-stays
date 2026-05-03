import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />  {/*  This renders whatever child route matches */}
      </div>
    </div>
  );
}

export default DashboardLayout;