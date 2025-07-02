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
  <label className="block text-sm font-semibold text-[var(--form-text-secondary)]">
    Upload CSV <span className="text-[var(--form-text-danger)]">*</span>
  </label>

  <div
    {...getRootProps()}
    className={`relative border-2 px-6 py-8 rounded-2xl text-center cursor-pointer backdrop-blur-md bg-[var(--form-bg-primary)] border-dashed transition-all duration-300
    ${
      isDragActive
        ? "border-[var(--form-border-highlight)] bg-[var(--form-bg-highlight)]"
        : validationErrors.csvFile
        ? "border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]"
        : "border-[var(--form-border-primary)] hover:border-[var(--form-border-hover)]"
    }`}
  >
    <input {...getInputProps()} />

    {isDragActive ? (
      <motion.p
        className="text-[var(--form-icon-highlight-alt)] font-medium"
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
      <div className="flex flex-col items-center justify-center text-[var(--form-text-tertiary)]">
        <FileSpreadsheet className="w-8 h-8 mb-2" />
        <p className="text-sm text-[var(--form-text-primary)]">
          Drag & drop your CSV here or{" "}
          <span className="text-[var(--form-icon-highlight)] underline">browse</span>
        </p>
      </div>
    )}
  </div>

  {validationErrors.csvFile && (
    <motion.div
      className="flex items-center text-sm text-[var(--form-text-danger)] gap-2"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <AlertCircle size={16} />
      {validationErrors.csvFile}
    </motion.div>
  )}

  <p className="text-sm text-[var(--form-text-tertiary)]">
    Make sure your CSV has headers:{" "}
    <code className="font-semibold text-[var(--form-icon-highlight)]">
      input
    </code>{" "}
    and{" "}
    <code className="font-semibold text-[var(--form-icon-highlight)]">
      output
    </code>
    .
  </p>
</motion.div>

  );
};

export default CsvUpload;
