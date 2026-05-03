import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link to="rooms" className="p-6 bg-white shadow rounded hover:bg-gray-100">
          <h2 className="text-xl font-semibold">Manage Rooms</h2>
          <p className="text-gray-500">Add / Update Rooms</p>
        </Link>

        <Link to="users" className="p-6 bg-white shadow rounded hover:bg-gray-100">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="text-gray-500">Create staff accounts</p>
        </Link>

        <Link to="reports" className="p-6 bg-white shadow rounded hover:bg-gray-100">
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="text-gray-500">View analytics</p>
        </Link>

      </div>
    </div>
  );
}

export default AdminDashboard;