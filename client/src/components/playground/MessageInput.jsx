import { Send } from 'lucide-react';

const MessageInput = ({ inputMessage, setInputMessage, isTyping, handleSendMessage }) => (
  <form onSubmit={handleSendMessage} className="border-t border-gray-700/50 p-4 flex gap-3">
    <input
      type="text"
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
      placeholder="Type your message..."
      className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
      disabled={isTyping}
    />
    <button
      type="submit"
      disabled={!inputMessage.trim() || isTyping}
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-lg transition-all disabled:opacity-50"
    >
      <Send className="w-5 h-5" />
    </button>
  </form>
);

export default MessageInput;
