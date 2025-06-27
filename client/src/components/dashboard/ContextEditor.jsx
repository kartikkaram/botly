import React, { useRef, useState } from "react";
import {
  Plus,
  Trash2,
  UploadCloud,
  ClipboardPaste,
  Save,
  X,
  FileText,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContextEditor = ({ editingContext, setEditingContext, onSave }) => {
  const fileInputRef = useRef();
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [rawJson, setRawJson] = useState("");

  const handleAddContext = () => {
    setEditingContext([...editingContext, { input: "", output: "" }]);
  };

  const handleRemoveContext = (index) => {
    setEditingContext(editingContext.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        let newEntries = [];
        if (file.name.endsWith(".json")) {
          newEntries = JSON.parse(event.target.result);
        } else if (file.name.endsWith(".csv")) {
          const lines = event.target.result.split("\n");
          newEntries = lines
            .map((line) => {
              const [input, output] = line.split(",");
              return input && output ? { input: input.trim(), output: output.trim() } : null;
            })
            .filter(Boolean);
        } else {
          alert("Only .json or .csv files are supported.");
          return;
        }

        if (!Array.isArray(newEntries)) throw new Error("Expected an array");
        setEditingContext([...editingContext, ...newEntries]);
      } catch (err) {
        alert("Error parsing file: " + err.message);
      }
    };

    reader.readAsText(file);
  };

  const handlePasteJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      if (!Array.isArray(parsed)) throw new Error("Pasted JSON must be an array of { input, output }");
      setEditingContext([...editingContext, ...parsed]);
      setRawJson("");
      setJsonModalOpen(false);
    } catch (err) {
      alert("Invalid JSON: " + err.message);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl p-6 border border-zinc-700 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl text-white"
    >
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-indigo-300">
        <FileText size={20} /> Bot Context Manager
      </h2>

      {editingContext.length === 0 && (
        <p className="text-sm text-slate-400 italic mb-4">
          No context entries yet. Use the buttons below to add some.
        </p>
      )}

      {editingContext.map((ctx, idx) => (
        <div
          key={idx}
          className="flex gap-3 mb-5 items-start bg-zinc-800/70 p-3 rounded-lg border border-zinc-600 shadow-inner"
        >
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-indigo-400" />
              <input
                value={ctx.input}
                onChange={(e) => {
                  const updated = [...editingContext];
                  updated[idx].input = e.target.value;
                  setEditingContext(updated);
                }}
                placeholder="User says..."
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-600 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <textarea
              value={ctx.output}
              onChange={(e) => {
                const updated = [...editingContext];
                updated[idx].output = e.target.value;
                setEditingContext(updated);
              }}
              placeholder="Bot responds..."
              rows={3}
              className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-600 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
          <button
            onClick={() => handleRemoveContext(idx)}
            className="text-red-500 hover:text-red-600 mt-1 p-1"
            title="Delete this context"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={handleAddContext}
          className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} /> Add Context
        </button>

        <button
          onClick={() => fileInputRef.current.click()}
          className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <UploadCloud size={16} /> Upload File
        </button>
        <input
          type="file"
          accept=".json,.csv"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={() => setJsonModalOpen(true)}
          className="btn-primary bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <ClipboardPaste size={16} /> Paste JSON
        </button>

        <button
          onClick={onSave}
          className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      {/* Paste Modal */}
      <AnimatePresence>
        {jsonModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-800 text-white rounded-xl p-6 w-full max-w-md border border-zinc-600 shadow-2xl relative space-y-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setJsonModalOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
              <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                <ClipboardPaste size={18} /> Paste JSON
              </h3>
              <textarea
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                placeholder='Paste JSON like [{"input":"Hi","output":"Hello!"}]'
                className="w-full h-40 px-3 py-2 border rounded bg-zinc-900 border-zinc-700 font-mono text-sm text-white placeholder-slate-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handlePasteJson}
                  className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Import
                </button>
                <button
                  onClick={() => setJsonModalOpen(false)}
                  className="btn-primary bg-zinc-600 hover:bg-zinc-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ContextEditor;
