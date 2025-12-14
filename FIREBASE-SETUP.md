# Firebase Cloud Sync Setup Guide

This guide will help you set up Firebase for cross-device sync.

## Quick Setup (5 minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Name it (e.g., "study-abroad-dashboard")
4. Disable Google Analytics (optional, not needed)
5. Click **"Create project"**

### Step 2: Enable Authentication

1. In Firebase Console, click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Enable **"Anonymous"** sign-in method
4. (Optional) Enable **"Google"** sign-in for persistent accounts

### Step 3: Create Firestore Database

1. Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll secure it later)
4. Choose your region (closest to you)
5. Click **"Enable"**

### Step 4: Get Your Config

1. Click the **gear icon** (⚙️) → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click the **web icon** (`</>`)
4. Register app with any nickname
5. Copy the `firebaseConfig` object

### Step 5: Update firebase-sync.js

Open `firebase-sync.js` and replace the config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### Step 6: Secure Your Database (Important!)

1. Go to **Firestore Database** → **Rules**
2. Replace with these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

## Usage

After setup:

1. Go to **Settings** in your dashboard
2. Click **"Enable Cloud Sync"** for anonymous sync
3. Or click **"Google Sign In"** for persistent account sync
4. Your data will automatically sync across all devices!

## Features

- ✅ **Anonymous Sync**: No account needed, works immediately
- ✅ **Google Sign In**: Persistent sync tied to your Google account
- ✅ **Real-time Sync**: Changes appear on other devices instantly
- ✅ **Offline Support**: Works offline, syncs when back online
- ✅ **Auto-sync**: Changes upload automatically

## Troubleshooting

### "Cloud sync not configured"
- Make sure you updated `firebase-sync.js` with your config

### "Permission denied"
- Check your Firestore security rules
- Make sure Authentication is enabled

### Data not syncing
- Check browser console for errors
- Try "Sync Now" button in Settings
- Make sure you're signed in

## Free Tier Limits

Firebase free tier is very generous:
- **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- **Authentication**: Unlimited users
- **Hosting**: 10GB storage, 360MB/day transfer

For personal use, you'll never hit these limits!

## Security Notes

- Your API key is safe to expose (Firebase uses security rules)
- Security rules protect your data
- Each user can only access their own data
- Anonymous users get a unique ID per device
