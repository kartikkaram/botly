import { ChevronDown } from 'lucide-react';

const BotSelector = ({ Bots, selectedBotId, handleBotSelect }) => (
  <div className="px-4 py-4">
    <div className="relative max-w-xs">
      <select
        value={selectedBotId}
        onChange={(e) => handleBotSelect(e.target.value)}
        className="appearance-none bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
      >
        <option value="">Select API Key</option>
        {Bots.map((bot) => (
          <option key={bot._id} value={bot._id}>
            {bot.botname} ({bot.apikey?.substring(0, 8)}...)
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  </div>
);

export default BotSelector;
