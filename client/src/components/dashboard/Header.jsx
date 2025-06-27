import React from "react";
import { BsRobot } from "react-icons/bs";
import { motion } from "framer-motion";

const Header = () => (
  <motion.header
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-xl shadow-md backdrop-blur-md"
  >
    <h1 className="text-3xl font-bold flex items-center gap-3 tracking-tight">
      <BsRobot className="text-indigo-400" size={28} />
      <span>Botly Dashboard</span>
    </h1>

    <div className="text-sm text-gray-400 font-medium tracking-wide">
      Welcome, <span className="text-white font-semibold">User</span> 👋
    </div>
  </motion.header>
);

export default Header;
