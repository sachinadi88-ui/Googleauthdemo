# Google Profile Viewer: Firebase Production Deployment & Configuration Guide

This guide details how to configure, build, and deploy the **Google Profile Viewer** application outside the AI Studio sandbox environment (e.g. to your own Google Cloud and Firebase custom project, and onto Google Cloud CDN via **Firebase Hosting**).

---

## 1. Prerequisites and Installation
To run or build this application on your local workstation, run the following commands sequentially:

```bash
# Clone or download this project, then run the installer:
npm install

# Installs the Firebase Command Line Interface globally
npm install -g firebase-tools
```

---

## 2. Setting Up a New Firebase Project

If you do not already have an active Firebase project, follow these step-by-step instructions to create one:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project**, type in your desired project name (e.g., `Google Profile Viewer`), and click **Continue**.
3. Choose whether to enable **Google Analytics** for this project (optional), and click **Create project**. Let the workspace initialize.

---

## 3. Configuring Firestore and Google Sign-In (Authentication)

### A. Initialize Firestore Database (Database selection and setup)
1. In the left navigation menu of the Firebase Console, go to **Build** > **Firestore Database**.
2. Click **Create database**.
3. Select your preferred database **Location** (e.g., `us-central` or `asia-east1`) and click **Next**.
4. Start in **Production mode** (which ensures security rules are active). Click **Create**.

### B. Enable Google Authentication Provider (Crucial Step for Redirects)
1. In the left navigation menu, go to **Build** > **Authentication**.
2. Click **Get Started** to enable the user register.
3. Select the **Sign-in method** tab and click **Add new provider**.
4. Choose **Google** from the list of available providers.
5. Click the toggle switch to **Enable** Google Sign-In.
6. Set your **Project support email** (e.g., your personal gmail username) from the dropdown list.
7. Click **Save**.

### C. Allow Authorized Redirect Domains
Google Sign-In uses OAuth 2.0. Standard security requires listing authorized redirect URLs:
1. Under the **Authentication** module in the console, note down the auto-authorized domains under **Settings** > **Authorized domains**.
2. By default, `localhost` and your personal `<project-id>.firebaseapp.com` are already allow-listed!
3. If you map a custom domain (e.g., `https://profile-viewer.mycompany.com`), click **Add domain** and register it here.

---

## 4. Configuring Environment Variables & Deployment Variables

To configure authentication to work securely outside the sandbox, you have two options:

### Option A: standard `.env` configuration (Vite Preferred)
Copy `.env.example` in your project root to a new file named `.env`, and populate it with your Firebase Web App credentials (available in the Firebase Console under **Project Settings** > **General** > **Your apps** > **Web app**):

```env
VITE_FIREBASE_API_KEY="AIzaSyYourApiKeyHere..."
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="764220476228"
VITE_FIREBASE_APP_ID="1:764220476228:web:17c9385850203df3dae5"
VITE_FIREBASE_MEASUREMENT_ID="G-MEASUREMENT_ID"
VITE_FIREBASE_DATABASE_ID="(default)"
```

### Option B: JSON Config file (Fallback Option)
Alternatively, you can create a file named `firebase-applet-config.json` inside the root folder of the workspace, structured exactly like:

```json
{
  "projectId": "your-project-id",
  "appId": "1:764220476228:web:17c9385850203df3dae5",
  "apiKey": "AIzaSyYourApiKeyHere...",
  "authDomain": "your-project-id.firebaseapp.com",
  "firestoreDatabaseId": "(default)",
  "storageBucket": "your-project-id.firebasestorage.app",
  "messagingSenderId": "764220476228",
  "measurementId": "G-MEASUREMENT_ID"
}
```

---

## 5. Deployment steps for Firebase Hosting & Security Rules

### Step 1: Login through your Terminal CLI
Ensure your terminal has authenticated with your personal Google credentials:
```bash
firebase login
```

### Step 2: Initialize Hosting and Local Links
Initialize your workspace with your selected target project:
```bash
firebase init
```
* Select **Firestore: Configure security rules...**
* Select **Hosting: Configure files for Firebase Hosting...**
* When asked: *"What do you want to use as your public directory?"*, enter **`dist`** (This perfectly corresponds with our Vite build destination directory).
* When asked: *"Configure as a single-page app (rewrite all urls to /index.html)?"*, select **`Yes`** (required for `react-router-dom` to support deep linking and page reloads gracefully!).
* When asked: *"Set up automatic builds and deploys with GitHub?"*, choose **`No`**.

### Step 3: Deploy Security Rules and Local Artifacts
Deploy your security rules cleanly to Firestore:
```bash
firebase deploy --only firestore:rules
```

### Step 4: Build and Deploy the Web Application
Compile the static Single Page Application (SPA), bundle code, copy stylesheets, and send to CDN Hosting:
```bash
# Compiles complete production code to dist/ folder
npm run build

# Deploys hosting resources to global Google Cloud Edge CDN
firebase deploy --only hosting
```

Your app will immediately be live and fully functional outside of the sandbox at your custom production URL (e.g. `https://your-project-id.web.app`)!
