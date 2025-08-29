//   import React, { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// export default function Payment() {
//   const { state } = useLocation()
//   const navigate = useNavigate()
//   const [form, setForm] = useState({ name: '', phone: '', card: '', expiry: '', cvv: '', method: '' })
//   const [errors, setErrors] = useState({})

//   const validate = () => {
//     const e = {}
//     if (form.name.trim().length < 2) e.name = 'Enter full name'
//     if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone number'
//     if (!/^\d{16}$/.test(form.card.replaceAll(' ', '').slice(0, 16))) e.card = 'Enter 16-digit card'
//     if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY'
//     if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = '3-4 digits'
//     if (!form.method) e.method = 'Select payment method'
//     setErrors(e)
//     return Object.keys(e).length === 0
//   }

//   const onPay = (e) => {
//     e.preventDefault()
//     if (!validate()) return
//     const purchases = JSON.parse(localStorage.getItem('purchases') || '[]')
//     const item = state?.item || { type: 'plan', name: 'Unknown', price: 0 }
//     purchases.push({ ...item, date: new Date().toISOString(), method: form.method })
//     localStorage.setItem('purchases', JSON.stringify(purchases))
//     alert('Payment successful!')
//     navigate('/subscription')
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50 to-white">
//       <div className="max-w-xl w-full mx-auto px-6 py-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
//         <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">Payment</h1>

//         {state?.item && (
//           <div className="mb-6 p-4 border rounded-xl flex items-center justify-between bg-white shadow-sm">
//             <div>
//               <div className="font-semibold">{state.item.name}</div>
//               <div className="text-sm text-gray-600 capitalize">{state.item.type}</div>
//             </div>
//             <div className="text-2xl font-bold">₹{state.item.price}</div>
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
//             Confirm Payment
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }



import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', card: '', expiry: '', cvv: '', method: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Enter full name';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone number';
    if (!/^\d{16}$/.test(form.card.replaceAll(' ', '').slice(0, 16))) e.card = 'Enter 16-digit card';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY';
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = '3-4 digits';
    if (!form.method) e.method = 'Select payment method';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onPay = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      const item = state?.item || { type: 'plan', id: 0, name: 'Unknown', price: 0 };

      // Compute dates
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 30); // Adjust based on plan's billingCycle if needed
      const nextBillingDate = new Date(endDate);

      // Build subscription payload
      const payload = {
        userId: user.userId,
        targetPhoneNumber: form.phone,
        serviceId: item.id,
        status: "ACTIVE",
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        nextBillingDate: nextBillingDate.toISOString().split("T")[0],
        billingCycle: "MONTHLY",
        price: item.price,
        autoRenew: true
      };

      // Post to backend
      await axios.post("http://localhost:8085/subscriptions", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      // Save local purchase record
      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      purchases.push({ ...item, date: startDate.toISOString(), method: form.method });
      localStorage.setItem('purchases', JSON.stringify(purchases));

      alert("Payment successful and subscription created!");
      navigate("/subscription");
    } catch (err) {
      console.error("Error creating subscription:", err);
      alert("Payment succeeded but failed to create subscription.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50 to-white">
      <div className="max-w-xl w-full mx-auto px-6 py-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">Payment</h1>

        {state?.item && (
          <div className="mb-6 p-4 border rounded-xl flex items-center justify-between bg-white shadow-sm">
            <div>
              <div className="font-semibold">{state.item.name}</div>
              <div className="text-sm text-gray-600 capitalize">{state.item.type}</div>
            </div>
            <div className="text-2xl font-bold">₹{state.item.price}</div>
          </div>
        )}

        <form onSubmit={onPay} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full border rounded-xl px-3 py-2 red-focus"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full border rounded-xl px-3 py-2 red-focus"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="10-digit number"
              maxLength="10"
              required
            />
            {errors.phone && <p className="text-brand-red text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Card Number</label>
            <input
              inputMode="numeric"
              className="w-full border rounded-xl px-3 py-2 red-focus"
              value={form.card}
              onChange={(e) => setForm({ ...form, card: e.target.value })}
              placeholder="16-digit number"
              maxLength="16"
              required
            />
            {errors.card && <p className="text-brand-red text-xs mt-1">{errors.card}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Expiry (MM/YY)</label>
              <input
                className="w-full border rounded-xl px-3 py-2 red-focus"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                placeholder="09/27"
                required
              />
              {errors.expiry && <p className="text-brand-red text-xs mt-1">{errors.expiry}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">CVV</label>
              <input
                className="w-full border rounded-xl px-3 py-2 red-focus"
                value={form.cvv}
                onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                placeholder="123"
                required
              />
              {errors.cvv && <p className="text-brand-red text-xs mt-1">{errors.cvv}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Payment Method</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="method"
                  value="Visa"
                  checked={form.method === 'Visa'}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                />
                Visa
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="method"
                  value="MasterCard"
                  checked={form.method === 'MasterCard'}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                />
                MasterCard
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="method"
                  value="GPay"
                  checked={form.method === 'GPay'}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                />
                GPay
              </label>
            </div>
            {errors.method && <p className="text-brand-red text-xs mt-1">{errors.method}</p>}
          </div>

          <button className="w-full bg-brand-red text-white py-3 rounded-2xl shadow-soft hover:opacity-90 transition transform hover:scale-[1.01]">
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
}
