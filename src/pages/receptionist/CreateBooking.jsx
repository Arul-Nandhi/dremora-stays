import { useState, useEffect } from "react";
import API from "../../api/api";

function CreateBooking() {
    const [rooms, setRooms] = useState([]);
    const [guests, setGuests] = useState([]);
    const [selectedGuest, setSelectedGuest] = useState(null);

    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);

    const [form, setForm] = useState({
        room: "",
        guest_name: "",
        guest_phone: "",
        check_in_date: "",
        check_out_date: "",
        total_amount: 0
    });

   
    useEffect(() => {
        const fetchRooms = async () => {
            const res = await API.get("rooms/");
            setRooms(res.data.filter(r => r.is_available));
        };
        fetchRooms();
    }, []);

    
    useEffect(() => {
        const fetchGuests = async () => {
            const res = await API.get("guests/");
            setGuests(res.data);
        };
        fetchGuests();
    }, []);

    
    useEffect(() => {
        if (form.check_in_date && form.check_out_date && price) {
            const inDate = new Date(form.check_in_date);
            const outDate = new Date(form.check_out_date);

            const days = (outDate - inDate) / (1000 * 60 * 60 * 24);

            if (days > 0) {
                const total = days * price;
                setAmount(total);
                setForm(prev => ({ ...prev, total_amount: total }));
            }
        }
    }, [form.check_in_date, form.check_out_date, price]);

    
    const handleRoomChange = (roomId) => {
        const selected = rooms.find(r => r.id == roomId);
        setForm({ ...form, room: roomId });
        setPrice(selected.price);
    };

    
    const handleGuestSelect = (guestId) => {
        const guest = guests.find(g => g.id == guestId);
        setSelectedGuest(guest);

        setForm({
            ...form,
            guest_name: guest.name,
            guest_phone: guest.phone
        });
    };

    
    const handleSubmit = async () => {
        try {
            await API.post("booking/create/", form);
            alert("Booking Created Successfully ");
        } catch (err) {
            console.log(err.response?.data);
            alert("Failed ");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Create Booking</h2>

            <div className="flex flex-col gap-3 max-w-md">

                {/* ROOM */}
                <select
                    className="border p-2"
                    onChange={(e) => handleRoomChange(e.target.value)}
                >
                    <option>Select Room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            Room {room.room_number} - ₹{room.price}
                        </option>
                    ))}
                </select>

                {/* EXISTING GUEST */}
                <select onChange={(e) => setForm({ ...form, guest_id: e.target.value })}>
                    <option>Select Existing Guest</option>
                    {guests.map(g => (
                        <option key={g.id} value={g.id}>{g.name} - {g.phone}</option>
                    ))}
                </select>

                <p className="text-center text-gray-500">OR</p>

                {/* NEW GUEST */}
                <input
                    placeholder="Guest Name"
                    className="border p-2"
                    onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
                />

                <input
                    placeholder="Phone"
                    className="border p-2"
                    onChange={(e) => setForm({ ...form, guest_phone: e.target.value })}
                />

                {/* DATES */}
                <input
                    type="date"
                    className="border p-2"
                    onChange={(e) =>
                        setForm({ ...form, check_in_date: e.target.value })
                    }
                />

                <input
                    type="date"
                    className="border p-2"
                    onChange={(e) =>
                        setForm({ ...form, check_out_date: e.target.value })
                    }
                />

                {/* AMOUNT */}
                <div className="p-3 bg-gray-100 rounded">
                    <b>Total Amount: ₹{amount}</b>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Create Booking
                </button>

            </div>
        </div>
    );
}

export default CreateBooking;