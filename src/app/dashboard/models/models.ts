const providers = [
  {
    id: "openai",
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    description:
      "Leading AI research lab focused on ensuring AGI benefits all of humanity",
    models: [
      {
        id: "gpt-4",
        name: "GPT-4",
        type: "Chat",
        contextWindow: "128K tokens",
        releaseDate: "2023",
      },
      {
        id: "gpt-3.5-turbo",
        name: "GPT-3.5-Turbo",
        type: "Chat",
        contextWindow: "16K tokens",
        releaseDate: "2022",
      },
      {
        id: "gpt-4o",
        name: "GPT-4o",
        type: "Chat",
        contextWindow: "128K tokens",
        releaseDate: "2024",
      },
      {
        id: "gpt-4o-mini",
        name: "GPT-4o-Mini",
        type: "Chat",
        contextWindow: "128K tokens",
        releaseDate: "2024",
      },
      {
        id: "o1",
        name: "O1",
        type: "Reasoning",
        contextWindow: "128K tokens",
        releaseDate: "2024",
      },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
    description:
      "AI research company building reliable, interpretable, and steerable AI systems",
    models: [
      {
        id: "claude-3-opus",
        name: "Claude-3 Opus",
        type: "Chat",
        contextWindow: "200K tokens",
        releaseDate: "2024",
      },
      {
        id: "claude-3-sonnet",
        name: "Claude-3 Sonnet",
        type: "Chat",
        contextWindow: "200K tokens",
        releaseDate: "2024",
      },
      {
        id: "claude-3-haiku",
        name: "Claude-3 Haiku",
        type: "Chat",
        contextWindow: "200K tokens",
        releaseDate: "2024",
      },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/DeepSeek_logo.svg",
    description:
      "Advanced models focused on reasoning and deep language understanding",
    models: [
      {
        id: "deepseek-chat",
        name: "DeepSeek-Chat",
        type: "Chat",
        contextWindow: "32K tokens",
        releaseDate: "2023",
      },
      {
        id: "deepseek-reasoner",
        name: "DeepSeek-Reasoner",
        type: "Reasoning",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
    ],
  },
  {
    id: "qwenai",
    name: "QwenAI",
    logo: "https://crystalpng.com/wp-content/uploads/2025/02/Qwen-logo-02.png",
    description: "High-performance multilingual language models",
    models: [
      {
        id: "qwen-turbo",
        name: "Qwen-Turbo",
        type: "Chat",
        contextWindow: "32K tokens",
        releaseDate: "2023",
      },
      {
        id: "qwen-plus",
        name: "Qwen-Plus",
        type: "Chat",
        contextWindow: "32K tokens",
        releaseDate: "2023",
      },
      {
        id: "qwen-max",
        name: "Qwen-Max",
        type: "Chat",
        contextWindow: "32K tokens",
        releaseDate: "2023",
      },
    ],
  },
  {
    id: "google",
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description:
      "Google's multimodal AI models focused on reasoning and understanding",
    models: [
      {
        id: "gemini-1.5-pro",
        name: "Gemini-1.5-Pro",
        type: "Multimodal",
        contextWindow: "1M tokens",
        releaseDate: "2024",
      },
      {
        id: "gemini-2.0-flash",
        name: "Gemini-2.0-Flash",
        type: "Chat",
        contextWindow: "1M tokens",
        releaseDate: "2024",
      },
      {
        id: "gemini-2.0-pro-exp-02-05",
        name: "Gemini-2.0-Pro-Exp-02-05",
        type: "Multimodal",
        contextWindow: "1M tokens",
        releaseDate: "2024",
      },
    ],
  },
  {
    id: "mistralai",
    name: "MistralAI",
    logo: "https://images.seeklogo.com/logo-png/51/1/mistral-ai-icon-logo-png_seeklogo-515008.png",
    description: "Specialized models focused on efficiency and performance",
    models: [
      {
        id: "mistral-small-latest",
        name: "Mistral-Small-Latest",
        type: "Chat",
        contextWindow: "32K tokens",
        releaseDate: "2023",
      },
      {
        id: "pixtral-12b-2409",
        name: "Pixtral-12B-2409",
        type: "Multimodal",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
      {
        id: "mistral-large-latest",
        name: "Mistral-Large-Latest",
        type: "Chat",
        contextWindow: "32K tokens",
        releaseDate: "2023",
      },
      {
        id: "codestral-latest",
        name: "Codestral-Latest",
        type: "Code",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
      {
        id: "pixtral-large-latest",
        name: "Pixtral-Large-Latest",
        type: "Multimodal",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
    ],
  },
  {
    id: "xai",
    name: "XAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/XAI-Logo.svg",
    description: "Research company focused on advanced reasoning capabilities",
    models: [
      {
        id: "grok-2-1212",
        name: "Grok-2-1212",
        type: "Chat",
        contextWindow: "128K tokens",
        releaseDate: "2024",
      },
      {
        id: "grok-2-vision-1212",
        name: "Grok-2-Vision-1212",
        type: "Multimodal",
        contextWindow: "128K tokens",
        releaseDate: "2024",
      },
    ],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg",
    description:
      "Knowledge-focused AI models with advanced reasoning capabilities",
    models: [
      {
        id: "sonar",
        name: "Sonar",
        type: "Chat",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
      {
        id: "sonar-pro",
        name: "Sonar-Pro",
        type: "Chat",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
      {
        id: "sonar-reasoning",
        name: "Sonar-Reasoning",
        type: "Reasoning",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
      {
        id: "sonar-reasoning-pro",
        name: "Sonar-Reasoning-Pro",
        type: "Reasoning",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
      {
        id: "r1-1776",
        name: "R1-1776",
        type: "Reasoning",
        contextWindow: "32K tokens",
        releaseDate: "2024",
      },
    ],
  },
];

export default providers;