import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { BiBarChartAlt2 } from "react-icons/bi";
import { MdOutlineInsertChart } from "react-icons/md";
import { motion } from "framer-motion";
import "./chartSetup";

const Charts = ({ analytics }) => {

  if (!analytics) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white">Analytics is not available. Please make sure the bot has been used.</p>
      </div>
    );
  }
  const ratingData = {
    labels: Object.keys(analytics?.ratingBreakdown).map((r) => `${r}⭐`),
    datasets: [
      {
        label: "Ratings",
        data: Object.values(analytics?.ratingBreakdown),
        backgroundColor: "#6366f1", // Indigo-500
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

// Group request counts by date
const groupedRequests = analytics?.requesttimestamps.reduce((acc, timestamp) => {
  const date = new Date(timestamp).toLocaleDateString();
  acc[date] = (acc[date] || 0) + 1;
  return acc;
}, {});

const requestData = {
  labels: Object.keys(groupedRequests),
  datasets: [
    {
      label: "Requests",
      data: Object.values(groupedRequests),
      fill: true,
      backgroundColor: "rgba(99,102,241,0.2)", // Indigo-500 w/ alpha
      borderColor: "#6366f1",
      tension: 0.4,
      pointRadius: 3,
    },
  ],
};


  return (
  <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
  {/* Rating Breakdown */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="rounded-xl p-5 bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] border border-[var(--border-secondary)] shadow-lg hover:shadow-[0_4px_20px_var(--shadow-highlight)] backdrop-blur-md transition"
  >
    <div className="flex items-center gap-2 mb-4">
      <BiBarChartAlt2 className="text-[var(--icon-highlight)]" size={22} />
      <h4 className="text-md font-semibold text-[var(--text-primary)] tracking-tight">
        Rating Breakdown
      </h4>
    </div>
    <div className="h-64">
      <Bar
        data={ratingData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              // Keep chart text colors default
              ticks: { color: "#cbd5e1" },
              grid: { display: false },
            },
            y: {
              ticks: { color: "#cbd5e1" },
              grid: { color: "#334155" },
            },
          },
        }}
      />
    </div>
  </motion.div>

  {/* Request Timeline */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="lg:col-span-2 rounded-xl p-5 bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] border border-[var(--border-secondary)] shadow-lg hover:shadow-[0_4px_20px_var(--shadow-highlight)] backdrop-blur-md transition"
  >
    <div className="flex items-center gap-2 mb-4">
      <MdOutlineInsertChart className="text-[var(--icon-highlight)]" size={22} />
      <h4 className="text-md font-semibold text-[var(--text-primary)] tracking-tight">
        Requests Over Time
      </h4>
    </div>
    <div className="h-64">
      <Line
        data={requestData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              // Keep chart text colors default
              ticks: { color: "#cbd5e1" },
              grid: { display: false },
            },
            y: {
              ticks: { color: "#cbd5e1" },
              grid: { color: "#334155" },
            },
          },
        }}
      />
    </div>
  </motion.div>
</section>


  );
};

export default Charts;
