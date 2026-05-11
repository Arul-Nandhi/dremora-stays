import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col justify-between shadow-lg">

      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold text-center py-6 border-b border-gray-700">
          HMS Panel
        </h2>

        <div className="flex flex-col p-4 gap-3">

          {/* ADMIN */}
          {role === "ADMIN" && (
            <>
              <Link to="/admin" className="sidebar-link">Dashboard</Link>
              <Link to="/admin/rooms" className="sidebar-link">Manage Rooms</Link>
              <Link to="/admin/users" className="sidebar-link">Manage Users</Link>
              <Link to="/admin/reports" className="sidebar-link">Reports</Link>
            </>
          )}

          {/* RECEPTIONIST */}
          {role === "RECEPTIONIST" && (
            <>
              <Link to="/reception" className="sidebar-link">Dashboard</Link>
              <Link to="/reception/availability" className="sidebar-link">Room Availability</Link>
              <Link to="/reception/create-booking" className="sidebar-link">Create Booking</Link>
              <Link to="/reception/checkin" className="sidebar-link">Check-In</Link>
              <Link to="/reception/checkout" className="sidebar-link">Check-Out</Link>
              <Link to="/reception/invoice" className="sidebar-link">Invoice</Link>
              
            </>
          )}

          {/* MANAGER */}
          {role === "MANAGER" && (
            <>
              <Link to="/manager" className="sidebar-link">Dashboard</Link>
              <Link to="/manager/reports" className="sidebar-link">Revenue Reports</Link>
              <Link to="/manager/occupancy" className="sidebar-link">Occupancy</Link>
            </>
          )}

          {/* HR */}
          {role === "HR" && (
            <>
              <Link to="/hr" className="sidebar-link">Dashboard</Link>
              <Link to="/hr/employees" className="sidebar-link">Employees</Link>
              <Link to="/hr/shifts" className="sidebar-link">Shifts</Link>
              <Link to="/hr/attendance" className="sidebar-link">Attendance</Link>
            </>
          )}

          {/* RESTAURANT */}
          {role === "RESTAURANT" && (
            <>
              
              <Link to="/restaurant/menu" className="sidebar-link">Menu</Link>
              <Link to="/restaurant/order" className="sidebar-link">Track Order</Link>
              <Link to="/restaurant/orders" className="sidebar-link">Orders</Link>
              <Link to="/restaurant/billing" className="sidebar-link">Billing</Link>
            </>
          )}

        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full border-2 border-amber-200 hover:bg-amber-400 hover:text-black transition p-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;