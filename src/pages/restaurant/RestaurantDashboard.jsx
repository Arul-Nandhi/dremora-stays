import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";

function RestaurantDashboard() {
  return (
    <div className="flex">  {/* flex layout */}
      <Sidebar role="RESTAURANT" />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />  {/*  sirf Outlet — links Sidebar mein hain already */}
      </div>
    </div>
  );
}

export default RestaurantDashboard;