"use client";
import React, { useEffect, useState } from "react";
import CustomNotification from "@/components/CustomNotification";
import { useLocale } from "next-intl";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [lastNotification, setLastNotification] = useState({
    message: "",
    timestamp: 0,
  });
  const [lastCallTimestamp, setLastCallTimestamp] = useState(0);

  const locale = useLocale();

  const sendNotification = (
    message,
    type = "info",
    duration = 10000,
    options = {}
  ) => {
    const now = Date.now();

    // Throttle notifications
    if (now - lastCallTimestamp < 2000) return;

    // Prevent duplicates
    if (
      lastNotification.message === message &&
      now - lastNotification.timestamp < 5000
    ) {
      return;
    }

    const id = now;
    const newNotification = {
      id,
      message,
      type,
      duration,
      ...options,
    };

    const timeoutRef = setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, duration);

    setNotifications((prev) => [
      ...prev,
      { ...newNotification, clearTimeoutFn: () => clearTimeout(timeoutRef) },
    ]);

    setLastNotification({ message, timestamp: now });
    setLastCallTimestamp(now);
  };

  const clearNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    sendNotification,
    clearNotification,
    clearAllNotifications,
    NotificationContainer: notifications.length > 0 && (
      <div
        className={`fixed z-[9999] flex flex-col gap-2 p-4 max-h-screen overflow-y-auto ${
          locale === "en" ? "right-0" : "left-0"
        } bottom-0 w-full max-w-md`}
      >
        {notifications.map((notification) => (
          <CustomNotification
            key={notification.id}
            {...notification}
            onClose={() => clearNotification(notification.id)}
          />
        ))}
      </div>
    ),
  };
};

export { useNotification };
