import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FileSpreadsheet, FileCheck2, AlertCircle } from "lucide-react";

const CsvUpload = ({ data, validationErrors }) => {
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const onDrop = (acceptedFiles, fileRejections) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      validationErrors.csvFile = null;
      data.current.set("file", file);
      setUploadedFileName(file.name);
    }

    if (fileRejections.length > 0) {
      const { errors } = fileRejections[0];
      errors.forEach((error) => {
        if (error.code === "file-too-large") {
          validationErrors.csvFile = "File size exceeds 5MB.";
        } else if (error.code === "file-invalid-type") {
          validationErrors.csvFile = "Only .csv files are accepted.";
        }
      });
      setUploadedFileName(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
    maxSize: maxFileSize,
    multiple: false,
  });

  return (
    <motion.div
      key="csv"
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
        Upload CSV <span className="text-red-500">*</span>
      </label>

      <div
        {...getRootProps()}
        className={`relative border-2 px-6 py-8 rounded-2xl text-center cursor-pointer backdrop-blur-md bg-white/10 dark:bg-white/5 border-dashed transition-all duration-300
        ${
          isDragActive
            ? "border-blue-400 bg-blue-100/20 dark:bg-blue-900/20"
            : validationErrors.csvFile
            ? "border-red-400 bg-red-50/10"
            : "border-gray-300 hover:border-blue-300"
        }`}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <motion.p
            className="text-blue-500 font-medium"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            Drop your file here...
          </motion.p>
        ) : uploadedFileName ? (
          <motion.div
            className="flex flex-col items-center justify-center text-green-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FileCheck2 className="w-6 h-6 mb-1" />
            <p className="text-sm font-medium">{uploadedFileName}</p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <FileSpreadsheet className="w-8 h-8 mb-2" />
            <p className="text-sm text-white/80">
              Drag & drop your CSV here or{" "}
              <span className="text-blue-300 underline">browse</span>
            </p>
          </div>
        )}
      </div>

      {validationErrors.csvFile && (
        <motion.div
          className="flex items-center text-sm text-red-500 gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AlertCircle size={16} />
          {validationErrors.csvFile}
        </motion.div>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Make sure your CSV has headers:{" "}
        <code className="font-semibold text-indigo-600 dark:text-indigo-300">
          input
        </code>{" "}
        and{" "}
        <code className="font-semibold text-indigo-600 dark:text-indigo-300">
          output
        </code>
        .
      </p>
    </motion.div>
  );
};

export default CsvUpload;
