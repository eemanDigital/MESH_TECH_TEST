import React, { createContext, useState, useEffect } from "react";
import { useDataFetch } from "../hooks/useDataFetcher";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { dataFetcher, data } = useDataFetch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const checkLoginStatus = async () => {
      const response = await dataFetcher("/isLoggedIn");
      if (response && response.isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [dataFetcher]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
