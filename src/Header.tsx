import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { LogoutModal } from "./LogoutModal";
import { LogOut, User as UserIcon, Shield } from "lucide-react";
import { motion } from "motion/react";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-sm"
        id="app-header"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Side: Brand Logo */}
          <div className="flex items-center gap-2" id="header-brand-logo">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <Shield size={20} className="stroke-[2.5]" />
            </div>
            <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-lg font-bold tracking-tight text-transparent select-none sm:block">
              Google Profile Viewer
            </span>
          </div>

          {/* Right Side: Account Actions Profile */}
          <div className="flex items-center gap-3 sm:gap-4" id="header-profile-section">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100" id="header-username">
                {user.displayName || "Google User"}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[200px]" id="header-useremail">
                {user.email}
              </span>
            </div>

            {/* Profile circular avatar frame */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-blue-500/20 shadow"
              id="header-user-avatar"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User avatar"}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  id="header-avatar-img"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  <UserIcon size={18} />
                </div>
              )}
            </motion.div>

            {/* Logout button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-rose-500/30 bg-white/5 dark:bg-neutral-900/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 text-neutral-700 dark:text-neutral-300 hover:text-rose-500 dark:hover:text-rose-400 px-3 py-2 text-xs font-semibold shadow-sm transition-all cursor-pointer"
              aria-label="Logout button"
              id="header-logout-btn"
            >
              <LogOut size={14} />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation modal controlled cleanly inside Header layer */}
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={async () => {
          setIsModalOpen(false);
          await logout();
        }}
      />
    </>
  );
};
