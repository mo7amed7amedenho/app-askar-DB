import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

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
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xl z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] w-[500px] p-6 max-w-full border border-gray-200 dark:border-gray-700"
      >
        {/* عنوان النافذة */}
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
          {title}
        </h2>

        {/* نص الرسالة */}
        <p className="text-md text-gray-700 dark:text-gray-300 mb-6 text-center leading-relaxed">
          {message}
        </p>

        {/* أزرار التحكم */}
        <div className="flex justify-center gap-4">
          <Button
            className="px-6 py-2 rounded-xl text-gray-700 dark:text-gray-300 transition"
            onClick={onClose}
            variant="bordered"
          >
            إلغاء
          </Button>
          <Button
            className={`px-6 py-2 rounded-xl text-white ${getButtonColor()} transition`}
            onClick={onConfirm}
            variant="shadow"
          >
            {confirmButtonText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
