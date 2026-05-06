import { useEffect, useState } from "react";
import API from "../../api/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    role: "", salary: "", joining_date: ""
  });

  const fetchEmployees = async () => {
    try {
      const res = await API.get("hr/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await API.put(`hr/employees/${editingId}/`, form);
      } else {
        await API.post("hr/employees/", form);
      }
      alert(editingId ? "✅ Employee Updated!" : "✅ Employee Added!");
      setForm({ name: "", phone: "", email: "", role: "", salary: "", joining_date: "" });
      setEditingId(null);
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      console.error(err.response?.data);
      alert("❌ Failed");
    }
  };

  const handleEdit = (emp) => {
    setForm({
      name: emp.name, phone: emp.phone, email: emp.email,
      role: emp.role, salary: emp.salary, joining_date: emp.joining_date
    });
    setEditingId(emp.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deactivate this employee?")) return;
    try {
      await API.delete(`hr/employees/${id}/`);
      fetchEmployees();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null);
            setForm({ name: "", phone: "", email: "", role: "", salary: "", joining_date: "" });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "➕ Add Employee"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h3 className="font-semibold mb-3">
            {editingId ? "Edit Employee" : "Add New Employee"}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <input name="name" placeholder="Full Name" value={form.name}
              onChange={handleChange} className="border p-2 rounded" />
            <input name="phone" placeholder="Phone" value={form.phone}
              onChange={handleChange} className="border p-2 rounded" />
            <input name="email" placeholder="Email" value={form.email}
              onChange={handleChange} className="border p-2 rounded" />
            <input name="role" placeholder="Role (e.g. Chef, Receptionist)" value={form.role}
              onChange={handleChange} className="border p-2 rounded" />
            <input name="salary" placeholder="Salary" value={form.salary}
              onChange={handleChange} className="border p-2 rounded" type="number" />
            <input name="joining_date" value={form.joining_date}
              onChange={handleChange} className="border p-2 rounded" type="date" />
          </div>
          <button onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            {editingId ? "Update Employee" : "Save Employee"}
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-center border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Salary</th>
              <th className="p-3">Joining Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.role}</td>
                <td className="p-3">{emp.phone}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">₹{emp.salary}</td>
                <td className="p-3">{emp.joining_date}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(emp)}
                    className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;