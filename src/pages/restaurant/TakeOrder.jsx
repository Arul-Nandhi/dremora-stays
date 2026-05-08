import { useEffect, useState } from "react";
import API from "../../api/api";

function TakeOrder() {
  const [guests, setGuests] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [items, setItems] = useState([]);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const res = await API.get("guests/");
        setGuests(res.data);
      } catch (err) {
        console.error("Guests fetch failed:", err.response?.data);
      }
    };

    const fetchMenu = async () => {
      try {
        const res = await API.get("restaurant/menu/");
        setMenu(res.data);
      } catch (err) {
        console.error("Menu fetch failed:", err.response?.data);
      }
    };

    fetchGuests();
    fetchMenu();
  }, []);

  
  const handleGuestSelect = async (guestId) => {
    setSelectedGuest(guestId);
    setSelectedBooking(null);
    setBookingError("");

    if (!guestId) return;

    try {
      const res = await API.get("booking/");
      const allBookings = res.data;

      // Guest ki checked_in booking dhundho
      const activeBooking = allBookings.find(
        (b) => b.guest_id == guestId && b.status === "checked_in"
      );

      if (activeBooking) {
        setSelectedBooking(activeBooking);
      } else {
        setBookingError(" This guest has no active checked-in booking!");
      }
    } catch (err) {
      console.error("Booking fetch failed:", err.response?.data);
      setBookingError(" Failed to fetch booking details.");
    }
  };

  const addItem = () => {
    setItems([...items, { menu_item: "", quantity: 1 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const submitOrder = async () => {
    if (!selectedGuest) {
      alert(" Please select a guest first!");
      return;
    }
    if (!selectedBooking) {
      alert(" No active booking found for this guest!");
      return;
    }
    if (items.length === 0) {
      alert(" Please add at least one item!");
      return;
    }

    try {
      const payload = {
        booking: selectedBooking.id,
        items: items,
      };

      console.log("PAYLOAD:", payload);
      await API.post("restaurant/order/create/", payload);
      alert(" Order Created Successfully!");

      // Reset
      setItems([]);
      setSelectedGuest("");
      setSelectedBooking(null);
      setBookingError("");

    } catch (err) {
      console.log("Order Error:", err.response?.data);
      alert(" Failed to create order");
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Take Order</h2>

      {/* 🔹 Guest Select */}
      <div className="mb-6 p-4 bg-white shadow rounded">
        <h3 className="font-semibold mb-2 text-gray-700">Select Guest</h3>

        <select
          className="border p-2 w-full rounded"
          value={selectedGuest}
          onChange={(e) => handleGuestSelect(e.target.value)}
        >
          <option value="">-- Select Existing Guest --</option>
          {guests.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name} - {g.phone}
            </option>
          ))}
        </select>

        {/*  Active booking info */}
        {selectedBooking && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
            ✅ <b>{selectedBooking.guest_name}</b> — Room {selectedBooking.room_number} ({selectedBooking.status})
          </div>
        )}

        {/*  No booking error */}
        {bookingError && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {bookingError}
          </div>
        )}
      </div>

      {/* 🔹 Order Items */}
      <div className="mb-4 p-4 bg-white shadow rounded">
        <h3 className="font-semibold mb-3 text-gray-700">Order Items</h3>

        {items.length === 0 && (
          <p className="text-gray-400 text-sm mb-3">No items added yet.</p>
        )}

        {items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2 items-center">

            <select
              className="border p-2 rounded flex-1"
              value={item.menu_item}
              onChange={(e) => updateItem(index, "menu_item", e.target.value)}
            >
              <option value="">Select Item</option>
              {menu.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} - ₹{m.price}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              className="border p-2 w-20 rounded"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
            />

            <button
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              ✕
            </button>

          </div>
        ))}

        <button
          onClick={addItem}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ➕ Add Item
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={submitOrder}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Submit Order
      </button>
    </div>
  );
}

export default TakeOrder;