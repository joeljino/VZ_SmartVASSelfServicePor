import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    });


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const rawUser = localStorage.getItem("user");
  const storedUser = rawUser ? JSON.parse(rawUser) : null;
  const userId = storedUser?.id;
  const token = localStorage.getItem("token");

  // Fetch user info
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/auth/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) {
          setUser(res.data);
          setForm(res.data); // prefill form
        }
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, token]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save/Update user
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await axiosInstance.put(`/auth/user/${userId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.user) {
        setUser(res.data.user);
        setForm(res.data.user);
        setIsEditing(false);
        alert("User updated successfully!");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setForm(user); // revert back
    setIsEditing(false);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="p-6 border rounded-2xl bg-white shadow space-y-4">
        {/* First Name */}
      <div>
        <label className="text-gray-600 text-sm">First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full p-2 border rounded-lg mt-1 ${
            !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="text-gray-600 text-sm">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full p-2 border rounded-lg mt-1 ${
            !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
      </div>


        {/* Email */}
        <div>
          <label className="text-gray-600 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded-lg mt-1 ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-gray-600 text-sm">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded-lg mt-1 ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Username */}
        <div>
          <label className="text-gray-600 text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={form.username || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded-lg mt-1 ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-6 py-2 rounded-lg text-white transition ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
              >
                Cancel
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

