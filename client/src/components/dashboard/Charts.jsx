import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { BiBarChartAlt2 } from "react-icons/bi";
import { MdOutlineInsertChart } from "react-icons/md";
import { motion } from "framer-motion";
import "./chartSetup";

const Charts = ({ analytics }) => {
  const ratingData = {
    labels: Object.keys(analytics.ratingBreakdown).map((r) => `${r}⭐`),
    datasets: [
      {
        label: "Ratings",
        data: Object.values(analytics.ratingBreakdown),
        backgroundColor: "#6366f1", // Indigo-500
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const requestData = {
    labels: analytics.requesttimestamps.map((t) =>
      new Date(t).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Requests",
        data: analytics.requesttimestamps.map(() => 1),
        fill: true,
        backgroundColor: "rgba(99,102,241,0.2)", // Indigo-500 w/ alpha
        borderColor: "#6366f1",
        tension: 0.4,
        pointRadius: 0,
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
        className="rounded-xl p-5 bg-gradient-to-br from-zinc-900/70 via-zinc-800 to-zinc-900 border border-zinc-700 shadow-lg backdrop-blur-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <BiBarChartAlt2 className="text-indigo-400" size={22} />
          <h4 className="text-md font-semibold text-white tracking-tight">
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
        className="lg:col-span-2 rounded-xl p-5 bg-gradient-to-br from-zinc-900/70 via-zinc-800 to-zinc-900 border border-zinc-700 shadow-lg backdrop-blur-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <MdOutlineInsertChart className="text-indigo-400" size={22} />
          <h4 className="text-md font-semibold text-white tracking-tight">
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
