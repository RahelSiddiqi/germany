// Settings UI and utility functions - Tailwind version

// Open settings modal
function openSettingsModal() {
	const modal = document.getElementById('settings-modal');
	if (modal) {
		modal.classList.remove('hidden');
		modal.classList.add('flex');
		updateStorageDisplay();
		updateNotificationButton();
		updateThemeButton();
		updateSyncUI();
	}
}

// Close settings modal
function closeSettingsModal() {
	const modal = document.getElementById('settings-modal');
	if (modal) {
		modal.classList.add('hidden');
		modal.classList.remove('flex');
	}
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
	const modal = document.getElementById('settings-modal');
	if (e.target === modal) {
		closeSettingsModal();
	}
});

// Export data
function exportData() {
	try {
		const success = dataManager.exportAllData();
		if (success) {
			showNotification('✅ Data exported successfully!', 'success');
		}
	} catch (error) {
		showNotification('❌ Failed to export data: ' + error.message, 'error');
	}
}

// Import data
async function importData(input) {
	const file = input.files[0];
	if (!file) return;

	try {
		const result = await dataManager.importData(file);
		if (result.success) {
			showNotification(result.message, 'success');
			// Reload page to show imported data
			setTimeout(() => {
				location.reload();
			}, 1500);
		}
	} catch (error) {
		showNotification(error.message || 'Failed to import data', 'error');
	}

	// Reset file input
	input.value = '';
}

// Clear all data
function clearAllData() {
	if (
		!confirm(
			'Are you sure you want to clear all data? This cannot be undone.',
		)
	) {
		return;
	}
	const cleared = dataManager.clearAllData();
	if (cleared) {
		showNotification('All data cleared successfully', 'success');
		setTimeout(() => {
			location.reload();
		}, 1000);
	}
}

// Show notification toast
function showNotification(message, type = 'info') {
	// Use notificationManager if available, otherwise create toast
	if (
		typeof notificationManager !== 'undefined' &&
		notificationManager.showInAppNotification
	) {
		notificationManager.showInAppNotification(message, type);
		return;
	}

	// Fallback toast
	const colors = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		warning: 'bg-yellow-500',
		info: 'bg-teal-500',
	};

	const toast = document.createElement('div');
	toast.className = `fixed bottom-4 right-4 ${
		colors[type] || colors.info
	} text-white px-4 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-y-full`;
	toast.textContent = message;
	document.body.appendChild(toast);

	requestAnimationFrame(() => {
		toast.classList.remove('translate-y-full');
	});

	setTimeout(() => {
		toast.classList.add('translate-y-full');
		setTimeout(() => toast.remove(), 300);
	}, 3000);
}

// Update storage usage display
function updateStorageDisplay() {
	try {
		const stats = dataManager.getStorageStats();
		const display = document.getElementById('storage-usage');
		if (display) {
			display.textContent = `Using ${stats.total.sizeKB} KB of storage`;
		}
	} catch (e) {
		const display = document.getElementById('storage-usage');
		if (display) {
			display.textContent = 'Storage info not available';
		}
	}
}

// Update analytics page with task stats
function updateAnalyticsPage() {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	const completed = Object.values(tasks).filter(Boolean).length;
	const total = Object.keys(tasks).length;

	const tasksEl = document.getElementById('insights-tasks');
	const weightedEl = document.getElementById('insights-weighted');
	const unisEl = document.getElementById('insights-unis');

	if (tasksEl) tasksEl.textContent = `${completed} / ${total}`;
	if (weightedEl) {
		// Simple weighted calculation
		weightedEl.textContent = `${completed * 2} points`;
	}
	
	// Calculate universities applied
	if (unisEl) {
		const germanyProgress = JSON.parse(localStorage.getItem('germany-progress')) || {};
		const schengenProgress = JSON.parse(localStorage.getItem('schengen-progress')) || {};
		const appliedGermany = Object.values(germanyProgress).filter(s => s === 'applied' || s === 'accepted').length;
		const appliedSchengen = Object.values(schengenProgress).filter(s => s === 'applied' || s === 'accepted').length;
		unisEl.textContent = `${appliedGermany + appliedSchengen}`;
	}
	
	// Update stat cards
	const totalTasksEl = document.getElementById('analytics-total-tasks');
	const studyHoursEl = document.getElementById('analytics-study-hours');
	const streakEl = document.getElementById('analytics-streak');
	const vocabEl = document.getElementById('analytics-vocab');
	
	if (totalTasksEl) totalTasksEl.textContent = completed;
	
	// Calculate study hours from band8 data
	if (studyHoursEl) {
		const band8Progress = JSON.parse(localStorage.getItem('band8_progress')) || {};
		let totalHours = 0;
		Object.values(band8Progress).forEach(day => {
			if (day && day.hoursLogged) {
				totalHours += parseFloat(day.hoursLogged) || 0;
			}
		});
		studyHoursEl.textContent = `${totalHours.toFixed(1)}h`;
	}
	
	// Get streak
	if (streakEl) {
		const streakData = JSON.parse(localStorage.getItem('study-streak')) || {};
		streakEl.textContent = streakData.streak || 0;
	}
	
	// Get vocab learned count
	if (vocabEl) {
		const vocabData = JSON.parse(localStorage.getItem('ielts-vocab')) || {};
		const learnedCount = Object.values(vocabData).filter(v => v && v.learned).length;
		vocabEl.textContent = learnedCount;
	}
}

