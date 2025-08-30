import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import loginBanner from "../assets/banner-login.png";
import { Eye, EyeOff } from "lucide-react";


export default function LoginRegister() {
  const [tab, setTab] = useState("login");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [reg, setReg] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔹 LOGIN
  const onLogin = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!login.username.trim()) errs.username = "Username required";
    if (login.password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login/user", login);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 REGISTER
  const onRegister = async (e) => {
    e.preventDefault();
    const errs = {};

    if (!reg.username.trim()) errs.username = "Username required";
    if (!reg.firstName.trim()) errs.firstName = "First name required";
    if (!reg.email.includes("@")) errs.email = "Valid email required";

    // ✅ Phone validation - must be exactly 10 digits
    if (!/^\d{10}$/.test(reg.phone)) {
      errs.phone = "Phone number must be 10 digits";
    }

    if (reg.password.length < 6) errs.password = "Min 6 characters";
    if (reg.password !== reg.confirm) errs.confirm = "Passwords do not match";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setLoading(true);
      await axiosInstance.post("/auth/signup/user", {
        username: reg.username,
        firstName: reg.firstName,
        lastName: reg.lastName,
        email: reg.email,
        phone: reg.phone,
        password: reg.password,
      });

      alert("Account created! Please login.");
      navigate("/"); // 👈 redirect to login page
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Banner */}
      <div className="hidden md:flex items-center justify-center bg-black relative">
        <img
          src={loginBanner}
          alt="Telecom banner"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
        <h2 className="absolute bottom-8 left-8 text-white text-3xl font-bold">
          Smart VAS Self Service Portal
        </h2>
      </div>

      {/* Right Login/Register */}
      <div
        className="flex items-center justify-center p-6"
        style={{ backgroundColor: "#808080" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-800 text-center mb-6"
          >
            Welcome Back 👋 <br /> Please Login or Register
          </motion.h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 rounded-xl border ${
                tab === "login"
                  ? "bg-brand-red text-white shadow-lg"
                  : "hover:bg-gray-50"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-2 rounded-xl border ${
                tab === "register"
                  ? "bg-brand-red text-white shadow-lg"
                  : "hover:bg-gray-50"
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          {tab === "login" ? (
            <form onSubmit={onLogin} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input
                  className="w-full border rounded-xl px-3 py-2 red-focus"
                  value={login.username}
                  onChange={(e) =>
                    setLogin({ ...login, username: e.target.value })
                  }
                  required
                />
                {errors.username && (
                  <p className="text-brand-red text-xs mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded-xl px-3 py-2 pr-10 red-focus"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && (
                  <p className="text-brand-red text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-brand-red text-white py-2 rounded-xl shadow-md hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>
            </form>
          ) : (
            <form onSubmit={onRegister} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input
                  className="w-full border rounded-xl px-3 py-2 red-focus"
                  value={reg.username}
                  onChange={(e) =>
                    setReg({ ...reg, username: e.target.value })
                  }
                  required
                />
                {errors.username && (
                  <p className="text-brand-red text-xs mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input
                    className="w-full border rounded-xl px-3 py-2 red-focus"
                    value={reg.firstName}
                    onChange={(e) =>
                      setReg({ ...reg, firstName: e.target.value })
                    }
                    required
                  />
                  {errors.firstName && (
                    <p className="text-brand-red text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Last Name (optional)
                  </label>
                  <input
                    className="w-full border rounded-xl px-3 py-2 red-focus"
                    value={reg.lastName}
                    onChange={(e) =>
                      setReg({ ...reg, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-xl px-3 py-2 red-focus"
                  value={reg.email}
                  onChange={(e) =>
                    setReg({ ...reg, email: e.target.value })
                  }
                  required
                />
                {errors.email && (
                  <p className="text-brand-red text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border rounded-xl px-3 py-2 red-focus"
                  value={reg.phone}
                  onChange={(e) =>
                    setReg({ ...reg, phone: e.target.value })
                  }
                  required
                />
                {errors.phone && (
                  <p className="text-brand-red text-xs mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type={showRegPassword ? "text" : "password"}
                    className="w-full border rounded-xl px-3 py-2 pr-10 red-focus"
                    value={reg.password}
                    onChange={(e) => setReg({ ...reg, password: e.target.value })}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-brand-red text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm mb-1">Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full border rounded-xl px-3 py-2 pr-10 red-focus"
                    value={reg.confirm}
                    onChange={(e) => setReg({ ...reg, confirm: e.target.value })}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.confirm && (
                    <p className="text-brand-red text-xs mt-1">{errors.confirm}</p>
                  )}
                </div>
              </div>


              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-brand-red text-white py-2 rounded-xl shadow-md hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}