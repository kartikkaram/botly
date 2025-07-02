const BotInfo = ({ selectedBot }) => {
  return (
    <>
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Bot Name</h4>
        <p className="text-white">{selectedBot.botname}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Type</h4>
        <p className="text-white">{selectedBot.bottype}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
        <p className="text-gray-300 text-sm">{selectedBot.description}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Capabilities</h4>
        <div className="space-y-1">
          {selectedBot.capabilities.slice(0, 3).map((capability, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-sm text-gray-300">{capability}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BotInfo;
