import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, X, AlertCircle } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-md"
            id="logout-modal-backdrop"
          />

          {/* Modal Content container with glassmorphic styles */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/10 dark:bg-neutral-900/40 p-6 shadow-2xl backdrop-blur-xl"
            id="logout-modal-box"
          >
            {/* Soft decorative background glow inside card */}
            <div className="absolute -top-12 -right-12 -z-10 h-32 w-32 rounded-full bg-rose-500/10 blur-xl" />
            
            {/* Close trigger to right top */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1 text-neutral-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              aria-label="Close dialog"
              id="logout-modal-close-btn"
            >
              <X size={18} />
            </button>

            {/* Header section with Icon */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/30">
                <LogOut size={22} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-neutral-800 dark:text-neutral-100" id="logout-title">
                  Confirm Logout
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300" id="logout-message">
                  Are you sure you want to sign out from this account?
                </p>
              </div>
            </div>

            {/* Warn or Advisory info */}
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-3 text-xs text-yellow-600 dark:text-yellow-400">
              <AlertCircle size={14} className="shrink-0" />
              <span>You will need to re-authenticate with your Google account next time.</span>
            </div>

            {/* Footer Buttons layout */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all cursor-pointer"
                id="logout-cancel-btn"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 dark:bg-rose-505 hover:bg-rose-700 text-white px-5 py-2.5 text-sm font-semibold shadow-lg shadow-rose-600/20 hover:shadow-rose-600/30 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
                id="logout-confirm-btn"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
