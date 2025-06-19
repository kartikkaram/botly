import { useState } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import BotlyBot from 'botly-bot';
import 'botly-bot/dist/botly-bot.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <header>
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
    </header>
    </>
  )
}

export default App
