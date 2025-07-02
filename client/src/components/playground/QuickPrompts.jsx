import { Zap } from 'lucide-react';

const QuickPrompts = ({ prompts, setInputMessage }) => (
  <div className="px-4 py-3 border-t border-gray-700/50 bg-gray-900/30">
    <div className="flex items-center gap-2 mb-2">
      <Zap className="w-4 h-4 text-blue-400" />
      <span className="text-sm font-medium text-gray-300">Most Frequently Asked Questions:</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt, i) => (
        <button
          key={i}
          onClick={() => setInputMessage(prompt)}
          className="text-sm bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-3 py-1 rounded-lg border border-gray-700/30"
        >
          {prompt}
        </button>
      ))}
    </div>
  </div>
);

export default QuickPrompts;
