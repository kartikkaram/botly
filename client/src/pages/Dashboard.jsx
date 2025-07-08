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
import FaqCard from "../components/playground/FaqCard";

const BotlyDashboard = ({ bot, setSelectedBot, onContextUpdate }) => {
  const [isApiVisible, setIsApiVisible] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState(bot.apikey || "");
  const [editingContext, setEditingContext] = useState(bot.websitecontext || []);
  const [faqs, setFAQs] = useState([]);
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

  const handleRevokeKey = async () => {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/frontend-api/revoke`, {
        oldApiKey: currentApiKey
    })
    .then((res) => {
      console.log("API Key revoked successfully:", res.data);
      setCurrentApiKey(res.data.data);
      setRevokeDialogOpen(true);
    }).catch((error) => {
      console.error("Error revoking API Key:", error);
    });
  };

  const getMFAQS = async () => {
    try {
      console.log(bot.apikey, `${import.meta.env.VITE_BASE_URL}` )
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/frontend-api/getMFAQs`,{} ,{
        headers: {  
          apikey: bot?.apikey
        }
      });
      console.log("Fetched FAQs:", response.data);   
      setFAQs(response.data.data);   
    } catch (error) {
      console.error("Error fetching FAQs:", error); 
    } 
  };

  useEffect(() => {
    if (bot) {  
      console.log("Fetching FAQs for bot:", bot.botname);
      getMFAQS();
    }
  }, [bot]);
    


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
      apikey={currentApiKey}
      isVisible={isApiVisible}
      setIsVisible={setIsApiVisible}
      onRevoke={handleRevokeKey}
    />
  </section>

  {/* Analytics Summary */}
  {analytics && <AnalyticsSummary analytics={analytics} />}

  {/* Charts */}
  <Charts analytics={analytics} />

  {/* FAQs Section */}
  <FaqCard data={faqs} />

  {/* Context Editor */}
  <ContextEditor
    editingContext={editingContext}
    setEditingContext={setEditingContext}
    onSave={saveContext}
    apikey={bot.apikey}
  />

  {/* API Key Revocation Modal */}
  <AnimatePresence>
    {revokeDialogOpen && (
      <RevokeKeyModal
        apiKey={currentApiKey}
        onClose={() => setRevokeDialogOpen(false)}
        onCopy={copyToClipboard}
      />
    )}
  </AnimatePresence>
</div>

  );
};

export default BotlyDashboard;
