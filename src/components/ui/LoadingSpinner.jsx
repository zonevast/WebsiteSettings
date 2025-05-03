"use client";

import React from "react";
import { Spinner } from "@nextui-org/react";
import Cookies from "js-cookie";

function LoadingSpinner({ text }) {
  const theme = Cookies.get("theme");

  const spinnerColor = theme === "dark" ? "text-white" : "text-primary";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner className={`h-12 w-12 animate-spin ${spinnerColor}`} />
      <p className="mt-4 text-lg font-medium text-gray-600">{text}</p>
    </div>
  );
}

export default LoadingSpinner;
