import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Shield, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export const Login: React.FC = () => {
  const { login, authError, setAuthError } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = async () => {
    if (submitting) return;
    setSubmitting(true);
    setAuthError(null);
    try {
      await login();
    } catch (err: any) {
      console.warn("Login page captured error state.", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 px-4 py-12" id="login-viewport">
      {/* Dynamic Background visual decorative spots */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-rose-400/20 dark:bg-rose-600/10 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-yellow-400/15 dark:bg-yellow-600/5 blur-[120px]" />

      {/* Main glassmorphic container box */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neutral-200/50 dark:border-white/10 bg-white/40 dark:bg-neutral-900/40 p-8 shadow-2xl backdrop-blur-xl"
        id="login-card"
      >
        {/* Sparkles accent top corner */}
        <div className="absolute top-4 right-4 text-amber-500 flex gap-0.5" id="sparkle-accent">
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>

        {/* Card Header and Identity details */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500 p-[2px] shadow-lg shadow-blue-500/10"
            id="logo-boundary"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">
              <Shield size={32} className="text-blue-500 stroke-[2]" />
            </div>
          </motion.div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100" id="login-app-title">
              Google Profile Viewer
            </h1>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 px-4" id="login-app-subtitle">
              Securely sign in with your Google Workspace or Personal Account to view and verify your full profile metadata.
            </p>
          </div>
        </div>

        {/* Dynamic Alerts container */}
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 rounded-2xl bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/20 p-4 text-sm text-rose-600 dark:text-rose-400 shadow-sm"
            id="login-error-wrapper"
          >
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold block">Authentication Issue</span>
              <p className="text-xs leading-relaxed opacity-90">{authError}</p>
            </div>
          </motion.div>
        )}

        {/* Button container */}
        <div className="mt-8 space-y-4" id="action-trigger-area">
          <button
            type="button"
            onClick={handleSignIn}
            disabled={submitting}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-neutral-300/80 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-100 shadow-md hover:shadow-xl hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75 disabled:pointer-events-none transition-all cursor-pointer"
            id="google-signin-btn"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            ) : (
              // Inline standard authentic Google SVG logo
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" id="google-logo-svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            )}
            
            <span id="google-btn-text">
              {submitting ? "Connecting Google..." : "Sign in with Google"}
            </span>
          </button>
          
          {/* Custom disclaimer stating select_account behavior */}
          <div className="text-center" id="signin-disclaimer">
            <span className="inline-block text-[11px] text-neutral-400 dark:text-neutral-500 font-medium px-2">
              Note: A secure account chooser will always load, letting you change, switch, or select different Google accounts.
            </span>
          </div>
        </div>

        {/* Footer info/credentials */}
        <div className="mt-8 border-t border-neutral-200/50 dark:border-white/5 pt-6 text-center text-xs text-neutral-400 dark:text-neutral-500" id="login-footer">
          <p>Powered by Firebase Authentication</p>
          <p className="mt-1 font-mono text-[10px]">Version 1.0.0 (Production-Ready)</p>
        </div>
      </motion.div>
    </div>
  );
};
