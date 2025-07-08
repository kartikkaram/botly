import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import DocsSidebar from "../components/docs/DocsSidebar";
import { BsRobot } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";

// Import MDX pages
import GettingStarted from "../docs/getting-started.mdx";
import IntegrationGuide from "../docs/integration-guide.mdx";
import ApiReference from "../docs/api-reference.mdx";
import WhatBotlyDo from "../docs/what-botly-do.mdx";
import SampleReactApp from "../docs/sample-react-app.mdx";
import SampleNodeExpressApp from "../docs/sample-node-express-app.mdx";

const docsMap = {
  "getting-started": GettingStarted,
  "integration-guide": IntegrationGuide,
  "api-reference": ApiReference,
  "what-botly-do": WhatBotlyDo,
  "sample-react-app": SampleReactApp,
  "sample-node-express-app": SampleNodeExpressApp,
};

export default function DocumentationPage() {
  const { slug } = useParams();
  const DocComponent = docsMap[slug] || GettingStarted;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#0b0b0b] text-gray-100 font-sans">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-gray-800">
        <div className="flex items-center space-x-2 text-lg font-semibold text-white">
          <BsRobot />
          <span>Botly Docs</span>
        </div>
        <button onClick={() => setSidebarOpen(true)}>
          <HiMenu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-30 top-0 left-0 h-full w-64 bg-gradient-to-b from-[#111111] to-[#0b0b0b] 
          border-r border-gray-800 shadow-inner transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Sidebar header */}
        <div className="sticky flex justify-center flex-wrap items-center top-0 z-10 bg-[#111111] border-b border-gray-800 px-6 py-4 text-lg font-semibold tracking-wide text-white">
          <BsRobot className="mr-2" /> Botly Docs
          <button
            onClick={() => navigate("/bots")}
            className="mb-6 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>


        {/* Sidebar content */}
        <div className="h-[calc(100%-4rem)] px-4 py-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <DocsSidebar />
        </div>
      </aside>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}




      {/* Main content */}
      <main className="flex-1 h-full overflow-y-auto px-4 md:px-8 py-6 md:py-10">
        <div className="max-w-5xl mx-auto prose prose-invert prose-pre:bg-gray-900 prose-code:text-blue-400 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed">
          <DocComponent />
        </div>
      </main>
    </div>
  );
}
