
import Index from './pages/LandingPage';
import BotCreationForm from './components/formComponents/BotCreationForm';
import { useState } from "react";
import "./App.css";
import BotlyDashboard from "./pages/Dashboard";
import Sidebar from "./components/dashboard/ui/Sidebar";
import AllBotsPage from "./pages/AllBotsPage";
import { useEffect } from 'react';
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import PlaygroundPage from './pages/Playground';
import DocumentationPage from './pages/DocsPage';
// import BotlyBot from 'botly-bot';
// import {Botly} from 'botlyapi';


function App() {
  const [selectedBot, setSelectedBot] = useState(null); // <-- Active bot
  const [bots,setBots] = useState(null);
const { getToken, isLoaded, isSignedIn } = useAuth();
const { user } = useUser();

// useEffect(() => {
//   Botly("USER INPUT", "YOUR_BOTLY_API_KEY")
//     .then(response => {
//       console.log("Botly response:", response);
//     })
//     .catch(error => {
//       console.error("Error calling Botly:", error);
//     });
// }, []);

// CONSOLE LOG LOGGED IN USER'S CLERKID
// useEffect(() => {
//   if (isLoaded && isSignedIn) {
//     console.log("Logged in user's Clerk ID:", user.id);
//   }
// }, [isLoaded, isSignedIn]);
  const fetchData=async () => {
    try {
      const token=await getToken()
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/frontend-api/getBot`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
      setBots(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }


useEffect(() => {
  if (isLoaded && isSignedIn) {
    fetchData();
  }
}, [isLoaded, isSignedIn]);

  

  const handleBotSelection = (bot)=>{
    console.log("bot: ",bot)
    setSelectedBot(bot);
  }



  return (
    <>
    <Routes>
      {/* No Sidebar */}
      <Route path="/" element={<Index />} />

      {/* With Sidebar for internal routes */}
      <Route
        path="/bots"
        element={
          <>
            <Sidebar />
            {!selectedBot ? (
              <AllBotsPage bots={bots} onBotSelect={handleBotSelection} />
            ) : (
              <BotlyDashboard bot={selectedBot} setSelectedBot={setSelectedBot} />
            )}
          </>
        }
      />
      <Route
        path="/create-bot"
        element={
          <>
            <Sidebar />
            <BotCreationForm />
          </>
        }
      />
      <Route
        path="/playground"
        element={
          <>
            <Sidebar/>
            <PlaygroundPage Bots={bots}/>
          </>
        }
      />
      <Route
        path="/docs/:slug"
        element={
          <>
            <DocumentationPage/>
          </>
        }
      />
    </Routes>
    </>
  );
}

export default App;

