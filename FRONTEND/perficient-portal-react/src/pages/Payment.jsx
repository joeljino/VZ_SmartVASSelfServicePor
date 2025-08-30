// //   import React, { useState } from 'react'
// // import { useLocation, useNavigate } from 'react-router-dom'

// // export default function Payment() {
// //   const { state } = useLocation()
// //   const navigate = useNavigate()
// //   const [form, setForm] = useState({ name: '', phone: '', card: '', expiry: '', cvv: '', method: '' })
// //   const [errors, setErrors] = useState({})

// //   const validate = () => {
// //     const e = {}
// //     if (form.name.trim().length < 2) e.name = 'Enter full name'
// //     if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone number'
// //     if (!/^\d{16}$/.test(form.card.replaceAll(' ', '').slice(0, 16))) e.card = 'Enter 16-digit card'
// //     if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY'
// //     if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = '3-4 digits'
// //     if (!form.method) e.method = 'Select payment method'
// //     setErrors(e)
// //     return Object.keys(e).length === 0
// //   }

// //   const onPay = (e) => {
// //     e.preventDefault()
// //     if (!validate()) return
// //     const purchases = JSON.parse(localStorage.getItem('purchases') || '[]')
// //     const item = state?.item || { type: 'plan', name: 'Unknown', price: 0 }
// //     purchases.push({ ...item, date: new Date().toISOString(), method: form.method })
// //     localStorage.setItem('purchases', JSON.stringify(purchases))
// //     alert('Payment successful!')
// //     navigate('/subscription')
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50 to-white">
// //       <div className="max-w-xl w-full mx-auto px-6 py-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
// //         <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">Payment</h1>

// //         {state?.item && (
// //           <div className="mb-6 p-4 border rounded-xl flex items-center justify-between bg-white shadow-sm">
// //             <div>
// //               <div className="font-semibold">{state.item.name}</div>
// //               <div className="text-sm text-gray-600 capitalize">{state.item.type}</div>
// //             </div>
// //             <div className="text-2xl font-bold">₹{state.item.price}</div>
// //           </div>
// //         )}

// //         <form onSubmit={onPay} className="space-y-4">
// //           <div>
// //             <label className="block text-sm mb-1">Name</label>
// //             <input
// //               className="w-full border rounded-xl px-3 py-2 red-focus"
// //               value={form.name}
// //               onChange={(e) => setForm({ ...form, name: e.target.value })}
// //               required
// //             />
// //             {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm mb-1">Phone Number</label>
// //             <input
// //               type="tel"
// //               className="w-full border rounded-xl px-3 py-2 red-focus"
// //               value={form.phone}
// //               onChange={(e) => setForm({ ...form, phone: e.target.value })}
// //               placeholder="10-digit number"
// //               maxLength="10"
// //               required
// //             />
// //             {errors.phone && <p className="text-brand-red text-xs mt-1">{errors.phone}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm mb-1">Card Number</label>
// //             <input
// //               inputMode="numeric"
// //               className="w-full border rounded-xl px-3 py-2 red-focus"
// //               value={form.card}
// //               onChange={(e) => setForm({ ...form, card: e.target.value })}
// //               placeholder="16-digit number"
// //               maxLength="16"
// //               required
// //             />
// //             {errors.card && <p className="text-brand-red text-xs mt-1">{errors.card}</p>}
// //           </div>

