import { useEffect, useState } from "react";
import API from "../../api/api";

function CheckOut() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("booking/");
      
      
      const filtered = res.data.filter(b => b.status === "checked_in");
      setBookings(filtered);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCheckOut = async (id) => {
    try {
      const res = await API.post(`booking/checkout/${id}/`);
      
      alert(`Checkout Successful \nTotal Bill: ₹${res.data.total_bill}`);

      fetchBookings(); // refresh list
    } catch (err) {
      console.log(err.response?.data);
      alert("Checkout Failed ");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Check-Out Guests</h2>

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
              <td className="p-2 text-blue-500">{b.status}</td>

              <td className="p-2">
                <button
                  onClick={() => handleCheckOut(b.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Check-Out
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default CheckOut;