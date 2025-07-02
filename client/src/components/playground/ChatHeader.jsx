import { MessageSquare, RotateCcw } from 'lucide-react';

const ChatHeader = ({ bot, clearChat }) => (
  <div className="bg-gray-800/50 border-b border-gray-700/50 p-4 flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <MessageSquare className="w-5 h-5 text-blue-400" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{bot.botname}</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="text-sm text-gray-300">Online</span>
        </div>
      </div>
    </div>
    <button
      onClick={clearChat}
      className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-all text-sm"
    >
      <RotateCcw className="w-4 h-4" />
      Reset
    </button>
  </div>
);

export default ChatHeader;
