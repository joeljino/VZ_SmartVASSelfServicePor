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
    console.log(s.targetPhoneNumber);
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
                <span className="font-semibold text-gray-700">Phone Number</span>
                <span className="text-gray-900 font-medium">{s.targetPhoneNumber}</span>
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
