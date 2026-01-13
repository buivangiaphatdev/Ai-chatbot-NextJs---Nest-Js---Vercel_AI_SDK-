"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useState, useMemo } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { ModelSelector } from "./components/ModelSelector";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { AVAILABLE_MODELS, DEFAULT_MODEL_ID } from "./ai-models/ai-models";

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    DEFAULT_MODEL_ID
  );

  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      body: () => ({ model: selectedModelRef.current }),
    }),
  });

  const [input, setInput] = useState("");

  const currentModelName = useMemo(
    () => AVAILABLE_MODELS.find((m) => m.id === selectedModel)?.name || selectedModel,
    [selectedModel]
  );

  const isLoading = status !== "ready";

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">ChatBot AI</h1>
              <p className="text-xs text-gray-500">Hỗ trợ bởi công nghệ AI hiện đại</p>
            </div>
          </div>

          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
            {messages.length === 0 ? (
              <WelcomeScreen modelName={currentModelName} />
            ) : (
              <>
                {messages
                  .filter((message) => message.role !== "system")
                  .filter((message): message is typeof message & { role: "user" | "assistant" } => message.role !== "system")
                  .map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}

                {isLoading && (
                  <div className="flex justify-start gap-3 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <ChatInput
              input={input}
              setInput={setInput}
              sendMessage={(message) => {
                sendMessage({ text: message });
              }}
              isLoading={isLoading}
            />

            <p className="text-center text-xs text-gray-600 mt-3">
              Powered by AI • Tin nhắn có thể bị sai • Hãy xác minh thông tin quan trọng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}