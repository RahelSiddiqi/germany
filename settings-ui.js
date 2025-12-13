// Settings UI and utility functions

// Open settings modal
function openSettingsModal() {
	const modal = document.getElementById('settings-modal');
	if (modal) {
		modal.classList.add('active');
		updateStorageDisplay();
		updateNotificationButton();
		updateThemeButton();
	}
}

// Close settings modal
function closeSettingsModal() {
	const modal = document.getElementById('settings-modal');
	if (modal) {
		modal.classList.remove('active');
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
			notificationManager.showInAppNotification(
				'✅ Data exported successfully!',
				'success',
			);
		}
	} catch (error) {
		notificationManager.showInAppNotification(
			'❌ Failed to export data: ' + error.message,
			'error',
		);
	}
}

// Import data
async function importData(input) {
	const file = input.files[0];
	if (!file) return;

	try {
		const result = await dataManager.importData(file);
		if (result.success) {
			notificationManager.showInAppNotification(
				result.message,
				'success',
			);
			// Reload page to show imported data
			setTimeout(() => {
				location.reload();
			}, 1500);
		}
	} catch (error) {
		notificationManager.showInAppNotification(
			error.message || 'Failed to import data',
			'error',
		);
	}

	// Reset file input
	input.value = '';
}

// Clear all data
function clearAllData() {
	const cleared = dataManager.clearAllData();
	if (cleared) {
		notificationManager.showInAppNotification(
			'All data cleared successfully',
			'success',
		);
		setTimeout(() => {
			location.reload();
		}, 1000);
	}
}

// Update storage usage display
function updateStorageDisplay() {
	const stats = dataManager.getStorageStats();
	const display = document.getElementById('storage-usage');
	if (display) {
		display.textContent = `Using ${stats.total.sizeKB} KB of storage`;
	}
}

// Enable notifications
async function enableNotifications() {
	const granted = await notificationManager.requestPermission();
	if (granted) {
		notificationManager.showInAppNotification(
			"Notifications enabled! You'll receive deadline alerts.",
			'success',
		);
		updateNotificationButton();
	} else {
		notificationManager.showInAppNotification(
			'Notification permission denied',
			'warning',
		);
	}
}

// Update notification button state
function updateNotificationButton() {
	const btn = document.getElementById('enable-notifications');
	if (btn && 'Notification' in window) {
		if (Notification.permission === 'granted') {
			btn.textContent = '✓ Enabled';
			btn.classList.remove('btn-secondary');
			btn.classList.add('btn-success');
			btn.disabled = true;
		}
	}
}

// Check deadlines manually
function checkDeadlinesManually() {
	notificationManager.checkDeadlinesAndNotify();
	const summary = notificationManager.getNotificationSummary();

	if (summary.total === 0) {
		notificationManager.showInAppNotification(
			'No upcoming deadlines in the next 14 days',
			'info',
		);
	} else {
		notificationManager.showInAppNotification(
			`Found ${summary.total} upcoming deadlines (${summary.critical} critical, ${summary.high} high priority)`,
			summary.critical > 0 ? 'warning' : 'info',
		);
	}
}

// Dark mode
function toggleDarkMode() {
	document.body.classList.toggle('dark-mode');
	const isDark = document.body.classList.contains('dark-mode');
	localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
	updateThemeButton();
}

// Update theme button
function updateThemeButton() {
	const btn = document.getElementById('theme-toggle');
	const isDark = document.body.classList.contains('dark-mode');
	if (btn) {
		btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
	}
}

// Load dark mode preference
function loadDarkModePreference() {
	const preference = localStorage.getItem('dark-mode');
	if (preference === 'enabled') {
		document.body.classList.add('dark-mode');
	}
}

// Initialize dark mode on page load
loadDarkModePreference();

// Display analytics page
function displayAnalytics() {
	// Insights
	const insightsContainer = document.getElementById('insights-section');
	if (insightsContainer) {
		const insights = analyticsManager.getInsights();

		if (insights.length > 0) {
			let html =
				'<div class="insights-container"><h3>💡 Insights & Recommendations</h3>';
			insights.forEach((insight) => {
				const iconMap = {
					success: '✅',
					warning: '⚠️',
					critical: '🚨',
					info: 'ℹ️',
				};
				html += `
					<div class="insight-item ${insight.type}">
						<div class="insight-icon">${iconMap[insight.type]}</div>
						<div class="insight-message">${insight.message}</div>
					</div>
				`;
			});
			html += '</div>';
			insightsContainer.innerHTML = html;
		} else {
			insightsContainer.innerHTML = '';
		}
	}

	// Progress charts
	const progressContainer = document.getElementById('progress-charts');
	if (progressContainer) {
		progressContainer.innerHTML = analyticsManager.generateProgressChart();
	}

	// Status charts
	const statusContainer = document.getElementById('status-charts');
	if (statusContainer) {
		statusContainer.innerHTML =
			analyticsManager.generateStatusChart('combined');
	}

	// Deadline timeline
	const deadlineContainer = document.getElementById(
		'deadline-timeline-section',
	);
	if (deadlineContainer) {
		deadlineContainer.innerHTML =
			analyticsManager.generateDeadlineTimeline();
	}

	// IELTS analytics
	const ieltsContainer = document.getElementById('ielts-analytics');
	if (ieltsContainer) {
		ieltsContainer.innerHTML = analyticsManager.generateIELTSChart();
	}
}

// Add analytics to page navigation
const originalShowPage = showPage;
if (typeof showPage !== 'undefined') {
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
	if (modal && modal.classList.contains('active')) {
		updateStorageDisplay();
	}
}, 2000);

// Show welcome notification on first visit
setTimeout(() => {
	const firstVisit = localStorage.getItem('first-visit');
	if (!firstVisit) {
		notificationManager.showInAppNotification(
			'👋 Welcome! Check out the Analytics page and Settings for new features.',
			'info',
			8000,
		);
		localStorage.setItem('first-visit', 'done');
	}
}, 3000);
