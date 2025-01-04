import axios from 'axios';
import { ApiError } from '../services/types';

export const createApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.message,
      status: error.response?.status,
      details: error.response?.data?.message || error.response?.statusText
    };
  }
  
  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred'
  };
};

export const formatErrorMessage = (error: ApiError): string => {
  if (error.status && error.details) {
    return `Error (${error.status}): ${error.message}. ${error.details}`;
  }
  return error.message;
};