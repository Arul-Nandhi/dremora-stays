import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Employees from "./Employees";
import Shifts from "./Shifts";
import Attendance from "./Attendance";

function HRDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-3xl font-bold mb-6">HR Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white shadow rounded">
                  <h2 className="text-xl font-semibold">Employees</h2>
                  <p className="text-gray-500">Manage staff records</p>
                </div>
                <div className="p-6 bg-white shadow rounded">
                  <h2 className="text-xl font-semibold">Shifts</h2>
                  <p className="text-gray-500">Assign working hours</p>
                </div>
                <div className="p-6 bg-white shadow rounded">
                  <h2 className="text-xl font-semibold">Attendance</h2>
                  <p className="text-gray-500">Track daily attendance</p>
                </div>
              </div>
            </div>
          } />
          <Route path="employees" element={<Employees />} />
          <Route path="shifts" element={<Shifts />} />
          <Route path="attendance" element={<Attendance />} />
        </Routes>
      </div>
    </div>
  );
}

export default HRDashboard;