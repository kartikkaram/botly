import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bot, Settings, CheckCircle, Copy, Loader2 } from 'lucide-react';
import BotDetailsStep from './steps/BotDetailsStep';
import ContextSetupStep from './steps/ContextSetupStep';
import FinishStep from './steps/FinishStep';
import StepIndicator from './StepIndicator';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const BotCreationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const { getToken } = useAuth();

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
 
 const { isSignedIn, isLoaded } = useUser();


  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    window.location.href = "https://climbing-lacewing-77.accounts.dev/sign-in";
    return null; // prevent rendering anything else
  }

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
    if(formData.contextInputType==='manual'){
      if(!formData.manualContext || formData.manualContext.length==0){
        errors.manualContext='context is required'
      }
    }
   else if (formData.contextInputType === 'json') {
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
       errors.csvContext = 'Invalid file';
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
   
data.current.delete("data");

data.current.set("data", JSON.stringify(formData));
  const token = await getToken();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/frontend-api/botForm`, data.current, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
      if(!response.data.data){
         setSubmitError(
        'Failed to create bot. Please try again.'
      );
      setSubmitSuccess(false)
      return
    }
    setApiKey(response.data.data)
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        'Failed to create bot. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
      localStorage.removeItem("formData")
      localStorage.removeItem("validationErrors")
      localStorage.removeItem("currentStep")
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
 <div className="min-h-screen bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-via)] py-10 px-4 text-[var(--form-text-primary)] lg:pl-20 pb-25">
  <div className="max-w-4xl mx-auto">
    {/* Header */}
    <motion.div
      className="text-center mb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--form-icon-highlight)] to-[var(--form-icon-highlight-alt)] bg-clip-text text-transparent">
        Create Your Bot
      </h1>
      <p className="text-sm text-[var(--form-text-secondary)] mt-2">
        Build an intelligent assistant in just a few steps
      </p>
    </motion.div>

    {/* Step Indicator */}
    <StepIndicator steps={steps} currentStep={currentStep} />

    {/* Form Container */}
    <motion.div
      className="rounded-2xl bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)]  backdrop-blur-lg border-[var(--form-border-primary)] shadow-2xl p-8 mt-6 mb-12"
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
              ? 'bg-[var(--form-icon-highlight)] text-[var(--form-text-secondary)] cursor-not-allowed'
              : 'bg-[var(--form-icon-highlight)] hover:bg-[var(--form-bg-highlight)] text-[var(--form-text-primary)] border-[var(--form-border-primary)] shadow-md hover:shadow-lg transform hover:scale-105' 
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-[var(--form-icon-highlight)] to-[var(--form-icon-highlight-alt)] text-[var(--form-text-primary)] rounded-xl font-medium hover:from-[var(--form-icon-highlight-alt)] hover:to-[var(--form-icon-highlight)] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-[var(--form-text-success)] to-[var(--form-text-success-alt)] text-[var(--form-text-primary)] rounded-xl font-medium hover:from-[var(--form-text-success-alt)] hover:to-[var(--form-text-success)] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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