"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import useSettings from "@/hooks/settings/useSettings";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -10 },
  show: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8,
      duration: 0.4,
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    }
  }
};

export default function GlobalError({ error, reset }) {
  const { settings } = useSettings();
  const isArabic = settings.language === "ar";
  const [showDetails, setShowDetails] = useState(false);

  // Extract error information
  const errorMessage = error?.message || "An unexpected error occurred";
  const errorStack = error?.stack || "";
  const errorName = error?.name || "Error";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px]" />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-danger/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-warning/20 rounded-full filter blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto"
      >
        {/* Error Icon */}
        <motion.div
          variants={iconVariants}
          className="relative mb-8 flex items-center justify-center w-32 h-32"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-danger/10"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16 text-danger"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.path
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>

          {/* Animated circles */}
          <motion.div
            className="absolute -z-10 w-full h-full rounded-full border-4 border-danger/30"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </motion.div>

        {/* Text elements */}
        <motion.h1
          variants={textVariants}
          className="text-3xl md:text-4xl font-bold mb-4 text-danger"
        >
          {isArabic ? "حدث خطأ ما" : "Something Went Wrong"}
        </motion.h1>

        <motion.div
          variants={textVariants}
          className="text-default-600 text-lg mb-6 max-w-md"
        >
          <p className="mb-2">
            {isArabic
              ? "نواجه مشكلة في معالجة طلبك. نعتذر عن الإزعاج."
              : "We're experiencing an issue processing your request. We apologize for the inconvenience."}
          </p>
          <p className="text-sm text-default-500 bg-default-100 p-3 rounded-lg">
            <span className="font-semibold">{errorName}:</span> {errorMessage}
          </p>
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium"
          >
            {isArabic ? "حاول مرة أخرى" : "Try Again"}
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 rounded-full bg-default-100 text-default-700 font-medium"
          >
            {isArabic ? "العودة للرئيسية" : "Go Home"}
          </motion.button>
        </div>

        {/* Error details toggle */}
        <motion.button
          variants={textVariants}
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-default-500 underline"
        >
          {showDetails
            ? (isArabic ? "إخفاء التفاصيل التقنية" : "Hide Technical Details")
            : (isArabic ? "عرض التفاصيل التقنية" : "Show Technical Details")}
        </motion.button>

        {/* Error stack trace */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 w-full max-w-xl"
          >
            <div className="bg-default-50 border border-default-200 rounded-lg p-4 text-left overflow-auto max-h-60">
              <pre className="text-xs text-default-700 whitespace-pre-wrap font-mono">
                {errorStack || "No stack trace available"}
              </pre>
            </div>
            <p className="text-xs text-default-400 mt-2 text-left">
              {isArabic
                ? "يمكن أن تساعد هذه المعلومات فريق الدعم في تشخيص المشكلة."
                : "This information can help support staff diagnose the issue."}
            </p>
          </motion.div>
        )}

        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-15, 15],
              x: [-15, 15],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
            className={`
              absolute w-${1 + Math.floor(i / 3)} h-${1 + Math.floor(i / 3)} rounded-full
              bg-gradient-to-r ${i % 2 === 0 ? 'from-danger to-warning' : 'from-warning to-danger'}
              opacity-${20 + (i * 5)}
            `}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}

        {/* Animated pulse ring */}
        <motion.div
          className="absolute -z-10 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="url(#errorGradient)"
              strokeWidth="0.5"
              initial={{ r: 20, opacity: 1 }}
              animate={{
                r: [20, 40, 20],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-danger)" />
                <stop offset="100%" stopColor="var(--color-warning)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}