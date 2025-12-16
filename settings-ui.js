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
	// Get IELTS tasks from ielts-tasks - same format as Band 8 tracker
	// Tasks are stored as mp-d{day}-{index}: true/false
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	let completedTasks = 0;

	Object.keys(tasks).forEach((key) => {
		// Count tasks that are completed (true) and match mp-d pattern
		if (tasks[key] && key.startsWith('mp-d')) {
			completedTasks++;
		}
	});

	// Get study time from study-streak
	const streakData = JSON.parse(localStorage.getItem('study-streak')) || {};
	const totalStudyMinutes = streakData.totalMinutes || 0;

	// Get total tasks from MASTER_PLAN if available
	let totalTasks = 180; // fallback
	if (typeof MASTER_PLAN !== 'undefined' && MASTER_PLAN.ieltsSchedule) {
		totalTasks = 0;
		MASTER_PLAN.ieltsSchedule.forEach((day) => {
			totalTasks += day.tasks.length;
		});
	}

	const tasksEl = document.getElementById('insights-tasks');
	const weightedEl = document.getElementById('insights-weighted');
	const unisEl = document.getElementById('insights-unis');

	if (tasksEl) tasksEl.textContent = `${completedTasks} / ${totalTasks}`;
	if (weightedEl) {
		// Points based on task completion percentage
		const points =
			totalTasks > 0
				? Math.round((completedTasks / totalTasks) * 1000)
				: 0;
		weightedEl.textContent = `${points} points`;
	}

	// Calculate universities applied from germany-applications and schengen-applications
	if (unisEl) {
		const germanyApps =
			JSON.parse(localStorage.getItem('germany-applications')) || [];
		const schengenApps =
			JSON.parse(localStorage.getItem('schengen-applications')) || [];
		const appliedGermany = germanyApps.filter(
			(u) => u.status === 'submitted' || u.status === 'admitted',
		).length;
		const appliedSchengen = schengenApps.filter(
			(u) => u.status === 'submitted' || u.status === 'admitted',
		).length;
		unisEl.textContent = `${appliedGermany + appliedSchengen}`;
	}

	// Update stat cards
	const totalTasksEl = document.getElementById('analytics-total-tasks');
	const studyHoursEl = document.getElementById('analytics-study-hours');
	const streakEl = document.getElementById('analytics-streak');
	const vocabEl = document.getElementById('analytics-vocab');

	if (totalTasksEl) totalTasksEl.textContent = completedTasks;

	// Calculate study hours from study-streak data (totalMinutes) + band8 hoursLogged
	if (studyHoursEl) {
		const streakData = JSON.parse(localStorage.getItem('study-streak')) || {};
		const streakMinutes = streakData.totalMinutes || 0;
		
		// Also get hours from band8_progress.hoursLogged
		const band8Progress = JSON.parse(localStorage.getItem('band8_progress')) || {};
		let band8Minutes = 0;
		if (band8Progress.hoursLogged) {
			Object.values(band8Progress.hoursLogged).forEach((hours) => {
				band8Minutes += (parseFloat(hours) || 0) * 60;
			});
		}
		
		// Use whichever is higher (avoid double counting)
		const totalMinutes = Math.max(streakMinutes, band8Minutes);
		const hours = (totalMinutes / 60).toFixed(1);
		studyHoursEl.textContent = `${hours}h`;
	}

	// Get streak
	if (streakEl) {
		const streakData =
			JSON.parse(localStorage.getItem('study-streak')) || {};
		streakEl.textContent = streakData.streak || 0;
	}

	// Get vocab learned count from ielts-vocab-learned (the actual data key)
	if (vocabEl) {
		const vocabData =
			JSON.parse(localStorage.getItem('ielts-vocab-learned')) || [];
		vocabEl.textContent = vocabData.length || 0;
	}

	// Update progress bars
	const ieltsPercent =
		totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
	const ieltsPercentEl = document.getElementById('analytics-ielts-percent');
	const ieltsBarEl = document.getElementById('analytics-ielts-bar');
	if (ieltsPercentEl) ieltsPercentEl.textContent = `${ieltsPercent}%`;
	if (ieltsBarEl) ieltsBarEl.style.width = `${ieltsPercent}%`;

	// Germany progress
	const germanyApps =
		JSON.parse(localStorage.getItem('germany-applications')) || [];
	const germanySubmitted = germanyApps.filter(
		(u) => u.status === 'submitted' || u.status === 'admitted',
	).length;
	const germanyTotal = germanyApps.length || 1;
	const germanyPercent = Math.round((germanySubmitted / germanyTotal) * 100);
	const germanyPercentEl = document.getElementById(
		'analytics-germany-percent',
	);
	const germanyBarEl = document.getElementById('analytics-germany-bar');
	if (germanyPercentEl)
		germanyPercentEl.textContent = `${germanySubmitted}/${germanyTotal} (${germanyPercent}%)`;
	if (germanyBarEl) germanyBarEl.style.width = `${germanyPercent}%`;

	// Schengen progress
	const schengenApps =
		JSON.parse(localStorage.getItem('schengen-applications')) || [];
	const schengenSubmitted = schengenApps.filter(
		(u) => u.status === 'submitted' || u.status === 'admitted',
	).length;
	const schengenTotal = schengenApps.length || 1;
	const schengenPercent = Math.round(
		(schengenSubmitted / schengenTotal) * 100,
	);
	const schengenPercentEl = document.getElementById(
		'analytics-schengen-percent',
	);
	const schengenBarEl = document.getElementById('analytics-schengen-bar');
	if (schengenPercentEl)
		schengenPercentEl.textContent = `${schengenSubmitted}/${schengenTotal} (${schengenPercent}%)`;
	if (schengenBarEl) schengenBarEl.style.width = `${schengenPercent}%`;

	// Today's study time
	const todayEl = document.getElementById('insights-today');
	if (todayEl) {
		const streakData =
			JSON.parse(localStorage.getItem('study-streak')) || {};
		const todayMinutes = streakData.todayMinutes || 0;
		todayEl.textContent = `${todayMinutes} min`;
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

// Check sync status with visual feedback
async function checkSyncStatus() {
	if (typeof cloudSync === 'undefined') {
		showNotification('❌ Cloud sync not initialized', 'error');
		return;
	}

	if (!cloudSync.syncEnabled || !cloudSync.user) {
		showNotification(
			'⚠️ Cloud sync not enabled. Please enable it first.',
			'warning',
		);
		return;
	}

	showNotification('🔍 Checking sync status...', 'info');

	try {
		// Try to get data from cloud
		const docRef = cloudSync.getUserDocRef();
		if (!docRef) {
			showNotification('❌ Cannot get user reference', 'error');
			return;
		}

		const doc = await docRef.get();
		if (doc.exists) {
			const data = doc.data();
			const lastUpdated = data.lastUpdated?.toDate?.() || 'Unknown';
			const germanyCount = data.germany?.length || 0;
			const schengenCount = data.schengen?.length || 0;
			const band8Keys = data.band8Progress
				? Object.keys(data.band8Progress).length
				: 0;

			showNotification(
				`✅ Sync working! Last: ${
					lastUpdated instanceof Date
						? lastUpdated.toLocaleString()
						: lastUpdated
				}\n📊 Germany: ${germanyCount}, Schengen: ${schengenCount}, IELTS days: ${band8Keys}`,
				'success',
			);
		} else {
			showNotification(
				'⚠️ No cloud data found. Try syncing first.',
				'warning',
			);
		}
	} catch (error) {
		console.error('Check sync error:', error);
		showNotification('❌ Error checking sync: ' + error.message, 'error');
	}
}

// Check notification status with test
async function checkNotificationStatus() {
	const statusText = document.getElementById('notification-status-text');
	const statusBadge = document.getElementById('notification-status-badge');

	// Check if notifications are supported
	if (!('Notification' in window)) {
		if (statusText)
			statusText.textContent = 'Not supported in this browser';
		if (statusBadge) {
			statusBadge.textContent = 'Unsupported';
			statusBadge.className =
				'px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
		}
		showNotification(
			'❌ Notifications not supported in this browser',
			'error',
		);
		return;
	}

	// Check permission status
	const permission = Notification.permission;

	if (permission === 'denied') {
		if (statusText) statusText.textContent = 'Blocked by browser';
		if (statusBadge) {
			statusBadge.textContent = 'Blocked';
			statusBadge.className =
				'px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
		}
		showNotification(
			'❌ Notifications are blocked. Please enable in browser settings.',
			'error',
		);
		return;
	}

	if (permission === 'default') {
		// Request permission
		const result = await Notification.requestPermission();
		if (result !== 'granted') {
			if (statusText) statusText.textContent = 'Permission denied';
			if (statusBadge) {
				statusBadge.textContent = 'Denied';
				statusBadge.className =
					'px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
			}
			showNotification('⚠️ Notification permission denied', 'warning');
			return;
		}
	}

	// Permission granted - send test notification
	if (statusText) statusText.textContent = 'Enabled and working';
	if (statusBadge) {
		statusBadge.textContent = 'Enabled';
		statusBadge.className =
			'px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
	}

	// Send test notification using Service Worker (required for mobile)
	try {
		if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
			const registration = await navigator.serviceWorker.ready;
			await registration.showNotification('✅ Study Hub Notification Test', {
				body: 'Notifications are working correctly!',
				icon: '/germany/icon-192.png',
				badge: '/germany/icon-192.png',
				tag: 'test-notification',
				vibrate: [200, 100, 200],
				requireInteraction: false
			});
			showNotification(
				'✅ Test notification sent! Check your notification panel.',
				'success',
			);
		} else {
			// Fallback to regular Notification for desktop
			const notification = new Notification(
				'✅ Study Hub Notification Test',
				{
					body: 'Notifications are working correctly!',
					icon: '/germany/icon-192.png',
					tag: 'test-notification',
				},
			);
			notification.onclick = () => {
				window.focus();
				notification.close();
			};
			showNotification(
				'✅ Test notification sent! Check your notification panel.',
				'success',
			);
		}
	} catch (error) {
		console.error('Notification error:', error);
		showNotification(
			'⚠️ Error sending notification: ' + error.message,
			'warning',
		);
	}
}

// Initialize notification status on page load
function initNotificationStatus() {
	const statusText = document.getElementById('notification-status-text');
	const statusBadge = document.getElementById('notification-status-badge');

	if (!('Notification' in window)) {
		if (statusText) statusText.textContent = 'Not supported';
		if (statusBadge) {
			statusBadge.textContent = 'N/A';
			statusBadge.className =
				'px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
		}
		return;
	}

	const permission = Notification.permission;

	if (permission === 'granted') {
		if (statusText) statusText.textContent = 'Enabled';
		if (statusBadge) {
			statusBadge.textContent = 'On';
			statusBadge.className =
				'px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
		}
	} else if (permission === 'denied') {
		if (statusText) statusText.textContent = 'Blocked by browser';
		if (statusBadge) {
			statusBadge.textContent = 'Off';
			statusBadge.className =
				'px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
		}
	} else {
		if (statusText) statusText.textContent = 'Not yet enabled';
		if (statusBadge) {
			statusBadge.textContent = 'Ask';
			statusBadge.className =
				'px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
		}
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
		initNotificationStatus();
	}, 1000);
});
