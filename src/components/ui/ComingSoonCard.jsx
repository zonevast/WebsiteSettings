// components/ui/ComingSoonCard.jsx
"use client";
import { useState, useEffect } from "react";
import { Zap, Clock } from "lucide-react";
import { Card } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const CountdownTimer = () => {
  const t = useTranslations("UI.comingSoon");
  const targetDate = new Date("2024-02-10").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <TimeUnit value={timeLeft.days} label={t("days")} />
      <TimeUnit value={timeLeft.hours} label={t("hours")} />
      <TimeUnit value={timeLeft.minutes} label={t("minutes")} />
      <TimeUnit value={timeLeft.seconds} label={t("seconds")} />
    </div>
  );
};

const TimeUnit = ({ value, label }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="p-3 text-center bg-content1 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-2xl font-bold text-primary block"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-default-500 block">{label}</span>
    </Card>
  </motion.div>
);

export const ComingSoonOverlay = () => {
  const t = useTranslations("UI.comingSoon");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-50 backdrop-blur-sm bg-background/50 flex items-center justify-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center max-w-md mx-auto p-6 bg-background/70 rounded-large shadow-large"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.4,
          }}
          className="flex justify-center mb-4"
        >
          <Zap className="w-16 h-16 text-purple-600 animate-bounce" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-3xl font-bold mb-4 text-foreground"
        >
          {t("comingSoon")}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-lg mb-6 text-foreground"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center justify-center gap-2 p-4 rounded-lg bg-content1 shadow-small"
        >
          <Clock className="w-6 h-6 text-default-500" />
          <span className="text-foreground">{t("checkBackLater")}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
