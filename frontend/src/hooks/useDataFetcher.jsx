import { useState, useCallback } from "react";
import axios from "axios";

// const baseURL = import.meta.env.VITE_BASE_URL;
const baseURL = "http://localhost:5050/users";

export const useDataFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle successful response
  const handleResponse = useCallback((response) => {
    // console.log(response.data, 'RES');
    setData(response.data);
    setError(null); // Clear any previous error
    return response.data;
  }, []);

  // Handle error response
  const handleError = useCallback((err) => {
    const { response } = err;
    // Extract error message from the response or use a default message
    const errorMessage = response?.data?.message || "An error occurred";

    // Set the error state with the extracted message
    setError(errorMessage);

    return { error: errorMessage };
  }, []);

  // Fetch data from the API
  const dataFetcher = useCallback(
    async (endpoint, method = "GET", payload = null) => {
      setLoading(true);
      try {
        const url = `${baseURL}${endpoint}`;

        const response = await axios({
          method,
          url,
          data: payload,
          withCredentials: true,
        });

        return handleResponse(response);
      } catch (err) {
        return handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [handleResponse, handleError]
  );

  return { data, loading, error, dataFetcher };
};
