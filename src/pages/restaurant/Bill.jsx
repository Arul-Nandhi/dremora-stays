import { useEffect, useState } from "react";
import API from "../../api/API";

function Bill() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("booking/");
        setBookings(res.data);
      } catch (err) {
        console.error("Bookings fetch failed:", err.response?.data);
      }
    };
    fetchBookings();
  }, []);

  
  const generateBill = async () => {
    if (!selectedBooking) {
      alert("Please select a booking first!");
      return;
    }

    setLoading(true);
    setError("");
    setBill(null);

    try {
      const res = await API.post(`bills/generate/${selectedBooking}/`);
      setBill(res.data);
    } catch (err) {
      console.error("Bill generate failed:", err.response?.data);
      setError("Failed to generate bill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Generate Bill</h2>

      {/* 🔹 Booking Select */}
      <div className="mb-6 p-4 bg-white shadow rounded">
        <h3 className="font-semibold mb-2 text-gray-700">Select Booking</h3>

        <select
          className="border p-2 w-full rounded mb-3"
          value={selectedBooking}
          onChange={(e) => {
            setSelectedBooking(e.target.value);
            setBill(null);
            setError("");
          }}
        >
          <option value="">-- Select Checked-In Guest --</option>
          {bookings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.guest_name} — Room {b.room_number} ({b.status})
            </option>
          ))}
        </select>

        <button
          onClick={generateBill}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Bill"}
        </button>

        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
      </div>

      {/* 🔹 Bill Display */}
      {bill && (
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">
            Bill Summary
          </h3>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Room Charges</span>
            <span className="font-medium">₹{bill.room_charges}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Food Charges</span>
            <span className="font-medium">₹{bill.food_charges}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium">₹{bill.tax}</span>
          </div>

          <div className="flex justify-between py-2 mt-2">
            <span className="text-xl font-bold">Total</span>
            <span className="text-xl font-bold text-green-600">
              ₹{bill.total_amount}
            </span>
          </div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            🖨️ Print Bill
          </button>
        </div>
      )}
    </div>
  );
}

export default Bill;