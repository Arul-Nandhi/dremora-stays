import { useEffect, useState } from "react";
import API from "../../api/api";

function RoomAvailability() {
  const [rooms, setRooms] = useState([]);

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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Room Availability</h2>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`p-4 rounded shadow 
              ${room.is_available ? "bg-green-100" : "bg-red-100"}`}
          >
            <h3 className="font-bold">Room {room.room_number}</h3>
            <p>Type: {room.room_type}</p>
            <p>Price: ₹{room.price}</p>

            <p className="mt-2 font-semibold">
              {room.is_available ? "Available " : "Occupied "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomAvailability;