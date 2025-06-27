import { useState } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import BotlyBot from 'botly-bot';

import 'botly-bot/dist/botly-bot.css';

import Index from './pages/LandingPage';
import Sidebar from './components/dashboard/ui/Sidebar';
import CreateBot from './components/dashboard/CreateBot';
import BotCreationForm from './components/formComponents/BotCreationForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        {/* <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <BotlyBot 
        apikey={import.meta.env.VITE_BOT_API_KEY}
        initialMessage='Hello! Im CODExJATIN, your AI assistant. How can I help you today?'
        title="CODExJATIN Assistant"
      />
    </header> */}
    {/* <Index/> */}

    <Sidebar/>
    <BotCreationForm/>
    </>
  )
}

export default App
