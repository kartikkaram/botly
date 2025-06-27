import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';

const FinishStep = ({ isSubmitting, submitSuccess, submitError, apiKey, onSubmit }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bot Created Successfully!</h2>
          <p className="text-gray-600 mb-8">Your intelligent assistant is ready to help your users.</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
            Your API Key
          </h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <code className="text-sm font-mono text-gray-800 break-all">{apiKey}</code>
          </div>
          <motion.button
            onClick={copyToClipboard}
            className="flex items-center justify-center w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                Copy API Key
              </>
            )}
          </motion.button>
        </motion.div>

        <motion.div 
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Store this API key securely. You'll need it to integrate your bot into your applications.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  if (submitError) {
    return (
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We encountered an error while creating your bot.</p>
        </motion.div>

        <motion.div 
          className="bg-red-50 border border-red-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-red-800 mb-4">{submitError}</p>
          <motion.button
            onClick={onSubmit}
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="text-center space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-blue-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Ready to Create Your Bot</h2>
        <p className="text-gray-600 mb-8">Review your settings and create your intelligent assistant.</p>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">What happens next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <p className="text-gray-700">We'll process your bot configuration</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <p className="text-gray-700">Train your bot with the provided context</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <p className="text-gray-700">Generate your unique API key</p>
          </div>
        </div>
      </motion.div>

      {isSubmitting && (
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-gray-600 font-medium">Creating your bot...</p>
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FinishStep;