// //           <div className="grid grid-cols-2 gap-3">
// //             <div>
// //               <label className="block text-sm mb-1">Expiry (MM/YY)</label>
// //               <input
// //                 className="w-full border rounded-xl px-3 py-2 red-focus"
// //                 value={form.expiry}
// //                 onChange={(e) => setForm({ ...form, expiry: e.target.value })}
// //                 placeholder="09/27"
// //                 required
// //               />
// //               {errors.expiry && <p className="text-brand-red text-xs mt-1">{errors.expiry}</p>}
// //             </div>
// //             <div>
// //               <label className="block text-sm mb-1">CVV</label>
// //               <input
// //                 className="w-full border rounded-xl px-3 py-2 red-focus"
// //                 value={form.cvv}
// //                 onChange={(e) => setForm({ ...form, cvv: e.target.value })}
// //                 placeholder="123"
// //                 required
// //               />
// //               {errors.cvv && <p className="text-brand-red text-xs mt-1">{errors.cvv}</p>}
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm mb-2">Payment Method</label>
// //             <div className="flex flex-col gap-2">
// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="radio"
// //                   name="method"
// //                   value="Visa"
// //                   checked={form.method === 'Visa'}
// //                   onChange={(e) => setForm({ ...form, method: e.target.value })}
// //                 />
// //                 Visa
// //               </label>

// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="radio"
// //                   name="method"
// //                   value="MasterCard"
// //                   checked={form.method === 'MasterCard'}
// //                   onChange={(e) => setForm({ ...form, method: e.target.value })}
// //                 />
// //                 MasterCard
// //               </label>

// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="radio"
// //                   name="method"
// //                   value="GPay"
// //                   checked={form.method === 'GPay'}
// //                   onChange={(e) => setForm({ ...form, method: e.target.value })}
// //                 />
// //                 GPay
// //               </label>
// //             </div>
// //             {errors.method && <p className="text-brand-red text-xs mt-1">{errors.method}</p>}
// //           </div>

// //           <button className="w-full bg-brand-red text-white py-3 rounded-2xl shadow-soft hover:opacity-90 transition transform hover:scale-[1.01]">
// //             Confirm Payment
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }



// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import axiosInstance from "../api/axiosInstance";


// export default function Payment() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', phone: '', card: '', expiry: '', cvv: '', method: '',autoRenew: true, });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const { item } = state || {};
//   useEffect(() => {
//     if (state?.item?.targetPhoneNumber) {
//       setForm((prev) => ({ ...prev, phone: state.item.targetPhoneNumber }));
//     }
//   }, [state]);

//   const validate = () => {
//     const e = {};
//     if (form.name.trim().length < 2) e.name = 'Enter full name';
//     if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone number';
//     if (!/^\d{16}$/.test(form.card.replaceAll(' ', '').slice(0, 16))) e.card = 'Enter 16-digit card';
//     if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY';
//     if (!/^\d{3}$/.test(form.cvv)) e.cvv = '3 digits';
//     if (!form.method) e.method = 'Select payment method';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const onPay = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);

//     try {
//       // const user = JSON.parse(localStorage.getItem('user') || '{}');
//       let storedUser = null;
//       try {
//         const raw = localStorage.getItem("user");
//         storedUser = raw ? JSON.parse(raw) : null;
//       } catch (err) {
//         console.error("Failed to parse user id from localStorage:", err);
//         storedUser = null;
//       }
//       const userId = storedUser?.id;
//       console.log("user id: "+userId);
//       const token = localStorage.getItem('token');
//       // const item = state?.item || { type: 'plan', id: 0, name: 'Unknown', price: 0 };

//       // Compute dates dynamically based on billingCycle
//       const startDate = new Date();
//       const endDate = new Date(startDate);
//       const billingCycle = item.ServiceBilling_cycle;

//       // Determine number of days based on billing cycle
//       let daysToAdd;
//       switch (billingCycle) {
//         case "MONTHLY":
//           daysToAdd = 30;
//           break;
//         case "QUARTERLY":
//           daysToAdd = 90;
//           break;
//         case "YEARLY":
//           daysToAdd = 365; 
//           break;
//         default:
//           daysToAdd = 30;
//       }

//       endDate.setDate(startDate.getDate() + daysToAdd);
//       const nextBillingDate = new Date(endDate);

