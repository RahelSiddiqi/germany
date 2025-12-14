// Notification Manager - Deadline alerts and reminders

class NotificationManager {
	constructor() {
		this.NOTIFICATION_KEY = 'notification-settings';
		this.DISMISSED_KEY = 'dismissed-notifications';
		this.REMINDER_KEY = 'study-reminders';
		this.init();
	}

	init() {
		// Request notification permission if supported
		if ('Notification' in window && Notification.permission === 'default') {
			this.requestPermission();
		}
		// Set up daily study reminder check
		this.checkStudyReminders();
	}

	async requestPermission() {
		if ('Notification' in window) {
			const permission = await Notification.requestPermission();
			return permission === 'granted';
		}
		return false;
	}

	// Study reminder settings
	getStudyReminderSettings() {
		const defaults = {
			enabled: true,
			ieltsReminder: true,
			deadlineReminder: true,
			dailyStudyGoal: 2, // hours
			reminderTime: '09:00',
		};
		const saved = localStorage.getItem(this.REMINDER_KEY);
		return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
	}

	saveStudyReminderSettings(settings) {
		localStorage.setItem(this.REMINDER_KEY, JSON.stringify(settings));
	}

	// Check study reminders
	checkStudyReminders() {
		const settings = this.getStudyReminderSettings();
		if (!settings.enabled) return;

		// Check IELTS study reminder
		if (settings.ieltsReminder) {
			const lastStudy = localStorage.getItem('ielts-last-study-date');
			const today = new Date().toDateString();
			if (lastStudy !== today) {
				this.showInAppNotification(
					'📚 Time for IELTS practice! Keep your streak going.',
					'info',
					8000,
				);
			}
		}

		// Check for today's deadlines
		if (settings.deadlineReminder) {
			const urgentDeadlines = this.getUpcomingDeadlines(7).filter(
				(d) =>
					d.daysRemaining <= 7 &&
					d.status !== 'submitted' &&
					d.status !== 'admitted',
			);
			if (urgentDeadlines.length > 0) {
				this.showInAppNotification(
					`🚨 ${urgentDeadlines.length} deadline${
						urgentDeadlines.length > 1 ? 's' : ''
					} within 7 days!`,
					'deadline',
					10000,
				);
			}
		}
	}

	// Mark IELTS study for today
	markIELTSStudy() {
		localStorage.setItem(
			'ielts-last-study-date',
			new Date().toDateString(),
		);
	}

	// Check upcoming deadlines
	getUpcomingDeadlines(daysAhead = 14) {
		const deadlines = [];
		const now = new Date();
		const cutoff = new Date();
		cutoff.setDate(cutoff.getDate() + daysAhead);

		// Get Germany universities
		const germanyData = JSON.parse(
			localStorage.getItem('germany-applications') || '[]',
		);

		// Get Schengen universities
		const schengenData = JSON.parse(
			localStorage.getItem('schengen-applications') || '[]',
		);

		// Load from JSON files if available
		if (typeof germanyUniversities !== 'undefined') {
			germanyUniversities.forEach((uni) => {
				if (uni.application_deadline) {
					const deadline = new Date(uni.application_deadline);
					if (deadline >= now && deadline <= cutoff) {
						const daysRemaining = Math.ceil(
							(deadline - now) / (1000 * 60 * 60 * 24),
						);
						deadlines.push({
							type: 'germany',
							university: uni.university,
							program: uni.program,
							deadline: uni.application_deadline,
							daysRemaining: daysRemaining,
							status: uni.status || 'not_started',
							priority: this.calculatePriority(
								daysRemaining,
								uni.status,
							),
						});
					}
				}
			});
		}

		if (typeof schengenUniversities !== 'undefined') {
			schengenUniversities.forEach((uni) => {
				if (uni.application_deadline) {
					const deadline = new Date(uni.application_deadline);
					if (deadline >= now && deadline <= cutoff) {
						const daysRemaining = Math.ceil(
							(deadline - now) / (1000 * 60 * 60 * 24),
						);
						deadlines.push({
							type: 'schengen',
							university: uni.university,
							program: uni.program,
							country: uni.country,
							deadline: uni.application_deadline,
							daysRemaining: daysRemaining,
							status: uni.status || 'not_started',
							priority: this.calculatePriority(
								daysRemaining,
								uni.status,
							),
						});
					}
				}
			});
		}

		// Sort by days remaining (most urgent first)
		return deadlines.sort((a, b) => a.daysRemaining - b.daysRemaining);
	}

