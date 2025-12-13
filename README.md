# Study Abroad Dashboard v2.0 🎓

A comprehensive Progressive Web App (PWA) for tracking university applications and IELTS preparation for studying abroad in Germany and Schengen countries.

## ✨ New Features in v2.0

### 🔄 Data Management

-   **Export/Import**: Backup and restore all your progress data
-   **Auto-backup**: Automatic backups every 30 minutes
-   **Cross-device sync**: Share data between devices via JSON export
-   **Storage analytics**: Monitor your data usage

### 📊 Analytics & Insights

-   **Progress charts**: Visual representation of application progress
-   **Status distribution**: See application statuses at a glance
-   **IELTS tracking**: Comprehensive IELTS preparation analytics
-   **Smart insights**: AI-powered recommendations based on your progress
-   **Deadline timeline**: Visual timeline of upcoming deadlines

### 🔔 Notifications

-   **Deadline alerts**: Get notified about upcoming deadlines
-   **Priority system**: Critical, high, and medium priority notifications
-   **Browser notifications**: Native notification support
-   **In-app banners**: Non-intrusive notification system

### 🎨 User Experience

-   **Dark mode**: Eye-friendly dark theme
-   **Responsive design**: Optimized for mobile and desktop
-   **Keyboard shortcuts**: Faster navigation (Ctrl+K for settings, Ctrl+E to export)
-   **Settings panel**: Centralized configuration
-   **Enhanced PWA**: Better offline support and caching

## 📋 Features

-   **Dashboard**: Overview of all applications and IELTS progress
-   **Germany Universities**: Track 10 German cyber security programs with application deadlines
-   **Schengen Countries**: Track 11 universities in early-deadline Schengen countries
-   **IELTS Tracker**: Monitor your IELTS preparation progress (15-day intensive plan)
-   **Scholarships**: Information about German scholarship opportunities
-   **Data Persistence**: All data automatically saved to browser localStorage
-   **Analytics**: Comprehensive charts and insights
-   **Export/Import**: Backup and restore functionality

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. Fork this repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Visit `https://yourusername.github.io/germany`

### Option 2: Local Development

