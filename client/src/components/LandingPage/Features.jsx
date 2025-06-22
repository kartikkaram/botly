
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";



const FeatureCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card glass-card opacity-0 p-4 sm:p-6",
        "lg:hover:bg-gradient-to-br lg:hover:from-white lg:hover:to-orange-50",
        "transition-all duration-300"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="rounded-full bg-orange-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-orange-500 mb-4 sm:mb-5">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-gray-50" id="features" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <div className="orange-chip mx-auto mb-3 sm:mb-4 opacity-0 fade-in-element">
            <span>Features</span>
          </div>
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element">
            Powerful AI, <br className="hidden sm:block" />Simple Integration
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            Built with cutting-edge technology to create intelligent chatbots that understand and engage your users.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-4-4"></path><path d="M12 8a4 4 0 1 0 4 4"></path><circle cx="12" cy="12" r="1"></circle></svg>}
            title="No-Code Solution"
            description="Create sophisticated chatbots without writing a single line of code. Our intuitive interface makes bot creation accessible to everyone."
            index={0}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 13v-1h6v1"></path><path d="M11 18.5l-.5-1 1-.5.5 1.5-1 .5-.5-1 1-.5"></path><path d="M9.5 12 9 11H4"></path></svg>}
            title="Multiple LLM Support"
            description="Choose from leading AI models including Gemini, Deepseek, and Grok to power your chatbot with the best AI technology available."
            index={1}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><rect width="18" height="11" x="3" y="11" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" x2="8" y1="16" y2="16"></line><line x1="16" x2="16" y1="16" y2="16"></line></svg>}
            title="RAG Integration"
            description="Leverage Retrieval-Augmented Generation to provide more accurate and contextual responses based on your specific data and knowledge base."
            index={2}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" x2="12" y1="22.08" y2="12"></line></svg>}
            title="Easy Integration"
            description="Install our botly-bot npm package and integrate your chatbot into any React application with just a few lines of code."
            index={3}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m14.5 9-5 5"></path><path d="m9.5 9 5 5"></path></svg>}
            title="Highly Customizable"
            description="Customize your chatbot's appearance, behavior, and responses to match your brand and meet your specific requirements."
            index={4}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M16 6H3v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2"></path><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path><line x1="12" x2="12" y1="11" y2="15"></line><line x1="10" x2="14" y1="13" y2="13"></line></svg>}
            title="Quick Setup"
            description="Get your chatbot up and running in minutes. From creation to deployment, Botly streamlines the entire process for maximum efficiency."
            index={5}
          />
        </div>
        
        {/* Creator credit */}
        <div className="text-center mt-16 opacity-0 fade-in-element">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md">
            <span className="text-gray-600 text-sm">Created by </span>
            <span className="text-orange-600 font-semibold ml-1">Jatin Parmar & Kartik Karambelkar</span>
            <span className="text-gray-400 text-xs ml-2">(Full Stack Developers)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
