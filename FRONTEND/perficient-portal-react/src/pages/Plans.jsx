//   // import React, { useState, useEffect } from "react";
//   // import { useNavigate } from "react-router-dom";
//   // import axios from "axios";

//   // export default function Plans() {
//   //   const [tab, setTab] = useState("data");
//   //   const [plans, setPlans] = useState({ data: [], wifi: [] });
//   //   const [loading, setLoading] = useState(true);
//   //   const navigate = useNavigate();

//   //   useEffect(() => {
//   //     const fetchPlans = async () => {
//   //       try {
//   //         const token = localStorage.getItem("token");
//   //         const res = await axios.get("http://localhost:8085/catalog/vasCat", {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         });

//   //         console.log("Fetched plans:", res.data);

//   //         // ✅ Fix: use camelCase keys
//   //         const dataPlans = res.data.filter((p) => p.serviceType === "Data");
//   //         const wifiPlans = res.data.filter((p) => p.serviceType === "WiFi");

//   //         setPlans({ data: dataPlans, wifi: wifiPlans });
//   //         setLoading(false);
//   //       } catch (err) {
//   //         console.error("Error fetching plans:", err);
//   //         setLoading(false);
//   //       }
//   //     };

//   //     fetchPlans();
//   //   }, []);

//   //   const list = tab === "data" ? plans.data : plans.wifi;

//   //   if (loading) {
//   //     return <div className="text-center py-10 text-gray-600">Loading plans...</div>;
//   //   }

//   //   return (
//   //     <div className="max-w-6xl mx-auto px-4 py-10">
//   //       {/* Tabs */}
//   //       <div className="flex gap-2 mb-6">
//   //         <button
//   //           onClick={() => setTab("data")}
//   //           className={`px-4 py-2 rounded-xl border ${
//   //             tab === "data" ? "bg-brand-red text-white" : ""
//   //           }`}
//   //         >
//   //           Data
//   //         </button>
//   //         <button
//   //           onClick={() => setTab("wifi")}
//   //           className={`px-4 py-2 rounded-xl border ${
//   //             tab === "wifi" ? "bg-brand-red text-white" : ""
//   //           }`}
//   //         >
//   //           Wifi
//   //         </button>
//   //       </div>

//   //       {/* Plan Cards */}
//   //       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   //         {list.length === 0 ? (
//   //           <div className="col-span-full text-center text-gray-600">
//   //             No {tab} plans available
//   //           </div>
//   //         ) : (
//   //           list.map((p) => (
//   //             <div
//   //               key={p.serviceId}
//   //               className="p-6 rounded-2xl border shadow-lg hover:shadow-2xl hover:border-red-500 
//   //                         transition-all duration-300 transform hover:scale-105 bg-white cursor-pointer"
//   //             >
//   //               <div className="text-lg font-semibold">{p.serviceName}</div>
//   //               <div className="text-sm text-gray-600 mt-1">{p.serviceDescription}</div>
//   //               <div className="text-2xl font-bold mt-4">₹{p.price}</div>

//   //               <button
//   //                 onClick={() =>
//   //                   navigate("/payment", {
//   //                     state: {
//   //                       item: {
//   //                         type: "plan",
//   //                         id: p.serviceId,
//   //                         name: p.serviceName,
//   //                         price: p.price,
//   //                       },
//   //                     },
//   //                   })
//   //                 }
//   //                 className="mt-4 w-full bg-brand-red text-white py-2 rounded-xl 
//   //                           hover:bg-red-700 transition-colors"
//   //               >
//   //                 Buy
//   //               </button>
//   //             </div>
//   //           ))
//   //         )}
//   //       </div>
//   //     </div>
//   //   );
//   // }
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Plans() {
//   const [tab, setTab] = useState("data");
//   const [plans, setPlans] = useState({ data: [], wifi: [] });
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:8085/catalog/vasCat", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Fetched plans:", res.data);

//         const dataPlans = res.data.filter((p) => p.serviceType === "Data");
//         const wifiPlans = res.data.filter((p) => p.serviceType === "WiFi");

//         // Parse features JSON for each plan
//         const parseFeatures = (planList) =>
//           planList.map((p) => ({
//             ...p,
//             featuresObj: JSON.parse(p.features || "{}"),
//           }));

//         setPlans({ data: parseFeatures(dataPlans), wifi: parseFeatures(wifiPlans) });
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching plans:", err);
//         setLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   const list = tab === "data" ? plans.data : plans.wifi;

//   if (loading) {
//     return <div className="text-center py-10 text-gray-600">Loading plans...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* Tabs */}
//       <div className="flex gap-2 mb-6">
//         <button
//           onClick={() => setTab("data")}
//           className={`px-4 py-2 rounded-xl border ${
//             tab === "data" ? "bg-brand-red text-white" : ""
//           }`}
//         >
//           Data
//         </button>
//         <button
//           onClick={() => setTab("wifi")}
//           className={`px-4 py-2 rounded-xl border ${
//             tab === "wifi" ? "bg-brand-red text-white" : ""
//           }`}
//         >
//           Wifi
//         </button>
//       </div>

