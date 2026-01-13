import { WeatherCard } from "./WeatherCard";

interface ChatMessagePart {
    type: string;
    text?: string;
    state?: string;
    output?: any;
}

interface ChatMessageInterface {
    id: string;
    role: "user" | "assistant";
    parts: ChatMessagePart[];
}

interface ChatMessageProps {
    message: ChatMessageInterface;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                </div>
            )}

            <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl gap-2`}>
                <div
                    className={`px-4 py-3 rounded-2xl backdrop-blur-sm transition-all ${isUser
                        ? "bg-blue-600 text-white rounded-br-none shadow-lg hover:shadow-xl"
                        : "bg-gray-700 text-gray-100 border border-gray-600 rounded-bl-none hover:bg-gray-600"
                        }`}
                >
                    <div className="space-y-3">
                        {message.parts.map((part, index) => {
                            if (part.type === "text") {
                                return (
                                    <div key={index} className="whitespace-pre-wrap text-sm leading-relaxed">
                                        {part.text}
                                    </div>
                                );
                            }
                            if (
                                part.type === "tool-getWeather" &&
                                part.state === "output-available"
                            ) {
                                return (
                                    <WeatherCard
                                        key={index}
                                        output={part.output as any}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>

                <span className={`text-xs ${isUser ? "text-gray-500" : "text-gray-600"}`}>
                    {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>

            {isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );
}
