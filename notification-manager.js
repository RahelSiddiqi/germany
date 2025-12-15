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

		// Schedule task reminders after a short delay (to ensure other modules are loaded)
		setTimeout(() => {
			this.scheduleTaskReminders();
		}, 2000);
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

		// Check IELTS study reminder with current task
		if (settings.ieltsReminder) {
			const currentTask = this.getCurrentScheduledTask();
			if (currentTask) {
				this.showInAppNotification(
					`📚 Current Task (${currentTask.time}): ${currentTask.task}`,
					'info',
					10000,
				);
			} else {
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

	// Get current scheduled task based on time of day
	getCurrentScheduledTask() {
		if (
			typeof MASTER_PLAN === 'undefined' ||
			typeof band8Dashboard === 'undefined'
		) {
			return null;
		}

		const currentDay = band8Dashboard.getActualDay();
		const dayData = band8Dashboard.getDayData(currentDay);
		if (!dayData || !dayData.tasks) return null;

		const now = new Date();
		const currentHour = now.getHours();
		const currentMinute = now.getMinutes();
		const currentTimeMinutes = currentHour * 60 + currentMinute;

		// Find the current task based on time
		for (const taskItem of dayData.tasks) {
			if (typeof taskItem === 'object' && taskItem.time) {
				// Parse time like "06:30-08:00" or "21:00"
				const timeMatch = taskItem.time.match(
					/(\d{2}):(\d{2})(?:-(\d{2}):(\d{2}))?/,
				);
				if (timeMatch) {
					const startHour = parseInt(timeMatch[1]);
					const startMinute = parseInt(timeMatch[2]);
					const endHour = timeMatch[3]
						? parseInt(timeMatch[3])
						: startHour + 1;
					const endMinute = timeMatch[4]
						? parseInt(timeMatch[4])
						: startMinute;

					const startMinutes = startHour * 60 + startMinute;
					const endMinutes = endHour * 60 + endMinute;

					if (
						currentTimeMinutes >= startMinutes &&
						currentTimeMinutes < endMinutes
					) {
						return {
							time: taskItem.time,
							task: taskItem.task,
							day: currentDay,
						};
					}
				}
			}
		}

		// Return next upcoming task if no current task
		return this.getNextScheduledTask();
	}

	// Get next upcoming task
	getNextScheduledTask() {
		if (
			typeof MASTER_PLAN === 'undefined' ||
			typeof band8Dashboard === 'undefined'
		) {
			return null;
		}

		const currentDay = band8Dashboard.getActualDay();
		const dayData = band8Dashboard.getDayData(currentDay);
		if (!dayData || !dayData.tasks) return null;

		const now = new Date();
		const currentHour = now.getHours();
		const currentMinute = now.getMinutes();
		const currentTimeMinutes = currentHour * 60 + currentMinute;

		// Find the next task
		for (const taskItem of dayData.tasks) {
			if (typeof taskItem === 'object' && taskItem.time) {
				const timeMatch = taskItem.time.match(/(\d{2}):(\d{2})/);
				if (timeMatch) {
					const startHour = parseInt(timeMatch[1]);
					const startMinute = parseInt(timeMatch[2]);
					const startMinutes = startHour * 60 + startMinute;

					if (startMinutes > currentTimeMinutes) {
						return {
							time: taskItem.time,
							task: taskItem.task,
							day: currentDay,
							isNext: true,
						};
					}
				}
			}
		}

		return null;
	}

	// Schedule task reminders for the day (for mobile notifications)
	scheduleTaskReminders() {
		if (
			typeof MASTER_PLAN === 'undefined' ||
			typeof band8Dashboard === 'undefined'
		) {
			return;
		}

		const currentDay = band8Dashboard.getActualDay();
		const dayData = band8Dashboard.getDayData(currentDay);
		if (!dayData || !dayData.tasks) return;

		const now = new Date();
		const today = now.toDateString();
		const scheduledKey = `task-reminders-scheduled-${today}`;

		// Don't reschedule if already done today
		if (localStorage.getItem(scheduledKey)) return;

		dayData.tasks.forEach((taskItem, index) => {
			if (typeof taskItem === 'object' && taskItem.time) {
				const timeMatch = taskItem.time.match(/(\d{2}):(\d{2})/);
				if (timeMatch) {
					const startHour = parseInt(timeMatch[1]);
					const startMinute = parseInt(timeMatch[2]);

					const taskTime = new Date();
					taskTime.setHours(startHour, startMinute, 0, 0);

					// Only schedule if in the future
					if (taskTime > now) {
						// Schedule 5 minutes before
						const reminderTime = new Date(
							taskTime.getTime() - 5 * 60 * 1000,
						);

						const delay = reminderTime.getTime() - now.getTime();
						if (delay > 0) {
							setTimeout(() => {
								this.sendTaskReminder(
									taskItem,
									currentDay,
									index,
								);
							}, delay);
						}
					}
				}
			}
		});

		localStorage.setItem(scheduledKey, 'true');
		console.log('📅 Task reminders scheduled for Day', currentDay);
	}

	// Send task reminder (both in-app and push)
	sendTaskReminder(taskItem, day, taskIndex) {
		const taskText =
			typeof taskItem === 'object' ? taskItem.task : taskItem;
		const taskTime = typeof taskItem === 'object' ? taskItem.time : '';

		const title = `⏰ IELTS Day ${day} - Next Task`;
		const body = taskTime ? `${taskTime}: ${taskText}` : taskText;

		// Show in-app notification
		this.showInAppNotification(body, 'info', 15000);

		// Send system/push notification
		this.sendSystemNotification(title, body, 'task-reminder');
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

		// Define colors based on type
		const colors = {
			info: 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500',
			success:
				'bg-gradient-to-r from-green-600 to-green-700 border-green-500',
			warning:
				'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400',
			error: 'bg-gradient-to-r from-red-600 to-red-700 border-red-500',
			deadline:
				'bg-gradient-to-r from-red-600 to-orange-600 border-red-500',
		};

		const icons = {
			info: 'ℹ️',
			success: '✅',
			warning: '⚠️',
			error: '❌',
			deadline: '⏰',
		};

		const titles = {
			info: 'Info',
			success: 'Success',
			warning: 'Warning',
			error: 'Error',
			deadline: 'Deadline Alert',
		};

		notification.className = `rounded-xl shadow-2xl border text-white animate-slide-in ${
			colors[type] || colors.info
		}`;
		notification.style.cssText =
			'animation: slideIn 0.3s ease-out; margin-bottom: 10px;';

		notification.innerHTML = `
			<div class="px-4 py-3">
				<div class="flex items-start gap-3">
					<span class="text-2xl flex-shrink-0 mt-0.5">${icons[type] || icons.info}</span>
					<div class="flex-1 min-w-0">
						<p class="font-bold text-sm text-white/95 mb-1">${
							titles[type] || 'Notification'
						}</p>
						<p class="text-sm text-white/90 leading-relaxed break-words">${message}</p>
					</div>
					<button onclick="this.closest('.rounded-xl').remove()" class="flex-shrink-0 text-white/70 hover:text-white text-xl font-bold leading-none p-1 -mt-1 -mr-1">&times;</button>
				</div>
			</div>
		`;

		container.appendChild(notification);

		// Auto-remove after duration
		if (duration > 0) {
			setTimeout(() => {
				notification.style.animation = 'slideOut 0.3s ease-in';
				notification.style.opacity = '0';
				notification.style.transform = 'translateX(100%)';
				setTimeout(() => notification.remove(), 300);
			}, duration);
		}

		return notification;
	}

	createNotificationContainer() {
		if (!document.getElementById('notification-container')) {
			const container = document.createElement('div');
			container.id = 'notification-container';
			container.style.cssText =
				'position: fixed; top: 16px; right: 16px; z-index: 9999; max-width: 360px; width: calc(100% - 32px);';
			document.body.appendChild(container);

			// Add animation styles
			const style = document.createElement('style');
			style.textContent = `
				@keyframes slideIn {
					from { transform: translateX(100%); opacity: 0; }
					to { transform: translateX(0); opacity: 1; }
				}
				@keyframes slideOut {
					from { transform: translateX(0); opacity: 1; }
					to { transform: translateX(100%); opacity: 0; }
				}
			`;
			document.head.appendChild(style);
		}
	}

	// Schedule push notification (for mobile PWA)
	async schedulePushNotification(title, body, scheduledTime, tag) {
		// Check if service worker and push are supported
		if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
			console.log('Push notifications not supported');
			return false;
		}

		try {
			const registration = await navigator.serviceWorker.ready;

			// For immediate notification
			if (!scheduledTime) {
				this.showBrowserNotification(title, body, tag);
				return true;
			}

			// Store scheduled notification
			const scheduled = JSON.parse(
				localStorage.getItem('scheduled-notifications') || '[]',
			);
			scheduled.push({
				title,
				body,
				scheduledTime: scheduledTime.getTime(),
				tag,
				shown: false,
			});
			localStorage.setItem(
				'scheduled-notifications',
				JSON.stringify(scheduled),
			);

			return true;
		} catch (error) {
			console.error('Error scheduling notification:', error);
			return false;
		}
	}

	// Check and show scheduled notifications
	checkScheduledNotifications() {
		const scheduled = JSON.parse(
			localStorage.getItem('scheduled-notifications') || '[]',
		);
		const now = Date.now();
		let updated = false;

		scheduled.forEach((notif, index) => {
			if (!notif.shown && notif.scheduledTime <= now) {
				this.showBrowserNotification(
					notif.title,
					notif.body,
					notif.tag,
				);
				scheduled[index].shown = true;
				updated = true;
			}
		});

		if (updated) {
			// Remove shown notifications older than 1 day
			const filtered = scheduled.filter(
				(n) => !n.shown || now - n.scheduledTime < 86400000,
			);
			localStorage.setItem(
				'scheduled-notifications',
				JSON.stringify(filtered),
			);
		}
	}

	// Schedule daily study reminder
	scheduleDailyReminder(hour = 9, minute = 0) {
		const settings = this.getStudyReminderSettings();
		settings.reminderTime = `${hour.toString().padStart(2, '0')}:${minute
			.toString()
			.padStart(2, '0')}`;
		this.saveStudyReminderSettings(settings);

		// Calculate next reminder time
		const now = new Date();
		const nextReminder = new Date();
		nextReminder.setHours(hour, minute, 0, 0);

		if (nextReminder <= now) {
			nextReminder.setDate(nextReminder.getDate() + 1);
		}

		return this.schedulePushNotification(
			'📚 IELTS Study Reminder',
			'Time for your daily IELTS practice! Consistency is key to Band 8+',
			nextReminder,
			'daily-study-reminder',
		);
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
	notificationManager.checkScheduledNotifications();
}, 2000);

// Check deadlines every 4 hours
setInterval(() => {
	notificationManager.checkDeadlinesAndNotify();
}, 4 * 60 * 60 * 1000);

// Check scheduled notifications every minute
setInterval(() => {
	notificationManager.checkScheduledNotifications();
}, 60 * 1000);

// Request notification permission on user interaction
document.addEventListener(
	'click',
	function requestNotifPermission() {
		if ('Notification' in window && Notification.permission === 'default') {
			Notification.requestPermission();
		}
		document.removeEventListener('click', requestNotifPermission);
	},
	{ once: true },
);

// Register for background sync if supported
if ('serviceWorker' in navigator && 'SyncManager' in window) {
	navigator.serviceWorker.ready
		.then((registration) => {
			return registration.sync.register('check-deadlines');
		})
		.catch(console.error);
}
