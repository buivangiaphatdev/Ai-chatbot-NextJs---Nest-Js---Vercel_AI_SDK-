import { AVAILABLE_MODELS } from "../ai-models/ai-models";
import { useState, useRef, useEffect } from "react";

interface ModelSelectorProps {
    selectedModel: string | undefined;
    onModelChange: (modelId: string) => void;
}

export function ModelSelector({
    selectedModel,
    onModelChange,
}: ModelSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentModel = AVAILABLE_MODELS.find((m) => m.id === selectedModel);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full max-w-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-700 border border-gray-600 hover:border-gray-500 transition-all text-white font-medium focus:outline-none focus:border-blue-500"
            >
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                    </div>
                </div>

                <div className="flex-1 text-left">
                    <div className="text-xs font-semibold text-gray-400">AI Model</div>
                    <div className="text-sm font-medium text-white truncate">
                        {currentModel?.name || "Chọn Model"}
                    </div>
                </div>

                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-2xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                        {AVAILABLE_MODELS.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => {
                                    onModelChange(model.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-700 transition-all ${selectedModel === model.id
                                        ? "bg-blue-600/30 border-l-2 border-blue-600"
                                        : ""
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full ${selectedModel === model.id ? "bg-blue-500" : "bg-gray-500"}`} />
                                <div className="flex-1">
                                    <div className="font-medium text-white text-sm">{model.name}</div>
                                    {model.description && (
                                        <div className="text-xs text-gray-400">{model.description}</div>
                                    )}
                                </div>
                                {selectedModel === model.id && (
                                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
