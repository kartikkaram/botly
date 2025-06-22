
import React from "react";

const SpecsSection = () => {
  return (
    <section className="w-full py-6 sm:py-10 bg-white" id="specifications">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header with badge and line */}
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="flex items-center gap-4">
            <div className="orange-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white mr-2">3</span>
              <span>Integration</span>
            </div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        {/* Code example section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6 text-center">
            Simple Integration with Our NPM Package
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Install <code className="bg-gray-100 px-2 py-1 rounded text-orange-600 font-mono">botly-bot</code> and embed your chatbot in minutes
          </p>
          
          {/* Code snippet */}
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-4 py-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm">App.jsx</span>
            </div>
            <pre className="p-6 text-sm text-white overflow-x-auto">
              <code>{`import './App.css'
`}<span className="bg-yellow-500/20 text-yellow-300">{`import BotlyBot from 'botly-bot';
import 'botly-bot/dist/botly-bot.css';`}</span>{`

function App() {

  return (
    <>
        `}<span className="bg-yellow-500/20 text-yellow-300">{`<BotlyBot 
          apikey={import.meta.env.VITE_BOT_API_KEY}
          initialMessage="Hello! I'm CODExJATIN, your AI assistant. How can I help you today?"
          title="CODExJATIN Assistant"
        />`}</span>{`
    </>
  )
}

export default App`}</code>
            </pre>
          </div>
        </div>
        
        {/* Main content with text mask image - responsive text sizing */}
        <div className="max-w-5xl pl-4 sm:pl-8">
          <h2 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display leading-tight mb-8 sm:mb-12">
            <span className="block bg-clip-text text-transparent bg-[url('/text-mask-image.jpg')] bg-cover bg-center">
              Botly empowers developers and businesses to create intelligent chatbots without any coding. With support for multiple LLMs like Gemini, Deepseek, and Grok, plus advanced RAG capabilities, your chatbot delivers better responses and seamless user experiences.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
