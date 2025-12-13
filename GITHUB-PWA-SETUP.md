# GITHUB PWA SETUP

**5-minute deployment guide**

---

## Quick Start

### 1. Create GitHub Repo

```bash
git clone https://github.com/YOUR_USERNAME/ielts-tracker
cd ielts-tracker
```

### 2. Copy Files Below to Repo

### 3. Push to GitHub

```bash
git add .
git commit -m "IELTS Tracker"
git push origin main
```

### 4. Enable GitHub Pages

Settings → Pages → Deploy from Branch (main) → Save

### 5. Access

`https://YOUR_USERNAME.github.io/ielts-tracker`

### 6. Install as App

-   **iOS**: Safari → Share → Add to Home Screen
-   **Android**: Chrome → Menu → Install App

---

## Files to Create

---

## Files to Create

### index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="theme-color" content="#2196F3" />
		<title>IELTS Band 8.5 Tracker</title>
		<link rel="manifest" href="manifest.json" />
		<link rel="stylesheet" href="style.css" />
	</head>
	<body>
		<div class="container">
			<header>
				<h1>🎯 IELTS Band 8.5</h1>
				<p>15-Day Intensive Tracker</p>
			</header>

			<div class="tabs">
				<button class="tab-btn active" onclick="showTab('scores')">
					Scores
				</button>
				<button class="tab-btn" onclick="showTab('progress')">
					Progress
				</button>
			</div>

			<div id="scores" class="tab-content active">
				<h2>Track Scores</h2>
				<div class="form">
					<label
						>Day: <input type="number" id="day" min="1" max="15"
					/></label>
					<label
						>Listening:
						<input
							type="number"
							id="listening"
							min="0"
							max="9"
							step="0.5"
					/></label>
					<label
						>Reading:
						<input
							type="number"
							id="reading"
							min="0"
							max="9"
							step="0.5"
					/></label>
					<label
						>Writing:
						<input
							type="number"
							id="writing"
							min="0"
							max="9"
							step="0.5"
					/></label>
					<label
						>Speaking:
						<input
							type="number"
							id="speaking"
							min="0"
							max="9"
							step="0.5"
					/></label>
					<button onclick="saveScore()">Save</button>
				</div>
				<div id="scores-list"></div>
			</div>

			<div id="progress" class="tab-content">
				<h2>Progress</h2>
				<div id="stats"></div>
			</div>
		</div>

		<script src="app.js"></script>
	</body>
</html>
```

### app.js

```javascript
let scores = JSON.parse(localStorage.getItem('ielts-scores')) || [];

function saveScore() {
	const day = document.getElementById('day').value;
	const l = parseFloat(document.getElementById('listening').value);
	const r = parseFloat(document.getElementById('reading').value);
	const w = parseFloat(document.getElementById('writing').value);
	const s = parseFloat(document.getElementById('speaking').value);

	if (day && l && r && w && s) {
		scores = scores.filter((x) => x.day !== parseInt(day));
		scores.push({
			day: parseInt(day),
			l,
			r,
			w,
			s,
			avg: ((l + r + w + s) / 4).toFixed(1),
		});
		scores.sort((a, b) => a.day - b.day);
		localStorage.setItem('ielts-scores', JSON.stringify(scores));
		displayScores();
		alert('✓ Saved!');
	}
}

function displayScores() {
	const list = document.getElementById('scores-list');
	list.innerHTML =
		'<table><tr><th>Day</th><th>L</th><th>R</th><th>W</th><th>S</th><th>Avg</th></tr>' +
		scores
			.map(
				(s) =>
					`<tr><td>Day ${s.day}</td><td>${s.l}</td><td>${s.r}</td><td>${s.w}</td><td>${s.s}</td><td><b>${s.avg}</b></td></tr>`,
			)
			.join('') +
		'</table>';
}

function showTab(tab) {
	document
		.querySelectorAll('.tab-content')
		.forEach((el) => el.classList.remove('active'));
	document.getElementById(tab).classList.add('active');
	document
		.querySelectorAll('.tab-btn')
		.forEach((el) => el.classList.remove('active'));
	event.target.classList.add('active');
	if (tab === 'progress') displayProgress();
}

