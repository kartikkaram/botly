
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


function App() {
  const [selectedBot, setSelectedBot] = useState(null); // <-- Active bot
  const [bots,setBots] = useState(null);


  const fetchData=async () => {
    try {
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/frontend-api/getBot`);
      console.log("response",response);
      setBots(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
      fetchData()
  },[])

  

  const handleBotSelection = (bot)=>{
    console.log("bot: ",bot)
    setSelectedBot(bot);
  }



  return (
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
    </Routes>
  );
}

export default App;

