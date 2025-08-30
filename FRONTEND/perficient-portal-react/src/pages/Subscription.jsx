// // // import React from 'react'
// // // import { useNavigate } from 'react-router-dom'

// // // export default function Subscription(){
// // //   const navigate = useNavigate()
// // //   const purchases = JSON.parse(localStorage.getItem('purchases')||'[]')

// // //   const active = purchases.slice(-2) // last 2 as active for demo
// // //   const inactive = purchases.slice(0, -2)

// // //   return (
// // //     <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
// // //       <div>
// // //         <h2 className="text-xl font-semibold mb-3">Active Plans</h2>
// // //         <div className="space-y-3">
// // //           {active.length===0 && <p className="text-sm text-gray-500">No active plans yet.</p>}
// // //           {active.map((p,i)=>(
// // //             <div key={i} className="p-4 border rounded-xl flex items-center justify-between">
// // //               <div>
// // //                 <div className="font-semibold">{p.name}</div>
// // //                 <div className="text-xs text-gray-500">{new Date(p.date).toLocaleString()}</div>
// // //               </div>
// // //               <span className="text-green-600 text-sm">ACTIVE</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //       <div>
// // //         <h2 className="text-xl font-semibold mb-3">Inactive Plans</h2>
// // //         <div className="space-y-3">
// // //           {inactive.length===0 && <p className="text-sm text-gray-500">No inactive plans.</p>}
// // //           {inactive.map((p,i)=>(
// // //             <div key={i} className="p-4 border rounded-xl flex items-center justify-between">
// // //               <div>
// // //                 <div className="font-semibold">{p.name}</div>
// // //                 <div className="text-xs text-gray-500">{new Date(p.date).toLocaleString()}</div>
// // //               </div>
// // //               <button onClick={()=>navigate('/payment', { state: { item: p } })} className="px-3 py-1 rounded-lg bg-brand-red text-white text-sm">Pay</button>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }


// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axiosInstance from "../api/axiosInstance"; // 👈 adjust path based on your project

// // export default function Subscription() {
// //   const navigate = useNavigate();
// //   const [subscriptions, setSubscriptions] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Get logged-in userId from localStorage
// //   let storedUser = null;
// //   try {
// //     const raw = localStorage.getItem("user");
// //     storedUser = raw ? JSON.parse(raw) : null;
// //   } catch (err) {
// //     console.error("Failed to parse user id from localStorage:", err);
// //     storedUser = null;
// //   }
// //   const userId = storedUser?.id;

// //   // Fetch subscriptions using axiosInstance
// //   useEffect(() => {
// //     if (!userId) return;
// //     const fetchSubs = async () => {
// //       try {
// //         const res = await axiosInstance.get(`/subscriptions/user/${userId}`);
// //         if (res.data.success) {
// //           setSubscriptions(res.data.data || []);
// //           for subs in res.data.data:
// //               userServices.add(subs.serviceId);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch subscriptions:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchSubs();
// //   }, [userId]);

// //   if (loading) return <p className="text-center py-10">Loading subscriptions...</p>;

// //   const active = subscriptions.filter((s) => s.status === "ACTIVE");
// //   const inactive = subscriptions.filter((s) => s.status !== "ACTIVE");

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
// //       {/* Active Plans */}
// //       <div>
// //         <h2 className="text-xl font-semibold mb-3">Active Plans</h2>
// //         <div className="space-y-3">
// //           {active.length === 0 && (
// //             <p className="text-sm text-gray-500">No active plans yet.</p>
// //           )}
// //           {active.map((s) => (
// //             <div
// //               key={s.subscriptionId}
// //               className="p-4 border rounded-xl shadow-sm bg-green-50"
// //             >
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <div className="font-semibold text-lg">
// //                     Service #{s.serviceId}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     Phone: {s.targetPhoneNumber}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     Billing Cycle: {s.billingCycle}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     Auto Renew: {s.autoRenew ? "Yes" : "No"}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     Start: {new Date(s.startDate).toLocaleDateString()}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     End: {new Date(s.endDate).toLocaleDateString()}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     Next Billing:{" "}
// //                     {new Date(s.nextBillingDate).toLocaleDateString()}
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <div className="text-green-600 font-semibold">ACTIVE</div>
// //                   <div className="text-sm font-bold">₹{s.price}</div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Inactive Plans */}
// //       <div>
// //         <h2 className="text-xl font-semibold mb-3">Inactive Plans</h2>
// //         <div className="space-y-3">
// //           {inactive.length === 0 && (
// //             <p className="text-sm text-gray-500">No inactive plans.</p>
// //           )}
// //           {inactive.map((s) => (
// //             <div
// //               key={s.subscriptionId}
// //               className="p-4 border rounded-xl shadow-sm bg-gray-50"
// //             >
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <div className="font-semibold text-lg">
// //                     Service #{s.serviceId}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     Phone: {s.targetPhoneNumber}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     Expired: {new Date(s.endDate).toLocaleDateString()}
// //                   </div>
// //                 </div>
// //                 <button
// //                   onClick={() =>
// //                     navigate("/payment", { state: { item: s } })
// //                   }
// //                   className="px-3 py-1 rounded-lg bg-brand-red text-white text-sm"
// //                 >
// //                   Renew / Pay
// //                 </button>
// //               </div>
// //               <div className="mt-2 text-sm text-gray-500">
// //                 Price: ₹{s.price} | Billing Cycle: {s.billingCycle}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance"; // adjust path

