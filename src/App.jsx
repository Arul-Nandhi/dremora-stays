import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";

import ProtectedRoute from "./routes/ProtectedRoute";

// ✅ ADMIN
import DashboardLayout from "./pages/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";


import ReceptionDashboard from "./pages/receptionist/ReceptionDashboard";


import ManagerDashboard from "./pages/manager/ManagerDashboard";


import HRDashboard from "./pages/hr/HRDashboard";


import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import Menu from "./pages/restaurant/Menu";
import TakeOrder from "./pages/restaurant/TakeOrder";
import Orders from "./pages/restaurant/Orders";
import Bill from "./pages/restaurant/Bill";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*  PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/*  ADMIN — uses <Outlet /> inside DashboardLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="rooms" element={<ManageRooms />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/*  RECEPTION — has internal <Routes>, so /* is required */}
        <Route
          path="/reception/*"
          element={
            <ProtectedRoute>
              <ReceptionDashboard />
            </ProtectedRoute>
          }
        />

        {/*  MANAGER — has internal <Routes>, so /* is required */}
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/*  HR — has internal <Routes>, so /* is required */}
        <Route
          path="/hr/*"
          element={
            <ProtectedRoute>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        {/*  RESTAURANT — uses <Outlet />, nested routes defined here */}
        <Route
          path="/restaurant"
          element={
            <ProtectedRoute>
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Menu />} />
          <Route path="menu" element={<Menu />} />
          <Route path="order" element={<TakeOrder />} />
          <Route path="orders" element={<Orders />} />
          <Route path="billing" element={<Bill />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;