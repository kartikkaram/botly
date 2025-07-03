import { useParams } from "react-router-dom";
import DocsSidebar from "../components/docs/DocsSidebar";

// Import all MDX pages
import GettingStarted from "../docs/getting-started.mdx";
import IntegrationGuide from "../docs/integration-guide.mdx";
import ApiReference from "../docs/api-reference.mdx";
import { BsRobot } from "react-icons/bs";

// Map slugs to components
const docsMap = {
  'getting-started': GettingStarted,
  'integration-guide': IntegrationGuide,
  'api-reference': ApiReference,
};

export default function DocumentationPage() {
  const { slug } = useParams();
  const DocComponent = docsMap[slug] || GettingStarted;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0b0b] text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 h-full border-r border-gray-800 bg-gradient-to-b from-[#111111] to-[#0b0b0b] shadow-inner">
        <div className="sticky flex justify-center items-center top-0 z-10 bg-[#111111] border-b border-gray-800 px-6 py-4 text-lg font-semibold tracking-wide text-white">
          <BsRobot /> Botly Docs
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <DocsSidebar />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 h-full overflow-y-auto px-8 py-10">
        <div className="max-w-5xl mx-auto prose prose-invert prose-pre:bg-gray-900 prose-code:text-blue-400 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed">
          <DocComponent />
        </div>
      </main>
    </div>
  );
}
