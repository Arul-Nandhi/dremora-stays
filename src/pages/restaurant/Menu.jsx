import { useState, useEffect } from "react";
import API from "../../api/api";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: ""
  });

  
  const fetchMenu = async () => {
    try {
      const res = await API.get("restaurant/menu/");
      console.log("MENU DATA:", res.data);

      
      setMenu(res.data.results || res.data);

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  
  const addItem = async () => {
    try {
      if (!form.name || !form.price || !form.category) {
        alert("All fields required");
        return;
      }

      await API.post("restaurant/menu/", {
        ...form,
        price: parseFloat(form.price) 
      });

      // reset form
      setForm({ name: "", price: "", category: "" });

      fetchMenu();

    } catch (err) {
      console.log(err);
      alert("Failed to add item");
    }
  };

  return (
    <div className="p-4">

      <h3 className="text-xl font-bold mb-4">Menu</h3>

      {/* 🔹 Add Form */}
      <div className="flex gap-2 mb-6">

        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          onClick={addItem}
          className="bg-green-500 hover:bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* 🔹 Menu List */}
      {menu.length === 0 ? (
        <p className="text-gray-500">No menu items found</p>
      ) : (
        menu.map(item => (
          <div
            key={item.id}
            className="border p-3 mb-2 flex justify-between rounded shadow-sm"
          >
            <span>
              {item.name} - ₹{item.price}
            </span>

            <span className="text-sm text-gray-500">
              {item.category}
            </span>
          </div>
        ))
      )}

    </div>
  );
}

export default Menu;