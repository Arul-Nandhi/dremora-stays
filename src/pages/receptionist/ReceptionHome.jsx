function ReceptionHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reception Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Today's Check-ins</h3>
          <p className="text-3xl font-bold">--</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Today's Check-outs</h3>
          <p className="text-3xl font-bold">--</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Available Rooms</h3>
          <p className="text-3xl font-bold">--</p>
        </div>

      </div>
    </div>
  );
}

export default ReceptionHome;