// export default function Subscription() {
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get logged-in user + token from localStorage
//   let storedUser = null;
//   let token = null;
//   try {
//     const raw = localStorage.getItem("user");
//     storedUser = raw ? JSON.parse(raw) : null;
//     token = localStorage.getItem("token");
//   } catch (err) {
//     console.error("Failed to parse user from localStorage:", err);
//     storedUser = null;
//   }
//   const userId = storedUser?.id;

//   // Fetch subscriptions with catalog data
//   useEffect(() => {
//     if (!userId) return;

//     const fetchSubs = async () => {
//       try {
//         const res = await axiosInstance.get(`/subscriptions/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           const subs = res.data.data || [];

//           const detailedSubs = await Promise.all(
//             subs.map(async (s) => {
//               try {
//                 const catRes = await axiosInstance.get(
//                   `/catalog/vasCat/${s.serviceId}`,
//                   {
//                     headers: { Authorization: `Bearer ${token}` },
//                   }
//                 );
//                 return { ...s, catalog: catRes.data };
//               } catch (err) {
//                 console.error("Failed to fetch service details:", err);
//                 return { ...s, catalog: null };
//               }
//             })
//           );

//           setSubscriptions(detailedSubs);
//         }
//       } catch (err) {
//         console.error("Failed to fetch subscriptions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubs();
//   }, [userId, token]);

//   if (loading)
//     return <p className="text-center py-10 text-gray-600">Loading subscriptions...</p>;

//   const active = subscriptions.filter((s) => s.status === "ACTIVE");
//   const inactive = subscriptions.filter((s) => s.status !== "ACTIVE");

//   const SubscriptionCard = ({ s, active }) => {
//     const features = s.catalog?.features ? JSON.parse(s.catalog.features) : null;

//     return (
//       <div
//         className={`p-6 rounded-2xl shadow-sm border transition hover:shadow-md ${
//           active ? "bg-white border-green-400" : "bg-gray-50 border-gray-200"
//         }`}
//       >
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-lg font-bold text-gray-800">
//               {s.catalog?.serviceName || `Service #${s.serviceId}`}
//             </h3>
//             {s.catalog?.serviceDescription && (
//               <p className="text-sm text-gray-500 mt-1">
//                 {s.catalog.serviceDescription}
//               </p>
//             )}
//             <div className="mt-3 space-y-1 text-sm text-gray-600">
//               <p>
//                 <span className="font-semibold text-gray-700">Phone:</span>{" "}
//                 {s.targetPhoneNumber}
//               </p>
//               <p>
//                 <span className="font-semibold text-gray-700">Billing Cycle:</span>{" "}
//                 {s.billingCycle}
//               </p>
//               <p>
//                 <span className="font-semibold text-gray-700">Auto Renew:</span>{" "}
//                 {s.autoRenew ? "Yes" : "No"}
//               </p>
//               <p>
//                 <span className="font-semibold text-gray-700">Start:</span>{" "}
//                 {new Date(s.startDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <span className="font-semibold text-gray-700">End:</span>{" "}
//                 {new Date(s.endDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <span className="font-semibold text-gray-700">Next Billing:</span>{" "}
//                 {new Date(s.nextBillingDate).toLocaleDateString()}
//               </p>
//             </div>
//             {features && (
//               <div className="mt-3 text-sm">
//                 <span className="font-semibold text-gray-700">Features:</span>
//                 <ul className="list-disc list-inside text-gray-600">
//                   {Object.entries(features).map(([key, val]) => (
//                     <li key={key} className="capitalize">
//                       {key}: {val}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="text-right">
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 active
//                   ? "bg-green-100 text-green-700"
//                   : "bg-gray-200 text-gray-600"
//               }`}
//             >
//               {s.status}
//             </span>
//             <div className="mt-2 text-lg font-semibold text-gray-900">
//               ₹{s.price}
//             </div>
//           </div>
//         </div>

