import { useState } from 'react';
import { ApiResponse } from '../types';

interface UseApiReturn {
  sendMessage: (message: string) => Promise<ApiResponse>;
  isLoading: boolean;
  error: Error | null;
}

export const useApi = (): UseApiReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = async (message: string): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.example.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};

export default useApi; 