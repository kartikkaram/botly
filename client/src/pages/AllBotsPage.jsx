import React from "react";
import BotCard from "../components/bot/BotCard";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Sparkles,
  Bot as BotIcon,
  Rocket,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AllBotsPage = ({ bots, onBotSelect }) => {
  const hasBots = bots && bots.length > 0;
 const { isSignedIn, isLoaded } = useUser();


  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  

  return (
  <section className="min-h-screen px-6 lg:pl-24 py-12 bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] text-[var(--text-primary)] pb-25">
  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-10 flex justify-between items-start flex-wrap gap-4"
  >
    <div>
      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] flex items-center gap-3 tracking-tight">
        <BotIcon size={28} /> Your Bots
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-md">
        Craft and manage your AI assistants with precision. Elegance meets intelligence.
      </p>
    </div>
    <button
      onClick={() => (window.location.href = "/create-bot")}
      className="flex items-center gap-2 border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] transition px-4 py-2 rounded-md shadow-md"
    >
      <PlusCircle size={18} /> New Bot
    </button>
  </motion.div>

  {/* No Bots State */}
  {!hasBots && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[var(--bg-primary)] backdrop-blur-md border-[var(--border-secondary)] rounded-xl p-10 text-center text-[var(--text-tertiary)] shadow-lg"
    >
      <Sparkles className="mx-auto text-[var(--icon-highlight)] mb-4" size={40} />
      <h2 className="text-xl font-semibold">No Bots Yet</h2>
      <p className="text-sm text-[var(--text-secondary)] mt-2">
        Get started by clicking the “New Bot” button above.
      </p>
    </motion.div>
  )}

  {/* Bot Cards */}
  {hasBots && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bots.map((bot) => (
        <motion.div
          key={bot._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0d0d0f]"
        >
          <BotCard bot={bot} onSelect={onBotSelect} />
        </motion.div>
      ))}
    </div>
  )}

  {/* Footer Promo Card */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="mt-16 bg-[var(--bg-secondary)] backdrop-blur-md border-[var(--border-secondary)] text-[var(--text-primary)] rounded-2xl p-6 lg:p-10 shadow-2xl flex items-center justify-between flex-wrap gap-6"
  >
    <div>
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Rocket size={24} /> Coming Soon
      </h2>
      <p className="text-sm text-[var(--text-tertiary)] mt-1">
        Cross-platform deployments, GPT-4 Turbo integration, and in-depth analytics.
      </p>
    </div>
    <button className="border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] transition px-4 py-2 rounded-md shadow">
      Stay Updated
    </button>
  </motion.div>
</section>
  );
};

export default AllBotsPage;
