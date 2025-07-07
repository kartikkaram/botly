
---

# Botly API – Official Node.js SDK

This package provides a **minimal and lightweight interface** to interact with the [Botly AI Chatbot](https://botly-bot.vercel.app) API from your Node.js backend.

Supports secure server-side usage with built-in error handling and minimal dependencies.

## Features

* 🌐 Simple API to send user messages
* 🔐 API key-based authentication
* ⚙️ Uses `axios` under the hood
* 💬 Optimized for server-side environments

---

## Installation

```bash
npm install botlyapi
```

---

## Usage

```js
const { Botly } = require('botlyapi');

Botly("What's the weather today?", "YOUR_BOTLY_API_KEY")
  .then(response => {
    console.log("Botly replied:", response);
  })
  .catch(error => {
    console.error("Error calling Botly:", error.message);
  });
```

> You must replace `"YOUR_BOTLY_API_KEY"` with a valid Botly API key.

---

## Response Format

The `Botly` function returns a Promise that resolves to the chatbot's reply as a string:

```js
"Today looks sunny with a high of 28°C!"
```

In case of an error (e.g., invalid key, network failure), the Promise will reject with a descriptive error message.

---

## API Reference

### `Botly(userInput, apiKey)`

| Param       | Type     | Required | Description                         |
| ----------- | -------- | -------- | ----------------------------------- |
| `userInput` | `string` | Yes    | Message you want to send to the bot |
| `apiKey`    | `string` | Yes    | Your Botly API key                  |

---

## Notes

* This SDK is intended for **server-side (Node.js) usage only**.
* The actual endpoint is securely defined inside the package and cannot be overridden externally.
* No environment variables or frontend exposure needed.

---

