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
  FileTextIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {toast} from 'sonner'
import axios from 'axios'

const ContextEditor = ({ apikey }) => {
  const fileInputRef = useRef();
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [rawJson, setRawJson] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  


const handleFileParsing = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));

    if (!file.name.endsWith(".csv")) {
      return reject(new Error("Only .csv files are allowed"));
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const lines = event.target.result.split("\n");
        const newEntries = lines
          .map((line) => {
            const [input, output] = line.split(",");
            return input && output
              ? { input: input.trim(), output: output.trim() }
              : null;
          })
          .filter(Boolean);

        resolve(newEntries);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
};
  const uploadFile=async () => {
       try {
        let parsedData
        if(selectedFile){
          parsedData=await handleFileParsing(selectedFile)
        } 
          const response=await  axios.post(`${import.meta.env.VITE_BASE_URL}/frontend-api/addContext`,parsedData,{
            headers:{
              apikey:apikey
            }
           })
          toast.success("csv  added succsesfully")
            } catch (error) {
              toast.error("something went wrong while adding csv")
              console.log("something went wrong",error)
            }
  }
  const uploadJson=async () => {
       try {
         let parsedData= handlePasteJson()
         if(!parsedData)return
         parsedData.shift()
          const response=await  axios.post(`${import.meta.env.VITE_BASE_URL}/frontend-api/addContext`,parsedData,{
            headers:{
              apikey:apikey
            }
           })
           toast.success("json context added succsesfully")
            } catch (error) {
              console.log("something went wrong",error)
              toast.error("something went wrong while adding json context")
            }
  }


const handlePasteJson = () => {
  try {
    const parsed = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) throw new Error("Expected an array");
    return parsed;
  } catch (err) {
    toast.error("invalid json")
    return null;
  }
};



  return (
   <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl p-6 border border-[var(--border-secondary)] bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] shadow-2xl text-[var(--text-primary)]"
    >
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-indigo-300">
        <FileText size={20} /> Bot Context Manager
      </h2>
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mt-6">
        <div className="flex flex-col gap-2">

        <button
          onClick={() => fileInputRef.current.click()}
          className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <UploadCloud size={16} /> Select File
        </button>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          className="hidden"
          onChange={(e)=>setSelectedFile(e.target.files[0])}
        />
{selectedFile && (
  <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
    <FileTextIcon size={16} />
    {selectedFile.name}
    <button
      onClick={() => {
        setSelectedFile(null);
        fileInputRef.current.value = ""; // clear the input
      }}
      className="text-red-500 hover:text-red-700 text-xs ml-2"
    >
      <X size={14} />
    </button>
  </div>
)}
        </div>

        <button
          onClick={uploadFile}
          className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Save size={16} /> Upload File
        </button>
        <button
          onClick={() => setJsonModalOpen(true)}
          disabled={selectedFile}
          className="btn-primary bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <ClipboardPaste size={16} /> Paste JSON
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
              className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-xl p-6 w-full max-w-md border border-[var(--border-secondary)] shadow-2xl relative space-y-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setJsonModalOpen(false)}
                className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-red-500"
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
                className="w-full h-40 px-3 py-2 border rounded bg-[var(--bg-secondary)] border-[var(--border-secondary)] font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={uploadJson}
                  className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Import
                </button>
                <button
                  onClick={() => setJsonModalOpen(false)}
                  className="btn-primary bg-[var(--button-bg-primary)] hover:bg-[var(--button-hover-bg)] text-[var(--text-primary)] px-4 py-2 rounded-md"
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
