import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { signInWithGoogle, logoutUser, getFriendlyAuthErrorMessage } from "./authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  setAuthError: (error: string | null) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Listens to real-time auth state changes and restores state securely on reload/refresh
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state subscription error:", error);
        setAuthError("Failed to track session stability. Please reload the page.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      const msg = getFriendlyAuthErrorMessage(err);
      setAuthError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await logoutUser();
    } catch (err: any) {
      const msg = getFriendlyAuthErrorMessage(err);
      setAuthError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, setAuthError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
