import { useEffect, useState } from "react";
import API from "../../api/api";

function Invoice() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [invoice, setInvoice] = useState(null);
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

  
  const fetchInvoice = async () => {
    if (!selectedBooking) {
      alert(" Please select a booking first!");
      return;
    }

    setLoading(true);
    setError("");
    setInvoice(null);

    try {
      const res = await API.get(`bills/detail/${selectedBooking}/`);
      setInvoice(res.data);
    } catch (err) {
      console.error("Invoice fetch failed:", err.response?.data);
      setError("Bill not found. Please generate bill first from Restaurant panel.");
    } finally {
      setLoading(false);
    }
  };

  
  const bookingDetails = bookings.find(b => b.id == selectedBooking);

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Invoice</h2>

      {/* 🔹 Booking Select */}
      <div className="mb-6 p-4 bg-white shadow rounded">
        <h3 className="font-semibold mb-2 text-gray-700">Select Booking</h3>

        <select
          className="border p-2 w-full rounded mb-3"
          value={selectedBooking}
          onChange={(e) => {
            setSelectedBooking(e.target.value);
            setInvoice(null);
            setError("");
          }}
        >
          <option value="">-- Select Guest Booking --</option>
          {bookings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.guest_name} — Room {b.room_number} ({b.status})
            </option>
          ))}
        </select>

        <button
          onClick={fetchInvoice}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Get Invoice"}
        </button>

        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
      </div>

      {/* 🔹 Invoice Display */}
      {invoice && bookingDetails && (
        <div className="p-6 bg-white shadow rounded">

          {/* Header */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-bold">🏨 Hotel Invoice</h3>
            <p className="text-gray-500 text-sm">Bill ID: #{invoice.bill_id}</p>
          </div>

          {/* Guest + Booking Info */}
          <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Guest Name</p>
              <p className="font-semibold">{bookingDetails.guest_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Room Number</p>
              <p className="font-semibold">{bookingDetails.room_number}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-semibold capitalize">{bookingDetails.status}</p>
            </div>
          </div>

          {/* Charges Breakdown */}
          <div className="border-t pt-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Room Charges</span>
              <span className="font-medium">₹{invoice.room_charges}</span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Food Charges</span>
              <span className="font-medium">₹{invoice.food_charges}</span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-medium">₹{invoice.tax}</span>
            </div>

            <div className="flex justify-between py-2 mt-2">
              <span className="text-xl font-bold">Total</span>
              <span className="text-xl font-bold text-green-600">
                ₹{invoice.total_amount}
              </span>
            </div>
          </div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            🖨️ Print Invoice
          </button>

        </div>
      )}
    </div>
  );
}

export default Invoice;