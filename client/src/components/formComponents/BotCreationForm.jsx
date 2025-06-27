import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bot, Settings, CheckCircle, Copy, Loader2 } from 'lucide-react';
import BotDetailsStep from './steps/BotDetailsStep';
import ContextSetupStep from './steps/ContextSetupStep';
import FinishStep from './steps/FinishStep';
import StepIndicator from './StepIndicator';
import axios from 'axios';
import { useEffect } from 'react';

const BotCreationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [apiKey, setApiKey] = useState('');
 const [currentStep, setCurrentStep] = useState(() => {
  try {
    const storedStep = localStorage.getItem("currentStep");
    return storedStep ? Number(storedStep) : 1; 
  } catch (error) {
    return 1;
  }
});
  
  // Form data state
const [formData, setFormData] = useState(() => {
  // This function only runs once on mount
  try {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error loading initial formData:", error);
  }

  return {
    botName: '',
    botType: 'Assistant',
    model: 'Gemini',
    language: 'English',
    description: '',
    targetAudience: '',
    responseStyle: '',
    capabilities: [],
    restrictedTopics: [],
    contextInputType: 'manual',
    manualContext: [],
    jsonContext: '',
    websiteUrl: ''
  };
});
const [validationErrors, setValidationErrors] = useState(() => {
 try {
   const storedErrors = localStorage.getItem("validationErrors");
   return storedErrors ? JSON.parse(storedErrors) : {};
 } catch (error) {
   console.error("Error loading initial validationErrors:", error);
   return {};
 }
});
 const data = useRef(new FormData());
 
 
 useEffect(() => {
   localStorage.setItem("formData", JSON.stringify(formData));
   localStorage.setItem("validationErrors", JSON.stringify(validationErrors));
 }, [formData, validationErrors]);
 
 useEffect(() => {
   localStorage.setItem("currentStep", currentStep.toString());
 }, [currentStep]);
 


  const steps = [
    { number: 1, title: 'Bot Details', icon: Bot },
    { number: 2, title: 'Context Setup', icon: Settings },
    { number: 3, title: 'Finish', icon: CheckCircle }
  ];

  // Validation functions
  const validateStep1 = () => {
    const errors = {};
    if (!formData.botName.trim()) errors.botName = 'Bot name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.targetAudience.trim()) errors.targetAudience = 'Target audience is required';
    if (!formData.responseStyle.trim()) errors.responseStyle = 'Response style is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    
    if (formData.contextInputType === 'json') {
      if (!formData.jsonContext.trim()) {
        errors.jsonContext = 'JSON context is required';
      } else {
        try {
          JSON.parse(formData.jsonContext);
        } catch (e) {
          errors.jsonContext = 'Invalid JSON format';
        }
      }
    }else if(formData.contextInputType === 'csv'){
      const file = data.current.get("file"); 
  if (!file || file.type !== "text/csv") {
       errors.csvFile = 'Invalid file';
  }
    }
     if (!formData.websiteUrl.trim()) {
      errors.websiteUrl = 'Website URL is required';
    } else if (!isValidUrl(formData.websiteUrl)) {
      errors.websiteUrl = 'Please enter a valid URL';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleNext = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }
    
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setValidationErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors({});
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    if(!data.current.get("data")){
  data.current.append("data",  JSON.stringify(formData))
    }
  
    try {
      const response = await axios.post('http://localhost:3001/frontend-api/botForm', data.current);
      setApiKey(response.data.data || 'bot_key_' + Math.random().toString(36).substr(2, 9));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        'Failed to create bot. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
   
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BotDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            validationErrors={validationErrors}
          />
        );
      case 2:
        return (
          <ContextSetupStep
            formData={formData}
            data={data}
            updateFormData={updateFormData}
            validationErrors={validationErrors}
          />
        );
      case 3:
        return (
          <FinishStep
            isSubmitting={isSubmitting}
            submitSuccess={submitSuccess}
            submitError={submitError}
            apiKey={apiKey}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Create Your Bot</h1>
          <p className="text-gray-600 text-lg">Build an intelligent assistant in just a few steps</p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Form Container */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        {!submitSuccess && (
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Bot...
                  </>
                ) : (
                  'Create Bot'
                )}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BotCreationForm;