import { signInWithPopup, signOut, AuthError } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

/**
 * Translates Firebase Auth error codes into helpful, customer-facing messages.
 */
export function getFriendlyAuthErrorMessage(error: any): string {
  if (!error) return "An unknown error occurred.";
  
  const errorCode = (error as AuthError).code || "";
  
  switch (errorCode) {
    case "auth/popup-blocked":
      return "The sign-in popup was blocked by your browser. Please allow popups for this site to sign in.";
    case "auth/popup-closed-by-user":
      return "The sign-in window was closed before completing authentication. Please try again.";
    case "auth/cancelled-popup-request":
      return "The sign-in process was canceled. Please try again.";
    case "auth/network-request-failed":
      return "A network mistake occurred. Please verify your internet connection and try again.";
    case "auth/operation-not-allowed":
      return "Google Sign-In is not currently enabled for this project. Please contact support.";
    case "auth/invalid-api-key":
      return "Invalid API configuration. Please verify your Firebase settings.";
    default:
      return error.message || "An error occurred during authentication.";
  }
}

/**
 * Initiates Google sign-in workflow using custom prompt "select_account"
 */
export async function signInWithGoogle() {
  try {
    // Explicitly configure Google Sign-In with prompt select_account
    googleProvider.setCustomParameters({
      prompt: "select_account"
    });
    
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Auth helper: Google Sign-In Error", error);
    throw error;
  }
}

/**
 * Signs out the currently authenticated user
 */
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Auth helper: Error signing out", error);
    throw error;
  }
}
