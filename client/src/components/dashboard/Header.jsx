import React from "react";
import { BsRobot } from "react-icons/bs";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Header = ({ setSelectedBot }) => {
  const { user } = useUser();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-4 sm:px-6 py-4 bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-via)] text-[var(--text-primary)] rounded-xl shadow-md backdrop-blur-md w-full"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Left Side: Title + Go Back */}
        <div className="flex items-center flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2">
            <BsRobot className="text-indigo-400" size={24} />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Botly Dashboard</h1>
          </div>

          <button
            onClick={() => setSelectedBot(null)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-[var(--button-bg-primary)] hover:bg-[var(--button-hover-bg)] rounded-md transition duration-200"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Right Side: Welcome Message */}
        <div className="text-sm text-[var(--text-secondary)] font-medium tracking-wide text-center sm:text-right">
          Welcome,{" "}
          <span className="text-[var(--text-primary)] font-semibold">
            {user?.firstName || "User"}
          </span>{" "}
          👋
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
