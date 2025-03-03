import { Alert } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AlertProps {
  message: string;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
}

export default function Alerts({ message, color }: AlertProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-4"
      >
        <Alert color={color}>{message}</Alert>
      </motion.div>
    </AnimatePresence>
  );
}