//       const payload = {
//         userId: userId,
//         targetPhoneNumber: form.phone,
//         serviceId: item.serviceId,
//         status: "ACTIVE",
//         startDate: startDate.toISOString().split("T")[0],
//         endDate: endDate.toISOString().split("T")[0],
//         nextBillingDate: nextBillingDate.toISOString().split("T")[0],
//         billingCycle: billingCycle,
//         price: item.servicePrice,
//         autoRenew: form.autoRenew
//       };
//       console.log(payload);

//       // Post to backend
//       await axiosInstance.post("/subscriptions", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       // Save local purchase record
//       const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
//       purchases.push({ ...item, date: startDate.toISOString(), method: form.method });
//       localStorage.setItem('purchases', JSON.stringify(purchases));

//       alert("Payment successful and subscription created!");
//       navigate("/subscription");
//     } catch (err) {
//       console.error("Error creating subscription:", err);
//       alert("Subscription Failed!");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50 to-white">
//       <div className="max-w-xl w-full mx-auto px-6 py-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
//         <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">Payment</h1>

//         {state?.item && (
//           <div className="mb-6 p-4 border rounded-xl flex items-center justify-between bg-white shadow-sm">
//             <div>
//               <div className="font-semibold">{state.item.serviceName}</div>
//               <div className="text-sm text-gray-600 capitalize">{state.item.type}</div>
//             </div>
//             <div className="text-2xl font-bold">₹{state.item.servicePrice}</div>
//           </div>
//         )}

//         <form onSubmit={onPay} className="space-y-4">
//           <div>
//             <label className="block text-sm mb-1">Name</label>
//             <input
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />
//             {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name}</p>}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Phone Number</label>
//             <input
//               type="tel"
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.phone}
//               onChange={(e) => setForm({ ...form, phone: e.target.value })}
//               placeholder="10-digit number"
//               maxLength="10"
//               required
//             />
//             {errors.phone && <p className="text-brand-red text-xs mt-1">{errors.phone}</p>}
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Card Number</label>
//             <input
//               inputMode="numeric"
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.card}
//               onChange={(e) => setForm({ ...form, card: e.target.value })}
//               placeholder="16-digit number"
//               maxLength="16"
//               required
//             />
//             {errors.card && <p className="text-brand-red text-xs mt-1">{errors.card}</p>}
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm mb-1">Expiry (MM/YY)</label>
//               <input
//                 className="w-full border rounded-xl px-3 py-2 red-focus"
//                 value={form.expiry}
//                 onChange={(e) => setForm({ ...form, expiry: e.target.value })}
//                 placeholder="09/27"
//                 required
//               />
//               {errors.expiry && <p className="text-brand-red text-xs mt-1">{errors.expiry}</p>}
//             </div>
//             <div>
//               <label className="block text-sm mb-1">CVV</label>
//               <input
//                 className="w-full border rounded-xl px-3 py-2 red-focus"
//                 value={form.cvv}
//                 onChange={(e) => setForm({ ...form, cvv: e.target.value })}
//                 placeholder="123"
//                 required
//               />
//               {errors.cvv && <p className="text-brand-red text-xs mt-1">{errors.cvv}</p>}
//             </div>
//           </div>

//           <div className="flex items-center gap-3 mt-4">
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={form.autoRenew}
//                 onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
//               />
//               <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-brand-red relative transition-colors">
//                 <span
//                   className={`absolute top-0.5 left-0 w-5 h-5 rounded-full shadow-md transition-all 
//                               ${form.autoRenew ? "bg-black translate-x-6" : "bg-black translate-x-0"}`}
//                 ></span>
//               </div>
//               <span className="ml-3 text-sm text-gray-700 select-none">Auto-Renew</span>
//             </label>
//           </div>




