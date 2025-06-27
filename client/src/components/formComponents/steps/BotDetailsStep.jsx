import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, MessageSquare, Target } from 'lucide-react';

const BotDetailsStep = ({ formData, updateFormData, validationErrors }) => {
  const botTypes = ['Assistant', 'Support Bot', 'Sales Bot'];
  const models = ['Gemini', 'DeepSeek', 'Grok'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Bot className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bot Details</h2>
        <p className="text-gray-600">Let's start by setting up your bot's basic information</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bot Name */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-gray-700">
            Bot Name *
          </label>
          <motion.input
            type="text"
            value={formData.botName}
            onChange={(e) => updateFormData('botName', e.target.value)}
            placeholder="Enter your bot's name"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              validationErrors.botName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            variants={inputVariants}
            whileFocus="focus"
          />
          {validationErrors.botName && (
            <motion.p 
              className="text-red-500 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {validationErrors.botName}
            </motion.p>
          )}
        </motion.div>

        {/* Bot Type */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700">
            Bot Type
          </label>
          <motion.select
            value={formData.botType}
            onChange={(e) => updateFormData('botType', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all duration-200"
            variants={inputVariants}
            whileFocus="focus"
          >
            {botTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </motion.select>
        </motion.div>

        {/* Model */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700">
            Model
          </label>
          <motion.select
            value={formData.model}
            onChange={(e) => updateFormData('model', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all duration-200"
            variants={inputVariants}
            whileFocus="focus"
          >
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </motion.select>
        </motion.div>

        {/* Language */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-sm font-semibold text-gray-700">
            Language
          </label>
          <motion.select
            value={formData.language}
            onChange={(e) => updateFormData('language', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all duration-200"
            variants={inputVariants}
            whileFocus="focus"
          >
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </motion.select>
        </motion.div>
      </div>

      {/* Description */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <label className=" text-sm font-semibold text-gray-700 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Description *
        </label>
        <motion.textarea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder="Describe what your bot does and its main purpose"
          rows={4}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none ${
            validationErrors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          variants={inputVariants}
          whileFocus="focus"
        />
        {validationErrors.description && (
          <motion.p 
            className="text-red-500 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {validationErrors.description}
          </motion.p>
        )}
      </motion.div>

      {/* Target Audience */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label className=" text-sm font-semibold text-gray-700 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Target Audience *
        </label>
        <motion.input
          type="text"
          value={formData.targetAudience}
          onChange={(e) => updateFormData('targetAudience', e.target.value)}
          placeholder="Who will be using this bot? (e.g., customers, employees, students)"
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
            validationErrors.targetAudience ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          variants={inputVariants}
          whileFocus="focus"
        />
        {validationErrors.targetAudience && (
          <motion.p 
            className="text-red-500 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {validationErrors.targetAudience}
          </motion.p>
        )}
      </motion.div>

      {/* Response Style */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <label className=" text-sm font-semibold text-gray-700 flex items-center">
          <User className="w-4 h-4 mr-2" />
          Response Style *
        </label>
        <motion.input
          type="text"
          value={formData.responseStyle}
          onChange={(e) => updateFormData('responseStyle', e.target.value)}
          placeholder="How should your bot respond? (e.g., friendly, professional, casual)"
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
            validationErrors.responseStyle ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          variants={inputVariants}
          whileFocus="focus"
        />
        {validationErrors.responseStyle && (
          <motion.p 
            className="text-red-500 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {validationErrors.responseStyle}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default BotDetailsStep;