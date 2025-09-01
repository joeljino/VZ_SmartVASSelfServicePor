// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function PaymentCart() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   // Resolve cart source:
//   // - state.items -> explicit multi-item checkout
//   // - state.item  -> single-item 'Buy Now'
//   // - otherwise -> read from localStorage 'cart'
//   let cart = [];
//   let loadedFromLocalStorage = false;

//   if (state?.items && Array.isArray(state.items)) {
//     cart = state.items;
//   } else if (state?.item) {
//     // single-item checkout
//     // allow item be either full product or a minimal object { id, name, price, ... }
//     cart = [state.item];
//   } else {
//     cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     loadedFromLocalStorage = true;
//   }

//   const total = cart.reduce((a, b) => a + (b.price || 0), 0);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     card: "",
//     expiry: "",
//     cvv: "",
//     method: "Visa",
//   });

//   const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

//   // Validation includes address now
//   function validate() {
//     const phoneOk = /^\d{10}$/.test(form.phone);
//     const cardOk = /^\d{16}$/.test(form.card);
//     const expiryOk = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(form.expiry);
//     const cvvOk = /^\d{3}$/.test(form.cvv);
//     const nameOk = form.name.trim().length > 2;
//     const addressOk = form.address.trim().length > 5;
//     return phoneOk && cardOk && expiryOk && cvvOk && nameOk && addressOk;
//   }

//   function onPay(e) {
//     e.preventDefault();
//     if (!validate()) {
//       alert("Please fill all fields correctly (including address).");
//       return;
//     }

//     // Save orders
//     const orders = JSON.parse(localStorage.getItem("orders") || "[]");
//     const now = new Date().toISOString();
//     cart.forEach((item) => {
//       orders.push({
//         id: crypto.randomUUID(),
//         item,
//         paid: item.price || 0,
//         method: form.method,
//         purchasedAt: now,
//         buyer: { name: form.name, phone: form.phone, address: form.address },
//       });
//     });
//     localStorage.setItem("orders", JSON.stringify(orders));

//     // Clear localStorage cart only if we loaded from localStorage (i.e. it's a cart checkout)
//     if (loadedFromLocalStorage) {
//       localStorage.removeItem("cart");
//     }

//     // Navigate to success page
//     navigate("/payment-success", { state: { type: "order" } });
//   }

//   return (
//     <div className="max-w-xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-4">Payment</h1>

//       <div className="p-6 rounded-2xl border shadow-lg bg-white">
//         {/* Cart summary */}
//         <div className="mb-4 space-y-2">
//           <p className="font-semibold">Items: {cart.length}</p>

//           {cart.length === 0 ? (
//             <p className="text-gray-500">No product selected.</p>
//           ) : (
//             <ul className="list-disc pl-5 text-gray-700">
//               {cart.map((item, i) => (
//                 <li key={i} className="flex justify-between">
//                   <span>{item.name || item.title || "Unnamed product"}</span>
//                   <span className="font-medium">₹{item.price ?? 0}</span>
//                 </li>
//               ))}
//             </ul>
//           )}

//           <p className="font-bold text-lg mt-2">Total: ₹{total}</p>
//         </div>

//         {/* Payment form (Back to Cart removed as requested) */}
//         <form onSubmit={onPay} className="space-y-4 text-sm">
//           <input
//             value={form.name}
//             onChange={(e) => set("name", e.target.value)}
//             placeholder="Full Name"
//             className="w-full border rounded-xl px-3 py-2"
//             required
//           />

//           <input
//             value={form.phone}
//             onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
//             placeholder="Phone (10 digits)"
//             maxLength={10}
//             className="w-full border rounded-xl px-3 py-2"
//             required
//           />

//           {/* Address field added */}
//           <input
//             value={form.address}
//             onChange={(e) => set("address", e.target.value)}
//             placeholder="Delivery Address"
//             className="w-full border rounded-xl px-3 py-2"
//             required
//           />

//           <input
//             value={form.card}
//             onChange={(e) => set("card", e.target.value.replace(/\D/g, ""))}
//             placeholder="Card Number (16 digits)"
//             maxLength={16}
//             className="w-full border rounded-xl px-3 py-2"
//             required
//           />

