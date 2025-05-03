import dynamic from "next/dynamic";
import React, { createContext, useContext } from "react";

// Import the `useNotification` hook for your notification logic
import { useNotification as useNotification1 } from "@/components/CustomNotification/useNotification";

// Create a notification context
const NotificationContext = createContext();

// Hook to use notification in other components
export const useNotification = () => useContext(NotificationContext);

// Dynamically load NotificationProvider without SSR
export const NotificationProvider = dynamic(() =>
  Promise.resolve(({ children }) => {
    // Extract notification logic from useNotification1
    const { sendNotification, useWatchVariable, clearNotification, NotificationContainer } = useNotification1();

    return (
      <NotificationContext.Provider value={{ sendNotification, clearNotification, useWatchVariable }}>
        {children}
        {NotificationContainer}
      </NotificationContext.Provider>
    );
  }),
  { ssr: false }
);
