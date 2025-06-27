import React from 'react';
import { motion } from 'framer-motion';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center items-center mb-10">
      <div className="flex items-center space-x-6">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const IconComponent = step.icon;

          return (
            <React.Fragment key={step.number}>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 backdrop-blur-xl shadow-lg transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-green-500/20 border-green-500 text-green-300'
                        : isCurrent
                        ? 'bg-indigo-500/30 border-indigo-400 text-indigo-300 shadow-xl'
                        : 'bg-white/10 border-white/10 text-zinc-400'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.div>
                <span
                  className={`mt-2 text-sm font-semibold transition-colors ${
                    isCurrent
                      ? 'text-indigo-400'
                      : isCompleted
                      ? 'text-green-400'
                      : 'text-zinc-500'
                  }`}
                >
                  {step.title}
                </span>
              </motion.div>

              {/* Progress Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className={`w-16 h-[2px] rounded-full transition-all duration-300
                    ${isCompleted ? 'bg-gradient-to-r from-green-500 to-green-300' : 'bg-white/10'}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
