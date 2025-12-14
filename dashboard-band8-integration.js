// Band 8.0-8.5 Dashboard Integration
// Displays 15-day IELTS ULTRA-INTENSIVE progress tracker

class Band8Dashboard {
	constructor() {
		this.today = new Date();
		this.examDate = new Date('2025-12-29'); // Exam Day
		this.startDate = new Date('2025-12-14'); // Day 1 starts today
		this.loadProgress();
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

	// Get today's tasks from master plan (based on ACTUAL progress, not calendar)
	getTodaysTasks() {
		if (typeof MASTER_PLAN === 'undefined') {
			console.error('MASTER_PLAN not loaded!');
			return null;
		}

		const actualDay = this.getActualDay();
		const todaySchedule = MASTER_PLAN.ieltsSchedule.find(
			(day) => day.day === actualDay,
		);

		if (todaySchedule) {
			return {
				day: todaySchedule.day,
				date: todaySchedule.date,
				phase: todaySchedule.phase,
				focus: todaySchedule.focus,
				hours: todaySchedule.hours,
				tasks: todaySchedule.tasks,
				targetScore: todaySchedule.targetScore,
				completed: this.getTasksCompleted(actualDay),
			};
		}

		return null;
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

	// Render IELTS Band 8 Tracker
	renderIELTSTracker() {
		const today = this.getTodaysTasks();
		const daysRemaining = this.getDaysRemaining();
		const progress = this.getProgressPercentage();
		const phase = this.getCurrentPhase();
		const actualDay = this.getActualDay();
		const scheduledDay = this.getScheduledDay();
		const dayProgress = this.getDayProgress(actualDay);

		// Aggregate local checklist tasks from app plan (optional)
		const planTasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
		const planCompleted = Object.values(planTasks).filter(Boolean).length;
		const planTotal = Object.keys(planTasks).length || 0;

		// Today summary from Band8 tracker (optional)
		const todayCompleted = today ? (today.completed || []).length : 0;
		const todayTotal = today ? today.tasks.length : 0;
		const todayHoursLogged = today ? this.getHoursLogged(today.day) : 0;

		// Check if behind schedule
		const behindDays = scheduledDay - actualDay;
		const behindMessage =
			behindDays > 0
				? `<span class="behind-schedule">⚠️ ${behindDays} day${
						behindDays > 1 ? 's' : ''
				  } behind schedule</span>`
				: behindDays < 0
				? `<span class="ahead-schedule">🚀 ${Math.abs(behindDays)} day${
						Math.abs(behindDays) > 1 ? 's' : ''
				  } ahead!</span>`
				: `<span class="on-schedule">✅ On schedule</span>`;

		// Fallback when master plan isn't loaded yet
		if (!today) {
			const planTasks =
				JSON.parse(localStorage.getItem('ielts-tasks')) || {};
			const planCompleted =
				Object.values(planTasks).filter(Boolean).length;
			const planTotal = Object.keys(planTasks).length || 0;
			return `
				<div class="ielts-tracker">
					<div class="tracker-header">
						<h2>🎯 IELTS Band 8.0-8.5 Prep</h2>
						<div class="exam-countdown">
							<span class="countdown-number">${daysRemaining}</span>
							<span class="countdown-label">days until exam</span>
						</div>
					</div>
					<div class="progress-bar-container">
						<div class="progress-bar" style="width: ${progress}%"></div>
						<span class="progress-text">${progress}% Complete (Checklist)</span>
					</div>
					<div class="combined-progress" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:12px; margin:12px 0;">
						<div class="card"><strong>✅ Tasks Completed</strong><div>${planCompleted}/${planTotal} checklist tasks</div></div>
						<div class="card"><strong>ℹ️ Note</strong><div>Master plan data not loaded; showing checklist summary.</div></div>
					</div>
				</div>
			`;
		}

		return `
            <div class="ielts-tracker">
                <div class="tracker-header">
                    <h2>🎯 IELTS Band 8.0-8.5 Intensive Prep</h2>
                    <div class="exam-countdown">
                        <span class="countdown-number">${daysRemaining}</span>
                        <span class="countdown-label">days until exam</span>
                    </div>
                </div>

                <div class="progress-bar-container">
					<div class="progress-bar" style="width: ${progress}%"></div>
					<span class="progress-text">${progress}% Complete (Checklist)</span>
                </div>

                <div class="current-phase">
                    <h3>${phase}</h3>
                </div>

				<div class="day-status-banner" style="background: linear-gradient(135deg, var(--accent), var(--accent-hover)); color: var(--accent-contrast); padding: 16px; border-radius: 12px; margin: 16px 0; text-align: center;">
					<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap;">
						<div>
							<div style="font-size: 2rem; font-weight: bold;">Day ${actualDay}</div>
							<div style="font-size: 0.85rem; opacity: 0.9;">Your Actual Progress</div>
						</div>
						<div style="font-size: 1.5rem;">→</div>
						<div>
							<div style="font-size: 1.2rem;">📅 Scheduled: Day ${scheduledDay}</div>
							<div style="margin-top: 4px;">${behindMessage}</div>
						</div>
					</div>
					<div style="margin-top: 12px;">
						<div style="background: rgba(255,255,255,0.2); border-radius: 8px; height: 8px; overflow: hidden;">
							<div style="background: white; height: 100%; width: ${dayProgress}%; transition: width 0.3s;"></div>
						</div>
						<div style="font-size: 0.85rem; margin-top: 4px;">Day ${actualDay} Progress: ${dayProgress}% (${todayCompleted}/${todayTotal} tasks)</div>
					</div>
				</div>

				<div class="combined-progress" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; margin:12px 0;">
					<div class="card" style="padding:10px; background:var(--card-bg); border:1px solid var(--border); border-radius:8px;">
						<div><strong>📊 Overall Progress</strong></div>
						<div>${progress}% complete</div>
					</div>
					<div class="card" style="padding:10px; background:var(--card-bg); border:1px solid var(--border); border-radius:8px;">
						<div><strong>✅ Tasks Done</strong></div>
						<div>${planCompleted}/${planTotal} total tasks</div>
					</div>
					<div class="card" style="padding:10px; background:var(--card-bg); border:1px solid var(--border); border-radius:8px;">
						<div><strong>⏱️ Hours Today</strong></div>
						<div>${todayHoursLogged}/${today ? today.hours : 0} hours</div>
					</div>
				</div>

                <div class="today-schedule">
                    <h3 style="font-size: larger;">📅 Day ${today.day}/21 - ${
			today.date
		}</h3>
					<p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">
						<em>Complete all tasks below to advance to Day ${today.day + 1}</em>
					</p>
                    <div class="focus-area">
                        <strong>Focus:</strong> ${today.focus}
                    </div>
                    <div class="study-hours">
                        <strong>Study Hours:</strong> ${today.hours} hours
                    </div>
                    <div class="target-score">
                        <strong>Target:</strong> ${today.targetScore}
                    </div>

                    <h4>✅ Today's Tasks (${todayCompleted}/${todayTotal}):</h4>
                    <ul class="task-list">
                        ${today.tasks
							.map(
								(task, index) => `
                            <li class="task-item ${
								today.completed.includes(index)
									? 'completed'
									: ''
							}">
                                <input type="checkbox"
                                       id="task-${index}"
                                       ${
											today.completed.includes(index)
												? 'checked'
												: ''
										}
                                       onchange="band8Dashboard.toggleTask(${
											today.day
										}, ${index})">
                                <label for="task-${index}">${task}</label>
                            </li>
                        `,
							)
							.join('')}
                    </ul>

                    <div class="study-log">
                        <h4>📊 Study Hours Logged Today:</h4>
                        <input type="number"
                               id="hours-logged"
                               min="0"
                               max="16"
                               step="0.5"
                               value="${this.getHoursLogged(today.day)}"
                               onchange="band8Dashboard.logHours(${
									today.day
								}, this.value)">
                        <span> / ${today.hours} hours</span>
                    </div>
                </div>

                <div class="mock-test-scores">
                    <h4>📝 Mock Test Scores:</h4>
                    <div class="mock-tests">
                        <div class="mock-test">
                            <strong>Mock Test #1 (Day 12):</strong>
                            <input type="text" id="mock1-score" placeholder="Overall: 7.5"
                                   value="${this.getMockScore(1)}"
                                   onchange="band8Dashboard.saveMockScore(1, this.value)">
                        </div>
                        <div class="mock-test">
                            <strong>Mock Test #2 (Day 16):</strong>
                            <input type="text" id="mock2-score" placeholder="Overall: 8.0"
                                   value="${this.getMockScore(2)}"
                                   onchange="band8Dashboard.saveMockScore(2, this.value)">
                        </div>
                    </div>
                </div>

                <div class="motivation-quote">
                    <p><em>"Band 8.0-8.5 means you're in the TOP 5-10% globally. 13-15 hours/day × 15 days = YOUR FUTURE. Every hour counts!"</em></p>
                </div>
            </div>
        `;
	}

	// Render University Application Timeline
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
            <div class="university-timeline">
                <h2>🎓 University Applications Timeline</h2>

                ${
					urgent.length > 0
						? `
                    <div class="urgent-applications">
                        <h3>🔥 URGENT - Apply Within 30 Days!</h3>
                        ${urgent
							.map((u) => this.renderUniversityCard(u, 'urgent'))
							.join('')}
                    </div>
                `
						: ''
				}

                ${
					upcoming.length > 0
						? `
                    <div class="upcoming-applications">
                        <h3>⏰ Upcoming (30-90 Days)</h3>
                        ${upcoming
							.map((u) =>
								this.renderUniversityCard(u, 'upcoming'),
							)
							.join('')}
                    </div>
                `
						: ''
				}

                ${
					later.length > 0
						? `
                    <div class="later-applications">
                        <h3>📅 Later (90+ Days)</h3>
                        ${later
							.map((u) => this.renderUniversityCard(u, 'later'))
							.join('')}
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

		return `
            <div class="university-card ${urgency}">
                <div class="university-header">
                    <h4>${university.university}</h4>
                    <span class="priority-badge ${
						university.priority.includes('DREAM')
							? 'dream'
							: university.priority.includes('Safety')
							? 'safety'
							: 'target'
					}">
                        ${university.priority}
                    </span>
                </div>
                <div class="deadline-info">
                    <strong>Deadline:</strong> ${deadline.toLocaleDateString(
						'en-US',
						{ month: 'short', day: 'numeric', year: 'numeric' },
					)}
                    <span class="days-until ${
						daysUntil <= 7
							? 'critical'
							: daysUntil <= 30
							? 'warning'
							: 'normal'
					}">
                        (${daysUntil} days)
                    </span>
                </div>
                <div class="documents-needed">
                    <strong>Documents:</strong>
                    <ul>
                        ${university.documents
							.map((doc) => `<li>${doc}</li>`)
							.join('')}
                    </ul>
                </div>
                <div class="fee-info">
                    <strong>Application Fee:</strong> ${university.fee}
                </div>
                <div class="status-selector">
                    <label>Status:</label>
                    <select onchange="band8Dashboard.updateUniversityStatus('${
						university.university
					}', this.value)">
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

	// Render Scholarship Timeline
	renderScholarshipTimeline() {
		if (typeof MASTER_PLAN === 'undefined') return '';

		const scholarships = MASTER_PLAN.scholarshipTimeline;

		return `
            <div class="scholarship-timeline">
                <h2>💰 Scholarship Applications</h2>
                <p class="scholarship-intro">Apply to ALL scholarships! Even €300/month = €7,200 over 2 years!</p>

                <div class="scholarships-grid">
                    ${scholarships
						.map((s) => this.renderScholarshipCard(s))
						.join('')}
                </div>

                <div class="scholarship-tips">
                    <h3>💡 Scholarship Success Tips:</h3>
                    <ul>
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

		return `
            <div class="scholarship-card ${
				scholarship.priority.includes('HIGHEST')
					? 'highest-priority'
					: scholarship.priority.includes('High')
					? 'high-priority'
					: 'medium-priority'
			}">
                <h4>${scholarship.scholarship}</h4>
                <div class="scholarship-amount">
                    <strong>💰 Amount:</strong> ${scholarship.amount}
                </div>
                <div class="scholarship-deadline">
                    <strong>📅 Deadline:</strong> ${deadline} ${daysUntil}
                </div>
                <div class="scholarship-priority">
                    <strong>Priority:</strong> <span class="priority-badge">${
						scholarship.priority
					}</span>
                </div>
                <div class="scholarship-documents">
                    <strong>Documents:</strong>
                    <ul>
                        ${scholarship.documents
							.map((doc) => `<li>${doc}</li>`)
							.join('')}
                    </ul>
                </div>
                ${
					scholarship.note
						? `<div class="scholarship-note"><em>${scholarship.note}</em></div>`
						: ''
				}
                <div class="scholarship-status">
                    <label>Status:</label>
                    <select onchange="band8Dashboard.updateScholarshipStatus('${
						scholarship.scholarship
					}', this.value)">
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

	getTasksCompleted(day) {
		return this.progress.tasksCompleted[day] || [];
	}

	toggleTask(day, taskIndex) {
		if (!this.progress.tasksCompleted[day]) {
			this.progress.tasksCompleted[day] = [];
		}

		const tasks = this.progress.tasksCompleted[day];
		const index = tasks.indexOf(taskIndex);

		if (index > -1) {
			tasks.splice(index, 1);
		} else {
			tasks.push(taskIndex);
		}

		this.saveProgress();
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
            <div class="band8-dashboard">
                ${this.renderIELTSTracker()}
                <hr>
                ${this.renderUniversityTimeline()}
                <hr>
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
