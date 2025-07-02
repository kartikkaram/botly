import { Bot } from 'lucide-react';

const Header = () => (
  <div className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-xl py-6 px-4 sm:px-6 lg:px-8">
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
        <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <Bot className="w-6 h-6 text-white" />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-white">Botly Playground</h1>
        <p className="text-sm text-gray-400">Test and interact with your AI assistants</p>
      </div>
    </div>
  </div>
);

export default Header;
