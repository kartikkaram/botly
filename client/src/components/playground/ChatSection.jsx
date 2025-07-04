import axios from 'axios';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import QuickPrompts from './QuickPrompts';
import { useEffect, useState } from 'react';

const ChatSection = ({
  selectedBot,
  messages,
  setMessages,
  inputMessage,
  setInputMessage,
  isTyping,
  setIsTyping
}) => {
  const quickPrompts = [
    "Tell me about your capabilities",
    "How can you help me?",
    "What's your expertise?",
    "Show me an example"
  ];

  const [faqs,setFaqs] = useState(quickPrompts);
const fetchFAQs = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/frontend-api/getMFAQs`,
      {},
      {
        headers: {
          apikey: selectedBot.apikey,
        },
      }
    );

    // Extracting just the 'representative' strings into an array
    const faqStrings = response.data.data.map(item => item.representative);

    console.log("FAQs:",faqStrings); 

    setFaqs(faqStrings);

  } catch (error) {
    console.log(error);
  }
};


  useEffect(()=>{

    fetchFAQs();

  },[selectedBot])





  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hello! I'm ${selectedBot.botname}. How can I assist you today?`,
        timestamp: new Date()
      }
    ]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
    //   console.log("API:",selectedBot);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/bot-api/botResponse`,
        { userMessage: inputMessage },
        { headers: { apikey: selectedBot.apikey } }
      );

    //   console.log('Bot response:', response.data);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.data || 'Sorry, I didn’t understand that.',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Error contacting the bot server.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
<div className="flex flex-col bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden lg:col-span-2 min-h-[calc(100vh-180px)]">
  <ChatHeader bot={selectedBot} clearChat={clearChat} />

  <div className="flex-1 flex flex-col overflow-hidden">
    {/* Scrollable message list only */}
    <div className="flex-1 overflow-y-auto px-4 py-2">
      <MessageList messages={messages} isTyping={isTyping} />
    </div>

    {/* Quick prompts directly above input field */}
    {messages.length === 1 && (
      <div className="px-4 py-2 border-t border-gray-700 bg-gray-800/50">
        <QuickPrompts prompts={faqs} setInputMessage={setInputMessage} />
      </div>
    )}

    {/* Input field */}
    <div className="p-3 border-t border-gray-700 bg-gray-900">
      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        isTyping={isTyping}
        handleSendMessage={handleSendMessage}
      />
    </div>
  </div>
</div>


  );
};

export default ChatSection;
