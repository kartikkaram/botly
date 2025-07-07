# 🧠 BotlyBot

**BotlyBot** is a lightweight, fully customizable, plug-and-play chatbot UI component for React applications — powered by [Botly](https://botly.codexjatin.me), your platform to build, host, and manage AI chatbots using Gemini, DeepSeek, and Mistral models.

Easily integrate your AI bot into any frontend with just a few lines of code.

---

## 🚀 Features

- 🎨 Modern, responsive UI
- 🔐 Auth-free embedding via API Key
- 🤖 Supports multiple LLMs (Gemini, DeepSeek, Mistral)
- 💬 Persistent chat history
- 🔌 Easy setup with `.env` API key
- ⚡ Fast and developer-friendly

---

## 📦 Installation

```bash

npm install botly-bot

````

---

## 🛠️ Usage

```jsx
import React from 'react';
import { BotlyBot } from 'botly-bot';

function App() {
  return (
    <div className="App">
      <BotlyBot
        apikey={import.meta.env.VITE_BOT_API_KEY},
        primaryColor = '#1d4ed8',
        secondaryColor = '#f8fafc',
        title = 'Botly Assistant',
        initialMessage = 'Welcome! How can I help you today?',
        botAvatar = "your-bot-avatar-url-here"
       />
    </div>
  );
}

export default App;
```

---

## ⚙️ Configuration

You need to provide your Botly chatbot API key via environment variables.

Add the following to your `.env` file:

```
 VITE_BOT_API_KEY=your_unique_botly_key
```

> 🔑 You can generate your chatbot and get the key from the Botly Dashboard

---

## 📁 Example `.env`

```
VITE_BOT_API_KEY=botly_xxxxxxxx
```

> Make sure to **restart your development server** after modifying `.env`.

---

## 🔐 Security Note

This package uses a **read-only public API key** — no admin-level or sensitive operations are exposed via the frontend.

---

## 📤 Feedback or Issues?

* 💬 [Submit an issue](https://github.com/CODExJATIN/botly-backend-workingrepo/issues)
* 📧 Email us: [hello@codexjatin.me](mailto:hello@codexjatin.me)

---

## 🤝 Contributing

We welcome contributions!
Feel free to fork this repo, improve components, and open a pull request.

---

## 📄 License

MIT License © [Botly](https://botly.codexjatin.me)
```
