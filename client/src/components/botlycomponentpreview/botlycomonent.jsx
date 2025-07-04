

import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
  } from "@codesandbox/sandpack-react";

import { useState } from 'react';
const files = {
  "/App.js": {
    code: `
import React from "react";
import BotlyBot from "botly-bots"
import "botly-bots/dist/botly-bot.css";

export default function App() {
  return (
    <BotlyBot 
      apiKey="demo-key"
      initialMessage="Hello! I'm CODExJATIN, your AI assistant. How can I help you today?"
      title="CODExJATIN Assistant"
    />
  );
}
`,
    active: true
  }
};

function Botlycomponent() {
    const [activeTab, setActiveTab]=useState('code')
  return (
    <div>
      <div className="bg-[#181818] w-full p-1 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-2 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab('code')}
            className={`text-sm cursor-pointer ${activeTab == 'code' && 'text-blue-500 bg-blue-950 bg-opacity-25 p-1 px-2  rounded-full'} `}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab('preview')}
            className={`text-sm cursor-pointer ${activeTab == 'preview' && 'text-blue-500  bg-blue-950 bg-opacity-25 p-1 px-2  rounded-full'} `}
          >
            Preview
          </h2>
        </div>
      </div>
 
<SandpackProvider
  template="react"
  customSetup={{
    dependencies: {
       "botly-bots": "latest",
      "react": "18.2.0",
      "react-dom": "18.2.0"
    }
  }}
  files={files}
>
    <SandpackLayout>
        {activeTab=='code'? 
        <>
 <SandpackFileExplorer style={{height:'79vh'}}/>
 <SandpackCodeEditor style={{height:'79vh'}}/>
        </>
        :
        <>
<SandpackPreview style={{height:'79vh'}} showNavigator={true}/>
            </>
            }
    </SandpackLayout>
  </SandpackProvider>
    </div>
  )
}

export default Botlycomponent
