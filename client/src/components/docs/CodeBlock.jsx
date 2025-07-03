// src/components/CodeBlock.jsx
import { useEffect, useState } from "react";

export function CodeBlock({ children, language = "js" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-8 rounded-xl overflow-hidden border border-gray-700 bg-[#0f0f0f]">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 text-xs text-gray-400 font-mono uppercase tracking-wide">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-blue-400 hover:text-blue-200 transition duration-150"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
}
