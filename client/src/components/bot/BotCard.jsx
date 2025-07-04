import React from "react";
import { motion } from "framer-motion";
import {
  MdOutlineKey,
  MdLanguage,
  MdOutlineDescription,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { BsRobot } from "react-icons/bs";

const BotCard = ({ bot, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(bot)}
      className="cursor-pointer rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-white shadow-lg border border-white/10 transition-all p-6 flex flex-col justify-between group hover:shadow-indigo-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold">{bot.botname}</h3>
        <div className="text-gray-400 group-hover:translate-x-1 transition-transform">
          <MdOutlineArrowForwardIos size={20} />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <BsRobot size={18} className="text-gray-400" />
          <span className="font-medium">{bot.bottype}</span>
        </div>

        <div className="flex items-center gap-2">
          <MdLanguage size={18} className="text-gray-400" />
          <span>{bot.language || "N/A"}</span>
        </div>

        <div className="flex items-start gap-2">
          <MdOutlineDescription size={18} className="mt-0.5 text-gray-400" />
          <p className="line-clamp-3 text-white/80">{bot.description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 text-xs text-gray-400">
        <span className="font-semibold">Created:</span>{" "}
        {new Date(bot.createdAt).toLocaleDateString()}
      </div>
    </motion.div>
  );
};

export default BotCard;
