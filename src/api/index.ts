import axios from 'axios';
import { REACT_APP_GEMINI_URI, REACT_APP_GEMINI_API_KEY } from '@env';

export const GeminiAPI = axios.create({
  baseURL: `${REACT_APP_GEMINI_URI}?key=${REACT_APP_GEMINI_API_KEY}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
