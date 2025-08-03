import { GoogleGenAI } from '@google/genai';

import { REACT_APP_GEMINI_API_KEY } from '@env';
import { GeminiRequestBody } from '@/types';

const ai = new GoogleGenAI({
  vertexai: false,
  apiKey: REACT_APP_GEMINI_API_KEY,
  apiVersion: 'v1beta',
});

const callGeminiAPI = async ({ reqBody }: { reqBody: GeminiRequestBody }) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: reqBody,
      // contents: '오늘 서울의 날씨를 알려줘', // test
    });
    const text = response.candidates?.[0].content?.parts?.[0].text;
    if (!text) {
      throw new Error('Gemini response is undefined');
    }
    const result = parseResponseToJson(text);
    return result;
  } catch (error) {
    throw error;
  }
};

// 텍스트 응답에서 JSON 객체로 변환하는 함수
function parseResponseToJson(text: string): any {
  try {
    // 1. 마크다운 코드 블록 표시(```json과 ```) 제거
    const jsonString = text.replace(/```json\n|\n```/g, '');

    // 2. JSON.parse를 사용하여 문자열을 객체로 변환
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
    return null;
  }
}

export default callGeminiAPI;
