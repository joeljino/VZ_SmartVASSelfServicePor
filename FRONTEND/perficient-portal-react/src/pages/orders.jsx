// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Orders({ currentUser }) {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get all orders from localStorage
//     const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
//     // Filter orders for the current user only
//     const userOrders = allOrders.filter((o) => o.user === currentUser);
//     setOrders(userOrders);
//   }, [currentUser]);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-4">Orders</h1>

//       {orders.length === 0 && (
//         <p className="text-sm text-gray-500">
//           You haven’t purchased anything yet.
//         </p>
//       )}

//       <div className="space-y-3">
//         {orders.map((o) => (
//           <div
//             key={o.id}
//             className="p-4 border rounded-xl flex justify-between items-center"
//           >
//             <div className="flex-1">
//               <div className="font-semibold">{o.item.name}</div>
//               <div className="text-sm text-gray-600">
//                 {new Date(o.purchasedAt).toLocaleString()}
//               </div>
//             </div>
//             <div className="font-bold">₹{o.item.price}</div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <button
//           onClick={() => navigate('/product')}
//           className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const rawUser = localStorage.getItem("user");
//   const storedUser = rawUser ? JSON.parse(rawUser) : null;
//   const userId = storedUser?.id;
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!userId) return;

//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const res = await axiosInstance.get(`/orders/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           setOrders(res.data.data);
//         } else {
//           setOrders([]);
//         }
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId, token]);

//   const CancelOrder(o_id) => {
//     const res = await axiosInstance.patch(`/orders/${o_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//     console.log("Cancel order", o_id)

//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-6">My Orders</h1>

//       {loading && <p className="text-gray-500">Loading orders...</p>}

//       {!loading && orders.length === 0 && (
//         <p className="text-sm text-gray-500">
//           You haven’t purchased anything yet.
//         </p>
//       )}

//       <div className="space-y-6">
//         {orders.map((o) => (
//           <div
//             key={o.id}
//             className="p-6 border rounded-xl shadow-sm bg-white"
//           >
//             {/* Order Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold text-lg">Order #{o.id}</h2>
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   o.status === "PROCESSING"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : o.status === "COMPLETED"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"

//                 }`}
//               >
//                 {o.status}
//               </span>
//             </div>

//             {/* Order Details */}
//             <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
//               <p>
//                 <span className="font-medium">Order Date:</span>{" "}
//                 {new Date(o.orderTime).toLocaleString()}
//               </p>
//               <p>
//                 <span className="font-medium">Shipping Address:</span> {o.shippingAddress}
//               </p>
//               <p>
//                 <span className="font-medium">Total Amount:</span> ₹{o.totalAmount.toFixed(2)}
//               </p>
//               <p>
//                 <span className="font-medium">Discount:</span> ₹{o.discountAmount.toFixed(2)}
//               </p>
//               <p>
//                 <span className="font-medium">Final Amount:</span>{" "}
//                 <span className="text-green-700 font-semibold">₹{o.finalAmount.toFixed(2)}</span>
//               </p>
//             </div>

//             {/* Order Items */}
//             <div>
//               <h3 className="font-medium mb-2">Items</h3>
//               <div className="border rounded-lg divide-y">
//                 {o.orderItems.map((item) => (
//                   <div
//                     key={item.orderItemId}
//                     className="flex justify-between items-center p-3"
//                   >
//                     <div>
//                       <p className="font-medium">Product #{item.productId}</p>
//                       <p className="text-xs text-gray-500">
//                         Qty: {item.quantity} × ₹{item.unitPrice.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="font-semibold">
//                       ₹{item.totalPrice.toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {o.status !== "CANCELLED" && (
//                 <div className="mt-6 text-right">
//                     <button
//                     onClick={() => CancelOrder(o.id)} // replace with your cancel API call
//                     className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//                     >
//                     Cancel Order
//                     </button>
//                 </div>
//                 )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 text-center">
//         <button
//           onClick={() => navigate("/product")}
//           className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancelling, setCancelling] = useState(null); // id of order being cancelled
//   const navigate = useNavigate();

//   const rawUser = localStorage.getItem("user");
//   const storedUser = rawUser ? JSON.parse(rawUser) : null;
//   const userId = storedUser?.id;
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!userId) return;

//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const res = await axiosInstance.get(`/orders/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           setOrders(res.data.data);
//         } else {
//           setOrders([]);
//         }
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId, token]);

