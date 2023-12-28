import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export function useApp() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const value = { isLoading, setIsLoading };

//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use((config) => {
//       setIsLoading(true);
//       return config;
//     });
//     const responseInterceptor = axios.interceptors.response.use(
//       (response) => {
//         setIsLoading(false);
//         return response;
//       },
//       (error) => {
//         setIsLoading(false);
//         throw error;
//       }
//     );
//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//       axios.interceptors.response.eject(responseInterceptor);
//     };
//   }, []);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
