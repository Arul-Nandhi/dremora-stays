import { useEffect, useState } from "react";
import API from "../../api/api";

function Reports() {
  const [data, setData] = useState({
    total_rooms: 0,
    total_bookings: 0,
    active_bookings: 0,
    total_revenue: 0
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("dashboard/");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Rooms</h3>
          <p className="text-3xl font-bold">{data.total_rooms}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-3xl font-bold">{data.total_bookings}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Active Bookings</h3>
          <p className="text-3xl font-bold text-green-600">
            {data.active_bookings}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold text-blue-600">
            ₹{data.total_revenue}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Reports;