//         {!active && (
//           <div className="mt-4 text-right">
//             <button
//               onClick={() => navigate("/payment", { state: { item: s } })}
//               className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
//             >
//               Renew / Pay
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
//       {/* Active Plans */}
//       <div>
//         <h2 className="text-2xl font-bold mb-5 text-gray-800">Active Plans</h2>
//         <div className="space-y-5">
//           {active.length === 0 && (
//             <p className="text-sm text-gray-500">No active plans yet.</p>
//           )}
//           {active.map((s) => (
//             <SubscriptionCard key={s.subscriptionId} s={s} active />
//           ))}
//         </div>
//       </div>

//       {/* Inactive Plans */}
//       <div>
//         <h2 className="text-2xl font-bold mb-5 text-gray-800">Inactive Plans</h2>
//         <div className="space-y-5">
//           {inactive.length === 0 && (
//             <p className="text-sm text-gray-500">No inactive plans.</p>
//           )}
//           {inactive.map((s) => (
//             <SubscriptionCard key={s.subscriptionId} s={s} active={false} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance"; // adjust path

// export default function Subscription() {
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get logged-in user + token
//   let storedUser = null;
//   let token = null;
//   try {
//     const raw = localStorage.getItem("user");
//     storedUser = raw ? JSON.parse(raw) : null;
//     token = localStorage.getItem("token");
//   } catch (err) {
//     console.error("Failed to parse user from localStorage:", err);
//     storedUser = null;
//   }
//   const userId = storedUser?.id;

//   // Fetch subscriptions + catalog details
//   useEffect(() => {
//     if (!userId) return;

//     const fetchSubscriptions = async () => {
//       try {
//         const res = await axiosInstance.get(`/subscriptions/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           const subs = res.data.data || [];

//           // Fetch catalog info for each subscription
//           const detailedSubs = await Promise.all(
//             subs.map(async (s) => {
//               try {
//                 const catRes = await axiosInstance.get(
//                   `/catalog/vasCat/${s.serviceId}`,
//                   {
//                     headers: { Authorization: `Bearer ${token}` },
//                   }
//                 );
//                 return { ...s, catalog: catRes.data };
//               } catch (err) {
//                 console.error("Failed to fetch service details:", err);
//                 return { ...s, catalog: null };
//               }
//             })
//           );

//           setSubscriptions(detailedSubs);
//         }
//       } catch (err) {
//         console.error("Failed to fetch subscriptions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubscriptions();
//   }, [userId, token]);

//   if (loading)
//     return <p className="text-center py-10 text-gray-600">Loading subscriptions...</p>;

//   const active = subscriptions.filter((s) => s.status === "ACTIVE");
//   const inactive = subscriptions.filter((s) => s.status !== "ACTIVE");

//   // Utility to calculate expiry days
//   const calculateExpiry = (startDate, billingCycle) => {
//     const start = new Date(startDate);
//     let days = 0;
//     if (billingCycle === "MONTHLY") days = 30;
//     else if (billingCycle === "QUARTERLY") days = 90;
//     else if (billingCycle === "YEARLY") days = 365;
//     const expiryDate = new Date(start);
//     expiryDate.setDate(expiryDate.getDate() + days);
//     const remaining = Math.max(0, Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24)));
//     return remaining;
//   };

//   const SubscriptionCard = ({ s, active }) => {
//     const remainingDays = calculateExpiry(s.startDate, s.billingCycle);

//     return (
//       <div
//         className={`p-6 rounded-2xl shadow-sm border transition hover:shadow-md ${
//           active ? "bg-white border-green-400" : "bg-gray-50 border-gray-200"
//         }`}
//       >
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-lg font-bold text-gray-900">
//               {s.catalog?.serviceName || `Service #${s.serviceId}`}
//             </h3>
//             {s.catalog?.serviceDescription && (
//               <p className="text-gray-600 text-sm mt-1">{s.catalog.serviceDescription}</p>
//             )}