//   const CancelOrder = async (o_id) => {
//         try {
//             setCancelling(o_id);
//             const res = await axiosInstance.patch(
//             `/orders/${o_id}`,
//             { status: "CANCELLED" }, // <-- include the body here
//             {
//                 headers: { Authorization: `Bearer ${token}` },
//             }
//             );

//             if (res.data.success) {
//             // Update the orders array with the updated order
//                 setOrders((prevOrders) =>
//                     prevOrders.map((order) =>
//                     order.id === res.data.data.id ? res.data.data : order
//                     )
//                 );
//                 alert(`Order #${res.data.data.id} has been cancelled successfully.`);
//             }
//         } catch (err) {
//             console.error("Error cancelling order:", err);
//             alert("Failed to cancel the order. Please try again.");
//         } finally {
//             setCancelling(null);
//         }
//     };


//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-6">My Orders</h1>

//       {loading && <p className="text-gray-500">Loading orders...</p>}

//       {!loading && orders.length === 0 && (
//         <p className="text-sm text-gray-500">
//           You haven’t purchased anything yet.
//         </p>
//       )}

//       <div className="space-y-6">
//         {orders.map((o) => (
//           <div
//             key={o.id}
//             className="p-6 border rounded-xl shadow-sm bg-white"
//           >
//             {/* Order Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold text-lg">Order #{o.id}</h2>
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   o.status === "PROCESSING"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : o.status === "COMPLETED"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {o.status}
//               </span>
//             </div>

//             {/* Order Details */}
//             <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
//               <p>
//                 <span className="font-medium">Order Date:</span>{" "}
//                 {new Date(o.orderTime).toLocaleString()}
//               </p>
//               <p>
//                 <span className="font-medium">Shipping Address:</span>{" "}
//                 {o.shippingAddress}
//               </p>
//               <p>
//                 <span className="font-medium">Total Amount:</span> ₹
//                 {o.totalAmount.toFixed(2)}
//               </p>
//               <p>
//                 <span className="font-medium">Discount:</span> ₹
//                 {o.discountAmount.toFixed(2)}
//               </p>
//               <p>
//                 <span className="font-medium">Final Amount:</span>{" "}
//                 <span className="text-green-700 font-semibold">
//                   ₹{o.finalAmount.toFixed(2)}
//                 </span>
//               </p>
//             </div>

//             {/* Order Items */}
//             <div>
//               <h3 className="font-medium mb-2">Items</h3>
//               <div className="border rounded-lg divide-y">
//                 {o.orderItems.map((item) => (
//                   <div
//                     key={item.orderItemId}
//                     className="flex justify-between items-center p-3"
//                   >
//                     <div>
//                       <p className="font-medium">Product #{item.productId}</p>
//                       <p className="text-xs text-gray-500">
//                         Qty: {item.quantity} × ₹{item.unitPrice.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="font-semibold">
//                       ₹{item.totalPrice.toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Cancel Order Button */}
//             {(o.status !== "CANCELLED" && o.status !== "COMPLETED") && (
//               <div className="mt-6 text-right">
//                 <button
//                   onClick={() => CancelOrder(o.id)}
//                   disabled={cancelling === o.id}
//                   className={`px-6 py-2 rounded-lg transition ${
//                     cancelling === o.id
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-red-500 text-white hover:bg-red-600"
//                   }`}
//                 >
//                   {cancelling === o.id ? "Cancelling..." : "Cancel Order"}
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 text-center">
//         <button
//           onClick={() => navigate("/product")}
//           className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancelling, setCancelling] = useState(null); // id of order being cancelled
//   const navigate = useNavigate();

//   const rawUser = localStorage.getItem("user");
//   const storedUser = rawUser ? JSON.parse(rawUser) : null;
//   const userId = storedUser?.id;
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!userId) return;

//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const res = await axiosInstance.get(`/orders/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           setOrders(res.data.data);
//         } else {
//           setOrders([]);
//         }
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId, token]);

//   const CancelOrder = async (o_id) => {
//     try {
//       setCancelling(o_id);

//       // Cancel order
//       const res = await axiosInstance.patch(
//         `/orders/${o_id}`,
//         { status: "CANCELLED" },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data.success) {
//         const updatedOrder = res.data.data;

//         // Update local state
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.id === updatedOrder.id ? updatedOrder : order
//           )
//         );

