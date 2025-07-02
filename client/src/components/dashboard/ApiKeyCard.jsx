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
  className="relative overflow-hidden min-h-[250px] rounded-2xl p-6 bg-gradient-to-br backdrop-blur-md border shadow-xl hover:shadow-[0_4px_20px_var(--hover-shadow)] transition group"
  style={{
    backgroundImage: `linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))`,
    borderColor: 'var(--border-secondary)',
  }}
>
  {/* Decorative Watermark Icon */}
  <MdOutlineKey
    className="absolute top-4 right-4 text-[96px] rotate-12 opacity-10 transition duration-300 pointer-events-none"
    style={{ color: 'var(--text-tertiary)' }}
  />

  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <div
      className="p-2 rounded-full shadow"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--icon-highlight)',
      }}
    >
      <MdOutlineKey size={22} />
    </div>
    <h2
      className="text-xl font-bold tracking-tight"
      style={{ color: 'var(--text-primary)' }}
    >
      Your API Key
    </h2>
  </div>

  {/* Input Field & Controls */}
  <div className="relative flex items-center gap-3">
    <input
      type={isVisible ? 'text' : 'password'}
      value={apikey}
      readOnly
      className="flex-1 px-4 py-2 text-sm rounded-md font-mono border bg-transparent shadow-inner"
      style={{
        borderColor: 'var(--border-secondary)',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      placeholder="Your API Key"
    />

  {/* Eye Button */}
<button
  onClick={() => setIsVisible(!isVisible)}
  title={isVisible ? 'Hide API Key' : 'Show API Key'}
  className="p-2 rounded transition hover:bg-[var(--hover-bg-alt)] "
>
  {isVisible ? (
    <EyeOff size={18} className="text-[var(--icon-highlight)]" />
  ) : (
    <Eye size={18} className="text-[var(--icon-highlight)]" />
  )}
</button>

{/* Refresh Button */}
<button
  onClick={onRevoke}
  title="Regenerate API Key"
  className="p-2 rounded transition hover:bg-[var(--hover-bg-alt)] "
>
  <RefreshCcw size={18} className="text-[var(--text-danger)]" />
</button>

  </div>

  {/* Footer Info */}
  <p
    className="text-xs mt-5 leading-relaxed"
    style={{ color: 'var(--text-secondary)' }}
  >
    Keep this key secure. It’s used for authenticating API requests. If exposed,
    use the regenerate icon to refresh it.
  </p>
</motion.div>

  );
};

export default ApiKeyCard;