//             <div className="mt-4 space-y-2">
//               <div className="flex justify-between">
//                 <span className="font-semibold text-gray-700">Subscribed on</span>
//                 <span className="text-gray-900 font-medium">
//                   {new Date(s.startDate).toLocaleDateString()}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//               <span className="text-red-600 font-bold">
//                 {remainingDays === 0 ? "Plan Expired" : `Expiring in ${remainingDays} days`}
//               </span>

//               </div>
//             </div>
//           </div>

//           {/* Price & Status */}
//           <div className="text-right ml-4">
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 active
//                   ? "bg-green-100 text-green-700"
//                   : "bg-gray-200 text-gray-600"
//               }`}
//             >
//               {s.status}
//             </span>
//             <div className="mt-2 text-lg font-semibold text-gray-900">
//               ₹{s.catalog?.price || s.price}
//             </div>
            
//             {remainingDays !== 0 ? (
//                 <div className="border rounded-xl p-3 mt-3 bg-gray-50 shadow-sm text-center">
//                   <p className="text-sm font-semibold text-gray-500">Auto-Renew</p>
//                   <p
//                     className={`text-m font-bold ${
//                       s.autoRenew ? "text-green-700" : "text-red-600"
//                     }`}
//                   >
//                     {s.autoRenew ? "Yes" : "No"}
//                   </p>
//                 </div>
//               ) : null
//             }

//           </div>
//         </div>

//         {!active && (
//           <div className="mt-4 text-right">
//             <button
//               onClick={() => navigate("/payment", {
//                 state: {
//                   item: {
//                     serviceId: s.serviceId,
//                     servicePrice: s.price,
//                     ServiceBilling_cycle: s.billingCycle,
//                     serviceName: s.serviceName,
//                     type: s.serviceType,
//                   },
//                 },
//               })}
//               className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
//             >
//               Renew Plan
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
//   {/* Active Plans Column */}
//   <div>
//     <h2 className="text-2xl font-bold mb-5 text-gray-900">Active Plans</h2>
//     <div className="space-y-5">
//       {active.length === 0 && (
//         <p className="text-sm text-gray-500">No active plans yet.</p>
//       )}
//       {active.map((s) => (
//         <SubscriptionCard key={s.subscriptionId} s={s} active />
//       ))}
//     </div>
//   </div>

//   {/* Inactive Plans Column */}
//   <div>
//     <h2 className="text-2xl font-bold mb-5 text-gray-900">Inactive Plans</h2>
//     <div className="space-y-5">
//       {inactive.length === 0 && (
//         <p className="text-sm text-gray-500">No inactive plans.</p>
//       )}
//       {inactive.map((s) => (
//         <SubscriptionCard key={s.subscriptionId} s={s} active={false} />
//       ))}
//     </div>
//   </div>
// </div>

//   );
// }



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// export default function Subscription() {
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get logged-in user + token
//   let storedUser = null;
//   let token = null;
//   try {
//     const raw = localStorage.getItem("user");
//     storedUser = raw ? JSON.parse(raw) : null;
//     token = localStorage.getItem("token");
//   } catch (err) {
//     console.error("Failed to parse user from localStorage:", err);
//     storedUser = null;
//   }
//   const userId = storedUser?.id;

//   // Fetch subscriptions + catalog details
//   useEffect(() => {
//     if (!userId) return;

//     const fetchSubscriptions = async () => {
//       try {
//         const res = await axiosInstance.get(`/subscriptions/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           const subs = res.data.data || [];

//           // Fetch catalog info for each subscription
//           const detailedSubs = await Promise.all(
//             subs.map(async (s) => {
//               try {
//                 const catRes = await axiosInstance.get(
//                   `/catalog/vasCat/${s.serviceId}`,
//                   {
//                     headers: { Authorization: `Bearer ${token}` },
//                   }
//                 );
//                 return { ...s, catalog: catRes.data };
//               } catch (err) {
//                 console.error("Failed to fetch service details:", err);
//                 return { ...s, catalog: null };
//               }
//             })
//           );

//           setSubscriptions(detailedSubs);
//         }
//       } catch (err) {
//         console.error("Failed to fetch subscriptions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubscriptions();
//   }, [userId, token]);

//   if (loading)
//     return (
//       <p className="text-center py-10 text-gray-600">
//         Loading subscriptions...
//       </p>
//     );

//   const active = subscriptions.filter((s) => s.status === "ACTIVE");
//   const inactive = subscriptions.filter((s) => s.status !== "ACTIVE");

