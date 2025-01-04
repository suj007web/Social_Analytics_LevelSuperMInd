export interface LangflowResponse {
  outputs: Array<{
    outputs: Array<{
      outputs: {
        message: {
          message : {
            text: string;
          }
        };
      };
    }>;
  }>;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: string;
}