# Study Abroad Dashboard

A comprehensive web application for tracking university applications and IELTS preparation for studying abroad in Germany and Schengen countries.

## Features

- **Dashboard**: Overview of all applications and IELTS progress
- **Germany Universities**: Track 10 German cyber security programs with application deadlines
- **Schengen Countries**: Track 11 universities in early-deadline Schengen countries
- **IELTS Tracker**: Monitor your IELTS preparation progress
- **Scholarships**: Information about German scholarship opportunities
- **Data Persistence**: All data automatically saved to browser localStorage

## Data Storage

All data is stored in browser localStorage, making the app work perfectly on GitHub Pages without any backend server required.

- Germany applications data: Saved to `germany-applications` key
- Schengen applications data: Saved to `schengen-applications` key
- IELTS progress: Saved to localStorage

## Files

- `dashboard.html` - Main application page
- `dashboard.js` - Core logic with localStorage persistence
- `dashboard.css` - Professional styling
- `germany-universities.json` - Germany university data
- `schengen-universities.json` - Schengen country university data
- `app.js` - IELTS tracker logic
- `style.css` - IELTS page styling
- `sw.js` - Service worker for offline support
- `manifest.json` - PWA manifest

## Local Development

Run a local HTTP server:
```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/dashboard.html`

## GitHub Pages Deployment

This app is ready for GitHub Pages deployment. Simply push to your GitHub repository and enable Pages in repository settings.

- All data persists in the browser's localStorage
- No backend server required
- No build process needed
- Works as static HTML/CSS/JS

## Data Persistence

Data is automatically saved to localStorage whenever you:
- Add a new university
- Change application status
- Toggle task completion
- Update IELTS progress

Data survives browser sessions and is only cleared when browser storage is manually cleared.
