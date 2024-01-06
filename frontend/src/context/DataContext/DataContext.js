import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export function useApp() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [requestCounter, setRequestCounter] = useState(0);
  const [competitionsOfUser, setCompetitionOfUser] = useState([]);

  const incrementCounter = () => setRequestCounter((count) => count + 1);
  const decrementCounter = () => {
    setRequestCounter((count) => Math.max(0, count - 1));
    setTimeout(() => {
      setRequestCounter((count) => Math.max(0, count - 1));
    }, 500);
  };

  const isLoading = requestCounter > 0;
  const value = {
    isLoading,
    incrementCounter,
    decrementCounter,
    competitionsOfUser,
    setCompetitionOfUser,
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      incrementCounter();
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        decrementCounter();
        return response;
      },
      (error) => {
        decrementCounter();
        throw error;
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [incrementCounter, decrementCounter]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
