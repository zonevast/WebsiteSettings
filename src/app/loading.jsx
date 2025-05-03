"use client";
import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
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

const logoVariants = {
  hidden: { scale: 0, rotate: -180 },
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
const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px]" />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div variants={logoVariants} className="relative w-32 h-32 mb-8">
          {/* Animated circles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border-2 border-primary/30"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border-2 border-secondary/30"
          />

          {/* Central logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-3xl font-bold text-white">ZV</span>
            </div>
          </div>
        </motion.div>

        {/* Text elements */}
        <motion.h1
          variants={textVariants}
          className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
        >
          ZoneVast
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-default-500 text-lg mb-8"
        >
          {useParams().locale == "ar"
            ? "تمكين حضورك الرقمي"
            : "Empowering Your Digital Presence"}
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
        />

        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
            className={`  
              absolute w-3 h-3 rounded-full  
              bg-gradient-to-r from-primary to-secondary  
              opacity-30  
            `}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingPage;
