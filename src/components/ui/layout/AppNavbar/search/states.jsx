import { Loader2, Package } from "lucide-react";
import { motion } from "framer-motion";

export const LoadingState = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-12"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="w-8 h-8 text-primary" />
    </motion.div>
    <p className="mt-4 text-default-500">{message}</p>
  </motion.div>
);

export const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-16 h-16 rounded-full bg-default-100 flex items-center justify-center mb-4">
      <Package className="w-8 h-8 text-default-400" />
    </div>
    <p className="text-default-500">{message}</p>
  </div>
);
