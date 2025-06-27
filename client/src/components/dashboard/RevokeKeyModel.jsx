import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { MdOutlineKey } from "react-icons/md";
import { Copy, Check } from "lucide-react";

const RevokeKeyModal = ({ apiKey, onClose, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white p-6 rounded-xl w-full max-w-sm text-center shadow-xl"
        >
          <Dialog.Title className="text-lg font-semibold text-indigo-700 mb-2 flex items-center gap-1 justify-center">
            <MdOutlineKey /> New API Key
          </Dialog.Title>

          <p className="mt-2 font-mono text-sm bg-gray-100 p-2 rounded">{apiKey}</p>

          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={handleCopy}
              className={`btn-primary ${
                copied ? "bg-green-600" : "bg-indigo-600"
              } text-white px-4 py-2 rounded flex items-center gap-2`}
            >
              {copied ? (
                <>
                  <Check size={16} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="btn-primary bg-red-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RevokeKeyModal;
