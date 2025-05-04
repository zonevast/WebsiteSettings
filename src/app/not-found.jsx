"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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

const numberVariants = {
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
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

export default function NotFound() {
  const router = useRouter();

  const {
    settings: { language },
  } = useSettings();
  const isArabic = language === "ar";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px]" />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-danger/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        {/* 404 Number */}
        <motion.div
          variants={numberVariants}
          className="relative mb-8 flex items-center"
        >
          <motion.div
            className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-danger to-primary bg-clip-text text-transparent"
            animate={{
              textShadow: [
                "0 0 5px rgba(255,0,0,0.3)",
                "0 0 15px rgba(255,0,0,0.3)",
                "0 0 5px rgba(255,0,0,0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            404
          </motion.div>

          {/* Broken circle elements */}
          <motion.div
            className="absolute -z-10 w-full h-full rounded-full border-4 border-danger/30"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 50%, 75% 50%, 75% 100%, 0 100%)",
            }}
            animate={{
              rotate: [0, 10, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -z-10 w-full h-full rounded-full border-4 border-primary/30"
            style={{
              clipPath:
                "polygon(100% 100%, 0 100%, 0 50%, 25% 50%, 25% 0, 100% 0)",
            }}
            animate={{
              rotate: [0, -10, 0],
              x: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Text elements */}
        <motion.h1
          variants={textVariants}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {isArabic ? "الصفحة غير موجودة" : "Page Not Found"}
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-default-500 text-lg mb-8 max-w-md"
        >
          {isArabic
            ? "عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها."
            : "Sorry, we couldn't find the page you're looking for. It might have been moved or deleted."}
        </motion.p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => router.push("/home")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium"
          >
            {isArabic ? "العودة للرئيسية" : "Go Home"}
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-full bg-default-100 text-default-700 font-medium"
          >
            {isArabic ? "العودة للخلف" : "Go Back"}
          </motion.button>
        </div>

        {/* Floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
            className={`
              absolute w-${1 + Math.floor(i / 3)} h-${
              1 + Math.floor(i / 3)
            } rounded-full
              bg-gradient-to-r ${
                i % 2 === 0
                  ? "from-danger to-primary"
                  : "from-primary to-secondary"
              }
              opacity-${20 + i * 5}
            `}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}

        {/* Broken path line */}
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute -z-10 w-full h-full pointer-events-none"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,50 L20,30 L40,70 L60,40 L80,60 L100,50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              strokeDasharray="0 1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-danger)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