//         alert(`Order #${updatedOrder.id} has been cancelled successfully.`);

//         // 🔔 Send notification
//         try {
//           await axiosInstance.post(
//             "/notifications",
//             {
//               user_id: userId,
//               type: "ORDER_CANCELLED",
//               message: `Your order #${updatedOrder.id} has been cancelled successfully.`,
//             },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//         } catch (notifyErr) {
//           console.error("Failed to send notification:", notifyErr);
//         }
//       }
//     } catch (err) {
//       console.error("Error cancelling order:", err);
//       alert("Failed to cancel the order. Please try again.");
//     } finally {
//       setCancelling(null);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-6">My Orders</h1>

//       {loading && <p className="text-gray-500">Loading orders...</p>}

//       {!loading && orders.length === 0 && (
//         <p className="text-sm text-gray-500">
//           You haven’t purchased anything yet.
//         </p>
//       )}

//       <div className="space-y-6">
//         {orders.map((o) => (
//           <div
//             key={o.id}
//             className="p-6 border rounded-xl shadow-sm bg-white"
//           >
//             {/* Order Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold text-lg">Order #{o.id}</h2>
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   o.status === "PROCESSING"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : o.status === "COMPLETED"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {o.status}
//               </span>
//             </div>

//             {/* Order Details */}
//             <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
//               <p>
//                 <span className="font-medium">Order Date:</span>{" "}
//                 {new Date(o.orderTime).toLocaleString()}
//               </p>
//               <p>
//                 <span className="font-medium">Shipping Address:</span>{" "}
//                 {o.shippingAddress}
//               </p>
//               <p>
//                 <span className="font-medium">Total Amount:</span> ₹
//                 {o.totalAmount.toFixed(2)}
//               </p>
//               <p>
//                 <span className="font-medium">Discount:</span> ₹
//                 {o.discountAmount.toFixed(2)}
//               </p>
//               <p>
//                 <span className="font-medium">Final Amount:</span>{" "}
//                 <span className="text-green-700 font-semibold">
//                   ₹{o.finalAmount.toFixed(2)}
//                 </span>
//               </p>
//             </div>

//             {/* Order Items */}
//             <div>
//               <h3 className="font-medium mb-2">Items</h3>
//               <div className="border rounded-lg divide-y">
//                 {o.orderItems.map((item) => (
//                   <div
//                     key={item.orderItemId}
//                     className="flex justify-between items-center p-3"
//                   >
//                     <div>
//                       <p className="font-medium">Product #{item.productId}</p>
//                       <p className="text-xs text-gray-500">
//                         Qty: {item.quantity} × ₹{item.unitPrice.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="font-semibold">
//                       ₹{item.totalPrice.toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Cancel Order Button */}
//             {o.status !== "CANCELLED" && o.status !== "COMPLETED" && (
//               <div className="mt-6 text-right">
//                 <button
//                   onClick={() => CancelOrder(o.id)}
//                   disabled={cancelling === o.id}
//                   className={`px-6 py-2 rounded-lg transition ${
//                     cancelling === o.id
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-red-500 text-white hover:bg-red-600"
//                   }`}
//                 >
//                   {cancelling === o.id ? "Cancelling..." : "Cancel Order"}
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 text-center">
//         <button
//           onClick={() => navigate("/product")}
//           className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null); // id of order being cancelled
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

  const CancelOrder = async (o_id) => {
    try {
      setCancelling(o_id);

      // Cancel order
      const res = await axiosInstance.patch(
        `/orders/${o_id}`,
        { status: "CANCELLED" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        const updatedOrder = res.data.data;

        // Update local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );

        alert(`Order #${updatedOrder.id} has been cancelled successfully.`);

        // 🔔 Send notification with full payload
        const notificationPayload = {
          userId: userId,
          type: "ORDER_CANCELLED",
          title: "Order Cancelled Successfully",
          message: `Your order #${updatedOrder.id} has been cancelled successfully.`,
          orderId: updatedOrder.id,
        };
        console.log("Notification Payload:", notificationPayload);

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
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {loading && <p className="text-gray-500">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-sm text-gray-500">
          You haven’t purchased anything yet.
        </p>
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
                  onClick={() => CancelOrder(o.id)}
                  disabled={cancelling === o.id}
                  className={`px-6 py-2 rounded-lg transition ${
                    cancelling === o.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {cancelling === o.id ? "Cancelling..." : "Cancel Order"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

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
