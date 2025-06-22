import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex sm:flex-row justify-between items-center gap-6 sm:gap-8">
        {/* Branding */}
        <div className="sm:text-left">
          <h2 className="text-lg font-semibold text-gray-900">Botly</h2>
          <p className="text-sm text-gray-500">Empowering smarter web conversations.</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm text-gray-600">
          <a href="/privacy" className="hover:text-orange-500 transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-orange-500 transition">Terms of Service</a>
          <a href="/contact" className="hover:text-orange-500 transition">Contact</a>
          <a href="/docs" className="hover:text-orange-500 transition">Docs</a>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Botly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
