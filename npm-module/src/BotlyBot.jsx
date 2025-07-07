import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiMessageCircle, FiX, FiZap } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';
import axios from 'axios';
import './botly.css';

export default function BotlyBot({
  apikey,
  primaryColor = '#1d4ed8',
  secondaryColor = '#f8fafc',
  title = 'Botly Assistant',
  initialMessage = 'Welcome! How can I help you today?',
  botAvatar = null 
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: initialMessage }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bot-api/botResponse`,
        { userMessage: input },
        { headers: { apikey } }
      );
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: response.data.data || 'Sorry, I didn’t understand that.'
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting bot server.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const renderFormattedText = (text) => {
    let formatted = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/(?:^|\n)[\*\-]\s(.+)/g, '<li>$1</li>');
    if (formatted.includes('<li>')) {
      formatted = `<ul className="list-disc pl-5 space-y-1">${formatted}</ul>`;
    }
    formatted = formatted.replace(/\n(?!<\/li>)/g, '<br />');
    return formatted;
  };

  return (
    <>
      {/* Chat Window Wrapper (Always Rendered, Animated) */}
      <div
        className={`fixed bottom-5 right-5 md:right-6 z-50 transition-all duration-500 ease-in-out transform ${
          open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="w-[90vw] sm:w-[360px] h-[520px] bg-white shadow-2xl rounded-xl border border-gray-200 flex flex-col overflow-hidden font-sans">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: primaryColor }}>
            <div className="flex items-center gap-2 text-white">
              {botAvatar ? (
                <img src={botAvatar} alt="Bot Avatar" className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <BsRobot size={20} />
              )}
              <h2 className="text-lg font-medium">{title}</h2>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:scale-110 transition">
              <FiX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 px-4 py-3 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300"
            style={{ backgroundColor: secondaryColor }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'user' ? (
                  <div
                    className="px-4 py-2 rounded-xl text-sm max-w-[80%] shadow-sm text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {msg.text}
                  </div>
                ) : (
                  <div
                    className="px-4 py-2 rounded-xl text-sm max-w-[80%] shadow-sm bg-gray-100 text-gray-800 border"
                    dangerouslySetInnerHTML={{ __html: renderFormattedText(msg.text) }}
                  />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-xl text-sm bg-gray-100 text-gray-800 border shadow-sm flex items-center gap-2">
                  <FiZap className="animate-spin" size={14} />
                  Bot is typing...
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t bg-white">
            <div className="flex items-center gap-2 px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border text-sm outline-none focus:ring-2"
                style={{ '--primary-color': primaryColor }}
              />
              <button
                onClick={handleSend}
                className="p-2 text-white rounded-full shadow-md hover:scale-105 transition"
                style={{ backgroundColor: primaryColor }}
              >
                <FiSend size={18} />
              </button>
            </div>
            <div className="text-center text-xs text-gray-400 pb-2">
              Powered by <span className="font-semibold text-gray-500">Botly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 md:right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:scale-110 transition z-50"
          style={{ backgroundColor: primaryColor }}
        >
          <FiMessageCircle size={24} />
        </button>
      )}
    </>
  );
}
