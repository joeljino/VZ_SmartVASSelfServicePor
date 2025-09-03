import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null); // id of order being cancelled
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const navigate = useNavigate();

  const rawUser = localStorage.getItem("user");
  const storedUser = rawUser ? JSON.parse(rawUser) : null;
  const userId = storedUser?.id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/orders/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, token]);

  const handleCancelClick = (o_id) => {
    setSelectedOrderId(o_id);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    if (!cancelReason) {
      alert("Please select a reason for cancellation.");
      return;
    }

    try {
      setCancelling(selectedOrderId);

      const res = await axiosInstance.patch(
        `/orders/${selectedOrderId}`,
        { status: "CANCELLED", cancelReason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        const updatedOrder = res.data.data;

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );

        alert(`Order #${updatedOrder.id} has been cancelled successfully.`);

        const notificationPayload = {
          userId: userId,
          type: "ORDER_CANCELLED",
          title: "Order Cancelled Successfully",
          message: `Your order #${updatedOrder.id} has been cancelled successfully.`,
          orderId: updatedOrder.id,
        };

        try {
          await axiosInstance.post("/notifications", notificationPayload, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (notifyErr) {
          console.error("Failed to send notification:", notifyErr);
        }
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel the order. Please try again.");
    } finally {
      setCancelling(null);
      setShowCancelModal(false);
      setCancelReason("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {loading && <p className="text-gray-500">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-sm text-gray-500">You haven’t purchased anything yet.</p>
      )}

      <div className="space-y-6">
        {orders.map((o) => (
          <div
            key={o.id}
            className="p-6 border rounded-xl shadow-sm bg-white"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Order #{o.id}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  o.status === "PROCESSING"
                    ? "bg-yellow-100 text-yellow-700"
                    : o.status === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {o.status}
              </span>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <p>
                <span className="font-medium">Order Date:</span>{" "}
                {new Date(o.orderTime).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Shipping Address:</span>{" "}
                {o.shippingAddress}
              </p>
              <p>
                <span className="font-medium">Total Amount:</span> ₹
                {o.totalAmount.toFixed(2)}
              </p>
              <p>
                <span className="font-medium">Discount:</span> ₹
                {o.discountAmount.toFixed(2)}
              </p>
              <p>
                <span className="font-medium">Final Amount:</span>{" "}
                <span className="text-green-700 font-semibold">
                  ₹{o.finalAmount.toFixed(2)}
                </span>
              </p>
              {o.cancelReason && (
                <p className="text-red-600">
                  <span className="font-medium">Cancel Reason:</span>{" "}
                  {o.cancelReason}
                </p>
              )}
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-medium mb-2">Items</h3>
              <div className="border rounded-lg divide-y">
                {o.orderItems.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex justify-between items-center p-3"
                  >
                    <div>
                      <p className="font-medium">Product #{item.productId}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × ₹{item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="font-semibold">
                      ₹{item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancel Order Button */}
            {o.status !== "CANCELLED" && o.status !== "COMPLETED" && (
              <div className="mt-6 text-right">
                <button
                  onClick={() => handleCancelClick(o.id)}
                  className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Reason for Cancellation</h2>
            <select
              className="w-full border rounded p-2 mb-4"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            >
              <option value="">-- Select Reason --</option>
              <option value="Found a better price elsewhere">
                Found a better price elsewhere
              </option>
              <option value="Delivery time is too long">
                Delivery time is too long
              </option>
              <option value="Changed my mind">Changed my mind</option>
              <option value="Ordered by mistake">Ordered by mistake</option>
              <option value="Other">Other</option>
            </select>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason("");
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={confirmCancelOrder}
                disabled={cancelling === selectedOrderId}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                {cancelling === selectedOrderId ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/product")}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
