import React from "react";
import { motion } from "framer-motion";

const AnalyticsSummary = ({ analytics }) => {
  const stats = [
    ["Avg. Response Time", `${analytics.avgResponseTime.toFixed(2)} s`],
    ["Total Requests", analytics.totalRequests],
    ["Avg. Rating", `${analytics.averageRating.toFixed(1)} ⭐`],
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map(([label, value], i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          className="rounded-2xl bg-gradient-to-br from-zinc-900/70 via-zinc-800/80 to-neutral-900/70 border border-zinc-700 shadow-md hover:shadow-indigo-400/20 backdrop-blur-md p-5 text-center transition-all duration-300"
        >
          <h3 className="text-xs uppercase tracking-wide text-zinc-400 mb-2">
            {label}
          </h3>
          <p className="text-3xl font-bold text-white">{value}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default AnalyticsSummary;
