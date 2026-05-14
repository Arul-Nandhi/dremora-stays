import { useEffect, useState } from "react";
import API from "../../api/API";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    employee: "", date: "", status: "present",
    check_in: "", check_out: "", notes: ""
  });

  const fetchData = async () => {
    try {
      const [attRes, empRes] = await Promise.all([
        API.get("hr/attendance/"),
        API.get("hr/employees/")
      ]);
      setAttendance(attRes.data);
      setEmployees(empRes.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    try {
      await API.post("hr/attendance/", form);
      alert("✅ Attendance Marked!");
      setForm({ employee: "", date: "", status: "present", check_in: "", check_out: "", notes: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error(err.response?.data);
      alert("❌ Failed");
    }
  };

  const statusColors = {
    present: "bg-green-100 text-green-700",
    absent: "bg-red-100 text-red-700",
    late: "bg-yellow-100 text-yellow-700",
    half_day: "bg-blue-100 text-blue-700",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Attendance</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "➕ Mark Attendance"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h3 className="font-semibold mb-3">Mark Attendance</h3>
          <div className="grid grid-cols-2 gap-3">
            <select value={form.employee}
              onChange={(e) => setForm({ ...form, employee: e.target.value })}
              className="border p-2 rounded">
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} — {emp.role}</option>
              ))}
            </select>

            <input type="date" value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="border p-2 rounded" />

            <select value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="border p-2 rounded">
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="half_day">Half Day</option>
            </select>

            <input type="time" value={form.check_in} placeholder="Check In"
              onChange={(e) => setForm({ ...form, check_in: e.target.value })}
              className="border p-2 rounded" />

            <input type="time" value={form.check_out} placeholder="Check Out"
              onChange={(e) => setForm({ ...form, check_out: e.target.value })}
              className="border p-2 rounded" />

            <input placeholder="Notes (optional)" value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="border p-2 rounded" />
          </div>
          <button onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Mark Attendance
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-center border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.employee_name}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm capitalize ${statusColors[a.status]}`}>
                    {a.status}
                  </span>
                </td>
                <td className="p-3">{a.check_in || "—"}</td>
                <td className="p-3">{a.check_out || "—"}</td>
                <td className="p-3">{a.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;