import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function Notification() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
      
        const res = await axiosInstance.get("/notifications/1");
        const data = res.data || [];

        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setItems(sorted);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-gray-500">No notifications yet.</p>
      )}

      <div className="space-y-3">
        {items.map((n) => (
          <div
            key={n.notification_id}
            className="p-4 border rounded-xl bg-white shadow-sm"
          >
            <div className="text-xs uppercase tracking-wide text-gray-500">
              {n.type}
            </div>
            <div className="mt-1">{n.message}</div>
            {n.createdAt && (
              <div className="text-xs text-gray-400 mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