//           <div>
//             <label className="block text-sm mb-2">Payment Method</label>
//             <div className="flex flex-col gap-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="method"
//                   value="Visa"
//                   checked={form.method === 'Visa'}
//                   onChange={(e) => setForm({ ...form, method: e.target.value })}
//                 />
//                 Visa
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="method"
//                   value="MasterCard"
//                   checked={form.method === 'MasterCard'}
//                   onChange={(e) => setForm({ ...form, method: e.target.value })}
//                 />
//                 MasterCard
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="method"
//                   value="GPay"
//                   checked={form.method === 'GPay'}
//                   onChange={(e) => setForm({ ...form, method: e.target.value })}
//                 />
//                 GPay
//               </label>
//             </div>
//             {errors.method && <p className="text-brand-red text-xs mt-1">{errors.method}</p>}
//           </div>

//           <button className="w-full bg-brand-red text-white py-3 rounded-2xl shadow-soft hover:opacity-90 transition transform hover:scale-[1.01]">
//             {loading ? "Processing..." : "Confirm Payment"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axiosInstance from "../api/axiosInstance";

// export default function Payment() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ 
//     name: '', 
//     phone: '', 
//     card: '', 
//     expiry: '', 
//     cvv: '', 
//     method: '', 
//     autoRenew: true,
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Extract item and subscriptionId (if it's a renewal)
//   const { item, subscriptionId } = state || {};

//   // Pre-fill phone number if passed
//   useEffect(() => {
//     if (item?.targetPhoneNumber) {
//       setForm(prev => ({ ...prev, phone: item.targetPhoneNumber }));
//     }
//   }, [item]);

//   // Form validation
//   const validate = () => {
//     const e = {};
//     if (form.name.trim().length < 2) e.name = 'Enter full name';
//     if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone number';
//     if (!/^\d{16}$/.test(form.card.replaceAll(' ', '').slice(0, 16))) e.card = 'Enter 16-digit card';
//     if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY';
//     if (!/^\d{3}$/.test(form.cvv)) e.cvv = '3 digits';
//     if (!form.method) e.method = 'Select payment method';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // Handle payment submission
//   const onPay = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);

//     try {
//       // Get logged-in user
//       const rawUser = localStorage.getItem("user");
//       const storedUser = rawUser ? JSON.parse(rawUser) : null;
//       const userId = storedUser?.id;
//       const token = localStorage.getItem('token');

//       // Compute new dates based on billing cycle
//       const startDate = new Date();
//       const endDate = new Date(startDate);
//       let daysToAdd;
//       switch (item.ServiceBilling_cycle) {
//         case "MONTHLY": daysToAdd = 30; break;
//         case "QUARTERLY": daysToAdd = 90; break;
//         case "YEARLY": daysToAdd = 365; break;
//         default: daysToAdd = 30;
//       }
//       endDate.setDate(startDate.getDate() + daysToAdd);
//       const nextBillingDate = form.autoRenew ? new Date(endDate) : null;

//       // Prepare payload
//       const payload = {
//         userId,
//         targetPhoneNumber: form.phone,
//         serviceId: item.serviceId,
//         status: "ACTIVE",
//         startDate: startDate.toISOString().split("T")[0],
//         endDate: endDate.toISOString().split("T")[0],
//         nextBillingDate: nextBillingDate ? nextBillingDate.toISOString().split("T")[0] : null,
//         billingCycle: item.ServiceBilling_cycle,
//         price: item.servicePrice,
//         autoRenew: form.autoRenew
//       };

//       console.log("Payload:", payload);

//       if (subscriptionId) {
//         // Renewal: update existing subscription
//         await axiosInstance.put(`/subscriptions/${subscriptionId}`, payload, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         alert("Subscription renewed successfully!");
//       } else {
//         // New subscription
//         await axiosInstance.post("/subscriptions", payload, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         alert("Payment successful and subscription created!");
//       }

//       // Save local purchase record
//       const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
//       purchases.push({ ...item, date: startDate.toISOString(), method: form.method });
//       localStorage.setItem('purchases', JSON.stringify(purchases));

//       // Redirect to subscriptions page
//       navigate("/subscription");
//     } catch (err) {
//       console.error("Error processing subscription:", err);
//       alert("Subscription Failed!");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50 to-white">
//       <div className="max-w-xl w-full mx-auto px-6 py-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
//         <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">Payment</h1>

//         {/* Display selected plan */}
//         {item && (
//           <div className="mb-6 p-4 border rounded-xl flex items-center justify-between bg-white shadow-sm">
//             <div>
//               <div className="font-semibold">{item.serviceName}</div>
//               <div className="text-sm text-gray-600 capitalize">{item.type}</div>
//             </div>
//             <div className="text-2xl font-bold">₹{item.servicePrice}</div>
//           </div>
//         )}

//         {/* Payment Form */}
//         <form onSubmit={onPay} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm mb-1">Name</label>
//             <input
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />
//             {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name}</p>}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm mb-1">Phone Number</label>
//             <input
//               type="tel"
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.phone}
//               onChange={(e) => setForm({ ...form, phone: e.target.value })}
//               placeholder="10-digit number"
//               maxLength="10"
//               required
//               readOnly={!!subscriptionId}
//             />
//             {errors.phone && <p className="text-brand-red text-xs mt-1">{errors.phone}</p>}
//           </div>

