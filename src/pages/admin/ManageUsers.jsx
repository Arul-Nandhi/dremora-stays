import { useEffect, useState } from "react";
import API from "../../api/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "RECEPTIONIST",
    status: true
  });

  const [editingId, setEditingId] = useState(null);

  
  const fetchUsers = async () => {
    try {
      const res = await API.get("users/");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
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
        await API.put(`users/${editingId}/`, form);
      } else {
        await API.post("users/", form);
      }

      setForm({
        username: "",
        password: "",
        role: "RECEPTIONIST",
        status: true
      });

      setEditingId(null);
      fetchUsers();

    } catch (err) {
      console.error(err);
      alert("Error saving user");
    }
  };


  const handleEdit = (user) => {
    setForm({
      username: user.username,
      password: "", // password empty rakhenge
      role: user.role,
      status: user.status
    });
    setEditingId(user.id);
  };

  
  const handleToggle = async (id) => {
    try {
      await API.patch(`users/${id}/deactivate/`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* FORM */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <div className="grid grid-cols-4 gap-4">

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="ADMIN">Admin</option>
            <option value="RECEPTIONIST">Receptionist</option>
            <option value="MANAGER">Manager</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="HR">HR</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
            />
            Active
          </label>

        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update User" : "Add User"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 shadow rounded overflow-x-auto">
        <table className="w-full text-center border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Username</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">

                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.role}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      user.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleToggle(user.id)}
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Toggle
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

export default ManageUsers;