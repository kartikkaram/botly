import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/playground/Header';
import BotSelector from '../components/playground/BotSelector';
import ChatSection from '../components/playground/ChatSection';
import Sidebar from '../components/playground/Sidebar';
import { Bot } from 'lucide-react';

function PlaygroundPage({ Bots }) {
  const [selectedBotId, setSelectedBotId] = useState('');
  const [selectedBot, setSelectedBot] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (Bots) {
      setLoading(false);
      return; // exit early if Bots is available
    }

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId); // cleanup on Bots change
  }, [Bots]);

  
  if(!Bots || Bots.length==0){
    return(
      <>
      <h1 className='flex h-screen w-screen justify-center items-center bg-black text-4xl text-white '>please create a bot first</h1>
      </>
    )
  }


  const handleBotSelect = (botId) => {
    setSelectedBotId(botId);
    const bot = Bots.find(b => b._id === botId);
    if (bot) {
      setSelectedBot(bot);
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `Hello! I'm ${bot.botname}. How can I assist you today?`,
        timestamp: new Date()
      }]);
    }
    else {
      setSelectedBot("");
    }
  };

    if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-300">Loading...</p>
        </div>
        </div>
    );
    }

    if(!Bots) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Bots Available</h2>
          <p className="text-gray-400">Please create a bot to start using the playground.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white lg:pl-20 pb-20">
      <Header />
      <BotSelector Bots={Bots} selectedBotId={selectedBotId} handleBotSelect={handleBotSelect} />

      {selectedBot ? (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat section & Sidebar with independent scrolls */}
          <div className="lg:col-span-2 flex flex-col h-[calc(100vh-200px)]">
            <ChatSection
              selectedBot={selectedBot}
              messages={messages}
              setMessages={setMessages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
            />
          </div>

          <div className="lg:col-span-1 h-[calc(100vh-200px)] overflow-y-auto">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedBot={selectedBot}
            />
          </div>
        </div>
      ) : (
        // Show when no bot is selected
        <div className="relative h-[calc(100vh-180px)] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl blur-xl" />
          <div className="relative z-10 text-center px-6">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center border border-gray-600">
              <Bot className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-300 mb-2">Select an API Key to Start</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Choose an API key from the dropdown above to load your bot configuration and start testing the chat functionality.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaygroundPage;