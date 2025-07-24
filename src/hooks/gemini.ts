import { GoogleGenAI } from '@google/genai';

import { REACT_APP_GEMINI_API_KEY } from '@env';
import { GeminiRequestBody } from '@/types';

const ai = new GoogleGenAI({
  vertexai: false,
  apiKey: REACT_APP_GEMINI_API_KEY,
  apiVersion: 'v1beta',
});

const useGemini = async ({ reqBody }: { reqBody: GeminiRequestBody }) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: reqBody,
      // contents: '오늘 서울의 날씨를 알려줘', // test
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export default useGemini;
