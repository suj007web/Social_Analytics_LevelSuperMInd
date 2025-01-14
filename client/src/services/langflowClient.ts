import axios from 'axios';
import type { LangflowResponse } from './types';
import { createApiError } from '../utils/errorHandling';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const analyzeSocialPost = async (
  message: string,
  platform: string,
  postType: string,
  targetAudience: string

): Promise<string> => {
  if (!message.trim()) {
    throw new Error('Message cannot be empty');
  }


  try {
    const response = await api.post<LangflowResponse>('/api/analyze', {
      message,
      platform,
      postType,
      targetAudience
     
    });
    console.log(response);

    return response.data.outputs[0].outputs[0].outputs.message.message.text;
  } catch (error) {
    throw createApiError(error);
  }
};