//       {/* Plan Cards */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {list.length === 0 ? (
//           <div className="col-span-full text-center text-gray-600">
//             No {tab} plans available
//           </div>
//         ) : (
//           list.map((p) => (
//             <div
//               key={p.serviceId}
//               className="p-6 rounded-2xl border shadow-lg hover:shadow-2xl hover:border-red-500 
//                          transition-all duration-300 transform hover:scale-105 bg-white cursor-pointer"
//             >
//               <div className="text-lg font-semibold">{p.serviceName}</div>
//               <div className="text-sm text-gray-600 mt-1">{p.serviceDescription}</div>
//               <div className="text-sm text-gray-500 mt-1">
//                 Billing Cycle: {p.billingCycle}
//               </div>

//               {/* Display Features */}
//               <div className="mt-2 text-sm text-gray-700">
//                 {Object.entries(p.featuresObj).map(([key, value]) => (
//                   <div key={key}>
//                     <span className="font-semibold">{key}:</span> {value.toString()}
//                   </div>
//                 ))}
//               </div>

//               <div className="text-2xl font-bold mt-4">₹{p.price}</div>

//               <button
//                 onClick={() =>
//                   navigate("/payment", {
//                     state: {
//                       item: {
//                         type: "plan",
//                         id: p.serviceId,
//                         name: p.serviceName,
//                         price: p.price,
//                       },
//                     },
//                   })
//                 }
//                 className="mt-4 w-full bg-brand-red text-white py-2 rounded-xl 
//                            hover:bg-red-700 transition-colors"
//               >
//                 Buy
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Plans() {
  const [tab, setTab] = useState("data");
  const [plans, setPlans] = useState({ data: [], wifi: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Map feature keys to human-readable labels
  const featureLabels = {
    data: "Data",
    validity: "Validity",
    speed: "Speed",
    autoExpiry: "Auto Expiry",
    dailyLimit: "Daily Limit",
    postFUP: "Post FUP Speed",
    installation: "Installation",
    router: "Router",
    usage: "Usage",
    support: "Support",
    noDailyLimit: "No Daily Limit",
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/catalog/vasCat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched plans:", res.data);

        const dataPlans = res.data.filter((p) => (p.serviceType === "Data" || p.serviceType === "DATA"));
        const wifiPlans = res.data.filter((p) => (p.serviceType === "WiFi" || p.serviceType === "WIFI"));

        // Parse features JSON for each plan
        const parseFeatures = (planList) =>
          planList.map((p) => ({
            ...p,
            featuresObj: JSON.parse(p.features || "{}"),
          }));

        setPlans({ data: parseFeatures(dataPlans), wifi: parseFeatures(wifiPlans) });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const list = tab === "data" ? plans.data : plans.wifi;

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading plans...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("data")}
          className={`px-4 py-2 rounded-xl border ${tab === "data" ? "bg-brand-red text-white" : ""}`}
        >
          Data
        </button>
        <button
          onClick={() => setTab("wifi")}
          className={`px-4 py-2 rounded-xl border ${tab === "wifi" ? "bg-brand-red text-white" : ""}`}
        >
          Wifi
        </button>
      </div>

      {/* Plan Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">
            No {tab} plans available
          </div>
        ) : (
          list.map((p) => (
            <div
              key={p.serviceId}
              className="p-6 rounded-2xl border shadow-lg hover:shadow-2xl hover:border-red-500 
                         transition-all duration-300 transform hover:scale-105 bg-white cursor-pointer"
            >
              <div className="text-lg font-semibold">{p.serviceName}</div>
              <div className="text-sm text-gray-600 mt-1">{p.serviceDescription}</div>
              <div className="text-sm text-gray-500 mt-1">Billing Cycle: {p.billingCycle}</div>

              {/* Display Features in human-readable format */}
              <div className="mt-2 text-sm text-gray-700">
                {Object.entries(p.featuresObj).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-semibold">{featureLabels[key] || key}:</span>{" "}
                    {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                  </div>
                ))}
              </div>

              <div className="text-2xl font-bold mt-4">₹{p.price}</div>

              <button
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      item: {
                        type: p.serviceType,
                        serviceId: p.serviceId,
                        serviceName: p.serviceName,
                        servicePrice: p.price,
                        ServiceBilling_cycle: p.billingCycle,

                      },
                    },
                  })
                }
                className="mt-4 w-full bg-brand-red text-white py-2 rounded-xl 
                           hover:bg-red-700 transition-colors"
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
