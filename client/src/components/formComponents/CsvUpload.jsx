import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import {FileSpreadsheet} from 'lucide-react'

const CsvUpload = ({ data, validationErrors }) => {
  const maxFileSize = 5 * 1024 * 1024; // 5MB limit
  const [uploadedFileName, setUploadedFileName] = useState(null); // State for file name

  const onDrop = (acceptedFiles, fileRejections) => {
    // Handle valid files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      validationErrors.csvFile = null; // Clear errors directly
      data.current.set("file", file); // Replace previous file
      setUploadedFileName(file.name); // Update file name
    }

    // Handle rejected files
    if (fileRejections.length > 0) {
      const { errors } = fileRejections[0];
      errors.forEach((error) => {
        if (error.code === "file-too-large") {
          validationErrors.csvFile = "File size exceeds 5MB.";
        } else if (error.code === "file-invalid-type") {
          validationErrors.csvFile = "Invalid file type. Please upload a .csv file.";
        }
      });
      setUploadedFileName(null); // Clear file name on error
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
      <label className="block text-sm font-semibold text-gray-700">
        Upload CSV *
      </label>
      <div
        {...getRootProps()}
        className={`border-2 rounded-xl px-4 py-6 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-blue-500 bg-blue-100"
            : validationErrors.csvFile
            ? "border-red-300 bg-red-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : uploadedFileName ? (
          <p className="text-green-800 flex justify-center">Uploaded:<FileSpreadsheet /> {uploadedFileName}</p>
        ) : (
          <p>
            Drag and drop your CSV file here, or <span className="text-blue-500 underline">browse</span>
          </p>
        )}
      </div>
      {validationErrors.csvFile && (
        <motion.p
          className="text-red-500 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {validationErrors.csvFile}
        </motion.p>
      )}
      <p className="text-sm text-gray-600">
        The CSV should have headers <strong>input</strong> and <strong>output</strong>. Each row represents a context entry.
      </p>
    </motion.div>
  );
};

export default CsvUpload;