//   // Utility to calculate expiry days
//   const calculateExpiry = (startDate, billingCycle) => {
//     const start = new Date(startDate);
//     let days = 0;
//     if (billingCycle === "MONTHLY") days = 30;
//     else if (billingCycle === "QUARTERLY") days = 90;
//     else if (billingCycle === "YEARLY") days = 365;
//     const expiryDate = new Date(start);
//     expiryDate.setDate(expiryDate.getDate() + days);
//     const remaining = Math.max(
//       0,
//       Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24))
//     );
//     return remaining;
//   };

//   const SubscriptionCard = ({ s, active }) => {
//     const remainingDays = calculateExpiry(s.startDate, s.billingCycle);

//     return (
//       <div
//         className={`p-6 rounded-2xl shadow-sm border transition hover:shadow-md ${
//           active ? "bg-white border-green-400" : "bg-gray-50 border-gray-200"
//         }`}
//       >
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-lg font-bold text-gray-900">
//               {s.catalog?.serviceName || `Service #${s.serviceId}`}
//             </h3>
//             {s.catalog?.serviceDescription && (
//               <p className="text-gray-600 text-sm mt-1">
//                 {s.catalog.serviceDescription}
//               </p>
//             )}

//             <div className="mt-4 space-y-2">
//               <div className="flex justify-between">
//                 <span className="font-semibold text-gray-700">
//                   Subscribed on
//                 </span>
//                 <span className="text-gray-900 font-medium">
//                   {new Date(s.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-red-600 font-bold">
//                   {remainingDays === 0
//                     ? "Plan Expired"
//                     : `Expiring in ${remainingDays} days`}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Price & Status */}
//           <div className="text-right ml-4">
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 active
//                   ? "bg-green-100 text-green-700"
//                   : "bg-gray-200 text-gray-600"
//               }`}
//             >
//               {s.status}
//             </span>
//             <div className="mt-2 text-lg font-semibold text-gray-900">
//               ₹{s.catalog?.price || s.price}
//             </div>

//             {remainingDays !== 0 ? (
//               <div className="border rounded-xl p-3 mt-3 bg-gray-50 shadow-sm text-center">
//                 <p className="text-sm font-semibold text-gray-500">Auto-Renew</p>
//                 <p
//                   className={`text-m font-bold ${
//                     s.autoRenew ? "text-green-700" : "text-red-600"
//                   }`}
//                 >
//                   {s.autoRenew ? "Yes" : "No"}
//                 </p>
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* Renew button for inactive plans */}
//         {!active && (
//           <div className="mt-4 text-right">
//             <button
//               onClick={() =>
//                 navigate("/payment", {
//                   state: {
//                     item: {
//                       serviceId: s.serviceId,
//                       servicePrice: s.catalog?.price || s.price,
//                       ServiceBilling_cycle: s.billingCycle,
//                       serviceName:
//                         s.catalog?.serviceName || `Service #${s.serviceId}`,
//                       targetPhoneNumber: s.targetPhoneNumber,
//                     },
//                     subscriptionId: s.subscriptionId,
//                   },
//                 })
//               }
//               className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
//             >
//               Renew Plan
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
//       {/* Active Plans Column */}
//       <div>
//         <h2 className="text-2xl font-bold mb-5 text-gray-900">Active Plans</h2>
//         <div className="space-y-5">
//           {active.length === 0 && (
//             <p className="text-sm text-gray-500">No active plans yet.</p>
//           )}
//           {active.map((s) => (
//             <SubscriptionCard key={s.subscriptionId} s={s} active />
//           ))}
//         </div>
//       </div>

