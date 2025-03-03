import React from "react";
import { motion } from "framer-motion";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText: string;
  confirmButtonColor?: "primary" | "danger" | "secondary";
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
  confirmButtonColor = "primary",
}) => {
  if (!isOpen) return null;

  const getButtonColor = () => {
    switch (confirmButtonColor) {
      case "danger":
        return "bg-red-600 hover:bg-red-700";
      case "secondary":
        return "bg-gray-600 hover:bg-gray-700";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-90 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl w-[600px] p-8 max-w-full relative"
      >
        <h2 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex justify-end space-x-5">
          <button
            className="px-6 py-3 mx-5 bg-gray-400 hover:bg-gray-500 text-white rounded-xl"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className={`px-6 py-3 text-white rounded-xl ${getButtonColor()}`}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
