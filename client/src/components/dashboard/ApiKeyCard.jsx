import React from "react";
import { MdOutlineKey } from "react-icons/md";
import { EyeOff, Eye, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const ApiKeyCard = ({ apikey, isVisible, setIsVisible, onRevoke }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden min-h-[250px] rounded-2xl p-6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-neutral-900 backdrop-blur-md border border-zinc-700 shadow-xl hover:shadow-2xl transition group"
    >
      {/* Decorative Watermark Icon */}
      <MdOutlineKey className="absolute top-4 right-4 text-zinc-600 text-[96px] rotate-12 opacity-10 group-hover:opacity-15 transition duration-300 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-zinc-800 text-indigo-400 p-2 rounded-full shadow">
          <MdOutlineKey size={22} />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Your API Key</h2>
      </div>

      {/* Input Field & Controls */}
      <div className="relative flex items-center gap-3">
        <input
          type={isVisible ? "text" : "password"}
          value={apikey}
          readOnly
          className="flex-1 px-4 py-2 text-sm rounded-md font-mono border border-zinc-600 bg-zinc-800 text-white/90 placeholder:text-zinc-500 shadow-inner"
        />

        <button
          onClick={() => setIsVisible(!isVisible)}
          title={isVisible ? "Hide API Key" : "Show API Key"}
          className="p-2 rounded hover:bg-zinc-700 transition"
        >
          {isVisible ? (
            <EyeOff size={18} className="text-indigo-400" />
          ) : (
            <Eye size={18} className="text-indigo-400" />
          )}
        </button>

        <button
          onClick={onRevoke}
          title="Regenerate API Key"
          className="p-2 rounded hover:bg-zinc-700 transition"
        >
          <RefreshCcw size={18} className="text-red-400" />
        </button>
      </div>

      {/* Footer Info */}
      <p className="text-xs text-zinc-400 mt-5 leading-relaxed">
        Keep this key secure. It’s used for authenticating API requests. If exposed, use the regenerate icon to refresh it.
      </p>
    </motion.div>
  );
};

export default ApiKeyCard;