//           {/* Card */}
//           <div>
//             <label className="block text-sm mb-1">Card Number</label>
//             <input
//               inputMode="numeric"
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.card}
//               onChange={(e) => setForm({ ...form, card: e.target.value })}
//               placeholder="16-digit number"
//               maxLength="16"
//               required
//             />
//             {errors.card && <p className="text-brand-red text-xs mt-1">{errors.card}</p>}
//           </div>

//           {/* Expiry & CVV */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm mb-1">Expiry (MM/YY)</label>
//               <input
//                 className="w-full border rounded-xl px-3 py-2 red-focus"
//                 value={form.expiry}
//                 onChange={(e) => setForm({ ...form, expiry: e.target.value })}
//                 placeholder="09/27"
//                 required
//               />
//               {errors.expiry && <p className="text-brand-red text-xs mt-1">{errors.expiry}</p>}
//             </div>
//             <div>
//               <label className="block text-sm mb-1">CVV</label>
//               <input
//                 className="w-full border rounded-xl px-3 py-2 red-focus"
//                 value={form.cvv}
//                 onChange={(e) => setForm({ ...form, cvv: e.target.value })}
//                 placeholder="123"
//                 required
//               />
//               {errors.cvv && <p className="text-brand-red text-xs mt-1">{errors.cvv}</p>}
//             </div>
//           </div>

//           {/* Auto-Renew Toggle */}
//           <div className="flex items-center gap-3 mt-4">
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={form.autoRenew}
//                 onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
//               />
//               <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-brand-red relative transition-colors">
//                 <span
//                   className={`absolute top-0.5 left-0 w-5 h-5 rounded-full shadow-md transition-all 
//                               ${form.autoRenew ? "bg-black translate-x-6" : "bg-black translate-x-0"}`}
//                 ></span>
//               </div>
//               <span className="ml-3 text-sm text-gray-700 select-none">Auto-Renew</span>
//             </label>
//           </div>

//           {/* Payment Method */}
//           <div>
//             <label className="block text-sm mb-2">Payment Method</label>
//             <div className="flex flex-col gap-2">
//               {["Visa", "MasterCard", "GPay"].map(method => (
//                 <label key={method} className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="method"
//                     value={method}
//                     checked={form.method === method}
//                     onChange={(e) => setForm({ ...form, method: e.target.value })}
//                   />
//                   {method}
//                 </label>
//               ))}
//             </div>
//             {errors.method && <p className="text-brand-red text-xs mt-1">{errors.method}</p>}
//           </div>

//           {/* Submit Button */}
//           <button className="w-full bg-brand-red text-white py-3 rounded-2xl shadow-soft hover:opacity-90 transition transform hover:scale-[1.01]">
//             {loading ? "Processing..." : subscriptionId ? "Renew Plan" : "Confirm Payment"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axiosInstance from "../api/axiosInstance";

