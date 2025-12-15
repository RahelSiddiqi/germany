// Band 8.0-8.5 Dashboard Integration
// Displays 15-day IELTS ULTRA-INTENSIVE progress tracker
// Using Tailwind CSS classes only

class Band8Dashboard {
	constructor() {
		this.today = new Date();
		this.examDate = new Date('2025-12-29'); // Exam Day
		this.startDate = new Date('2025-12-14'); // Day 1 starts today
		this.viewingDay = null; // Track which day user is viewing (null = actual day)
		this.loadProgress();
	}

	// Get the day currently being viewed (for navigation)
	getViewingDay() {
		return this.viewingDay || this.getActualDay();
	}

	// Navigate to a specific day
	navigateToDay(dayNum) {
		this.viewingDay = dayNum;
		this.refreshDashboard();
	}

	// Navigate to next day
	nextDay() {
		const current = this.getViewingDay();
		const totalDays =
			typeof MASTER_PLAN !== 'undefined'
				? MASTER_PLAN.ieltsSchedule.length
				: 15;
		if (current < totalDays) {
			this.navigateToDay(current + 1);
		}
	}

	// Navigate to previous day
	prevDay() {
		const current = this.getViewingDay();
		if (current > 1) {
			this.navigateToDay(current - 1);
		}
	}

	// Go to actual current day
	goToToday() {
		this.viewingDay = null;
		this.refreshDashboard();
	}

	// Refresh the dashboard display
	refreshDashboard() {
		const container = document.getElementById('band8-container');
		if (container) {
			container.innerHTML = this.renderCompleteDashboard();
		}
	}

	// Get all remaining tasks across all days
	getAllRemainingTasks() {
		if (typeof MASTER_PLAN === 'undefined') return [];

		const remaining = [];
		MASTER_PLAN.ieltsSchedule.forEach((daySchedule) => {
			const completed = this.getTasksCompleted(daySchedule.day);
			daySchedule.tasks.forEach((task, index) => {
				if (!completed.includes(index)) {
					remaining.push({
						day: daySchedule.day,
						taskIndex: index,
						task: task,
						focus: daySchedule.focus,
					});
				}
			});
		});
		return remaining;
	}

	// Get remaining tasks for a specific day
	getDayRemainingTasks(dayNum) {
		if (typeof MASTER_PLAN === 'undefined') return [];

		const daySchedule = MASTER_PLAN.ieltsSchedule.find(
			(d) => d.day === dayNum,
		);
		if (!daySchedule) return [];

		const completed = this.getTasksCompleted(dayNum);
		const remaining = [];
		daySchedule.tasks.forEach((task, index) => {
			if (!completed.includes(index)) {
				remaining.push({ taskIndex: index, task });
			}
		});
		return remaining;
	}

	// Calculate SCHEDULED day based on calendar (where you SHOULD be)
	getScheduledDay() {
		const daysPassed = Math.floor(
			(this.today - this.startDate) / (1000 * 60 * 60 * 24),
		);
		return Math.min(Math.max(daysPassed + 1, 1), 16); // Day 1-16 (15 days prep + exam day)
	}

	// Calculate ACTUAL day based on completed tasks (where you REALLY are)
	getActualDay() {
		if (typeof MASTER_PLAN === 'undefined') return 1;

		const totalDays = MASTER_PLAN.ieltsSchedule.length;

		// Check each day's completion status
		for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
			const daySchedule = MASTER_PLAN.ieltsSchedule.find(
				(d) => d.day === dayNum,
			);
			if (!daySchedule) continue;

			const completedTasks = this.getTasksCompleted(dayNum);
			const totalTasks = daySchedule.tasks.length;

			// If this day is not 100% complete, this is our actual day
			if (completedTasks.length < totalTasks) {
				return dayNum;
			}
		}

