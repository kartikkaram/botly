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

  const baseInputStyles = `w-full px-4 py-3 rounded-xl backdrop-blur-md text-white placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`;

  return (
  <div className="space-y-8 text-[var(--form-text-primary)]">
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Bot className="w-16 h-16 text-[var(--form-icon-highlight)] mx-auto mb-4" />
    <h2 className="text-3xl font-bold mb-2">Bot Details</h2>
    <p className="text-[var(--form-text-secondary)]">Let’s start by setting up your bot’s basic information</p>
  </motion.div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Bot Name */}
    <motion.div className="space-y-2" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <label className="block text-sm font-medium text-[var(--form-text-tertiary)]">Bot Name *</label>
      <motion.input
        type="text"
        value={formData.botName}
        onChange={(e) => updateFormData("botName", e.target.value)}
        placeholder="e.g. BuddyBot"
        className={`${baseInputStyles} ${
          validationErrors.botName
            ? 'border border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]'
            : 'border border-[var(--form-border-secondary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
        }`}
        variants={inputVariants}
        whileFocus="focus"
      />
      {validationErrors.botName && (
        <p className="text-[var(--form-text-danger)] text-sm">{validationErrors.botName}</p>
      )}
    </motion.div>

    {/* Bot Type */}
    <motion.div className="space-y-2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <label className="block text-sm font-medium text-[var(--form-text-tertiary)]">Bot Type</label>
      <motion.select
        value={formData.botType}
        onChange={(e) => updateFormData("botType", e.target.value)}
        className={`${baseInputStyles} border border-[var(--form-border-secondary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]`}
        variants={inputVariants}
        whileFocus="focus"
      >
        {botTypes.map((type) => (
          <option key={type} value={type} className="text-black">
            {type}
          </option>
        ))}
      </motion.select>
    </motion.div>

    {/* Model */}
    <motion.div className="space-y-2" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <label className="block text-sm font-medium text-[var(--form-text-tertiary)]">Model</label>
      <motion.select
        value={formData.model}
        onChange={(e) => updateFormData("model", e.target.value)}
        className={`${baseInputStyles} border border-[var(--form-border-secondary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]`}
        variants={inputVariants}
        whileFocus="focus"
      >
        {models.map((model) => (
          <option key={model} value={model} className="text-black">
            {model}
          </option>
        ))}
      </motion.select>
    </motion.div>

    {/* Language */}
    <motion.div className="space-y-2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <label className="block text-sm font-medium text-[var(--form-text-tertiary)]">Language</label>
      <motion.select
        value={formData.language}
        onChange={(e) => updateFormData("language", e.target.value)}
        className={`${baseInputStyles} border border-[var(--form-border-secondary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]`}
        variants={inputVariants}
        whileFocus="focus"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang} className="text-black">
            {lang}
          </option>
        ))}
      </motion.select>
    </motion.div>
  </div>

  {/* Description */}
  <motion.div className="space-y-2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
    <label className="flex items-center text-sm font-medium text-[var(--form-text-tertiary)]">
      <MessageSquare className="w-4 h-4 mr-2" />
      Description *
    </label>
    <motion.textarea
      rows={4}
      value={formData.description}
      onChange={(e) => updateFormData("description", e.target.value)}
      placeholder="What does your bot do?"
      className={`${baseInputStyles} resize-none ${
        validationErrors.description
          ? 'border border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]'
          : 'border border-[var(--form-border-secondary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
      }`}
      variants={inputVariants}
      whileFocus="focus"
    />
    {validationErrors.description && (
      <p className="text-[var(--form-text-danger)] text-sm">{validationErrors.description}</p>
    )}
  </motion.div>

  {/* Target Audience */}
  <motion.div className="space-y-2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
    <label className="flex items-center text-sm font-medium text-[var(--form-text-tertiary)]">
      <Target className="w-4 h-4 mr-2" />
      Target Audience *
    </label>
    <motion.input
      type="text"
      value={formData.targetAudience}
      onChange={(e) => updateFormData("targetAudience", e.target.value)}
      placeholder="e.g., students, customers, employees"
      className={`${baseInputStyles} ${
        validationErrors.targetAudience
          ? 'border border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]'
          : 'border border-[var(--form-border-secondary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
      }`}
      variants={inputVariants}
      whileFocus="focus"
    />
    {validationErrors.targetAudience && (
      <p className="text-[var(--form-text-danger)] text-sm">{validationErrors.targetAudience}</p>
    )}
  </motion.div>

  {/* Response Style */}
  <motion.div className="space-y-2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
    <label className="flex items-center text-sm font-medium text-[var(--form-text-tertiary)]">
      <User className="w-4 h-4 mr-2" />
      Response Style *
    </label>
    <motion.input
      type="text"
      value={formData.responseStyle}
      onChange={(e) => updateFormData("responseStyle", e.target.value)}
      placeholder="e.g., friendly, professional, casual"
      className={`${baseInputStyles} ${
        validationErrors.responseStyle
          ? 'border border-[var(--form-text-danger)] bg-[var(--form-bg-danger)]'
          : 'border border-[var(--form-border-secondary)] bg-[var(--form-bg-primary)] hover:border-[var(--form-border-hover)]'
      }`}
      variants={inputVariants}
      whileFocus="focus"
    />
    {validationErrors.responseStyle && (
      <p className="text-[var(--form-text-danger)] text-sm">{validationErrors.responseStyle}</p>
    )}
  </motion.div>
</div>

  );
};

export default BotDetailsStep;
