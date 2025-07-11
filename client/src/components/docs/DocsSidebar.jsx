import { NavLink } from "react-router-dom";

const docs = [
  { slug: 'getting-started', title: 'Getting Started' },
  { slug: 'integration-guide', title: 'Integration Guide' },
  { slug: 'what-botly-do', title: 'What Botly Do' },
  { slug: 'sample-react-app', title: 'Sample React App' },
  { slug: 'sample-node-express-app', title: 'Sample Node Express App' },
];

export default function DocsSidebar() {
  return (
    <aside className="w-64 p-6 border-r border-gray-700 bg-[#111] min-h-screen text-sm text-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-white">📚 Botly Docs</h2>
      <nav className="space-y-2">
        {docs.map(doc => (
          <NavLink
            key={doc.slug}
            to={`/docs/${doc.slug}`}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${
                isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'
              }`
            }
          >
            {doc.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