		// All days complete!
		return totalDays;
	}

	// Get day completion percentage for a specific day
	getDayProgress(dayNum) {
		if (typeof MASTER_PLAN === 'undefined') return 0;

		const daySchedule = MASTER_PLAN.ieltsSchedule.find(
			(d) => d.day === dayNum,
		);
		if (!daySchedule) return 0;

		const completedTasks = this.getTasksCompleted(dayNum);
		const totalTasks = daySchedule.tasks.length;

		return totalTasks > 0
			? Math.round((completedTasks.length / totalTasks) * 100)
			: 0;
	}

	// Legacy: getCurrentDay now returns actual day (task-based)
	getCurrentDay() {
		return this.getActualDay();
	}

	// Get data for a specific day
	getDayData(dayNum) {
		if (typeof MASTER_PLAN === 'undefined') return null;

		const daySchedule = MASTER_PLAN.ieltsSchedule.find(
			(d) => d.day === dayNum,
		);
		if (!daySchedule) return null;

		return {
			day: daySchedule.day,
			date: daySchedule.date,
			phase: daySchedule.phase,
			focus: daySchedule.focus,
			hours: daySchedule.hours,
			tasks: daySchedule.tasks,
			targetScore: daySchedule.targetScore,
			completed: this.getTasksCompleted(dayNum),
		};
	}

	// Get today's tasks from master plan (based on ACTUAL progress, not calendar)
	getTodaysTasks() {
		if (typeof MASTER_PLAN === 'undefined') {
			console.error('MASTER_PLAN not loaded!');
			return null;
		}

		const actualDay = this.getActualDay();
		return this.getDayData(actualDay);
	}

	// Days remaining until exam
	getDaysRemaining() {
		const daysLeft = Math.ceil(
			(this.examDate - this.today) / (1000 * 60 * 60 * 24),
		);
		return Math.max(0, daysLeft);
	}

	// Progress percentage - based on ACTUAL task completion across all days
	getProgressPercentage() {
		if (typeof MASTER_PLAN === 'undefined') {
			// Fallback to localStorage checklist if master plan not loaded
			const planTasks =
				JSON.parse(localStorage.getItem('ielts-tasks')) || {};
			const planCompleted =
				Object.values(planTasks).filter(Boolean).length;
			const planTotal = Object.keys(planTasks).length || 0;
			if (planTotal === 0) return 0; // No tasks = 0% progress
			return Math.min(100, Math.round((planCompleted / planTotal) * 100));
		}

		// Calculate total tasks and completed tasks across ALL days
		let totalTasks = 0;
		let completedTasks = 0;

		MASTER_PLAN.ieltsSchedule.forEach((daySchedule) => {
			totalTasks += daySchedule.tasks.length;
			const completed = this.getTasksCompleted(daySchedule.day);
			completedTasks += completed.length;
		});

		if (totalTasks === 0) return 0;
		return Math.min(100, Math.round((completedTasks / totalTasks) * 100));
	}

	// Current phase of preparation (based on ACTUAL progress)
	getCurrentPhase() {
		const day = this.getActualDay();
		if (day <= 3) return '🔍 Diagnosis & Foundation';
		if (day <= 11) return '💪 Intensive Section Practice';
		if (day === 12) return '📝 Mock Test #1';
		if (day === 13) return '🎄 Strategic Rest (Christmas)';
		if (day <= 16) return '⚡ Refinement & Targeted Practice';
		if (day === 16) return '📝 Mock Test #2';
		if (day <= 17) return '✨ Final Polish';
		if (day <= 19) return '😴 Rest & Preparation';
		return '🎯 EXAM TIME!';
	}

	// Render IELTS Band 8 Tracker with Tailwind CSS
	renderIELTSTracker() {
		const daysRemaining = this.getDaysRemaining();
		const progress = this.getProgressPercentage();
		const phase = this.getCurrentPhase();
		const actualDay = this.getActualDay();
		const scheduledDay = this.getScheduledDay();
		const viewingDay = this.getViewingDay();

		// Get data for the day being viewed (not necessarily actual day)
		const viewingDayData = this.getDayData(viewingDay);
		const dayProgress = this.getDayProgress(viewingDay);
		const dayRemaining = this.getDayRemainingTasks(viewingDay);
		const allRemaining = this.getAllRemainingTasks();

		// Calculate total tasks from MASTER_PLAN
		let totalAllTasks = 0;
		let completedAllTasks = 0;
		const totalDays =
			typeof MASTER_PLAN !== 'undefined'
				? MASTER_PLAN.ieltsSchedule.length
				: 15;

		if (typeof MASTER_PLAN !== 'undefined') {
			MASTER_PLAN.ieltsSchedule.forEach((daySchedule) => {
				totalAllTasks += daySchedule.tasks.length;
				const completed = this.getTasksCompleted(daySchedule.day);
				completedAllTasks += completed.length;
			});
		}

		// Viewing day summary
		const viewCompleted = viewingDayData
			? this.getTasksCompleted(viewingDay).length
			: 0;
		const viewTotal = viewingDayData ? viewingDayData.tasks.length : 0;
		const viewHoursLogged = viewingDayData
			? this.getHoursLogged(viewingDay)
			: 0;

		// Check if behind schedule
		const behindDays = scheduledDay - actualDay;
		let behindMessage = '';
		if (behindDays > 0) {
			behindMessage = `<span class="text-amber-600 dark:text-amber-400 text-sm font-medium">⚠️ ${behindDays} day${
				behindDays > 1 ? 's' : ''
			} behind</span>`;
		} else if (behindDays < 0) {
			behindMessage = `<span class="text-green-600 dark:text-green-400 text-sm font-medium">🚀 ${Math.abs(
				behindDays,
			)} day${Math.abs(behindDays) > 1 ? 's' : ''} ahead!</span>`;
		} else {
			behindMessage = `<span class="text-teal-600 dark:text-teal-400 text-sm font-medium">✅ On schedule</span>`;
		}

		// Is viewing a different day than actual?
		const isViewingDifferentDay = viewingDay !== actualDay;

		// Fallback when master plan isn't loaded yet
		if (!viewingDayData) {
			return `
				<div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 -mx-2 sm:mx-0">
					<div class="flex items-center justify-between mb-4 sm:mb-6">
						<h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
							🎯 IELTS Band 8.0-8.5 Prep
						</h2>
						<div class="text-center">
							<div class="text-3xl font-bold text-teal-600 dark:text-teal-400">${daysRemaining}</div>
							<div class="text-xs text-gray-500 dark:text-gray-400">days left</div>
						</div>
					</div>
					<div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
						<div class="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
					</div>
					<p class="text-center text-gray-500 dark:text-gray-400 mt-4">Loading plan data...</p>
				</div>
			`;
		}

		// Generate day navigator buttons
		const dayNavButtons = [];
		for (let i = 1; i <= totalDays; i++) {
			const dayCompletion = this.getDayProgress(i);
			const isComplete = dayCompletion === 100;
			const isActive = i === viewingDay;
			const isCurrent = i === actualDay;

			let btnClass =
				'w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center ';
			if (isActive) {
				btnClass +=
					'bg-teal-600 text-white shadow-lg ring-2 ring-teal-300 dark:ring-teal-500';
			} else if (isComplete) {
				btnClass +=
					'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50';
			} else if (isCurrent) {
				btnClass +=
					'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 ring-2 ring-teal-400 dark:ring-teal-500';
			} else {
				btnClass +=
					'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600';
			}

			dayNavButtons.push(`
				<button class="${btnClass}"
						onclick="band8Dashboard.navigateToDay(${i})"
						title="Day ${i}${isComplete ? ' ✓' : ''}${isCurrent ? ' (Current)' : ''}">
					${isComplete && !isActive ? '✓' : i}
				</button>
			`);
		}

		return `
			<div class="space-y-3 sm:space-y-6">
				<!-- Header Card -->
				<div class="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg -mx-2 sm:mx-0">
					<div class="flex items-center justify-between mb-3 sm:mb-4">
						<div>
							<h2 class="text-lg sm:text-xl font-bold flex items-center gap-2">🎯 IELTS Band 8.0-8.5</h2>
							<p class="text-teal-100 text-xs sm:text-sm mt-1">${phase}</p>
						</div>
						<div class="text-center">
							<div class="text-3xl sm:text-4xl font-bold">${daysRemaining}</div>
							<div class="text-[10px] sm:text-xs text-teal-200">days left</div>
						</div>
					</div>

					<!-- Progress Bar -->
					<div class="relative h-2 sm:h-3 bg-teal-800/50 rounded-full overflow-hidden">
						<div class="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500" style="width: ${progress}%"></div>
					</div>
					<div class="flex justify-between mt-2 text-xs sm:text-sm">
						<span class="text-teal-200">${progress}% complete</span>
						<span class="text-teal-200">${completedAllTasks}/${totalAllTasks} tasks</span>
					</div>
				</div>

				<!-- Day Navigator -->
				<div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 -mx-2 sm:mx-0 mt-4">
					<div class="flex items-center justify-between mb-4">
						<button onclick="band8Dashboard.prevDay()"
								class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
								${viewingDay <= 1 ? 'disabled' : ''}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
							</svg>
						</button>
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Day ${viewingDay} of ${totalDays}</span>
						<button onclick="band8Dashboard.nextDay()"
								class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
								${viewingDay >= totalDays ? 'disabled' : ''}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</button>
					</div>

					<div class="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
						${dayNavButtons.join('')}
					</div>

					${
						isViewingDifferentDay
							? `
						<button onclick="band8Dashboard.goToToday()"
								class="w-full mt-3 sm:mt-4 py-2 px-3 sm:px-4 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
							📍 Go to Current Day (Day ${actualDay})
						</button>
					`
							: ''
					}
				</div>

				<div class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl -mx-2 sm:mx-0 ${
					dayRemaining.length === 0
						? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
						: 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
				}">
					<span class="text-xl sm:text-2xl">${
						dayRemaining.length === 0 ? '🎉' : '📋'
					}</span>
					<div class="flex-1 min-w-0">
						${
							dayRemaining.length === 0
								? `<p class="font-medium text-green-700 dark:text-green-400 text-sm sm:text-base">All tasks completed!</p>
							   <p class="text-xs sm:text-sm text-green-600 dark:text-green-500">Great work!</p>`
								: `<p class="font-medium text-amber-700 dark:text-amber-400 text-sm sm:text-base">${
										dayRemaining.length
								  } task${
										dayRemaining.length > 1 ? 's' : ''
								  } remaining</p>`
						}
						${
							allRemaining.length > 0 && dayRemaining.length === 0
								? `<p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">${allRemaining.length} total remaining</p>`
								: ''
						}
					</div>
					${
						viewingDayData.focus
							? `
						<a href="#ielts-practice" onclick="showPage('ielts-practice'); openIELTSFolder && openIELTSFolder('d${viewingDay}')"
						   class="flex-shrink-0 px-3 sm:px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors">
							📚 Practice
						</a>
					`
							: ''
					}
				</div>

				<!-- Status Banner -->
				<div class="grid grid-cols-2 gap-2 sm:gap-4 -mx-2 sm:mx-0">
					<div class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
						<div class="text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400">Day ${actualDay}</div>
						<div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">Actual Progress</div>
					</div>
					<div class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
						<div class="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400">📅 Day ${scheduledDay}</div>
						<div class="mt-1 text-xs">${behindMessage}</div>
					</div>
				</div>

				<!-- Day Progress Mini -->
				<div class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 -mx-2 sm:mx-0">
					<div class="flex items-center justify-between mb-2">
						<span class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Day ${viewingDay} Progress</span>
						<span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${viewCompleted}/${viewTotal} tasks</span>
					</div>
					<div class="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
						<div class="absolute top-0 left-0 h-full bg-teal-500 rounded-full transition-all duration-300" style="width: ${dayProgress}%"></div>
					</div>
				</div>

				<!-- Today's Schedule -->
				<div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden -mx-2 sm:mx-0">
					<div class="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
						<h3 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base">📅 Day ${
							viewingDayData.day
						} - ${viewingDayData.date}</h3>
						<p class="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
							${
								viewingDay === actualDay
									? `Complete all tasks to advance`
									: viewingDay < actualDay
									? 'Reviewing previous day'
									: 'Preview of upcoming day'
							}
						</p>
						<div class="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm">
							<span class="text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">Focus:</strong> ${
								viewingDayData.focus
							}</span>
							<span class="text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">Hours:</strong> ${viewHoursLogged}/${
			viewingDayData.hours
		}h</span>
							<a href="#ielts-practice"
							   onclick="showPage('ielts-practice'); openIELTSFolder && openIELTSFolder('d${viewingDay}')"
							   class="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-[10px] sm:text-xs font-medium hover:bg-teal-200 dark:hover:bg-teal-800/50 transition-colors">
								<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
								</svg>
								Resources
							</a>
						</div>
					</div>

					<div class="p-3 sm:p-4">
						<h4 class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">✅ Tasks (${viewCompleted}/${viewTotal})</h4>
						<div class="space-y-1.5 sm:space-y-2">
							${viewingDayData.tasks
								.map((taskItem, index) => {
									// Handle both old format (string) and new format (object with time/task)
									const isObject =
										typeof taskItem === 'object' &&
										taskItem !== null;
									const taskTime = isObject
										? taskItem.time
										: '';
									const taskText = isObject
										? taskItem.task
										: taskItem;

									// Calculate duration from time range (e.g., "06:00-06:30" = 0.5h)
									let duration = '';
									if (taskTime && taskTime.includes('-')) {
										const [start, end] =
											taskTime.split('-');
										const [sh, sm] = start
											.split(':')
											.map(Number);
										const [eh, em] = end
											.split(':')
											.map(Number);
										const mins =
											eh * 60 + em - (sh * 60 + sm);
										if (mins >= 60) {
											duration = mins / 60 + 'h';
										} else {
											duration = mins + 'm';
										}
									}

									const isCompleted =
										viewingDayData.completed.includes(
											index,
										);

									return `
								<div class="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg ${
									isCompleted
										? 'bg-green-50 dark:bg-green-900/20'
										: 'bg-gray-50 dark:bg-gray-700/50'
								} transition-colors">
									<input type="checkbox"
										   id="task-${index}"
										   class="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 cursor-pointer flex-shrink-0"
										   ${isCompleted ? 'checked' : ''}
										   onchange="band8Dashboard.toggleTask(${viewingDayData.day}, ${index})">
									${
										taskTime
											? `
									<div class="flex-shrink-0 w-20 sm:w-24 text-center">
										<div class="text-[10px] sm:text-xs font-mono text-teal-700 dark:text-teal-300 font-medium">${taskTime}</div>
										<div class="text-[9px] sm:text-[10px] text-teal-600 dark:text-teal-400">${duration}</div>
									</div>
									`
											: ''
									}
									<label for="task-${index}"
										   class="flex-1 cursor-pointer leading-relaxed text-xs sm:text-sm ${
												isCompleted
													? 'text-gray-500 dark:text-gray-400 line-through'
													: 'text-gray-700 dark:text-gray-300'
											}">
										${taskText}
									</label>
									<a href="#ielts-practice"
									   onclick="showPage('ielts-practice'); openIELTSFolder && openIELTSFolder('d${
											viewingDayData.day
										}')"
									   class="flex-shrink-0 text-base sm:text-lg hover:scale-110 transition-transform"
									   title="Day ${viewingDayData.day} Resources">📖</a>
								</div>
							`;
								})
								.join('')}
						</div>
					</div>

					<div class="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
						<h4 class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">📊 Study Hours</h4>
						<div class="flex items-center gap-2 sm:gap-3">
							<input type="number"
								   id="hours-logged"
								   min="0"
								   max="16"
								   step="0.5"
								   value="${viewHoursLogged}"
								   onchange="band8Dashboard.logHours(${viewingDay}, this.value)"
								   class="w-16 sm:w-20 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
							<span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">/ ${
								viewingDayData.hours
							} hours</span>
						</div>
					</div>
				</div>

				<!-- Mock Test Scores -->
				<div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 -mx-2 sm:mx-0">
					<h4 class="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">📝 Mock Test Scores</h4>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
						<div class="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl">
							<label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mock Test #1</label>
							<input type="text"
								   id="mock1-score"
								   placeholder="e.g., 7.5"
								   value="${this.getMockScore(1)}"
								   onchange="band8Dashboard.saveMockScore(1, this.value)"
								   class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
						</div>
						<div class="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl">
							<label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mock Test #2</label>
							<input type="text"
								   id="mock2-score"
								   placeholder="e.g., 8.0"
								   value="${this.getMockScore(2)}"
								   onchange="band8Dashboard.saveMockScore(2, this.value)"
								   class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
						</div>
					</div>
				</div>

				<!-- Motivation Quote -->
				<div class="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-teal-200 dark:border-teal-800 -mx-2 sm:mx-0">
					<p class="text-teal-800 dark:text-teal-200 text-center italic text-xs sm:text-sm">
						"Band 8.0-8.5 = TOP 5-10% globally. Every hour counts!"
					</p>
				</div>
			</div>
		`;
	}

	// Render University Application Timeline with Tailwind CSS
	renderUniversityTimeline() {
		if (typeof MASTER_PLAN === 'undefined') return '';

		const universities = MASTER_PLAN.universityTimeline;
		const today = new Date();

		// Sort by deadline
		const sorted = universities.sort(
			(a, b) => new Date(a.deadline) - new Date(b.deadline),
		);

		// Separate by urgency
		const urgent = sorted.filter((u) => {
			const deadline = new Date(u.deadline);
			const daysUntil = Math.ceil(
				(deadline - today) / (1000 * 60 * 60 * 24),
			);
			return daysUntil <= 30 && daysUntil > 0;
		});

		const upcoming = sorted.filter((u) => {
			const deadline = new Date(u.deadline);
			const daysUntil = Math.ceil(
				(deadline - today) / (1000 * 60 * 60 * 24),
			);
			return daysUntil > 30 && daysUntil <= 90;
		});

		const later = sorted.filter((u) => {
			const deadline = new Date(u.deadline);
			const daysUntil = Math.ceil(
				(deadline - today) / (1000 * 60 * 60 * 24),
			);
			return daysUntil > 90;
		});

		return `
			<div class="space-y-6 mt-8">
				<h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
					🎓 University Applications Timeline
				</h2>

				${
					urgent.length > 0
						? `
					<div class="space-y-4">
						<h3 class="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
							🔥 URGENT - Apply Within 30 Days!
						</h3>
						<div class="grid gap-4">
							${urgent.map((u) => this.renderUniversityCard(u, 'urgent')).join('')}
						</div>
					</div>
				`
						: ''
				}

				${
					upcoming.length > 0
						? `
					<div class="space-y-4">
						<h3 class="text-lg font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
							⏰ Upcoming (30-90 Days)
						</h3>
						<div class="grid gap-4">
							${upcoming.map((u) => this.renderUniversityCard(u, 'upcoming')).join('')}
						</div>
					</div>
				`
						: ''
				}

				${
					later.length > 0
						? `
					<div class="space-y-4">
						<h3 class="text-lg font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-2">
							📅 Later (90+ Days)
						</h3>
						<div class="grid gap-4">
							${later.map((u) => this.renderUniversityCard(u, 'later')).join('')}
						</div>
					</div>
				`
						: ''
				}
			</div>
		`;
	}

	renderUniversityCard(university, urgency) {
		const deadline = new Date(university.deadline);
		const today = new Date();
		const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

		const statusClass = university.status || 'not_started';

		// Border color based on urgency
		let borderClass = 'border-gray-200 dark:border-gray-700';
		if (urgency === 'urgent')
			borderClass = 'border-red-300 dark:border-red-700';
		else if (urgency === 'upcoming')
			borderClass = 'border-amber-300 dark:border-amber-700';

		// Priority badge styling
		let priorityClass =
			'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
		if (university.priority.includes('DREAM')) {
			priorityClass =
				'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
		} else if (university.priority.includes('Safety')) {
			priorityClass =
				'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
		} else if (university.priority.includes('Target')) {
			priorityClass =
				'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
		}

		// Days until color
		let daysClass = 'text-gray-600 dark:text-gray-400';
		if (daysUntil <= 7)
			daysClass = 'text-red-600 dark:text-red-400 font-bold';
		else if (daysUntil <= 30)
			daysClass = 'text-amber-600 dark:text-amber-400';

		return `
			<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-2 ${borderClass}">
				<div class="flex items-start justify-between gap-4 mb-3">
					<h4 class="font-semibold text-gray-900 dark:text-white">${
						university.university
					}</h4>
					<span class="flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium ${priorityClass}">
						${university.priority}
					</span>
				</div>

				<div class="space-y-2 text-sm">
					<div class="flex items-center gap-2">
						<span class="text-gray-500 dark:text-gray-400">Deadline:</span>
						<span class="text-gray-900 dark:text-white">${deadline.toLocaleDateString(
							'en-US',
							{ month: 'short', day: 'numeric', year: 'numeric' },
						)}</span>
						<span class="${daysClass}">(${daysUntil} days)</span>
					</div>

					<div>
						<span class="text-gray-500 dark:text-gray-400">Documents:</span>
						<ul class="mt-1 ml-4 list-disc text-gray-700 dark:text-gray-300">
							${university.documents.map((doc) => `<li>${doc}</li>`).join('')}
						</ul>
					</div>

					<div class="flex items-center gap-2">
						<span class="text-gray-500 dark:text-gray-400">Fee:</span>
						<span class="text-gray-900 dark:text-white">${university.fee}</span>
					</div>
				</div>

				<div class="mt-4 flex items-center gap-2">
					<label class="text-sm text-gray-600 dark:text-gray-400">Status:</label>
					<select onchange="band8Dashboard.updateUniversityStatus('${
						university.university
					}', this.value)"
							class="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent">
						<option value="not_started" ${
							statusClass === 'not_started' ? 'selected' : ''
						}>Not Started</option>
						<option value="in_progress" ${
							statusClass === 'in_progress' ? 'selected' : ''
						}>In Progress</option>
						<option value="documents_ready" ${
							statusClass === 'documents_ready' ? 'selected' : ''
						}>Documents Ready</option>
						<option value="submitted" ${
							statusClass === 'submitted' ? 'selected' : ''
						}>Submitted</option>
						<option value="admitted" ${
							statusClass === 'admitted' ? 'selected' : ''
						}>✅ Admitted!</option>
						<option value="rejected" ${
							statusClass === 'rejected' ? 'selected' : ''
						}>❌ Rejected</option>
					</select>
				</div>
			</div>
		`;
	}

	// Render Scholarship Timeline with Tailwind CSS
	renderScholarshipTimeline() {
		if (typeof MASTER_PLAN === 'undefined') return '';

		const scholarships = MASTER_PLAN.scholarshipTimeline;

		return `
			<div class="space-y-6 mt-8">
				<div>
					<h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
						💰 Scholarship Applications
					</h2>
					<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
						Apply to ALL scholarships! Even €300/month = €7,200 over 2 years!
					</p>
				</div>

				<div class="grid gap-4 md:grid-cols-2">
					${scholarships.map((s) => this.renderScholarshipCard(s)).join('')}
				</div>

				<div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
					<h3 class="font-semibold text-amber-800 dark:text-amber-200 mb-3">💡 Scholarship Success Tips</h3>
					<ul class="space-y-2 text-sm text-amber-700 dark:text-amber-300">
						<li>✅ Apply to 5-7 scholarships (60-80% get at least one!)</li>
						<li>✍️ Motivation letter is MOST important - explain development goals</li>
						<li>🌍 Emphasize how you'll help your country with cybersecurity knowledge</li>
						<li>📧 Contact professors before applying (shows research interest)</li>
						<li>📊 If GPA below 3.0, explain circumstances + show other achievements</li>
						<li>🇩🇪 Show German language learning (even A1 level shows commitment)</li>
					</ul>
				</div>
			</div>
		`;
	}

	renderScholarshipCard(scholarship) {
		const deadline =
			scholarship.deadline === 'After Admission'
				? 'After Admission'
				: new Date(scholarship.deadline).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
				  });
		const statusClass = scholarship.status || 'not_started';

		let daysUntil = '';
		if (scholarship.deadline !== 'After Admission') {
			const deadlineDate = new Date(scholarship.deadline);
			const today = new Date();
			const days = Math.ceil(
				(deadlineDate - today) / (1000 * 60 * 60 * 24),
			);
			daysUntil = days > 0 ? `(${days} days)` : '(DEADLINE PASSED)';
		}

		// Priority styling
		let borderClass = 'border-gray-200 dark:border-gray-700';
		let priorityClass =
			'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
		if (scholarship.priority.includes('HIGHEST')) {
			borderClass = 'border-green-300 dark:border-green-700';
			priorityClass =
				'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
		} else if (scholarship.priority.includes('High')) {
			borderClass = 'border-blue-300 dark:border-blue-700';
			priorityClass =
				'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
		}

		return `
			<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-2 ${borderClass}">
				<div class="flex items-start justify-between gap-3 mb-3">
					<h4 class="font-semibold text-gray-900 dark:text-white">${
						scholarship.scholarship
					}</h4>
					<span class="flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium ${priorityClass}">
						${scholarship.priority}
					</span>
				</div>

				<div class="space-y-2 text-sm">
					<div class="flex items-center gap-2">
						<span class="text-gray-500 dark:text-gray-400">💰 Amount:</span>
						<span class="font-medium text-green-600 dark:text-green-400">${
							scholarship.amount
						}</span>
					</div>

					<div class="flex items-center gap-2 flex-wrap">
						<span class="text-gray-500 dark:text-gray-400">📅 Deadline:</span>
						<span class="text-gray-900 dark:text-white">${deadline}</span>
						${
							daysUntil
								? `<span class="text-amber-600 dark:text-amber-400">${daysUntil}</span>`
								: ''
						}
					</div>

					<div>
						<span class="text-gray-500 dark:text-gray-400">Documents:</span>
						<ul class="mt-1 ml-4 list-disc text-gray-700 dark:text-gray-300">
							${scholarship.documents.map((doc) => `<li>${doc}</li>`).join('')}
						</ul>
					</div>

					${
						scholarship.note
							? `
						<p class="text-xs italic text-gray-500 dark:text-gray-400 mt-2">${scholarship.note}</p>
					`
							: ''
					}
				</div>

				<div class="mt-4 flex items-center gap-2">
					<label class="text-sm text-gray-600 dark:text-gray-400">Status:</label>
					<select onchange="band8Dashboard.updateScholarshipStatus('${
						scholarship.scholarship
					}', this.value)"
							class="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent">
						<option value="not_started" ${
							statusClass === 'not_started' ? 'selected' : ''
						}>Not Started</option>
						<option value="researching" ${
							statusClass === 'researching' ? 'selected' : ''
						}>Researching</option>
						<option value="drafting" ${
							statusClass === 'drafting' ? 'selected' : ''
						}>Drafting Documents</option>
						<option value="ready" ${
							statusClass === 'ready' ? 'selected' : ''
						}>Ready to Submit</option>
						<option value="submitted" ${
							statusClass === 'submitted' ? 'selected' : ''
						}>Submitted</option>
						<option value="awarded" ${
							statusClass === 'awarded' ? 'selected' : ''
						}>🎉 AWARDED!</option>
						<option value="rejected" ${
							statusClass === 'rejected' ? 'selected' : ''
						}>Rejected</option>
					</select>
				</div>
			</div>
		`;
	}

	// LocalStorage methods
	loadProgress() {
		const saved = localStorage.getItem('band8_progress');
		this.progress = saved
			? JSON.parse(saved)
			: {
					tasksCompleted: {},
					hoursLogged: {},
					mockScores: {},
					universityStatus: {},
					scholarshipStatus: {},
			  };
	}

	saveProgress() {
		localStorage.setItem('band8_progress', JSON.stringify(this.progress));
	}

	// Unified task storage using ielts-tasks localStorage (same as app.js)
	getTasksCompleted(day) {
		const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
		const completedIndices = [];

		// Find tasks for this day using mp-d{day}-{index} format
		Object.keys(tasks).forEach((key) => {
			if (tasks[key] && key.startsWith('mp-d' + day + '-')) {
				const idx = parseInt(key.split('-').pop());
				if (!isNaN(idx)) completedIndices.push(idx);
			}
		});

		return completedIndices;
	}

	toggleTask(day, taskIndex) {
		const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
		const taskId = 'mp-d' + day + '-' + taskIndex;

		// Toggle the task
		tasks[taskId] = !tasks[taskId];

		localStorage.setItem('ielts-tasks', JSON.stringify(tasks));

		// Trigger Firebase sync if available
		if (typeof cloudSync !== 'undefined' && cloudSync.syncEnabled) {
			cloudSync.syncToCloud();
		}

		// Refresh to update UI
		this.refreshDashboard();
	}

	getHoursLogged(day) {
		return this.progress.hoursLogged[day] || 0;
	}

	logHours(day, hours) {
		this.progress.hoursLogged[day] = parseFloat(hours);
		this.saveProgress();
	}

	getMockScore(testNumber) {
		return this.progress.mockScores[testNumber] || '';
	}

	saveMockScore(testNumber, score) {
		this.progress.mockScores[testNumber] = score;
		this.saveProgress();
	}

	updateUniversityStatus(university, status) {
		this.progress.universityStatus[university] = status;
		this.saveProgress();
	}

	updateScholarshipStatus(scholarship, status) {
		this.progress.scholarshipStatus[scholarship] = status;
		this.saveProgress();
	}

	// Render complete dashboard
	renderCompleteDashboard() {
		return `
			<div class="space-y-6">
				${this.renderIELTSTracker()}
				${this.renderUniversityTimeline()}
				${this.renderScholarshipTimeline()}
			</div>
		`;
	}
}

// Initialize dashboard
let band8Dashboard;

document.addEventListener('DOMContentLoaded', function () {
	// MASTER_PLAN is already loaded via script tag in HTML
	// Just initialize the dashboard directly
	band8Dashboard = new Band8Dashboard();

	// Render dashboard if container exists
	const dashboardContainer = document.getElementById('band8-container');
	if (dashboardContainer) {
		dashboardContainer.innerHTML = band8Dashboard.renderCompleteDashboard();
	}
});

// Export for use
if (typeof module !== 'undefined' && module.exports) {
	module.exports = Band8Dashboard;
}
