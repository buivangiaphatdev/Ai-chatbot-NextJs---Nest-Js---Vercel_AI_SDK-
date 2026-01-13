import { FormEvent, useState } from "react";

interface ChatInputProps {
    input: string;
    setInput: (value: string) => void;
    sendMessage: (message: string) => void;
    isLoading: boolean;
}

export function ChatInput({
    input,
    setInput,
    sendMessage,
    isLoading,
}: ChatInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div
                className={`flex items-center gap-3 px-4 py-3 rounded-full bg-gray-700 border backdrop-blur-sm transition-all ${isFocused
                    ? "border-blue-500 shadow-lg shadow-blue-500/20"
                    : "border-gray-600 hover:border-gray-500"
                    }`}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Hãy hỏi tôi bất cứ điều gì..."
                    disabled={isLoading}
                    className="flex-1 p-2 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base disabled:opacity-50 py-2 rounded-2xl"
                />

                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex-shrink-0 p-2 rounded-full bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    {isLoading ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                        </svg>
                    )}
                </button>
            </div>
        </form>
    );
}
