import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Plus, Minus, FileText, Code, MessageCircle, File, Trash2 } from 'lucide-react';
import CsvUpload from '../CsvUpload';

const ContextSetupStep = ({ formData, data, updateFormData, validationErrors }) => {
  const [newCapability, setNewCapability] = useState('');
  const [newRestrictedTopic, setNewRestrictedTopic] = useState('');
  const [newFaqInput, setNewFaqInput] = useState('');
  const [newFaqOutput, setNewFaqOutput] = useState('');

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  const addCapability = () => {
    if (newCapability.trim()) {
      updateFormData('capabilities', [...formData.capabilities, newCapability.trim()]);
      setNewCapability('');
    }
  };

  const removeCapability = (index) => {
    const updated = formData.capabilities.filter((_, i) => i !== index);
    updateFormData('capabilities', updated);
  };

  const addRestrictedTopic = () => {
    if (newRestrictedTopic.trim()) {
      updateFormData('restrictedTopics', [...formData.restrictedTopics, newRestrictedTopic.trim()]);
      setNewRestrictedTopic('');
    }
  };

  const removeRestrictedTopic = (index) => {
    const updated = formData.restrictedTopics.filter((_, i) => i !== index);
    updateFormData('restrictedTopics', updated);
  };

  const addFaqPair = () => {
    if (newFaqInput.trim() && newFaqOutput.trim()) {
      updateFormData('manualContext', [
        ...formData.manualContext,
        { input: newFaqInput.trim(), output: newFaqOutput.trim() }
      ]);
      setNewFaqInput('');
      setNewFaqOutput('');
    }
  };

  const removeFaqPair = (index) => {
    const updated = formData.manualContext.filter((_, i) => i !== index);
    updateFormData('manualContext', updated);
  };

  const contextInputTypes = [
    { id: 'manual', label: 'Manual Input', icon: FileText, description: 'Add FAQ pairs manually' },
    { id: 'json', label: 'Paste JSON', icon: Code, description: 'Import context from JSON' },
    { id: 'csv', label: 'CSV', icon: File, description: 'Extract context from CSV' }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Settings className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Context Setup</h2>
        <p className="text-gray-600">Configure your bot's knowledge and capabilities</p>
      </motion.div>

      {/* Capabilities Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Capabilities
        </h3>
        <p className="text-gray-600 mb-4">What can your bot do? Add specific capabilities.</p>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCapability}
            onChange={(e) => setNewCapability(e.target.value)}
            placeholder="e.g., Answer product questions, Schedule appointments"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all duration-200"
            onKeyPress={(e) => e.key === 'Enter' && addCapability()}
          />
          <motion.button
            onClick={addCapability}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <AnimatePresence>
          {formData.capabilities.map((capability, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg mb-2 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <span className="text-gray-700">{capability}</span>
              <motion.button
                onClick={() => removeCapability(index)}
                className="text-red-500 hover:text-red-600 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minus className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Restricted Topics Section */}
      <motion.div 
        className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Restricted Topics</h3>
        <p className="text-gray-600 mb-4">Topics your bot should avoid discussing.</p>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newRestrictedTopic}
            onChange={(e) => setNewRestrictedTopic(e.target.value)}
            placeholder="e.g., Politics, Personal medical advice"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-gray-300 transition-all duration-200"
            onKeyPress={(e) => e.key === 'Enter' && addRestrictedTopic()}
          />
          <motion.button
            onClick={addRestrictedTopic}
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <AnimatePresence>
          {formData.restrictedTopics.map((topic, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg mb-2 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <span className="text-gray-700">{topic}</span>
              <motion.button
                onClick={() => removeRestrictedTopic(index)}
                className="text-red-500 hover:text-red-600 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minus className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Context Input Section */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-800">Context Input</h3>
        
        {/* Context Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contextInputTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => updateFormData('contextInputType', type.id)}
              className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                formData.contextInputType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <type.icon className={`w-6 h-6 mb-2 ${
                formData.contextInputType === type.id ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <h4 className="font-semibold text-gray-800">{type.label}</h4>
              <p className="text-sm text-gray-600">{type.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Context Input Content */}
        <AnimatePresence mode="wait">
          {formData.contextInputType === 'manual' && (
            <motion.div
              key="manual"
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h4 className="font-semibold text-gray-800">Add FAQ Pairs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question/Input</label>
                  <textarea
                    value={newFaqInput}
                    onChange={(e) => setNewFaqInput(e.target.value)}
                    placeholder="What can you help me with?"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all duration-200"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer/Output</label>
                  <textarea
                    value={newFaqOutput}
                    onChange={(e) => setNewFaqOutput(e.target.value)}
                    placeholder="I can help you with product information, support tickets, and general inquiries."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all duration-200"
                    rows={3}
                  />
                </div>
              </div>
              <motion.button
                onClick={addFaqPair}
                className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add FAQ Pair
              </motion.button>

              <AnimatePresence>
                {formData.manualContext.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 p-4 rounded-xl border-gray-300 border"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    layout
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className='flex gap-1.5'>
                      <span className="font-semibold text-gray-800">Q:</span>
                      <p className="text-gray-700 mb-3">{faq.input}</p>
                      </div>
                      <motion.button
                        onClick={() => removeFaqPair(index)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-800 mr-2">A:</span>
                      <p className="text-gray-700">{faq.output}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {formData.contextInputType === 'json' && (
            <motion.div
              key="json"
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <label className="block text-sm font-semibold text-gray-700">
                JSON Context *
              </label>
              <textarea
                value={formData.jsonContext}
                onChange={(e) => updateFormData('jsonContext', e.target.value)}
                placeholder=' [{"input": "What is your return policy?", "output": "We offer 30-day returns..."}]'
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-mono ${
                  validationErrors.jsonContext ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                rows={8}
              />
              {validationErrors.jsonContext && (
                <motion.p 
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {validationErrors.jsonContext}
                </motion.p>
              )}
            </motion.div>
          )}
      {formData.contextInputType === 'csv' && (
          <CsvUpload
          key='csv'
          data={data}
          validationErrors={validationErrors}
          />
)}
      {validationErrors && (
            <motion.p 
              className="text-red-500 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {validationErrors?.manualContext || validationErrors?.jsonContext || validationErrors?.csvContext }
            </motion.p>
          )}
        </AnimatePresence>
              <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-gray-700">
            Website url 
          </label>
          <motion.input
            type="text"
            value={formData.websiteUrl}
            onChange={(e) => updateFormData('websiteUrl', e.target.value)}
            placeholder="Enter your website url"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              validationErrors.websiteUrl ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            variants={inputVariants}
            whileFocus="focus"
            onBlur="blur"
          />
          {validationErrors.websiteUrl && (
            <motion.p 
              className="text-red-500 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {validationErrors.websiteUrl}
            </motion.p>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ContextSetupStep;