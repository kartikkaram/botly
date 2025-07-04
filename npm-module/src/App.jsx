import BotlyBot from "./BotlyBot"


function App() {

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Botly Assistant</h1>
      </div>
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
                onClick={() => document.querySelector('botly-bot').toggle()}>
          Open Botly Assistant  
        </button>
      </div>
    <BotlyBot/>
    </>
  )
}

export default App
