import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Eye, EyeOff } from "lucide-react"; // still used for CVV toggle

const METHOD_CARD = "CARD";
const METHOD_GPAY = "GPAY";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { item, subscriptionId } = state || {};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    method: METHOD_CARD,
    autoRenew: true,
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  useEffect(() => {
    if (item?.targetPhoneNumber) {
      setForm((prev) => ({ ...prev, phone: item.targetPhoneNumber }));
    }
  }, [item]);

  const price = Number(item?.servicePrice || 0);
  const amountDisplay = `₹${price}`;

  // -------- Helpers --------
  function formatCardNumber(num) {
    return num.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiry(value) {
    const clean = value.replace(/\D/g, "").slice(0, 4); // MMYY
    if (clean.length >= 3) {
      return clean.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    return clean;
  }

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Enter full name";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone number";

    if (form.method === METHOD_CARD) {
      if (form.cardNumber.replace(/\s/g, "").length !== 16)
        e.cardNumber = "Enter valid 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "Enter valid expiry (MM/YY)";
      if (!/^\d{3}$/.test(form.cvv)) e.cvv = "Enter valid 3-digit CVV";
    }
    if (form.method === METHOD_GPAY) {
      if (!/^[\w.-]+@[\w]+$/.test(form.upiId)) e.upiId = "Enter valid UPI ID";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ---- Finalize subscription (same as before) ----
  async function finalizeSubscription(paymentRef = "") {
    const rawUser = localStorage.getItem("user");
    const storedUser = rawUser ? JSON.parse(rawUser) : null;
    const userId = storedUser?.id;
    const token = localStorage.getItem("token");

    const startDate = new Date();
    const endDate = new Date(startDate);
    let daysToAdd;
    switch (item?.ServiceBilling_cycle) {
      case "MONTHLY":
        daysToAdd = 30;
        break;
      case "QUARTERLY":
        daysToAdd = 90;
        break;
      case "YEARLY":
        daysToAdd = 365;
        break;
      default:
        daysToAdd = 30;
    }
    endDate.setDate(startDate.getDate() + daysToAdd);
    const nextBillingDate = form.autoRenew ? new Date(endDate) : null;

    const payload = {
      userId,
      targetPhoneNumber: form.phone,
      serviceId: item?.serviceId,
      status: "ACTIVE",
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      nextBillingDate: nextBillingDate ? nextBillingDate.toISOString().split("T")[0] : null,
      billingCycle: item?.ServiceBilling_cycle,
      price: item?.servicePrice,
      autoRenew: form.autoRenew,
      method: form.method,
      paymentReference: paymentRef || undefined,
    };

    if (subscriptionId) {
      await axiosInstance.put(`/subscriptions/${subscriptionId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Subscription renewed successfully!");
    } else {
      await axiosInstance.post("/subscriptions", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Payment successful and subscription created!");
    }

    const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
    purchases.push({
      ...item,
      date: startDate.toISOString(),
      method: form.method,
    });
    localStorage.setItem("purchases", JSON.stringify(purchases));

    navigate("/payment-success", { state: { type: "subscription" } });
  }

  async function onPay(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      let fakeRef;
      if (form.method === METHOD_CARD) {
        const proceed = window.confirm("Proceed with Card Payment?");
        if (!proceed) return setLoading(false);
        fakeRef = "CARD-" + Date.now();
      } else if (form.method === METHOD_GPAY) {
        const proceed = window.confirm("Proceed with UPI Payment?");
        if (!proceed) return setLoading(false);
        fakeRef = "UPI-" + Date.now();
      }
      await finalizeSubscription(fakeRef);
    } catch (err) {
      console.error("Error processing subscription:", err);
      alert("Subscription Failed!");
    } finally {
      setLoading(false);
    }
  }

  // -------- UI --------
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Payment</h1>

      {item && (
        <div className="mb-6 p-6 rounded-2xl border shadow-md bg-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">{item.serviceName}</p>
              <p className="text-sm text-gray-600 capitalize">{item.type}</p>
            </div>
            <div className="text-2xl font-bold text-red-600">{amountDisplay}</div>
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
          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
          placeholder="Phone (10 digits)"
          maxLength={10}
          className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          required
          readOnly={!!subscriptionId}
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

        <label className="block text-gray-700 font-medium mt-2">Payment Method</label>
        <select
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
          className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
        >
          <option value={METHOD_CARD}>Card (Visa / Mastercard)</option>
          <option value={METHOD_GPAY}>Google Pay (UPI)</option>
        </select>
        {errors.method && <p className="text-red-500 text-xs">{errors.method}</p>}

        {/* Card Fields */}
        {form.method === METHOD_CARD && (
          <div className="space-y-3">
            {/* Card Number */}
            <div>
              <input
                type="text"
                inputMode="numeric"
                value={formatCardNumber(form.cardNumber)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                  setForm({ ...form, cardNumber: raw });
                }}
                placeholder="Card Number"
                maxLength={19}
                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none tracking-widest"
              />
              {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
            </div>

            {/* Expiry */}
            <div>
              <input
                type="text"
                inputMode="numeric"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none tracking-widest"
              />
              {errors.expiry && <p className="text-red-500 text-xs">{errors.expiry}</p>}
            </div>

            {/* CVV */}
            <div className="relative">
              <input
                type={showCvv ? "text" : "password"}
                inputMode="numeric"
                value={form.cvv}
                onChange={(e) =>
                  setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })
                }
                placeholder="CVV"
                maxLength={3}
                className="w-full border rounded-xl px-3 py-2 pr-10 focus:ring-2 focus:ring-red-400 outline-none tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowCvv(!showCvv)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showCvv ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
            </div>
          </div>
        )}

        {/* UPI Field */}
        {form.method === METHOD_GPAY && (
          <div>
            <input
              type="text"
              value={form.upiId}
              onChange={(e) => setForm({ ...form, upiId: e.target.value })}
              placeholder="Enter your UPI ID (e.g. name@upi)"
              className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {errors.upiId && <p className="text-red-500 text-xs">{errors.upiId}</p>}
          </div>
        )}

        {/* Auto renew */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.autoRenew}
            onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
            className="w-4 h-4 accent-red-500"
          />
          <span className="text-gray-700">Enable Auto-Renew</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white py-3 rounded-xl font-semibold mt-2 transition"
        >
          {loading
            ? "Processing..."
            : form.method === METHOD_CARD
            ? "Pay with Card"
            : "Pay with UPI"}
        </button>

        <p className="text-[11px] text-gray-500 text-center mt-3">
          <span role="img" aria-label="lock">
            🔒
          </span>{" "}
          Your payment is secured and encrypted.
        </p>
      </form>
    </div>
  );
}
