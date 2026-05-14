import { useEffect, useState } from "react";
import API from "../../api/API";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("restaurant/order/list/");
        setOrders(res.data);
      } catch (err) {
        console.error("Orders fetch failed:", err.response?.data);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-3xl">
      <h3 className="text-xl font-bold mb-4">Orders</h3>

      {orders.length === 0 && (
        <p className="text-gray-400">No orders found.</p>
      )}

      {/* 🔹 Orders List */}
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow rounded p-4 mb-3">
          <div className="flex justify-between items-center">

            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-gray-500">
                Booking ID: {order.booking}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() =>
                setSelectedOrder(selectedOrder?.id === order.id ? null : order)
              }
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              {selectedOrder?.id === order.id ? "Hide Details" : "View Details"}
            </button>

          </div>

          {/* 🔹 Order Detail — toggle */}
          {selectedOrder?.id === order.id && (
            <div className="mt-4 border-t pt-4">
              <h4 className="font-semibold mb-3 text-gray-700">Order Items</h4>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2 text-sm"
                >
                  <span className="font-medium">{item.menu_item_name}</span>

                  <span className="text-gray-500">
                    {item.quantity} x ₹{item.price}
                  </span>

                  <span className="font-semibold text-green-600">
                    ₹{item.quantity * item.price}
                  </span>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between mt-3 font-bold text-base">
                <span>Total</span>
                <span className="text-green-600">
                  ₹{order.items.reduce(
                    (sum, item) => sum + item.quantity * item.price, 0
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;