import { useEffect, useState } from "react";
import API from "../../api/API";

function CheckIn() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("booking/");
      
     
      console.log(res.data)
      const filtered = res.data.filter(b => b.status === "booked");
      setBookings(filtered);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCheckIn = async (id) => {
    try {
      await API.post(`booking/checkin/${id}/`);
      alert("Check-In Successful ✅");
      fetchBookings(); // refresh
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed ");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Check-In Guests</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Guest</th>
            <th className="p-2">Room</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="text-center border-t">
              <td className="p-2">{b.guest_name}</td>
              <td className="p-2">{b.room_number}</td>
              <td className="p-2 text-yellow-500">{b.status}</td>

              <td className="p-2">
                <button
                  onClick={() => handleCheckIn(b.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Check-In
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default CheckIn;