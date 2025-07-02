import { useEffect, useRef } from 'react';
import { Bot, Copy, User } from 'lucide-react';

const MessageList = ({ messages, isTyping }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null); // 🔥 invisible bottom marker

useEffect(() => {
  if (scrollRef.current) {
    // Use requestAnimationFrame to delay until layout stabilizes
    requestAnimationFrame(() => {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}, [messages, isTyping]);


  const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div
      className="flex-1 overflow-y-auto min-h-0 px-4 py-2 space-y-4"
      ref={containerRef}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
        >
          {message.role === 'assistant' && (
            <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-lg self-end">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
          )}
          <div className={`max-w-xs sm:max-w-md ${message.role === 'user' ? 'order-1' : ''}`}>
            <div
              className={`relative p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-100 border border-gray-700/50'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <button
                onClick={() => copyMessage(message.content)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/20 rounded"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1 px-1">{formatTime(message.timestamp)}</div>
          </div>
          {message.role === 'user' && (
            <div className="bg-gray-700/50 border border-gray-600/50 p-2 rounded-lg self-end order-2">
              <User className="w-4 h-4 text-gray-300" />
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-3 justify-start">
          <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-lg self-end">
            <Bot className="w-4 h-4 text-blue-400" />
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">AI is thinking...</span>
            </div>
          </div>
        </div>
      )}

{/* 🔥 Invisible bottom marker for scrolling */}
<div ref={scrollRef} className="h-0 w-0" />

    </div>
  );
};

export default MessageList;