// export default function Payment() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ 
//     name: '', 
//     phone: '', 
//     card: '', 
//     expiry: '', 
//     cvv: '', 
//     method: '', 
//     autoRenew: true,
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const { item, subscriptionId } = state || {};

//   // Pre-fill phone number if passed
//   useEffect(() => {
//     if (item?.targetPhoneNumber) {
//       setForm(prev => ({ ...prev, phone: item.targetPhoneNumber }));
//     }
//   }, [item]);

//   // Form validation
//   const validate = () => {
//     const e = {};
//     if (form.name.trim().length < 2) e.name = 'Enter full name';
//     if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone number';
//     if (!/^\d{16}$/.test(form.card.replaceAll(' ', '').slice(0, 16))) e.card = 'Enter 16-digit card';
//     if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY';
//     if (!/^\d{3}$/.test(form.cvv)) e.cvv = '3 digits';
//     if (!form.method) e.method = 'Select payment method';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const onPay = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);

//     try {
//       const rawUser = localStorage.getItem("user");
//       const storedUser = rawUser ? JSON.parse(rawUser) : null;
//       const userId = storedUser?.id;
//       const token = localStorage.getItem('token');

//       const startDate = new Date();
//       const endDate = new Date(startDate);
//       let daysToAdd;
//       switch (item.ServiceBilling_cycle) {
//         case "MONTHLY": daysToAdd = 30; break;
//         case "QUARTERLY": daysToAdd = 90; break;
//         case "YEARLY": daysToAdd = 365; break;
//         default: daysToAdd = 30;
//       }
//       endDate.setDate(startDate.getDate() + daysToAdd);
//       const nextBillingDate = form.autoRenew ? new Date(endDate) : null;

//       const payload = {
//         userId,
//         targetPhoneNumber: form.phone,
//         serviceId: item.serviceId,
//         status: "ACTIVE",
//         startDate: startDate.toISOString().split("T")[0],
//         endDate: endDate.toISOString().split("T")[0],
//         nextBillingDate: nextBillingDate ? nextBillingDate.toISOString().split("T")[0] : null,
//         billingCycle: item.ServiceBilling_cycle,
//         price: item.servicePrice,
//         autoRenew: form.autoRenew
//       };

//       console.log("Payload:", payload);

//       if (subscriptionId) {
//         // Renewal
//         await axiosInstance.put(`/subscriptions/${subscriptionId}`, payload, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         alert("Subscription renewed successfully!");
//       } else {
//         // New subscription
//         await axiosInstance.post("/subscriptions", payload, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         alert("Payment successful and subscription created!");
//       }

//       const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
//       purchases.push({ ...item, date: startDate.toISOString(), method: form.method });
//       localStorage.setItem('purchases', JSON.stringify(purchases));

//       navigate("/subscription");
//     } catch (err) {
//       console.error("Error processing subscription:", err);
//       alert("Subscription Failed!");
//     }

//     setLoading(false);
//   };

//   // Compute remaining days from DB end_date
//   const getRemainingDays = (endDateStr) => {
//     if (!endDateStr) return 0;
//     const today = new Date();
//     const end = new Date(endDateStr);
//     const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
//     return diff > 0 ? diff : 0;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50 to-white">
//       <div className="max-w-xl w-full mx-auto px-6 py-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
//         <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">Payment</h1>

//         {/* Display selected plan */}
//         {item && (
//           <div className="mb-6 p-4 border rounded-xl flex items-center justify-between bg-white shadow-sm">
//             <div>
//               <div className="font-semibold">{item.serviceName}</div>
//               <div className="text-sm text-gray-600 capitalize">{item.type}</div>
//             </div>
//             <div className="text-2xl font-bold">₹{item.servicePrice}</div>
//           </div>
//         )}

