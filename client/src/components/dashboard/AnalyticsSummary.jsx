import React from "react";
import { motion } from "framer-motion";

const AnalyticsSummary = ({ analytics }) => {
  const today = new Date();
  const todayDateString = today.toLocaleDateString();

  // Requests today
  const requestsToday = analytics.requesttimestamps.filter(
    (ts) => new Date(ts).toLocaleDateString() === todayDateString
  ).length;

  // Requests this week
  const now = new Date();
  const startOfWeek = new Date();
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const requestsThisWeek = analytics.requesttimestamps.filter((ts) => {
    const date = new Date(ts);
    return date >= startOfWeek && date <= now;
  }).length;

  // Peak Hour
  const hourCounts = {};
  analytics.requesttimestamps.forEach((ts) => {
    const hour = new Date(ts).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  const peakHour = Object.entries(hourCounts).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    [null, 0]
  ); // [hour, count]

  // Most recent request time
  const latestRequest = analytics.requesttimestamps.length
    ? new Date(Math.max(...analytics.requesttimestamps.map((ts) => new Date(ts))))
    : null;

  // Ratings
  const totalRatings = Object.values(analytics.ratingBreakdown).reduce((a, b) => a + b, 0);

  const avgRating =
    totalRatings === 0
      ? null
      : (
          Object.entries(analytics.ratingBreakdown).reduce(
            (sum, [star, count]) => sum + Number(star) * count,
            0
          ) / totalRatings
        ).toFixed(2);

  // Peak day
  const dailyCounts = analytics.requesttimestamps.reduce((acc, ts) => {
    const date = new Date(ts).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const peakDay = Object.entries(dailyCounts).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    [null, 0]
  ); // [date, count]

  const stats = [
    ["Avg. Response Time", `${(analytics.avgResponseTime / 1000)?.toFixed(2) || 0} s`],
    ["Total Requests", analytics.totalRequests || 0],
    ["Avg. Rating", `${avgRating || 0} ⭐`],
    ["Total Ratings", totalRatings],
    ["Requests Today", requestsToday],
    ["Requests This Week", requestsThisWeek],
    ["Peak Hour", peakHour[0] !== null
  ? `${peakHour[0].toString().padStart(2, '0')}:00 - ${((peakHour[0] + 1) % 24).toString().padStart(2, '0')}:00`
  : "N/A"
  ],
    ["Most Recent Request", latestRequest ? latestRequest.toLocaleString() : "N/A"],
    ["Peak Day", peakDay[0] ? `${peakDay[0]} (${peakDay[1]} requests)` : "N/A"],
  ];

  return (
 <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {stats.map(([label, value], i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.15 }}
      className="rounded-2xl bg-gradient-to-br border backdrop-blur-md p-5 text-center transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom right, var(--gradient-from) / 0.7, var(--gradient-via) / 0.8, var(--gradient-to) / 0.7)`,
        borderColor: 'var(--border-secondary)',
        boxShadow: '0 0 0 0 transparent', // Default no shadow
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = '0 4px 6px 0 var(--shadow-highlight)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = '0 0 0 0 transparent')
      }
    >
      <h3
        className="text-xs uppercase tracking-wide mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </h3>
      <p
        className="text-2xl "
        style={{ color: 'var(--text-primary)' }}
      >
        {value}
      </p>
    </motion.div>
  ))}
</section>

  );
};

export default AnalyticsSummary;
