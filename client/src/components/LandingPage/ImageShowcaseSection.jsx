import React from "react";

const ImageShowcaseSection = () => {
  return (
    <section className="w-full pt-0 pb-10 sm:pb-14 bg-white" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold font-display tracking-tight text-gray-900 mb-3">
            Build AI Chatbots That Speak Your Brand
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            With Botly, instantly create, customize, and deploy powerful AI chatbots to your website —
            powered by Gemini, Grok, DeepSeek, and your own data.
          </p>
        </div>

        {/* Image Showcase Card */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-200 mx-auto max-w-4xl bg-white">
          <div className="w-full">
            <img 
              src="https://plus.unsplash.com/premium_photo-1726726348510-84f8ba300e1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Chatbot AI Interface Modern Design" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold font-display text-gray-900 mb-3">
              Intelligent, Personal, Effortless
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Whether it’s for support, sales, or storytelling — Botly lets you define your bot’s personality, 
              plug in your own data, and launch in minutes. No complex setup. Just smarter conversations, delivered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
