import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Bot, BookOpen, LogOut, Beaker, FlaskConical } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BsRobot } from 'react-icons/bs';
import { useClerk,SignedIn, UserButton } from "@clerk/clerk-react";

const navItems = [
  { label: "Create Bot", icon: <Plus />, path: "/create-bot" },
  { label: "All Bots", icon: <Bot />, path: "/bots" },
  { label:"Playground", icon:<FlaskConical/>, path:"/playground"},
  { label: "Docs", icon: <BookOpen />, path: "/docs/get-started" },
  { label: "Logout", icon: <LogOut />, path: "/logout", isLogout: true },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden md:flex fixed top-0 left-0 h-full z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ width: 64 }}
          animate={{ width: isHovered ? 200 : 64 }}
          transition={{ duration: 0.2 }}
          className="bg-black text-white h-full shadow-lg flex flex-col items-center pt-4"
        >
          <h1 className="text-lg font-bold mb-6">
            {isHovered ? (
              <span className="text-xl flex justify-center"><BsRobot /> Botly</span>
            ) : (
              <BsRobot />
            )}
          </h1>
          <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
          </div>

          <nav className="flex flex-col gap-4 w-full px-2">
            {navItems.map((item, idx) =>
              item.isLogout ? (
                <button
                  key={idx}
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 w-full text-left"
                >
                  <span className="text-xl">{item.icon}</span>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="whitespace-nowrap text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ) : (
                <Link
                  key={idx}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-3 py-2 rounded-md transition-all duration-200",
                    location.pathname === item.path
                      ? "bg-white text-black"
                      : "hover:bg-white/10"
                  )}
                >
                  <span className="text-xl">{item.icon}</span>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="whitespace-nowrap text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              )
            )}
          </nav>
        </motion.div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around items-center py-3 border-t border-white/10 z-50"
        >
          {navItems.map((item, idx) =>
            item.isLogout ? (
              <button
                key={idx}
                onClick={handleLogout}
                className="flex flex-col items-center text-xs"
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ) : (
              <Link
                key={idx}
                to={item.path}
                className={cn(
                  "flex flex-col items-center text-xs",
                  location.pathname === item.path && "text-blue-400"
                )}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            )
          )}
        </motion.div>
      </div>
    </>
  );
}
