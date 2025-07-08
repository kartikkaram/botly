import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Plus, Minus, FileText, Code, MessageCircle, File, Trash2 } from 'lucide-react';
import CsvUpload from '../CsvUpload';

const ContextSetupStep = ({ formData,  updateFormData, validationErrors }) => {
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
    className="bg-[var(--form-bg-primary)] p-6 rounded-xl shadow-md border border-[var(--form-border-primary)]"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <h3 className="text-xl font-semibold text-[var(--form-text-primary)] mb-4 flex items-center">
      <MessageCircle className="w-5 h-5 mr-2 text-[var(--form-text-primary)]" />
      Capabilities
    </h3>
    <p className="text-[var(--form-text-secondary)] mb-4">
      What can your bot do? Add specific capabilities.
    </p>

    {/* Input Row */}
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        value={newCapability}
        onChange={(e) => setNewCapability(e.target.value)}
        placeholder="e.g., Answer product questions"
        className="flex-1 px-4 py-3 border border-[var(--form-border-secondary)] bg-[var(--form-bg-secondary)] text-[var(--form-text-primary)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--form-text-primary)] transition duration-200 placeholder:text-[var(--form-text-tertiary)]"
        onKeyDown={(e) => e.key === 'Enter' && addCapability()}
      />
      <motion.button
        onClick={addCapability}
        className="px-6 py-3 bg-[var(--form-bg-danger)] text-[var(--form-text-primary)] rounded-xl hover:bg-green-600 transition duration-200 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5" />
      </motion.button>
    </div>

    {/* Capability List */}
    <AnimatePresence>
      {formData.capabilities.map((capability, index) => (
        <motion.div
          key={index}
          className="flex items-center justify-between bg-[var(--form-bg-tertiary)] p-3 rounded-lg mb-2 shadow-sm border border-[var(--form-border-secondary)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          layout
        >
          <span className="text-[var(--form-text-primary)]">{capability}</span>
          <motion.button
            onClick={() => removeCapability(index)}
            className="text-[var(--form-text-secondary)] hover:text-[var(--form-text-danger)] transition duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>

  {/* Restricted Topics Section */}
  <motion.div
    className="bg-[var(--form-bg-primary)] p-6 rounded-xl shadow-md border border-[var(--form-border-primary)]"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <h3 className="text-xl font-semibold text-[var(--form-text-primary)] mb-4">
      Restricted Topics
    </h3>
    <p className="text-[var(--form-text-secondary)] mb-4">
      Topics your bot should avoid discussing.
    </p>

    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        value={newRestrictedTopic}
        onChange={(e) => setNewRestrictedTopic(e.target.value)}
        placeholder="e.g., Politics, Personal medical advice"
        className="flex-1 px-4 py-3 border border-[var(--form-border-secondary)] bg-[var(--form-bg-secondary)] text-[var(--form-text-primary)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--form-text-danger)] transition duration-200 placeholder:text-[var(--form-text-tertiary)]"
        onKeyDown={(e) => e.key === 'Enter' && addRestrictedTopic()}
      />
      <motion.button
        onClick={addRestrictedTopic}
        className="px-6 py-3 bg-[var(--form-bg-danger)] text-[var(--form-text-primary)] rounded-xl hover:bg-[var(--form-bg-danger-active)] transition duration-200 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5" />
      </motion.button>
    </div>

    {/* Restricted Topics List */}
    <AnimatePresence>
      {formData.restrictedTopics.map((topic, index) => (
        <motion.div
          key={index}
          className="flex items-center justify-between bg-[var(--form-bg-tertiary)] p-3 rounded-lg mb-2 shadow-sm border border-[var(--form-border-secondary)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          layout
        >
          <span className="text-[var(--form-text-primary)]">{topic}</span>
          <motion.button
            onClick={() => removeRestrictedTopic(index)}
            className="text-[var(--form-text-danger)] hover:text-[var(--form-bg-danger-active)] transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>

<motion.div 
  className="space-y-6 text-[var(--form-text-quaternary)]"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
>
  <h3 className="text-xl font-semibold text-[var(--form-text-quaternary)]">Context Input</h3>

  {/* Context Type Selection */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {contextInputTypes.map((type) => (
      <motion.button
        key={type.id}
        onClick={() => updateFormData('contextInputType', type.id)}
        className={`p-4 rounded-xl text-left transition-all duration-200 border backdrop-blur-sm ${
          formData.contextInputType === type.id
            ? 'border-[var(--form-border-highlight)] bg-[var(--form-bg-highlight)]'
            : 'border-[var(--form-border-primary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <type.icon className={`w-6 h-6 mb-2 ${
          formData.contextInputType === type.id ? 'text-[var(--form-icon-highlight-alt)]' : 'text-[var(--form-text-secondary)]'
        }`} />
        <h4 className="font-semibold text-[var(--form-text-quaternary)]">{type.label}</h4>
        <p className="text-sm text-[var(--form-text-secondary)]">{type.description}</p>
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
        <h4 className="font-semibold text-[var(--form-text-quaternary)]">Add FAQ Pairs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--form-text-tertiary)] mb-2">Question/Input</label>
            <textarea
              value={newFaqInput}
              onChange={(e) => setNewFaqInput(e.target.value)}
              placeholder="What can you help me with?"
              className={`w-full px-4 py-3 rounded-xl text-[var(--form-text-primary)] placeholder:text-[var(--form-text-secondary)] backdrop-blur-sm ${
                validationErrors.manualContext
                  ? 'border border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]'
                  : 'border border-[var(--form-border-primary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
              } focus:outline-none focus:ring-2 focus:ring-[var(--form-text-primary)]`}
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--form-text-tertiary)] mb-2">Answer/Output</label>
            <textarea
              value={newFaqOutput}
              onChange={(e) => setNewFaqOutput(e.target.value)}
              placeholder="I can help you with product information, support tickets, and general inquiries."
              className={`w-full px-4 py-3 rounded-xl text-[var(--form-text-primary)] placeholder:text-[var(--form-text-secondary)] backdrop-blur-sm ${
                validationErrors.manualContext
                  ? 'border border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]'
                  : 'border border-[var(--form-border-primary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
              } focus:outline-none focus:ring-2 focus:ring-[var(--form-text-primary)]`}
              rows={3}
            />
          </div>
        </div>
        <motion.button
          onClick={addFaqPair}
          className="w-full py-3 bg-green-500 text-[var(--form-text-primary)] rounded-xl hover:bg-green-600 transition duration-200 flex items-center justify-center"
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
              className="bg-white/10 border border-white/20 p-4 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <div className="flex justify-between items-start mb-2">
                <div className='flex gap-1.5'>
                  <span className="font-semibold text-zinc-300">Q:</span>
                  <p className="text-zinc-300 mb-3">{faq.input}</p>
                </div>
                <motion.button
                  onClick={() => removeFaqPair(index)}
                  className="text-red-400 hover:text-red-500 transition duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-zinc-300 mr-2">A:</span>
                <p className="text-zinc-300">{faq.output}</p>
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
        <label className="block text-sm font-semibold text-[var(--form-text-tertiary)]">
          JSON Context *
        </label>
        <textarea
          value={formData.jsonContext}
          onChange={(e) => updateFormData('jsonContext', e.target.value)}
          placeholder='[{"input": "What is your return policy?", "output": "We offer 30-day returns..."}]'
          className={`w-full px-4 py-3 rounded-xl font-mono text-[var(--form-text-primary)] placeholder:text-[var(--form-text-secondary)] backdrop-blur-sm ${
            validationErrors.jsonContext
              ? 'border border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]'
              : 'border border-[var(--form-border-primary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
          } focus:outline-none focus:ring-2 focus:ring-[var(--form-text-primary)]`}
          rows={8}
        />
        {validationErrors.jsonContext && (
          <motion.p 
            className="text-[var(--form-text-danger)] text-sm"
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
        key="csv"
        formData={formData}
        updateFormData={updateFormData}
        validationErrors={validationErrors}
      />
    )}

    {validationErrors && (
      <motion.p 
        className="text-red-400 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {validationErrors?.manualContext || validationErrors?.jsonContext || validationErrors?.csvContext}
      </motion.p>
    )}
  </AnimatePresence>
  

  {/* Website URL */}
  <motion.div 
    className="space-y-2"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <label className="block text-sm font-semibold text-[var(--form-text-tertiary)]">
      Website URL
    </label>
    <motion.input
      type="text"
      value={formData.websiteUrl}
      onChange={(e) => updateFormData('websiteUrl', e.target.value)}
      placeholder="Enter your website URL"
      className={`w-full px-4 py-3 rounded-xl text-[var(--form-text-primary)] placeholder:text-[var(--form-text-secondary)] backdrop-blur-sm transition-all duration-200 ${
        validationErrors.websiteUrl
          ? 'border border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]'
          : 'border border-[var(--form-border-primary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
      } focus:outline-none focus:ring-2 focus:ring-[var(--form-text-primary)]`}
    />
    {validationErrors.websiteUrl && (
      <motion.p 
        className="text-[var(--form-text-danger)] text-sm"
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