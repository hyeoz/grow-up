export type GeminiRequestBody = {
  role: 'user' | 'assistant';
  parts: {
    inlineData?: {
      data: string;
      mimeType: string;
    };
    text?: string;
  }[];
};
