import React, { useState } from "react";
import { toast } from "sonner";
import {
  Bot,
  Zap,
  MessageSquare,
  Globe,
  Users,
} from "lucide-react";

const DetailsSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Request submitted successfully!");
    setFormData({ fullName: "", email: "", company: "" });
  };

  return (
    <section id="details" className="w-full bg-white py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Card */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            <div
              className="relative h-48 sm:h-64 p-6 sm:p-8 flex items-end"
              style={{
                backgroundImage: "url('/background-section3.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                Supported LLMs & Features
              </h2>
            </div>

            <div className="bg-white p-4 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 sm:mb-8">
                Powered by cutting-edge AI technology
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {[
                  { Icon: Bot, label: "LLMs", value: "Gemini, Deepseek, Grok" },
                  { Icon: Zap, label: "Technology", value: "RAG (Retrieval-Augmented Generation)" },
                  { Icon: MessageSquare, label: "Setup Time", value: "Under 5 minutes" },
                  { Icon: Globe, label: "Integration", value: "NPM Package (botly-bot)" },
                  { Icon: Users, label: "Active Bots", value: "10,000+ chatbots deployed" }
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="p-3 rounded-lg bg-gray-50/90 backdrop-blur-sm border border-gray-200 text-sm text-gray-800">
                        <span className="font-medium">{label}:</span> {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card - Form */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            <div
              className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col items-start"
              style={{
                backgroundImage: "url('/background-section1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                Start Building
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-auto">
                Get Started Today
              </h2>
            </div>

            <div className="bg-white p-4 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {[
                  { name: "fullName", type: "text", placeholder: "Full name", required: true },
                  { name: "email", type: "email", placeholder: "Email address", required: true },
                  { name: "company", type: "text", placeholder: "Company (optional)", required: false }
                ].map(({ name, type, placeholder, required }) => (
                  <div key={name}>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required={required}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                ))}
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors duration-300"
                  >
                    Create Your Chatbot
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
