import { useEffect, useState } from "react";
import API from "../../api/api";

function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    room_number: "",
    room_type: "standard",
    price: "",
    hotel: 1,
    is_available: true
  });

  const [editingId, setEditingId] = useState(null);

  const fetchRooms = async () => {
    try {
      const res = await API.get("rooms/");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await API.put(`rooms/${editingId}/`, form);
      } else {
        await API.post("rooms/", form);
      }

      setForm({
        room_number: "",
        room_type: "standard",
        price: "",
        hotel: 1,
        is_available: true
      });

      setEditingId(null);
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert("Error saving room");
    }
  };

  const handleEdit = (room) => {
    setForm({
      room_number: room.room_number,
      room_type: room.room_type,
      price: room.price,
      hotel: room.hotel,
      is_available: room.is_available
    });
    setEditingId(room.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      await API.delete(`rooms/${id}/`);
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Rooms</h2>

      {/* FORM */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <div className="grid grid-cols-4 gap-4">

          <input
            name="room_number"
            placeholder="Room Number"
            value={form.room_number}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="room_type"
            value={form.room_type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
          </select>

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Availability */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_available"
              checked={form.is_available}
              onChange={handleChange}
            />
            Available
          </label>

        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Room" : "Add Room"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 shadow rounded overflow-x-auto">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Room No</th>
              <th className="p-3">Type</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-t">

                <td className="p-3">{room.room_number}</td>
                <td className="p-3 capitalize">{room.room_type}</td>
                <td className="p-3">₹{room.price}</td>

                {/* Availability Badge */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      room.is_available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {room.is_available ? "Available" : "Occupied"}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(room)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageRooms;