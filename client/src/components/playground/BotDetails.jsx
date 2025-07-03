const BotDetails = ({ selectedBot }) => {
  return (
    <div className="h-full overflow-y-auto pr-2 space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Bot Configuration</h4>
        <div className="bg-black border border-gray-700/50 rounded-lg p-3">
          <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
            {selectedBot.prompt}
          </pre>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Model</h4>
        <p className="text-white">{selectedBot.model}</p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Language</h4>
        <p className="text-white">{selectedBot.language}</p>
      </div>
    </div>
  );
};

export default BotDetails;
