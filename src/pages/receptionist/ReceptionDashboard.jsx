import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar";

import ReceptionHome from "./ReceptionHome";
import RoomAvailability from "./RoomAvailability";
import CreateBooking from "./CreateBooking";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import Invoice from "./Invoice";

function ReceptionDashboard() {
  return (
    <div className="flex">

      <Sidebar role="RECEPTIONIST" />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<ReceptionHome />} />
          <Route path="availability" element={<RoomAvailability />} />
          <Route path="create-booking" element={<CreateBooking />} />
          <Route path="checkin" element={<CheckIn />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="invoice" element={<Invoice />} />
          
        </Routes>
      </div>

    </div>
  );
}

export default ReceptionDashboard;