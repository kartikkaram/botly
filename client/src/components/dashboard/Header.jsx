import React from "react";
import { BsRobot } from "react-icons/bs";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react"; // Optional icon for "Go Back"

const Header = ({ setSelectedBot }) => (
  <motion.header
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-xl shadow-md backdrop-blur-md"
  >
    <div className="flex items-center gap-6">
      <h1 className="text-3xl font-bold flex items-center gap-3 tracking-tight">
        <BsRobot className="text-indigo-400" size={28} />
        <span>Botly Dashboard</span>
      </h1>

      <button
        onClick={() => setSelectedBot(null)}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-zinc-700 hover:bg-zinc-600 rounded-md transition duration-200"
      >
        <ArrowLeft size={16} />
        Go Back
      </button>
    </div>

    <div className="text-sm text-gray-400 font-medium tracking-wide">
      Welcome, <span className="text-white font-semibold">User</span> 👋
    </div>
  </motion.header>
);

export default Header;