//         <form onSubmit={onPay} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm mb-1">Name</label>
//             <input
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />
//             {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name}</p>}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm mb-1">Phone Number</label>
//             <input
//               type="tel"
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.phone}
//               onChange={(e) => setForm({ ...form, phone: e.target.value })}
//               placeholder="10-digit number"
//               maxLength="10"
//               required
//               readOnly={!!subscriptionId}
//             />
//             {errors.phone && <p className="text-brand-red text-xs mt-1">{errors.phone}</p>}
//           </div>

//           {/* Card */}
//           <div>
//             <label className="block text-sm mb-1">Card Number</label>
//             <input
//               inputMode="numeric"
//               className="w-full border rounded-xl px-3 py-2 red-focus"
//               value={form.card}
//               onChange={(e) => setForm({ ...form, card: e.target.value })}
//               placeholder="16-digit number"
//               maxLength="16"
//               required
//             />
//             {errors.card && <p className="text-brand-red text-xs mt-1">{errors.card}</p>}
//           </div>

//           {/* Expiry & CVV */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm mb-1">Expiry (MM/YY)</label>
//               <input
//                 className="w-full border rounded-xl px-3 py-2 red-focus"
//                 value={form.expiry}
//                 onChange={(e) => setForm({ ...form, expiry: e.target.value })}
//                 placeholder="09/27"
//                 required
//               />
//               {errors.expiry && <p className="text-brand-red text-xs mt-1">{errors.expiry}</p>}
//             </div>
//             <div>
//               <label className="block text-sm mb-1">CVV</label>
//               <input
//                 className="w-full border rounded-xl px-3 py-2 red-focus"
//                 value={form.cvv}
//                 onChange={(e) => setForm({ ...form, cvv: e.target.value })}
//                 placeholder="123"
//                 required
//               />
//               {errors.cvv && <p className="text-brand-red text-xs mt-1">{errors.cvv}</p>}
//             </div>
//           </div>

//           {/* Auto-Renew Toggle */}
//           <div className="flex items-center gap-3 mt-4">
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={form.autoRenew}
//                 onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
//               />
//               <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-brand-red relative transition-colors">
//                 <span
//                   className={`absolute top-0.5 left-0 w-5 h-5 rounded-full shadow-md transition-all 
//                               ${form.autoRenew ? "bg-black translate-x-6" : "bg-black translate-x-0"}`}></span>
//               </div>
//               <span className="ml-3 text-sm text-gray-700 select-none">Auto-Renew</span>
//             </label>
//           </div>

//           {/* Payment Method */}
//           <div>
//             <label className="block text-sm mb-2">Payment Method</label>
//             <div className="flex flex-col gap-2">
//               {["Visa", "MasterCard", "GPay"].map(method => (
//                 <label key={method} className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="method"
//                     value={method}
//                     checked={form.method === method}
//                     onChange={(e) => setForm({ ...form, method: e.target.value })}
//                   />
//                   {method}
//                 </label>
//               ))}
//             </div>
//             {errors.method && <p className="text-brand-red text-xs mt-1">{errors.method}</p>}
//           </div>

