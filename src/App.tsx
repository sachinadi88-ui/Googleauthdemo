import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { Login } from "./Login";
import { Header } from "./Header";
import { Profile } from "./Profile";
import { Loader2, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

/**
 * Route guard component for authenticated resources
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullScreenLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * Redirection helper for authenticated users visiting Login
 */
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullScreenLoading />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/**
 * Beautiful full-screen glassmorphic Loading Spinner
 */
const FullScreenLoading: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4" id="global-loading">
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-neutral-900/40 p-10 shadow-xl backdrop-blur-xl flex flex-col items-center space-y-4 max-w-sm text-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500 stroke-[2.5]" />
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Verifying session...</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Communicating secure parameters with Firebase services.</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Inner App component that runs within the AuthProvider context
 */
const AppContent: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to clean dark mode theme as it accentuates glassmorphism

  useEffect(() => {
    // Sync classList for tailwind styling
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      {/* Light/Dark theme toggler overlaying fixed at right bottom for non-disruptive support */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 shadow-xl cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
          aria-label="Toggle visual theme"
          id="theme-toggler-btn"
        >
          {darkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-neutral-600" />}
        </motion.button>
      </div>

      <Routes>
        {/* Protected profile workspace */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Header />
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Public Login portal */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Catch-all redirect to profile */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
