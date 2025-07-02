import React from "react";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  Globe,
  Cpu,
  BookOpen,
  Users,
  MessageSquare,
  Target,
} from "lucide-react";

const fieldIcons = {
  botname: <FiUser size={18} className="text-indigo-400" />,
  bottype: <Target size={18} className="text-pink-400" />,
  model: <Cpu size={18} className="text-emerald-400" />,
  language: <BookOpen size={18} className="text-yellow-400" />,
  targetaudience: <Users size={18} className="text-blue-400" />,
  responsestyle: <MessageSquare size={18} className="text-red-400" />,
  websiteurl: <Globe size={18} className="text-indigo-400" />,
};

const fieldLabels = {
  botname: "Bot Name",
  bottype: "Bot Type",
  model: "Model",
  language: "Language",
  targetaudience: "Target Audience",
  responsestyle: "Response Style",
  websiteurl: "Website URL",
};

const BotInfo = ({ bot }) => (
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="rounded-2xl bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] border border-[var(--border-secondary)] shadow-xl p-6 text-[var(--text-primary)]"
>
  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <FiUser size={24} className="text-[var(--icon-highlight)]" />
    <h2 className="text-2xl font-bold tracking-tight">Bot Information</h2>
  </div>

  {/* Grid Info */}
  <div className="grid sm:grid-cols-2 gap-5">
    {Object.keys(fieldLabels).map((key) => (
      <div
        key={key}
        className="flex items-start gap-3 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-lg p-4 hover:shadow-[0_4px_20px_var(--shadow-highlight)] transition-all"
      >
        <div className="pt-1">{fieldIcons[key]}</div>
        <div className="flex flex-col">
          <span className="text-sm text-[var(--text-secondary)]">{fieldLabels[key]}</span>
          {key === "websiteurl" ? (
            <a
              href={bot[key]}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--icon-highlight)] underline text-sm break-words"
            >
              {bot[key]}
            </a>
          ) : (
            <span className="text-sm font-medium text-[var(--text-primary)]">{bot[key]}</span>
          )}
        </div>
      </div>
    ))}
  </div>
</motion.div>

);

export default BotInfo;