//           <div className="grid grid-cols-2 gap-3">
//             <input
//               value={form.expiry}
//               onChange={(e) => set("expiry", e.target.value)}
//               placeholder="MM/YY"
//               className="border rounded-xl px-3 py-2"
//               required
//             />
//             <input
//               value={form.cvv}
//               onChange={(e) => set("cvv", e.target.value.replace(/\D/g, ""))}
//               placeholder="CVV"
//               maxLength={3}
//               className="border rounded-xl px-3 py-2"
//               required
//             />
//           </div>

//           <select
//             value={form.method}
//             onChange={(e) => set("method", e.target.value)}
//             className="w-full border rounded-xl px-3 py-2"
//           >
//             <option>Visa</option>
//             <option>Mastercard</option>
//             <option>GPay</option>
//           </select>

//           <button
//             type="submit"
//             className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold mt-2 transition"
//           >
//             Pay ₹{total}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// export default function PaymentCart() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Resolve cart source:
//   // - state.items -> explicit multi-item checkout
//   // - state.item  -> single-item 'Buy Now'
//   // - otherwise -> read from localStorage 'cart'
//   let cart = [];
//   let loadedFromLocalStorage = false;

//   console.log("localstorage: ", JSON.parse(localStorage.getItem("cart") || "[]"));

//   if (state?.items && Array.isArray(state.items)) {
//     cart = state.items;
//   } else if (state?.item) {
//     cart = [state.item];
//   } else {
//     cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     loadedFromLocalStorage = true;
//   }

//   console.log("cart: ", cart)

//   const total = cart.reduce((a, b) => a + (b.totalPrice || 0), 0);
//   const size = cart.reduce((a, b) => a + (b.quantity || 0), 0);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     card: "",
//     expiry: "",
//     cvv: "",
//     method: "Visa",
//   });

//   const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

//   // Validation includes address now
//   function validate() {
//     const phoneOk = /^\d{10}$/.test(form.phone);
//     const cardOk = /^\d{16}$/.test(form.card);
//     const expiryOk = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(form.expiry);
//     const cvvOk = /^\d{3}$/.test(form.cvv);
//     const nameOk = form.name.trim().length > 2;
//     const addressOk = form.address.trim().length > 5;
//     return phoneOk && cardOk && expiryOk && cvvOk && nameOk && addressOk;
//   }

//   function onPay(e) {
//     e.preventDefault();
//     if (!validate()) {
//       alert("Please fill all fields correctly (including address).");
//       return;
//     }

//     // Save orders
//     const orders = JSON.parse(localStorage.getItem("orders") || "[]");
//     const now = new Date().toISOString();
//     cart.forEach((item) => {
//       orders.push({
//         id: crypto.randomUUID(),
//         item,
//         paid: item.price || 0,
//         method: form.method,
//         purchasedAt: now,
//         buyer: { name: form.name, phone: form.phone, address: form.address },
//       });
//     });
//     localStorage.setItem("orders", JSON.stringify(orders));

//     // Clear localStorage cart only if we loaded from localStorage (i.e. it's a cart checkout)
//     if (loadedFromLocalStorage) {
//       localStorage.removeItem("cart");
//     }

//     // Navigate to success page
//     navigate("/payment-success", { state: { type: "order" } });
//   }
  
//   // async function createOrder(cart) {
//   //   // e.preventDefault();
//   //     console.log("createOrder");
//   //     console.log("cart: ", cart);
//   //     // try {
//   //     //   axiosInstance.post("/orders", cart)
//   //     //   .then(res => {
//   //     //     console.log("Order created:", res.data);
//   //     //   })
//   //     //   .catch(err => {
//   //     //     console.error("Error:", err.response?.data || err.message);
//   //     //   });


//   //     //   // console.log("res: ", res);
//   //     // } catch (err) {
//   //     //   console.error("Error:", err);
//   //     // } finally {
//   //     //   // setLoading(false);
//   //     // }
//   //     try {
//   //       const token = localStorage.getItem("token"); // Or however you store it

//   //       axiosInstance.post(
//   //         "/orders",
//   //         cart,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         }
//   //       )
//   //       .then(res => {
//   //         console.log("Order created:", res.data);
//   //       })
//   //       .catch(err => {
//   //         console.error("Error:", err.response?.data || err.message);
//   //       });

