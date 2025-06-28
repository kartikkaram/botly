import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EyeOff,
  Eye,
  RefreshCcw,
  Copy,
  Plus,
  Trash2,
} from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  MdDashboard,
  MdOutlineKey,
  MdOutlineInsertChart,
} from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { BiBarChartAlt2 } from "react-icons/bi";
import axios from 'axios';
const sampleAnalytics = {
  avgResponseTime: 55,
  totalRequests: 30,
  averageRating: 4.2,
  ratingBreakdown: { "1": 2, "2": 1, "3": 3, "4": 10, "5": 14 },
  requesttimestamps: [
    "2025-06-26T10:00:00Z",
    "2025-06-26T12:15:00Z",
    "2025-06-27T09:50:00Z"
  ],
};
  
console.log("hello")



const BotlyDashboard = ({ bot, analytics = sampleAnalytics, onContextUpdate }) => {
  const [isApiVisible, setIsApiVisible] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [editingContext, setEditingContext] = useState(bot.websitecontext || []);

  const ratingData = {
    labels: Object.keys(analytics.ratingBreakdown).map(r => `${r}⭐`),
    datasets: [{
      label: "Ratings",
      data: Object.values(analytics.ratingBreakdown),
      backgroundColor: "#4f46e5",
      borderRadius: 6
    }]
  };

  const requestData = {
    labels: analytics.requesttimestamps.map(t => new Date(t).toLocaleDateString()),
    datasets: [{
      label: "Requests",
      data: analytics.requesttimestamps.map(() => 1),
      fill: true,
      backgroundColor: "rgba(79,70,229,0.2)",
      borderColor: "#4f46e5",
      tension: 0.4
    }]
  };

  const handleRevokeKey = () => {
    const nk = `sk-${Math.random().toString(36).slice(-16)}`;
    setNewApiKey(nk);
    setRevokeDialogOpen(true);
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  const saveContext = () => {
    onContextUpdate(editingContext);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-slate-100 to-white p-8 text-slate-900 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 flex items-center gap-2 tracking-tight">
          <MdDashboard className="text-4xl" />
          Botly Dashboard
        </h1>
        <span className="text-sm text-gray-600">Welcome, User 👋</span>
      </header>

      {/* BOT INFO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card"
        >
          <h2 className="section-title">
            <FiUser /> Bot Information
          </h2>
          <div className="space-y-1 text-sm">
            {["botname", "bottype", "model", "language", "targetaudience", "responsestyle", "websiteurl"].map(key => (
              <p key={key}>
                <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong>{" "}
                {key === "websiteurl"
                  ? <a href={bot[key]} target="_blank" rel="noreferrer" className="text-indigo-600 underline">{bot[key]}</a>
                  : bot[key]}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
        >
          <h2 className="section-title">
            <MdOutlineKey /> API Key
          </h2>
          <div className="flex items-center gap-2">
            <input
              type={isApiVisible ? "text" : "password"}
              value={bot.apikey}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono bg-white/80 backdrop-blur"
            />
            <button onClick={() => setIsApiVisible(!isApiVisible)} className="hover:text-indigo-600 transition">
              {isApiVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button onClick={handleRevokeKey} className="text-red-600 hover:text-red-800 transition">
              <RefreshCcw size={18} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ANALYTICS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          ["Avg. Response Time", `${analytics.avgResponseTime.toFixed(2)} s`],
          ["Total Requests", analytics.totalRequests],
          ["Avg. Rating", `${analytics.averageRating.toFixed(1)} ⭐`]
        ].map(([label, value], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card text-center"
          >
            <h3 className="text-xs text-slate-600 mb-1">{label}</h3>
            <p className="text-2xl font-semibold text-indigo-800">{value}</p>
          </motion.div>
        ))}
      </section>

      {/* CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
        >
          <h4 className="chart-title"><BiBarChartAlt2 /> Rating Breakdown</h4>
          <div className="h-64">
            <Bar data={ratingData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card lg:col-span-2"
        >
          <h4 className="chart-title"><MdOutlineInsertChart /> Requests Over Time</h4>
          <div className="h-64">
            <Line data={requestData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>
      </section>

      {/* CONTEXT EDITOR */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-card"
      >
        <h2 className="section-title">📝 Edit Bot Context</h2>
        {editingContext.map((ctx, idx) => (
          <div key={idx} className="flex gap-2 mb-4">
            <div className="flex-1 space-y-2">
              <input
                value={ctx.input}
                onChange={e => {
                  const updated = [...editingContext];
                  updated[idx].input = e.target.value;
                  setEditingContext(updated);
                }}
                placeholder="User input"
                className="w-full px-3 py-2 border rounded-md bg-white/80"
              />
              <textarea
                value={ctx.output}
                onChange={e => {
                  const updated = [...editingContext];
                  updated[idx].output = e.target.value;
                  setEditingContext(updated);
                }}
                placeholder="Bot response"
                rows={2}
                className="w-full px-3 py-2 border rounded-md bg-white/80"
              />
            </div>
            <button onClick={() => setEditingContext(editingContext.filter((_, i) => i !== idx))} className="text-red-600 mt-2">
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setEditingContext([...editingContext, { input: "", output: "" }])}
            className="btn-primary bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus size={16} /> Add Context
          </button>
          <button onClick={saveContext} className="btn-primary bg-indigo-600 hover:bg-indigo-700">
            💾 Save Changes
          </button>
        </div>
      </motion.section>

      {/* MODAL */}
      <AnimatePresence>
        {revokeDialogOpen && (
          <Dialog open={true} onClose={() => setRevokeDialogOpen(false)}>
            <Dialog.Panel className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 rounded-xl w-full max-w-sm text-center shadow-xl"
              >
                <h3 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center gap-1 justify-center">
                  <MdOutlineKey /> New API Key
                </h3>
                <p className="mt-2 font-mono text-sm bg-gray-100 p-2 rounded">{newApiKey}</p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    className="btn-primary bg-indigo-600"
                    onClick={() => copyToClipboard(newApiKey)}
                  >
                    <Copy size={16} /> Copy
                  </button>
                  <button
                    className="btn-primary bg-red-600"
                    onClick={() => setRevokeDialogOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BotlyDashboard;