	calculatePriority(daysRemaining, status) {
		// Critical if less than 7 days and not submitted
		if (
			daysRemaining <= 7 &&
			status !== 'submitted' &&
			status !== 'admitted'
		) {
			return 'critical';
		}
		// High if less than 14 days and not submitted
		if (
			daysRemaining <= 14 &&
			status !== 'submitted' &&
			status !== 'admitted'
		) {
			return 'high';
		}
		// Medium if less than 30 days
		if (daysRemaining <= 30) {
			return 'medium';
		}
		return 'low';
	}

	// Show browser notification
	showBrowserNotification(title, message, tag = null) {
		if ('Notification' in window && Notification.permission === 'granted') {
			const notification = new Notification(title, {
				body: message,
				icon: 'favicon.svg',
				badge: 'favicon.svg',
				tag: tag || 'study-abroad-' + Date.now(),
				requireInteraction: false,
			});

			notification.onclick = () => {
				window.focus();
				notification.close();
			};

			return notification;
		}
		return null;
	}

	// Show in-app notification banner
	showInAppNotification(message, type = 'info', duration = 5000) {
		const container = document.getElementById('notification-container');
		if (!container) {
			this.createNotificationContainer();
			return this.showInAppNotification(message, type, duration);
		}

		const notification = document.createElement('div');
		notification.className = `notification notification-${type}`;

		const icons = {
			info: 'ℹ️',
			success: '✅',
			warning: '⚠️',
			error: '❌',
			deadline: '⏰',
		};

		notification.innerHTML = `
			<span class="notification-icon">${icons[type] || icons.info}</span>
			<span class="notification-message">${message}</span>
			<button class="notification-close" onclick="this.parentElement.remove()">×</button>
		`;

		container.appendChild(notification);

		// Auto-remove after duration
		if (duration > 0) {
			setTimeout(() => {
				notification.style.opacity = '0';
				setTimeout(() => notification.remove(), 300);
			}, duration);
		}

		return notification;
	}

	createNotificationContainer() {
		if (!document.getElementById('notification-container')) {
			const container = document.createElement('div');
			container.id = 'notification-container';
			container.className = 'notification-container';
			document.body.appendChild(container);
		}
	}

	// Check and notify about upcoming deadlines
	checkDeadlinesAndNotify() {
		const deadlines = this.getUpcomingDeadlines();
		const dismissed = JSON.parse(
			localStorage.getItem(this.DISMISSED_KEY) || '{}',
		);
		const today = new Date().toDateString();

		deadlines.forEach((deadline) => {
			const notificationId = `${deadline.university}-${deadline.deadline}`;

			// Don't show if already dismissed today
			if (dismissed[notificationId] === today) {
				return;
			}

			if (deadline.priority === 'critical') {
				this.showInAppNotification(
					`🚨 URGENT: ${deadline.university} deadline in ${deadline.daysRemaining} days!`,
					'error',
					10000,
				);
			} else if (deadline.priority === 'high') {
				this.showInAppNotification(
					`⚠️ ${deadline.university} deadline in ${deadline.daysRemaining} days`,
					'warning',
					7000,
				);
			}
		});
	}

	// Dismiss notification for today
	dismissNotification(notificationId) {
		const dismissed = JSON.parse(
			localStorage.getItem(this.DISMISSED_KEY) || '{}',
		);
		dismissed[notificationId] = new Date().toDateString();
		localStorage.setItem(this.DISMISSED_KEY, JSON.stringify(dismissed));
	}

	// Get notification summary
	getNotificationSummary() {
		const deadlines = this.getUpcomingDeadlines();
		const critical = deadlines.filter(
			(d) => d.priority === 'critical',
		).length;
		const high = deadlines.filter((d) => d.priority === 'high').length;
		const medium = deadlines.filter((d) => d.priority === 'medium').length;

		return {
			total: deadlines.length,
			critical: critical,
			high: high,
			medium: medium,
			deadlines: deadlines,
		};
	}
}

// Export singleton instance
const notificationManager = new NotificationManager();

// Check deadlines on page load
setTimeout(() => {
	notificationManager.checkDeadlinesAndNotify();
}, 2000);

// Check deadlines every 4 hours
setInterval(() => {
	notificationManager.checkDeadlinesAndNotify();
}, 4 * 60 * 60 * 1000);
