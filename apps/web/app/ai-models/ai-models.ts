

export interface AIModel {
  id: string;
  name: string;
  description?: string; // Optional: thêm mô tả nếu cần
}

export const AVAILABLE_MODELS: AIModel[] = [
  { 
    id: "google/gemini-2.5-flash", 
    name: "Google Gemini 2.5 Flash" 
  },
  { 
    id: "openai/gpt-5-mini", 
    name: "OpenAI GPT-5 Mini" 
  },
  { 
    id: "anthropic/claude-haiku-4.5", 
    name: "Anthropic Claude Haiku 4.5" 
  },
  { 
    id: "xai/grok-code-fast-1", 
    name: "xAI Grok Code Fast 1" 
  },
];

export const DEFAULT_MODEL_ID = AVAILABLE_MODELS[0]?.id;