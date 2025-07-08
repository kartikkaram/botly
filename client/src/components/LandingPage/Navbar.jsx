import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { BsRobot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between sm:px-6 lg:px-8">
        <a
          href="#"
          className="flex items-center p-2 space-x-2 text-3xl"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Botly"
        >
          <BsRobot />
          <span className="text-3xl font-bold text-gray-900">Botly</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
            Home
          </a>
          <a href="#features" className="nav-link">About</a>
          <a href="#details" className="nav-link">Contact</a>
          <a href="/docs/getting-started" className="nav-link">
            Docs
          </a>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <button
              onClick={() => navigate("/bots")}
              className="text-sm text-indigo-600 hover:underline font-medium"
            >
              Go to Dashboard
            </button>
            <button
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="text-sm text-red-500 hover:underline font-medium"
            >
              Logout
            </button>
            <UserButton />
          </SignedIn>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 p-3 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        {/* Close Button in Mobile Menu */}
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-700 p-2"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 items-center mt-10">
          <a
            href="#"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            Home
          </a>
          <a
            href="#features"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
            onClick={closeMenu}
          >
            About
          </a>
          <a
            href="#details"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
            onClick={closeMenu}
          >
            Contact
          </a>
          <a
            href="/docs/getting-started"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
            onClick={closeMenu}
          >
            Docs
          </a>
          <hr className="w-full border-gray-200 my-4" />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <button
              onClick={() => {
                navigate("/bots");
                closeMenu();
              }}
              className="text-sm text-indigo-600 hover:underline font-medium"
            >
              Go to Dashboard
            </button>
            <button
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="text-sm text-red-500 hover:underline font-medium"
            >
              Logout
            </button>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