//           {/* Submit Button */}
//           <button className="w-full bg-brand-red text-white py-3 rounded-2xl shadow-soft hover:opacity-90 transition transform hover:scale-[1.01]">
//             {loading ? "Processing..." : subscriptionId ? "Renew Plan" : "Confirm Payment"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    card: '', 
    expiry: '', 
    cvv: '', 
    method: 'Visa', 
    autoRenew: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { item, subscriptionId } = state || {};

  // Pre-fill phone number if passed
  useEffect(() => {
    if (item?.targetPhoneNumber) {
      setForm(prev => ({ ...prev, phone: item.targetPhoneNumber }));
    }
  }, [item]);

  // Form validation
  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Enter full name';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone number';
    if (!/^\d{16}$/.test(form.card.replaceAll(' ', '').slice(0, 16))) e.card = 'Enter 16-digit card';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY';
    if (!/^\d{3}$/.test(form.cvv)) e.cvv = '3 digits';
    if (!form.method) e.method = 'Select payment method';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onPay = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const rawUser = localStorage.getItem("user");
      const storedUser = rawUser ? JSON.parse(rawUser) : null;
      const userId = storedUser?.id;
      const token = localStorage.getItem('token');

      const startDate = new Date();
      const endDate = new Date(startDate);
      let daysToAdd;
      switch (item.ServiceBilling_cycle) {
        case "MONTHLY": daysToAdd = 30; break;
        case "QUARTERLY": daysToAdd = 90; break;
        case "YEARLY": daysToAdd = 365; break;
        default: daysToAdd = 30;
      }
      endDate.setDate(startDate.getDate() + daysToAdd);
      const nextBillingDate = form.autoRenew ? new Date(endDate) : null;

      const payload = {
        userId,
        targetPhoneNumber: form.phone,
        serviceId: item.serviceId,
        status: "ACTIVE",
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        nextBillingDate: nextBillingDate ? nextBillingDate.toISOString().split("T")[0] : null,
        billingCycle: item.ServiceBilling_cycle,
        price: item.servicePrice,
        autoRenew: form.autoRenew
      };

      if (subscriptionId) {
        await axiosInstance.put(`/subscriptions/${subscriptionId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Subscription renewed successfully!");
      } else {
        await axiosInstance.post("/subscriptions", payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Payment successful and subscription created!");
      }

      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      purchases.push({ ...item, date: startDate.toISOString(), method: form.method });
      localStorage.setItem('purchases', JSON.stringify(purchases));

      // navigate("/subscription");
      navigate("/payment-success", { state: { type: "subscription"} });
    } catch (err) {
      console.error("Error processing subscription:", err);
      alert("Subscription Failed!");
    }

    setLoading(false);
    
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Payment</h1>

      {/* Selected plan card */}
      {item && (
        <div className="mb-6 p-6 rounded-2xl border shadow-md bg-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">{item.serviceName}</p>
              <p className="text-sm text-gray-600 capitalize">{item.type}</p>
            </div>
            <div className="text-2xl font-bold text-red-600">₹{item.servicePrice}</div>
          </div>
        </div>
      )}

      <form onSubmit={onPay} className="space-y-4 text-sm">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name"
          className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          required
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
          placeholder="Phone (10 digits)"
          maxLength={10}
          className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          required
          readOnly={!!subscriptionId}
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

        <input
          value={form.card}
          onChange={(e) => setForm({ ...form, card: e.target.value.replace(/\D/g, '') })}
          placeholder="Card Number (16 digits)"
          maxLength={16}
          className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          required
        />
        {errors.card && <p className="text-red-500 text-xs">{errors.card}</p>}

        <div className="grid grid-cols-2 gap-3">
          <input
            value={form.expiry}
            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
            placeholder="MM/YY"
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            required
          />
          <input
            value={form.cvv}
            onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '') })}
            placeholder="CVV"
            maxLength={3}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            required
          />
        </div>
        {(errors.expiry || errors.cvv) && (
          <p className="text-red-500 text-xs">
            {errors.expiry || errors.cvv}
          </p>
        )}

        {/* Auto-renew toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.autoRenew}
            onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
            className="w-4 h-4 accent-red-500"
          />
          <span className="text-gray-700">Enable Auto-Renew</span>
        </label>

        {/* Payment Method */}
        <select
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
          className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
        >
          <option>Visa</option>
          <option>MasterCard</option>
          <option>GPay</option>
        </select>
        {errors.method && <p className="text-red-500 text-xs">{errors.method}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold mt-2 transition"
        >
          {loading ? "Processing..." : subscriptionId ? "Renew Plan" : "Confirm Payment"}
        </button>
      </form>
    </div>
  );
}
