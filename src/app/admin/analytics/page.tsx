"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface AnalyticsResult {
  roomId: string;
  roomName: string;
  totalHours: number;
  totalRevenue: number;
}

export default function AdminAnalyticsPage() {
  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [data, setData] = useState<AnalyticsResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchAnalytics() {
    setLoading(true);
    const res = await fetch(`/api/analytics?from=${from}&to=${to}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Analytics Dashboard
      </h1>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">

        <div>
          <label className="text-gray-700 font-medium">From Date</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium">To Date</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={fetchAnalytics}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow transition"
          >
            {loading ? "Loading..." : "Apply Filters"}
          </button>
        </div>
      </div>

      {/* CARDS SUMMARY */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ₹{data.reduce((sum, x) => sum + x.totalRevenue, 0)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-semibold text-gray-700">Total Hours</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {data.reduce((sum, x) => sum + x.totalHours, 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-semibold text-gray-700">Rooms Active</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {data.length}
            </p>
          </div>
        </div>
      )}

      {/* REVENUE CHART */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow border mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Revenue by Room
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="roomName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalRevenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* HOURS CHART */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Total Hours Booked
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="roomName" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalHours" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