// Enable notifications
async function enableNotifications() {
	const granted = await notificationManager.requestPermission();
	if (granted) {
		showNotification(
			"Notifications enabled! You'll receive deadline alerts.",
			'success',
		);
		updateNotificationButton();
	} else {
		showNotification('Notification permission denied', 'warning');
	}
}

// Update notification button state
function updateNotificationButton() {
	const btn = document.getElementById('enable-notifications');
	if (btn && 'Notification' in window) {
		if (Notification.permission === 'granted') {
			btn.innerHTML = `
				<svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
				</svg>
				Notifications Enabled
			`;
			btn.classList.remove('bg-teal-600', 'hover:bg-teal-700');
			btn.classList.add(
				'bg-green-100',
				'dark:bg-green-900/30',
				'text-green-700',
				'dark:text-green-300',
				'cursor-default',
			);
			btn.disabled = true;
		}
	}
}

// Check deadlines manually
function checkDeadlinesManually() {
	notificationManager.checkDeadlinesAndNotify();
	const summary = notificationManager.getNotificationSummary();

	if (summary.total === 0) {
		showNotification('No upcoming deadlines in the next 14 days', 'info');
	} else {
		showNotification(
			`Found ${summary.total} upcoming deadlines (${summary.critical} critical, ${summary.high} high priority)`,
			summary.critical > 0 ? 'warning' : 'info',
		);
	}
}

// Update theme button
function updateThemeButton() {
	const btn = document.getElementById('theme-toggle');
	const isDark = document.documentElement.classList.contains('dark');
	if (btn) {
		btn.innerHTML = isDark
			? `
			<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
			</svg>
			Light Mode
		`
			: `
			<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
			</svg>
			Dark Mode
		`;
	}
}

// Display analytics page with Tailwind styling
function displayAnalytics() {
	// Insights
	const insightsContainer = document.getElementById('insights-section');
	if (insightsContainer && typeof analyticsManager !== 'undefined') {
		const insights = analyticsManager.getInsights();

		if (insights.length > 0) {
			const iconMap = {
				success:
					'<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
				warning:
					'<svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
				critical:
					'<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
				info: '<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
			};

			const colorMap = {
				success:
					'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
				warning:
					'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
				critical:
					'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
				info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
			};

			let html = `
				<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
						<span class="mr-2">💡</span> Insights & Recommendations
					</h3>
					<div class="space-y-3">
			`;

			insights.forEach((insight) => {
				html += `
					<div class="${
						colorMap[insight.type]
					} border rounded-lg p-3 flex items-start gap-3">
						<div class="flex-shrink-0 mt-0.5">${iconMap[insight.type]}</div>
						<div class="text-sm text-gray-700 dark:text-gray-300">${insight.message}</div>
					</div>
				`;
			});

			html += '</div></div>';
			insightsContainer.innerHTML = html;
		} else {
			insightsContainer.innerHTML = '';
		}
	}

	// Progress charts
	const progressContainer = document.getElementById('progress-charts');
	if (progressContainer && typeof analyticsManager !== 'undefined') {
		progressContainer.innerHTML = analyticsManager.generateProgressChart();
	}

	// Status charts
	const statusContainer = document.getElementById('status-charts');
	if (statusContainer && typeof analyticsManager !== 'undefined') {
		statusContainer.innerHTML =
			analyticsManager.generateStatusChart('combined');
	}

	// Deadline timeline
	const deadlineContainer = document.getElementById(
		'deadline-timeline-section',
	);
	if (deadlineContainer && typeof analyticsManager !== 'undefined') {
		deadlineContainer.innerHTML =
			analyticsManager.generateDeadlineTimeline();
	}

	// IELTS analytics
	const ieltsContainer = document.getElementById('ielts-analytics');
	if (ieltsContainer && typeof analyticsManager !== 'undefined') {
		ieltsContainer.innerHTML = analyticsManager.generateIELTSChart();
	}
}

