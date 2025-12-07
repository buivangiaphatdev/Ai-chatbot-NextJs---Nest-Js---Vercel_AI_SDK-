"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo,useRef, useState } from "react";
import { WeatherCard } from "./components/WeatherCard";
import { AVAILABLE_MODELS, DEFAULT_MODEL_ID } from "./ai-models/ai-models";


export default function Home() {

  const [selectedModel, setSelectedModel] = useState<string | undefined>(DEFAULT_MODEL_ID);

  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      body: () => ({ model: selectedModelRef.current }),
    }),
  });

  const [input, setInput] = useState("");

  // Tìm tên model hiện tại để hiển thị (nếu cần dùng cho UI)
  const currentModelName = useMemo(() =>
    AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name || selectedModel,
    [selectedModel]);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-400 mb-2"
          htmlFor="model-select"
        >
          Select AI Model
        </label>

        {/* 3. Thay thế thẻ <input> bằng thẻ <select> */}
        <div className="relative">
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {AVAILABLE_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          {/* Mũi tên chỉ xuống để giao diện đẹp hơn (optional) */}
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            Start a conversation with <b>{AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name}</b>
          </div>
        )}

        {/* Phần hiển thị tin nhắn giữ nguyên */}
        {messages.map((message) => (
          <div
            key={message.id}
            id={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-100"
                }`}
            >
              <div className="text-xs font-semibold mb-1 opacity-70">
                {message.role === "user" ? "You" : "Assistant"}
              </div>
              <div className="space-y-3">
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div key={index} className="whitespace-pre-wrap">
                        {part.text}
                      </div>
                    );
                  }
                  if (
                    part.type === "tool-getWeather" &&
                    part.state === "output-available"
                  ) {
                    return (
                      <WeatherCard key={index} data={part.output as any} />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Loading state giữ nguyên */}
        {status !== "ready" && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form nhập liệu giữ nguyên */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={status !== "ready" || !input.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}