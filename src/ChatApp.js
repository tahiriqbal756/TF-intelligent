import React, { useState } from "react";
import { fetchGeminiResponse } from "./api";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, type: "user" }]);
    const userMessage = input;
    setInput("");

    const botReply = await fetchGeminiResponse(userMessage);
    setMessages((prevMessages) => [...prevMessages, { text: botReply, type: "bot" }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-t-lg p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Assistant</h1>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-md flex flex-col p-4 h-[400px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded-lg ${msg.type === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-b-lg p-4 flex">
        <input
          className="flex-1 p-2 border rounded-lg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