// Add analytics to page navigation
if (typeof showPage !== 'undefined') {
	const originalShowPage = showPage;
	window.showPage = function (pageId) {
		originalShowPage(pageId);
		if (pageId === 'analytics') {
			// Small delay to ensure data is loaded
			setTimeout(displayAnalytics, 100);
		}
	};
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
	// Ctrl/Cmd + K to open settings
	if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
		e.preventDefault();
		openSettingsModal();
	}

	// Escape to close modal
	if (e.key === 'Escape') {
		closeSettingsModal();
	}

	// Ctrl/Cmd + E to export data
	if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
		e.preventDefault();
		exportData();
	}
});

// Auto-update storage display when settings modal is open
setInterval(() => {
	const modal = document.getElementById('settings-modal');
	if (modal && !modal.classList.contains('hidden')) {
		updateStorageDisplay();
	}
}, 2000);

// Show welcome notification on first visit
setTimeout(() => {
	const firstVisit = localStorage.getItem('first-visit');
	if (!firstVisit) {
		showNotification(
			'👋 Welcome! Check out the Analytics page and Settings for new features.',
			'info',
		);
		localStorage.setItem('first-visit', 'done');
	}
}, 3000);

// ==========================================
// Cloud Sync UI Functions
// ==========================================

// Update sync UI
function updateSyncUI() {
	const syncStatus = document.getElementById('sync-status');
	const syncBtn = document.getElementById('sync-btn');
	const googleBtn = document.getElementById('google-signin-btn');

	if (typeof cloudSync === 'undefined') {
		if (syncStatus) syncStatus.textContent = 'Not configured';
		return;
	}

	if (cloudSync.user) {
		if (syncStatus) {
			const name =
				cloudSync.user.displayName ||
				cloudSync.user.email ||
				'Anonymous';
			syncStatus.innerHTML = `<span class="text-green-600 dark:text-green-400">● Connected as ${name}</span>`;
		}
		if (syncBtn) {
			syncBtn.innerHTML = `
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
				</svg>
				Sync Now
			`;
		}
		if (googleBtn) {
			googleBtn.innerHTML = `
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
				</svg>
				Sign Out
			`;
			googleBtn.onclick = signOutCloud;
		}
	} else {
		if (syncStatus)
			syncStatus.innerHTML =
				'<span class="text-gray-500">Not signed in</span>';
	}
}

// Toggle cloud sync (anonymous sign in)
async function toggleCloudSync() {
	if (typeof cloudSync === 'undefined') {
		showNotification('☁️ Cloud sync is not configured yet', 'info');
		showCloudSyncSetupInstructions();
		return;
	}

	if (cloudSync.user) {
		// Already signed in, sign out
		await cloudSync.signOut();
		showNotification('Cloud sync disabled', 'info');
		updateSyncUI();
	} else {
		// Sign in anonymously
		const user = await cloudSync.signInAnonymously();
		if (user) {
			cloudSync.setupAutoSync();
			showNotification(
				'☁️ Cloud sync enabled! Your progress will sync across devices.',
				'success',
			);
			updateSyncUI();
		}
	}
}

// Sign in with Google
async function signInWithGoogle() {
	if (typeof cloudSync === 'undefined') {
		showNotification('☁️ Cloud sync is not configured yet', 'info');
		showCloudSyncSetupInstructions();
		return;
	}

	const user = await cloudSync.signInWithGoogle();
	if (user) {
		cloudSync.setupAutoSync();
		showNotification(
			`☁️ Signed in as ${user.displayName || user.email}`,
			'success',
		);
		updateSyncUI();
	}
}

// Sign out from cloud
async function signOutCloud() {
	if (typeof cloudSync !== 'undefined' && cloudSync.user) {
		await cloudSync.signOut();
		showNotification('Signed out successfully', 'info');
		updateSyncUI();
	}
}

// Manual sync
async function manualSync() {
	if (typeof cloudSync === 'undefined' || !cloudSync.user) {
		showNotification('Please enable cloud sync first', 'info');
		return;
	}

	showNotification('🔄 Syncing...', 'info');

	// Push local changes to cloud
	const pushSuccess = await cloudSync.syncToCloud();

	// Pull cloud changes to local
	const pullSuccess = await cloudSync.syncFromCloud();

	if (pushSuccess && pullSuccess) {
		showNotification('✅ Sync completed successfully!', 'success');
	} else {
		showNotification(
			'⚠️ Sync had some issues, please try again',
			'warning',
		);
	}
}

// Show setup instructions
function showCloudSyncSetupInstructions() {
	const instructions = `
To enable cloud sync:

1. Go to Firebase Console (https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Anonymous + Google)
4. Enable Firestore Database
5. Copy your config to firebase-sync.js

For detailed steps, check FIREBASE-SETUP.md in the project.
	`;
	alert(instructions);
}

// Update sync UI on page load
document.addEventListener('DOMContentLoaded', () => {
	// Update sync status after a delay to allow Firebase to initialize
	setTimeout(() => {
		if (typeof cloudSync !== 'undefined') {
			cloudSync.updateSyncUI();
		}
		updateSyncUI();
	}, 1000);
});
