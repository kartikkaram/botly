import TabHeader from './TabHeader';
import BotInfo from './BotInfo';
import BotDetails from './BotDetails';

const Sidebar = ({ selectedBot, activeTab, setActiveTab }) => {
  return (
<div className="bg-gray-900/50 border border-gray-700/50 rounded-xl lg:col-span-1 h-full flex flex-col">
  <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
  
  {/* This part fills remaining space and only scrolls when needed */}
  <div className="p-4 space-y-4 flex-1 overflow-y-auto">
    {activeTab === 'chat' ? (
      <BotInfo selectedBot={selectedBot} />
    ) : (
      <BotDetails selectedBot={selectedBot} />
    )}
  </div>
</div>

  );
};

export default Sidebar;
