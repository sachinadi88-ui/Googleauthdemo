import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { motion } from "motion/react";
import { 
  User as UserIcon, 
  Mail, 
  Fingerprint, 
  Key, 
  Calendar, 
  Clock, 
  Copy, 
  Check, 
  ShieldCheck,
  CheckCircle,
  ExternalLink
} from "lucide-react";

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  // Extract relevant authentication provider details
  const providerId = user.providerData[0]?.providerId || "google.com";
  const providerName = providerId === "google.com" ? "Google Account Provider" : providerId;

  // Format Dates safely
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateString;
    }
  };

  const handleCopyUid = () => {
    if (!user.uid) return;
    navigator.clipboard.writeText(user.uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 pt-28 pb-16 flex flex-col items-center justify-start relative overflow-hidden" id="profile-container">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-blue-500/10 dark:bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-rose-500/10 dark:bg-rose-600/5 blur-[100px]" />

      <div className="w-full max-w-3xl space-y-6" id="profile-content-wrapper">
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl border border-blue-500/10 bg-blue-500/10 dark:bg-blue-500/5 backdrop-blur-md gap-4"
          id="profile-welcome-banner"
        >
          <div className="flex items-center gap-3 text-center md:text-left flex-col md:flex-row">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Authenticated Secure Session</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Your session is stored securely via Firebase state listeners.</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <CheckCircle size={14} />
            <span>Active Session</span>
          </div>
        </motion.div>

        {/* Profile Card Main */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-neutral-200/50 dark:border-white/10 bg-white/40 dark:bg-neutral-900/40 shadow-xl backdrop-blur-xl"
          id="profile-card"
        >
          {/* Subtle inside gradient top line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500" />

          {/* Hero segment with large profile image */}
          <div className="p-8 border-b border-neutral-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative">
            <div className="absolute right-6 top-6 hidden sm:block">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1">
                Metadata Viewer
              </span>
            </div>

            {/* Profile circular avatar frame */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative h-28 w-28 shrink-0 rounded-full p-1.5 bg-gradient-to-tr from-blue-500/30 to-yellow-500/20 hover:from-blue-500 dark:hover:from-blue-600 backdrop-blur-sm shadow-md transition-all"
              id="profile-large-avatar"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL.replace("s96-c", "s400-c")} // Request high-resolution photo from Google
                  alt={user.displayName || "Google User"}
                  className="h-full w-full rounded-full object-cover shadow-inner bg-neutral-100"
                  referrerPolicy="no-referrer"
                  id="profile-avatar-img"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  <UserIcon size={44} />
                </div>
              )}
            </motion.div>

            {/* Name and Basic Email */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100" id="profile-display-name">
                {user.displayName || "Google User"}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400" id="profile-email-indicator">
                  <Mail size={14} className="shrink-0" />
                  {user.email}
                </span>
                {user.emailVerified && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 dark:bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20" id="email-verified-tag">
                    VERIFIED
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details list grid block */}
          <div className="p-8 space-y-6" id="profile-details-section">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Account Registration & Security Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box: Firebase UID */}
              <div className="relative group p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/30 dark:border-neutral-800/20 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800" id="info-uid-box">
                <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 block mb-1 uppercase tracking-tight">
                  Firebase UID (Unique Identifier)
                </span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200 truncate select-all font-semibold" id="profile-uid-text">
                    {user.uid}
                  </span>
                  <button
                    onClick={handleCopyUid}
                    className="shrink-0 p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 relative cursor-pointer"
                    title="Copy UID"
                    id="copy-uid-btn"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Box: Authentication Provider */}
              <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/30 dark:border-neutral-800/20 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800" id="info-provider-box">
                <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 block mb-1 uppercase tracking-tight">
                  Authentication Provider
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Key size={14} className="text-yellow-500 shrink-0" />
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200" id="profile-provider-id">
                    {providerName}
                  </span>
                </div>
              </div>

              {/* Box: Account Created Time */}
              <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/30 dark:border-neutral-800/20 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800" id="info-created-box">
                <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 block mb-1 uppercase tracking-tight">
                  Account Created
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={14} className="text-blue-500 shrink-0" />
                  <span className="text-xs text-neutral-700 dark:text-neutral-300" id="profile-creation-date">
                    {formatDate(user.metadata.creationTime)}
                  </span>
                </div>
              </div>

              {/* Box: Last Sign-In Time */}
              <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/30 dark:border-neutral-800/20 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800" id="info-last-signin-box">
                <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 block mb-1 uppercase tracking-tight">
                  Last Sign-In Active
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={14} className="text-red-500 shrink-0" />
                  <span className="text-xs text-neutral-700 dark:text-neutral-300" id="profile-signin-date">
                    {formatDate(user.metadata.lastSignInTime)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick action buttons / options */}
            <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-white/5 flex flex-col xs:flex-row items-center justify-between gap-4" id="profile-additional-info">
              <span className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                <Fingerprint size={12} />
                Client-side state managed securely
              </span>
              <a 
                href="https://myaccount.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600 hover:underline transition-all"
                id="my-google-account-link"
              >
                <span>Manage Google Account</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