function displayProgress() {
	const stats = document.getElementById('stats');
	if (scores.length === 0) {
		stats.innerHTML = '<p>No scores yet</p>';
		return;
	}
	const avg = (
		scores.reduce((sum, s) => sum + parseFloat(s.avg), 0) / scores.length
	).toFixed(1);
	stats.innerHTML = `<div class="stat"><h3>Current Average</h3><p class="big">${avg} / 9</p></div>`;
}

displayScores();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
```

### style.css

```css
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	font-family: Arial, sans-serif;
	background: #f5f5f5;
	color: #333;
}
.container {
	max-width: 600px;
	margin: 0 auto;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	overflow: hidden;
}
header {
	background: linear-gradient(135deg, #2196f3 0%, #21cbf3 100%);
	color: white;
	padding: 20px;
	text-align: center;
}
header h1 {
	font-size: 24px;
	margin-bottom: 5px;
}
header p {
	font-size: 14px;
	opacity: 0.9;
}
.tabs {
	display: flex;
	border-bottom: 2px solid #e0e0e0;
}
.tab-btn {
	flex: 1;
	padding: 12px;
	border: none;
	background: transparent;
	cursor: pointer;
	font-weight: 600;
	color: #666;
}
.tab-btn.active {
	color: #2196f3;
	border-bottom: 3px solid #2196f3;
}
.tab-content {
	display: none;
	padding: 20px;
}
.tab-content.active {
	display: block;
}
h2 {
	color: #2196f3;
	margin-bottom: 15px;
	font-size: 18px;
}
.form {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	margin-bottom: 20px;
	background: #f9f9f9;
	padding: 15px;
	border-radius: 6px;
}
.form label {
	display: flex;
	flex-direction: column;
	gap: 3px;
	font-weight: 600;
	font-size: 14px;
}
.form input {
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 14px;
}
.form button {
	grid-column: 1 / -1;
	padding: 10px;
	background: #2196f3;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: 600;
}
.form button:hover {
	background: #1976d2;
}
table {
	width: 100%;
	border-collapse: collapse;
}
table th {
	background: #f5f5f5;
	padding: 10px;
	text-align: left;
	font-weight: 600;
	border-bottom: 2px solid #ddd;
}
table td {
	padding: 10px;
	border-bottom: 1px solid #eee;
	text-align: center;
}
.stat {
	background: #f9f9f9;
	padding: 15px;
	border-radius: 6px;
	text-align: center;
}
.stat h3 {
	color: #2196f3;
	margin-bottom: 5px;
}
.stat .big {
	font-size: 28px;
	font-weight: bold;
	color: #2196f3;
}
@media (max-width: 600px) {
	.form {
		grid-template-columns: 1fr;
	}
}
```

### manifest.json

```json
{
	"name": "IELTS Band 8.5 Tracker",
	"short_name": "IELTS Tracker",
	"start_url": "/ielts-tracker/",
	"display": "standalone",
	"background_color": "#ffffff",
	"theme_color": "#2196F3",
	"orientation": "portrait"
}
```

### sw.js

```javascript
self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request).catch(() => caches.match(event.request)),
	);
});
```

### README.md

```markdown
# IELTS Band 8.5 Tracker

Simple score tracker for 15-day IELTS prep.

## Features

-   Track Listening, Reading, Writing, Speaking scores
-   View progress
-   Offline support
-   Mobile app ready

## Deploy

1. Fork/clone this repo
2. Enable GitHub Pages (main branch)
3. Visit: `https://YOUR_USERNAME.github.io/ielts-tracker`

## Use

1. Enter day number
2. Enter scores (0-9)
3. Click Save
4. View progress

## Install as App

-   **iOS**: Safari → Share → Add to Home Screen
-   **Android**: Chrome menu → Install app

Good luck! 🎯
```

---

## ✅ NEXT STEPS

1. Copy all files above into GitHub repo
2. Push to GitHub
3. Wait for GitHub Pages to deploy (1-2 min)
4. Share link with friends/tutors
5. Install as app on your phone
6. Start tracking daily!

---

**Your tracker is now live and ready to use!** 🚀
