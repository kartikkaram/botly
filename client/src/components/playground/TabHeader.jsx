import { MessageSquare, Settings } from 'lucide-react';

const TabHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-700/50">
      <button
        onClick={() => setActiveTab('chat')}
        className={`flex-1 px-4 py-3 rounded-tl-xl rounded-tr-xl text-sm font-medium transition-colors ${
          activeTab === 'chat'
            ? 'bg-blue-500 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
        }`}
      >
        <MessageSquare className="w-4 h-4 inline mr-2" />
        Chat Info
      </button>
      <button
        onClick={() => setActiveTab('details')}
        className={`flex-1 px-4 py-3 rounded-tl-xl rounded-tr-xl text-sm font-medium transition-colors ${
          activeTab === 'details'
            ? 'bg-blue-500 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
        }`}
      >
        <Settings className="w-4 h-4 inline mr-2" />
        Details
      </button>
    </div>
  );
};

export default TabHeader;
