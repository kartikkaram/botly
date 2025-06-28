// import { useState } from 'react'
// import './App.css'

// import BotlyBot from 'botly-bot';

// import 'botly-bot/dist/botly-bot.css';

// import Index from './pages/LandingPage';
// import Sidebar from './components/dashboard/ui/Sidebar';
// import CreateBot from './components/dashboard/CreateBot';
import BotCreationForm from './components/formComponents/BotCreationForm';
// import BotlyDashboard from './pages/Dashboard';
export const sampleBot = {
  _id: "6645f08a8e431221c8917e1f",
  ownerid: "6645effc8e431221c8917e1d",
  apikey: "sk-5aK8nFUzRYLQxZJ3E7yQqz1p38qHrsldGfTg",
  botname: "Support Genie",
  bottype: "Customer Support",
  model: "gpt-4",
  language: "English",
  description:
    "An AI assistant to handle customer queries, order tracking, and returns with a friendly and professional tone.",
  targetaudience: "Online shoppers, e-commerce users",
  responsestyle: "Professional, Friendly",
  capabilities: [
    "Answer FAQs",
    "Track Orders",
    "Handle Complaints",
    "Provide Refund Info",
  ],
  restrictedtopics: [
    "Politics",
    "Religion",
    "Sensitive Personal Information",
  ],
  websitecontext: [
    {
      input: "How to return a product?",
      output: "Go to your orders, select the item, and click 'Return Item'.",
      embedding: [[0.23, 0.87, 0.91]],
    },
    {
      input: "Where is my order?",
      output:
        "You can track your order using the tracking ID on the 'My Orders' page.",
      embedding: [[0.52, 0.65, 0.19]],
    },
  ],
  websiteurl: "https://example-ecommerce.com",
  prompt:
    "You are a professional yet friendly assistant helping users with their online orders, returns, and FAQs. Stay concise and helpful.",
  createdAt: "2025-06-20T12:00:00.000Z",
  updatedAt: "2025-06-27T10:45:00.000Z",
};


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//         {/* <header>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//       <BotlyBot 
//         apikey={import.meta.env.VITE_BOT_API_KEY}
//         initialMessage='Hello! Im CODExJATIN, your AI assistant. How can I help you today?'
//         title="CODExJATIN Assistant"
//       />
//     </header> */}
//     {/* <Index/> */}

//     <Sidebar/>
//     {/* <BotCreationForm/> */}
//     <BotlyDashboard bot={sampleBot} />

//     </>
//   )
// }

// export default App


import { useState } from "react";
import "./App.css";
import BotlyDashboard from "./pages/Dashboard";
import Sidebar from "./components/dashboard/ui/Sidebar";
import AllBotsPage from "./pages/AllBotsPage";
import { useEffect } from 'react';
import axios from 'axios'


// Mock multiple bots for now
const sampleBots = [
  sampleBot,
  {
    ...sampleBot,
    _id: "bot2",
    botname: "FAQ Helper",
    apikey: "sk-2ndBotKeyExample",
    bottype: "Support",
    websiteurl: "https://another-site.com",
  },
  {
    ...sampleBot,
    _id: "bot3",
    botname: "Sales Assistant",
    apikey: "sk-salesKey123",
    bottype: "Sales",
    websiteurl: "https://sales-helper.com",
  },
];



function App() {
  const [selectedBot, setSelectedBot] = useState(null); // <-- Active bot
  const [bots,setBots] = useState(null);

  const fetchData=async () => {
    try {
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/frontend-api/getBot`);
      console.log(response);
      setBots(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
fetchData()
  },[])

  return (
    <>
      <Sidebar />
      {!selectedBot? (
        <AllBotsPage bots={bots} onBotSelect={setSelectedBot} />
      ) : (
        <BotlyDashboard bot={selectedBot} />
      )}
      {/* <BotCreationForm /> */}
    </>
  );
}

export default App;

