"use client";
import { motion } from "framer-motion";
import { containerVariants } from "@/components/animations";

export default function CustomerDashboard() {
  return (
    <motion.div
      className="flex flex-col space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    ></motion.div>
  );
}
