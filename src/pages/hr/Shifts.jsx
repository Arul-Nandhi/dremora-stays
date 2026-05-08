import { useEffect, useState } from "react";
import API from "../../api/api";

function Shifts() {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    employee: "", shift_type: "morning",
    date: "", start_time: "", end_time: ""
  });

  const fetchData = async () => {
    try {
      const [shiftsRes, empRes] = await Promise.all([
        API.get("hr/shifts/"),
        API.get("hr/employees/")
      ]);
      setShifts(shiftsRes.data);
      setEmployees(empRes.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    try {
      await API.post("hr/shifts/", form);
      alert("✅ Shift Assigned!");
      setForm({ employee: "", shift_type: "morning", date: "", start_time: "", end_time: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error(err.response?.data);
      alert("❌ Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shifts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "➕ Assign Shift"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h3 className="font-semibold mb-3">Assign New Shift</h3>
          <div className="grid grid-cols-2 gap-3">
            <select name="employee" value={form.employee}
              onChange={(e) => setForm({ ...form, employee: e.target.value })}
              className="border p-2 rounded">
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} — {emp.role}</option>
              ))}
            </select>

            <select name="shift_type" value={form.shift_type}
              onChange={(e) => setForm({ ...form, shift_type: e.target.value })}
              className="border p-2 rounded">
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>

            <input type="date" value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="border p-2 rounded" />

            <input type="time" value={form.start_time} placeholder="Start Time"
              onChange={(e) => setForm({ ...form, start_time: e.target.value })}
              className="border p-2 rounded" />

            <input type="time" value={form.end_time} placeholder="End Time"
              onChange={(e) => setForm({ ...form, end_time: e.target.value })}
              className="border p-2 rounded" />
          </div>
          <button onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Assign Shift
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-center border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Shift</th>
              <th className="p-3">Date</th>
              <th className="p-3">Start Time</th>
              <th className="p-3">End Time</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id} className="border-t">
                <td className="p-3">{shift.employee_name}</td>
                <td className="p-3 capitalize">{shift.shift_type}</td>
                <td className="p-3">{shift.date}</td>
                <td className="p-3">{shift.start_time}</td>
                <td className="p-3">{shift.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Shifts;