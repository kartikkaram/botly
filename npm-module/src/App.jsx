import BotlyBot from "./BotlyBot"


function App() {
  return (
    <>

      <BotlyBot
        apikey={import.meta.env.VITE_BOTLY_API_KEY}
        primaryColor="#1d4ed8"
        secondaryColor="#f8fafc"
        title="Botly Assistant"
        initialMessage="Welcome! How can I help you today?"
        botAvatar={null}
      />

    </>
  );
}

export default App;
