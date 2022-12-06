import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
          method,
          body,
          headers,
        });
        const responseData = await response.json();
        setIsLoading(false);
        if (!response.ok) {
          setError(responseData);
          return;
        }
        return responseData;
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};

export default useHttp;