//       {/* Inactive Plans Column */}
//       <div>
//         <h2 className="text-2xl font-bold mb-5 text-gray-900">Inactive Plans</h2>
//         <div className="space-y-5">
//           {inactive.length === 0 && (
//             <p className="text-sm text-gray-500">No inactive plans.</p>
//           )}
//           {inactive.map((s) => (
//             <SubscriptionCard key={s.subscriptionId} s={s} active={false} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Subscription() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user + token
  let storedUser = null;
  let token = null;
  try {
    const raw = localStorage.getItem("user");
    storedUser = raw ? JSON.parse(raw) : null;
    token = localStorage.getItem("token");
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    storedUser = null;
  }
  const userId = storedUser?.id;

  // Fetch subscriptions + catalog details
  useEffect(() => {
    if (!userId) return;

    const fetchSubscriptions = async () => {
      try {
        const res = await axiosInstance.get(`/subscriptions/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const subs = res.data.data || [];

          // Fetch catalog info for each subscription
          const detailedSubs = await Promise.all(
            subs.map(async (s) => {
              try {
                const catRes = await axiosInstance.get(
                  `/catalog/vasCat/${s.serviceId}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                return { ...s, catalog: catRes.data };
              } catch (err) {
                console.error("Failed to fetch service details:", err);
                return { ...s, catalog: null };
              }
            })
          );

          setSubscriptions(detailedSubs);
        }
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId, token]);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-600">
        Loading subscriptions...
      </p>
    );

  // Utility to calculate expiry days
  const calculateExpiry = (startDate, billingCycle) => {
    const start = new Date(startDate);
    let days = 0;
    if (billingCycle === "MONTHLY") days = 30;
    else if (billingCycle === "QUARTERLY") days = 90;
    else if (billingCycle === "YEARLY") days = 365;
    const expiryDate = new Date(start);
    expiryDate.setDate(expiryDate.getDate() + days);
    const remaining = Math.max(
      0,
      Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24))
    );
    return remaining;
  };

  const SubscriptionCard = ({ s }) => {
    console.log(s.billingCycle);
    const remainingDays = calculateExpiry(s.startDate, s.billingCycle);
    const isActive = remainingDays > 0;

    return (
      <div
        className={`p-6 rounded-2xl shadow-sm border transition hover:shadow-md ${
          isActive ? "bg-white border-green-400" : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {s.catalog?.serviceName || `Service #${s.serviceId}`}
            </h3>
            {s.catalog?.serviceDescription && (
              <p className="text-gray-600 text-sm mt-1">
                {s.catalog.serviceDescription}
              </p>
            )}

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Subscribed on</span>
                <span className="text-gray-900 font-medium">
                  {new Date(s.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600 font-bold">
                  {remainingDays === 0
                    ? "Plan Expired"
                    : `Expiring in ${remainingDays} days`}
                </span>
              </div>
            </div>
          </div>

          {/* Price & Status */}
          <div className="text-right ml-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {isActive ? "ACTIVE" : "INACTIVE"}
            </span>
            <div className="mt-2 text-lg font-semibold text-gray-900">
              ₹{s.catalog?.price || s.price}
            </div>

            {remainingDays !== 0 && (
              <div className="border rounded-xl p-3 mt-3 bg-gray-50 shadow-sm text-center">
                <p className="text-sm font-semibold text-gray-500">Auto-Renew</p>
                <p
                  className={`text-m font-bold ${
                    s.autoRenew ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {s.autoRenew ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Renew button for expired plans */}
        {!isActive && (
          <div className="mt-4 text-right">
            <button
              onClick={() =>
                navigate("/payment", {
                  state: {
                    item: {
                      serviceId: s.serviceId,
                      servicePrice: s.catalog?.price || s.price,
                      ServiceBilling_cycle: s.billingCycle,
                      serviceName:
                        s.catalog?.serviceName || `Service #${s.serviceId}`,
                      targetPhoneNumber: s.targetPhoneNumber,
                    },
                    subscriptionId: s.subscriptionId,
                  },
                })
              }
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
            >
              Renew Plan
            </button>
          </div>
        )}
      </div>
    );
  };

  // Separate subscriptions dynamically
  const activeSubs = subscriptions.filter(
    (s) => calculateExpiry(s.startDate, s.billingCycle) > 0
  );
  const inactiveSubs = subscriptions.filter(
    (s) => calculateExpiry(s.startDate, s.billingCycle) === 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
      {/* Active Plans Column */}
      <div>
        <h2 className="text-2xl font-bold mb-5 text-gray-900">Active Plans</h2>
        <div className="space-y-5">
          {activeSubs.length === 0 && (
            <p className="text-sm text-gray-500">No active plans yet.</p>
          )}
          {activeSubs.map((s) => (
            <SubscriptionCard key={s.subscriptionId} s={s} />
          ))}
        </div>
      </div>

      {/* Inactive Plans Column */}
      <div>
        <h2 className="text-2xl font-bold mb-5 text-gray-900">Inactive Plans</h2>
        <div className="space-y-5">
          {inactiveSubs.length === 0 && (
            <p className="text-sm text-gray-500">No inactive plans.</p>
          )}
          {inactiveSubs.map((s) => (
            <SubscriptionCard key={s.subscriptionId} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