//   //     } catch (err) {
//   //       console.error("Error:", err);
//   //     } finally {
//   //       // setLoading(false);
//   //   }

//   // }

//   async function createOrder(cart) {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         alert("You must be logged in to place an order.");
//         return;
//       }

//       const orderItems = cart.map(item => ({
//         productId: item.id,
//         quantity: item.quantity,
//         unitPrice: item.unitPrice,
//         totalPrice: item.totalPrice
//       }));

//       const order = {
//         userId: user.id,
//         status: "PROCESSING",
//         totalAmount: cart.reduce((a, b) => a + b.totalPrice, 0),
//         discountAmount: 0,
//         finalAmount: cart.reduce((a, b) => a + b.totalPrice, 0),
//         shippingAddress: form.address,
//         orderTime: new Date().toISOString(),
//         orderItems: orderItems
//       };

//       const res = await axiosInstance.post("/orders", order, {
//         headers: { Authorization: `Bearer ${user.token}` }
//       });

//       console.log("Order created:", res.data);
//       navigate("/payment-success", { state: { type: "order" } });

//     } catch (err) {
//       console.error("Error:", err.response?.data || err.message);
//     }
//   }



//   return (
//     <div className="max-w-xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-4">Payment</h1>

//       <div className="p-6 rounded-2xl border shadow-lg bg-white">
//         {/* Cart summary */}
//         <div className="mb-4 space-y-2">
//           <p className="font-semibold">Items: {size}</p>

//           {cart.length === 0 ? (
//             <p className="text-gray-500">No product selected.</p>
//           ) : (
//             <ul className="list-disc pl-5 text-gray-700">
//               {cart.map((item, i) => (
//                 <li key={i} className="flex justify-between">
//                   <span>{item.name || item.title || "Unnamed product"}</span>
//                   <span className="font-medium">x{item.quantity}</span>
//                   <span className="font-medium">₹{item.totalPrice ?? 0}</span>
//                 </li>
//               ))}
//             </ul>
//           )}

//           <p className="font-bold text-lg mt-2">Total: ₹{total}</p>
//         </div>

//         {/* Payment form (Back to Cart removed as requested) */}
//         <form onSubmit={onPay} className="space-y-4 text-sm">
//           <input
//             value={form.name}
//             onChange={(e) => set("name", e.target.value)}
//             placeholder="Full Name"
//             className="w-full border rounded-xl px-3 py-2"
//             required
//           />

//           <input
//             value={form.phone}
//             onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
//             placeholder="Phone (10 digits)"
//             maxLength={10}
//             className="w-full border rounded-xl px-3 py-2"
//             required
//           />

//           {/* Address field added */}
//           <input
//             value={form.address}
//             onChange={(e) => set("address", e.target.value)}
//             placeholder="Delivery Address"
//             className="w-full border rounded-xl px-3 py-2"
//             required
//           />

//           <input
//             value={form.card}
//             onChange={(e) => set("card", e.target.value.replace(/\D/g, ""))}
//             placeholder="Card Number (16 digits)"
//             maxLength={16}
//             className="w-full border rounded-xl px-3 py-2"
//             required
//           />

//           <div className="grid grid-cols-2 gap-3">
//             <input
//               value={form.expiry}
//               onChange={(e) => set("expiry", e.target.value)}
//               placeholder="MM/YY"
//               className="border rounded-xl px-3 py-2"
//               required
//             />
//             <input
//               value={form.cvv}
//               onChange={(e) => set("cvv", e.target.value.replace(/\D/g, ""))}
//               placeholder="CVV"
//               maxLength={3}
//               className="border rounded-xl px-3 py-2"
//               required
//             />
//           </div>

//           <select
//             value={form.method}
//             onChange={(e) => set("method", e.target.value)}
//             className="w-full border rounded-xl px-3 py-2"
//           >
//             <option>Visa</option>
//             <option>Mastercard</option>
//             <option>GPay</option>
//           </select>

