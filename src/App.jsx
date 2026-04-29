import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Guests from "./pages/Guests";
import Restaurant from "./pages/Restaurant";
import Billing from "./pages/Billing";
import Employees from "./pages/Employees";
import Reports from "./pages/Reports";
import HR from "./pages/HR";
import Profile from "./pages/Profile";
import ImageTest from "./pages/ImageTest";
import Food from "./pages/Food";
import Events from "./pages/Events";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

import GuestNavbar from "./components/GuestNavbar";

function App() {
  const [role, setRole] = useState('guest'); // 'guest', 'admin', 'employee', 'hr'

  return (
    <BrowserRouter>
      {role === 'guest' ? (
        <div className="bg-black min-h-screen text-white">
          <Routes>
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="*" element={
              <>
                <GuestNavbar />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/guest/rooms" element={<div className="p-8 max-w-7xl mx-auto"><Rooms role="guest" /></div>} />
                  <Route path="/guest/events" element={<div className="p-8 max-w-7xl mx-auto"><Events role="guest" /></div>} />
                  <Route path="/guest/restaurant" element={<div className="p-8 max-w-7xl mx-auto"><Restaurant role="guest" /></div>} />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      ) : (
        <div className="flex">
          <Sidebar role={role} setRole={setRole} />

        <div className="flex-1 p-6 bg-gray-100 min-h-screen">

          <Routes>
            <Route path="/" element={<Dashboard role={role} />} />
            <Route path="/rooms" element={<Rooms role={role} />} />

            <Route path="/bookings" element={<Bookings role={role} />} />

            <Route path="/guests" element={<Guests />} />

            <Route path="/restaurant" element={<Restaurant />} />

            <Route path="/billing" element={<Billing role={role} />} />

            <Route path="/employees" element={<Employees />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="/hr" element={<HR />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/test" element={<ImageTest />} />

            <Route path="/food" element={<Food />} />

            <Route path="/dj" element={<Events />} />

          </Routes>
        </div>
      </div>
      )}
    </BrowserRouter>
  );
}

export default App;