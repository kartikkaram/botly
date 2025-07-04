import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import sampleAnalytics from "../components/dashboard/sampleAnalytics";
import Header from "../components/dashboard/Header";
import BotInfo from "../components/dashboard/BotInfo";
import ApiKeyCard from "../components/dashboard/ApiKeyCard";
import AnalyticsSummary from "../components/dashboard/AnalyticsSummary";
import Charts from "../components/dashboard/Charts";
import ContextEditor from "../components/dashboard/ContextEditor";
import RevokeKeyModal from "../components/dashboard/RevokeKeyModel";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Botlycomponent from "../components/botlycomponentpreview/botlycomonent";

const BotlyDashboard = ({ bot, setSelectedBot, onContextUpdate }) => {
  const [isApiVisible, setIsApiVisible] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [editingContext, setEditingContext] = useState(bot.websitecontext || []);
  const [analytics,setAnalytics] = useState(sampleAnalytics);
   const { isSignedIn, isLoaded } = useUser();


  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const handleRevokeKey = () => {
    const nk = `sk-${Math.random().toString(36).slice(-16)}`;
    setNewApiKey(nk);
    setRevokeDialogOpen(true);
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  const saveContext = () => {
    onContextUpdate(editingContext);
  };

    const fetchAnalytics=async () => {
      try {
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/frontend-api/getRefinedDashboard`,
          {
            headers:{
              apikey: bot?.apikey
            }
          }
        );
        console.log(response);
        // setBots(response.data.data);
  
        setAnalytics(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
    if (bot) {
      console.log("Fetching analytics for bot:", bot.botname);
      fetchAnalytics();
    }
  }, [bot]);

  

  return (
   <div
  className="min-h-screen bg-gradient-to-br px-6 sm:px-12 py-10 space-y-10 lg:pl-20 pb-20"
  style={{
    backgroundImage: `linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))`,
    color: 'var(--text-primary)',
  }}
>
  <Header setSelectedBot={setSelectedBot} />

  {/* Bot Info + API Key */}
  <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <BotInfo bot={bot} />
    <ApiKeyCard
      apikey={bot.apikey}
      isVisible={isApiVisible}
      setIsVisible={setIsApiVisible}
      onRevoke={handleRevokeKey}
    />
  </section>

  {/* Analytics Summary */}
  {analytics && <AnalyticsSummary analytics={analytics} />}

  {/* Charts */}
  <Charts analytics={analytics} />

  {/* Context Editor */}
  <ContextEditor
    editingContext={editingContext}
    setEditingContext={setEditingContext}
    onSave={saveContext}
  />

  {/* API Key Revocation Modal */}
  <AnimatePresence>
    {revokeDialogOpen && (
      <RevokeKeyModal
        apiKey={newApiKey}
        onClose={() => setRevokeDialogOpen(false)}
        onCopy={copyToClipboard}
      />
    )}
  </AnimatePresence>
  <Botlycomponent />
</div>

  );
};

export default BotlyDashboard;
