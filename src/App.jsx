import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";

import ProtectedRoute from "./routes/ProtectedRoute";

// ✅ GUEST LAYOUT + PAGES
import GuestLayout from "./layouts/GuestLayout";
import GuestRooms from "./pages/guest/GuestRooms";
import GuestRestaurant from "./pages/guest/GuestRestaurant";
import GuestEvents from "./pages/guest/GuestEvents";
import GuestFoodMenu from "./pages/guest/GuestFoodMenu";
import GuestBooking from "./pages/guest/GuestBooking";
import GuestOffers from "./pages/guest/GuestOffers";

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

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* GUEST PORTAL — GuestLayout provides Navbar + Footer */}
        <Route path="/guest" element={<GuestLayout />}>
          <Route path="booking"    element={<GuestBooking />} />
          <Route path="rooms"      element={<GuestRooms />} />
          <Route path="restaurant" element={<GuestRestaurant />} />
          <Route path="events"     element={<GuestEvents />} />
          <Route path="foods"      element={<GuestFoodMenu />} />
          <Route path="offers"     element={<GuestOffers />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="rooms"   element={<ManageRooms />} />
          <Route path="users"   element={<ManageUsers />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* RECEPTION */}
        <Route
          path="/reception/*"
          element={
            <ProtectedRoute>
              <ReceptionDashboard />
            </ProtectedRoute>
          }
        />

        {/* MANAGER */}
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* HR */}
        <Route
          path="/hr/*"
          element={
            <ProtectedRoute>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        {/* RESTAURANT STAFF */}
        <Route
          path="/restaurant"
          element={
            <ProtectedRoute>
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        >
          <Route index         element={<Menu />} />
          <Route path="menu"    element={<Menu />} />
          <Route path="order"   element={<TakeOrder />} />
          <Route path="orders"  element={<Orders />} />
          <Route path="billing" element={<Bill />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;