Run a local HTTP server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/dashboard.html`

### Option 3: Install as PWA

1. Visit the app in Chrome/Edge/Safari
2. Click the install button in the address bar
3. Or use browser menu: "Install App" / "Add to Home Screen"

## 📁 Files Structure

### Core Files

-   `dashboard.html` - Main application page
-   `dashboard.js` - Core logic with localStorage persistence
-   `dashboard.css` - Professional styling
-   `index.html` - Redirect to dashboard

### New Feature Files

-   `data-manager.js` - Export/import and backup functionality
-   `notification-manager.js` - Deadline alerts and notifications
-   `analytics-manager.js` - Charts and insights generation
-   `settings-ui.js` - Settings modal and utilities
-   `enhancements.css` - Styles for new features

### Data Files

-   `germany-universities.json` - Germany university data (10 programs)
-   `schengen-universities.json` - Schengen country university data (11 programs)
-   `ielts.md` - IELTS preparation guide

### PWA Files

-   `sw.js` - Enhanced service worker for offline support
-   `manifest.json` - PWA manifest
-   `favicon.svg` - App icon

### Documentation

-   `README.md` - This file
-   `IMPROVEMENTS-SUMMARY.md` - Feature improvements summary
-   `GITHUB-PWA-SETUP.md` - PWA deployment guide
-   `PRINTABLE-A4-FORMAT.md` - Printable IELTS tracker

## 💾 Data Storage

All data is stored in browser localStorage:

-   `germany-applications` - Germany application tracking
-   `schengen-applications` - Schengen application tracking
-   `ielts-tasks` - IELTS task completion status
-   `ielts-scores` - IELTS practice scores
-   `dark-mode` - Theme preference
-   `notification-settings` - Notification preferences
-   `auto-backup-*` - Automatic backup files (last 5 kept)

## 🎯 How to Use

### 1. Track Applications

1. Go to "Germany Universities" or "Schengen Universities"
2. Browse available programs
3. Click "Track This University" to start tracking
4. Update status as you progress
5. Check off tasks as you complete them

### 2. Monitor IELTS Progress

1. Go to "IELTS Tracker"
2. Follow the 15-day intensive plan
3. Check off tasks as you complete them
4. Track your scores daily

### 3. View Analytics

1. Go to "Analytics & Insights"
2. See your progress charts
3. Review smart insights and recommendations
4. Check upcoming deadlines
5. Monitor IELTS performance trends

### 4. Manage Data

1. Press `Ctrl+K` or click "Settings & Data"
2. Export your data for backup
3. Import to restore or sync across devices
4. Enable browser notifications
5. Toggle dark mode
6. View storage usage

## ⌨️ Keyboard Shortcuts

-   `Ctrl+K` / `Cmd+K` - Open settings
-   `Ctrl+E` / `Cmd+E` - Export data
-   `Escape` - Close modals

## 📱 Mobile Installation

### iOS (Safari)

1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)

1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Install App" or "Add to Home Screen"
4. Tap "Install"

## 🔒 Privacy & Security

-   **100% Local**: All data stored in your browser
-   **No Server**: No data sent to external servers
-   **No Tracking**: No analytics or tracking scripts
-   **No Login**: No account required
-   **Offline-first**: Works without internet connection

## 🛠️ Technical Stack

-   Pure HTML5/CSS3/JavaScript
-   No frameworks or dependencies
-   Progressive Web App (PWA)
-   LocalStorage for data persistence
-   Service Worker for offline support
-   Responsive design (mobile-first)

## 📊 Browser Support

-   ✅ Chrome/Edge 90+
-   ✅ Firefox 88+
-   ✅ Safari 14+
-   ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Data not saving?

-   Check if localStorage is enabled in your browser
-   Make sure you're not in private/incognito mode
-   Try exporting and re-importing your data

### Notifications not working?

-   Check browser notification permissions
-   Enable notifications in Settings
-   Make sure notifications aren't blocked system-wide

### Can't install as PWA?

-   Use HTTPS (required for PWA)
-   Use GitHub Pages for automatic HTTPS
-   Check browser PWA support

### Dark mode not persisting?

-   Check if localStorage is enabled
-   Clear browser cache and reload

## 🚀 Advanced Features

### Auto-Backup System

-   Creates backups every 30 minutes
-   Keeps last 5 backups
-   Accessible via Settings → Data Management

### Smart Notifications

-   Checks deadlines every 4 hours
-   Priority levels: Critical (7 days), High (14 days), Medium (30 days)
-   Dismissible per day

### Data Export Format

```json
{
  "version": "1.0",
  "exportDate": "2025-12-13T...",
  "germany": [...],
  "schengen": [...],
  "ielts": {...},
  "ieltsScores": [...]
}
```

## 📈 Roadmap

Potential future enhancements:

-   [ ] University comparison tool
-   [ ] Document checklist tracker
-   [ ] Cost calculator
-   [ ] Email reminder integration
-   [ ] PDF export of applications
-   [ ] Collaborative features (share with friends)
-   [ ] More university programs
-   [ ] More countries

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:

-   Report bugs via GitHub Issues
-   Suggest features
-   Fork and customize for your needs

## 📄 License

Free to use for personal purposes. No warranty provided.

## 🙏 Acknowledgments

-   University data compiled from official websites
-   IELTS preparation plan based on Cambridge materials
-   Scholarship information from DAAD and official sources

## 📞 Support

For questions or issues:

-   Check the documentation files in this repo
-   Review troubleshooting section above
-   GitHub Issues for bug reports

---

**Version**: 2.0
**Last Updated**: December 2025
**Status**: ✅ Production Ready

---

## 🎓 Good luck with your applications!