//           <button
//             type="submit"
//             className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold mt-2 transition"
//             onClick={() =>
//               createOrder(cart)
//             }
//           >
//             Pay ₹{total}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function PaymentCart() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Resolve cart source
  let cart = [];
  let loadedFromLocalStorage = false;

  if (state?.items && Array.isArray(state.items)) {
    cart = state.items;
  } else if (state?.item) {
    cart = [state.item];
  } else {
    cart = JSON.parse(localStorage.getItem("cart") || "[]");
    loadedFromLocalStorage = true;
  }

  const total = cart.reduce((a, b) => a + (b.totalPrice || 0), 0);
  const size = cart.reduce((a, b) => a + (b.quantity || 0), 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    card: "",
    expiry: "",
    cvv: "",
    method: "Visa",
  });

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  function validate() {
    const phoneOk = /^\d{10}$/.test(form.phone);
    const cardOk = /^\d{16}$/.test(form.card);
    const expiryOk = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(form.expiry);
    const cvvOk = /^\d{3}$/.test(form.cvv);
    const nameOk = form.name.trim().length > 2;
    const addressOk = form.address.trim().length > 5;
    return phoneOk && cardOk && expiryOk && cvvOk && nameOk && addressOk;
  }

  async function createOrder(cart) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("You must be logged in to place an order.");
        return;
      }

      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      }));

      const order = {
        userId: user.id,
        status: "PROCESSING",
        totalAmount: cart.reduce((a, b) => a + b.totalPrice, 0),
        discountAmount: 0,
        finalAmount: cart.reduce((a, b) => a + b.totalPrice, 0),
        shippingAddress: form.address,
        orderTime: new Date().toISOString(),
        orderItems: orderItems,
      };

      const res = await axiosInstance.post("/orders", order, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const createdOrder = res.data; // should contain orderId

      console.log("Order created:", createdOrder);

      // 🔔 Create ORDER notification with orderId
      const notificationPayload = {
        userId: user.id,
        type: "ORDER",
        title: "Order Placed Successfully",
        message: `Your order with ${orderItems.length} items (Total: ₹${order.finalAmount}) has been placed successfully.`,
        orderId: createdOrder.orderId,
      };

      await axiosInstance.post("/notifications", notificationPayload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // Clear localStorage cart only if loaded from localStorage
      if (loadedFromLocalStorage) {
        localStorage.removeItem("cart");
      }

      navigate("/payment-success", { state: { type: "order" } });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Order failed!");
    }
  }

  function onPay(e) {
    e.preventDefault();
    if (!validate()) {
      alert("Please fill all fields correctly (including address).");
      return;
    }

    createOrder(cart);
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>

      <div className="p-6 rounded-2xl border shadow-lg bg-white">
        {/* Cart summary */}
        <div className="mb-4 space-y-2">
          <p className="font-semibold">Items: {size}</p>

          {cart.length === 0 ? (
            <p className="text-gray-500">No product selected.</p>
          ) : (
            <ul className="list-disc pl-5 text-gray-700">
              {cart.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>{item.name || item.title || "Unnamed product"}</span>
                  <span className="font-medium">x{item.quantity}</span>
                  <span className="font-medium">₹{item.totalPrice ?? 0}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="font-bold text-lg mt-2">Total: ₹{total}</p>
        </div>

        {/* Payment form */}
        <form onSubmit={onPay} className="space-y-4 text-sm">
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full Name"
            className="w-full border rounded-xl px-3 py-2"
            required
          />

          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
            placeholder="Phone (10 digits)"
            maxLength={10}
            className="w-full border rounded-xl px-3 py-2"
            required
          />

          <input
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="Delivery Address"
            className="w-full border rounded-xl px-3 py-2"
            required
          />

          <input
            value={form.card}
            onChange={(e) => set("card", e.target.value.replace(/\D/g, ""))}
            placeholder="Card Number (16 digits)"
            maxLength={16}
            className="w-full border rounded-xl px-3 py-2"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.expiry}
              onChange={(e) => set("expiry", e.target.value)}
              placeholder="MM/YY"
              className="border rounded-xl px-3 py-2"
              required
            />
            <input
              value={form.cvv}
              onChange={(e) => set("cvv", e.target.value.replace(/\D/g, ""))}
              placeholder="CVV"
              maxLength={3}
              className="border rounded-xl px-3 py-2"
              required
            />
          </div>

          <select
            value={form.method}
            onChange={(e) => set("method", e.target.value)}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option>Visa</option>
            <option>Mastercard</option>
            <option>GPay</option>
          </select>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold mt-2 transition"
          >
            Pay ₹{total}
          </button>
        </form>
      </div>
    </div>
  );
}
