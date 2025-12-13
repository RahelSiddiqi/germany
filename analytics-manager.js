// Analytics Manager - Charts and insights

class AnalyticsManager {
	constructor() {
		this.chartColors = {
			not_started: '#9E9E9E',
			researching: '#FFC107',
			preparing: '#FF9800',
			submitted: '#4CAF50',
			admitted: '#2196F3',
			rejected: '#F44336',
		};
	}

	// Get application statistics
	getApplicationStats() {
		const germany = JSON.parse(
			localStorage.getItem('germany-applications') || '[]',
		);
		const schengen = JSON.parse(
			localStorage.getItem('schengen-applications') || '[]',
		);

		const stats = {
			germany: this.calculateStats(germany),
			schengen: this.calculateStats(schengen),
			combined: this.calculateStats([...germany, ...schengen]),
		};

		return stats;
	}

	calculateStats(applications) {
		const stats = {
			total: applications.length,
			byStatus: {
				not_started: 0,
				researching: 0,
				preparing: 0,
				submitted: 0,
				admitted: 0,
				rejected: 0,
			},
			completion: 0,
			taskCompletion: 0,
		};

		let totalTasks = 0;
		let completedTasks = 0;

		applications.forEach((app) => {
			const status = app.status || 'not_started';
			stats.byStatus[status]++;

			if (app.tasks) {
				totalTasks += app.tasks.length;
				completedTasks += app.tasks.filter((t) => t.completed).length;
			}
		});

		stats.completion =
			stats.total > 0
				? Math.round(
						((stats.byStatus.submitted + stats.byStatus.admitted) /
							stats.total) *
							100,
				  )
				: 0;

		stats.taskCompletion =
			totalTasks > 0
				? Math.round((completedTasks / totalTasks) * 100)
				: 0;

		return stats;
	}

	// Generate simple ASCII chart for status distribution
	generateStatusChart(type = 'combined') {
		const stats = this.getApplicationStats();
		const data = stats[type].byStatus;

		const labels = {
			not_started: '🔵 Not Started',
			researching: '🟡 Researching',
			preparing: '🟠 Preparing',
			submitted: '🟢 Submitted',
			admitted: '✅ Admitted',
			rejected: '❌ Rejected',
		};

		let html = '<div class="chart-container">';
		html += '<h3>Application Status Distribution</h3>';
		html += '<div class="bar-chart">';

		Object.entries(data).forEach(([status, count]) => {
			if (count > 0) {
				const percentage =
					stats[type].total > 0
						? Math.round((count / stats[type].total) * 100)
						: 0;
				html += `
					<div class="bar-row">
						<div class="bar-label">${labels[status]}</div>
						<div class="bar-container">
							<div class="bar-fill" style="width: ${percentage}%; background: ${this.chartColors[status]}">
								<span class="bar-value">${count} (${percentage}%)</span>
							</div>
						</div>
					</div>
				`;
			}
		});

		html += '</div></div>';
		return html;
	}

	// Generate completion progress chart
	generateProgressChart() {
		const stats = this.getApplicationStats();

		const html = `
			<div class="progress-chart">
				<h3>Overall Progress</h3>
				<div class="progress-grid">
					<div class="progress-card">
						<div class="progress-label">Germany Applications</div>
						<div class="circular-progress" data-progress="${stats.germany.completion}">
							<svg viewBox="0 0 100 100">
								<circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
								<circle cx="50" cy="50" r="45" fill="none" stroke="#667eea" stroke-width="8"
									stroke-dasharray="${stats.germany.completion * 2.827}, 282.7"
									transform="rotate(-90 50 50)"/>
							</svg>
							<div class="progress-value">${stats.germany.completion}%</div>
						</div>
						<div class="progress-details">
							${stats.germany.byStatus.submitted + stats.germany.byStatus.admitted} / ${
			stats.germany.total
		} submitted/admitted
						</div>
					</div>

					<div class="progress-card">
						<div class="progress-label">Schengen Applications</div>
						<div class="circular-progress" data-progress="${stats.schengen.completion}">
							<svg viewBox="0 0 100 100">
								<circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
								<circle cx="50" cy="50" r="45" fill="none" stroke="#764ba2" stroke-width="8"
									stroke-dasharray="${stats.schengen.completion * 2.827}, 282.7"
									transform="rotate(-90 50 50)"/>
							</svg>
							<div class="progress-value">${stats.schengen.completion}%</div>
						</div>
						<div class="progress-details">
							${stats.schengen.byStatus.submitted + stats.schengen.byStatus.admitted} / ${
			stats.schengen.total
		} submitted/admitted
						</div>
					</div>

					<div class="progress-card">
						<div class="progress-label">Task Completion</div>
						<div class="circular-progress" data-progress="${stats.combined.taskCompletion}">
							<svg viewBox="0 0 100 100">
								<circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8"/>
								<circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" stroke-width="8"
									stroke-dasharray="${stats.combined.taskCompletion * 2.827}, 282.7"
									transform="rotate(-90 50 50)"/>
							</svg>
							<div class="progress-value">${stats.combined.taskCompletion}%</div>
						</div>
						<div class="progress-details">All tracked tasks</div>
					</div>
				</div>
			</div>
		`;

		return html;
	}

	// Get IELTS progress statistics
	getIELTSStats() {
		const tasks = JSON.parse(localStorage.getItem('ielts-tasks') || '{}');
		const scores = JSON.parse(localStorage.getItem('ielts-scores') || '[]');

		const totalTasks = Object.keys(tasks).length;
		const completedTasks = Object.values(tasks).filter((t) => t).length;
		const completion =
			totalTasks > 0
				? Math.round((completedTasks / totalTasks) * 100)
				: 0;

		const averageScore =
			scores.length > 0
				? (
						scores.reduce((sum, s) => sum + parseFloat(s.avg), 0) /
						scores.length
				  ).toFixed(1)
				: 0;

		const latestScore =
			scores.length > 0 ? parseFloat(scores[scores.length - 1].avg) : 0;

		return {
			totalTasks,
			completedTasks,
			completion,
			daysTracked: scores.length,
			averageScore,
			latestScore,
			targetScore: 8.5,
			progress:
				latestScore > 0 ? Math.round((latestScore / 8.5) * 100) : 0,
		};
	}

	// Generate IELTS progress chart
	generateIELTSChart() {
		const stats = this.getIELTSStats();
		const scores = JSON.parse(localStorage.getItem('ielts-scores') || '[]');

		let html = '<div class="ielts-chart">';
		html += '<h3>IELTS Progress Tracker</h3>';

		html += '<div class="ielts-stats-grid">';
		html += `
			<div class="stat-box">
				<div class="stat-label">Days Tracked</div>
				<div class="stat-number">${stats.daysTracked}/15</div>
			</div>
			<div class="stat-box">
				<div class="stat-label">Average Score</div>
				<div class="stat-number">${stats.averageScore}/9</div>
			</div>
			<div class="stat-box">
				<div class="stat-label">Latest Score</div>
				<div class="stat-number">${stats.latestScore}/9</div>
			</div>
			<div class="stat-box">
				<div class="stat-label">Task Completion</div>
				<div class="stat-number">${stats.completion}%</div>
			</div>
		`;
		html += '</div>';

		if (scores.length > 0) {
			html += '<div class="score-timeline">';
			html += '<h4>Score Timeline</h4>';
			html += '<div class="timeline-chart">';

			const maxScore = 9;
			scores.slice(-10).forEach((score, index) => {
				const height = (score.avg / maxScore) * 100;
				html += `
					<div class="timeline-bar">
						<div class="timeline-fill" style="height: ${height}%">
							<span class="timeline-label">${score.avg}</span>
						</div>
						<div class="timeline-day">D${score.day}</div>
					</div>
				`;
			});

			html += '</div></div>';
		}

		html += '</div>';
		return html;
	}

	// Generate deadline timeline
	generateDeadlineTimeline() {
		const deadlines = notificationManager
			? notificationManager.getUpcomingDeadlines(90)
			: [];

		if (deadlines.length === 0) {
			return '<div class="no-deadlines">No upcoming deadlines in the next 90 days</div>';
		}

		let html = '<div class="deadline-timeline">';
		html += '<h3>Upcoming Deadlines</h3>';

		deadlines.forEach((deadline) => {
			const urgencyClass =
				deadline.priority === 'critical'
					? 'critical'
					: deadline.priority === 'high'
					? 'high'
					: 'normal';

			html += `
				<div class="deadline-item ${urgencyClass}">
					<div class="deadline-date">
						<div class="date-day">${deadline.daysRemaining}</div>
						<div class="date-label">days</div>
					</div>
					<div class="deadline-info">
						<div class="deadline-university">${deadline.university}</div>
						<div class="deadline-details">
							${deadline.country || '🇩🇪'}
							· ${new Date(deadline.deadline).toLocaleDateString()}
							· Status: ${deadline.status.replace('_', ' ')}
						</div>
					</div>
					<div class="deadline-status">
						${
							deadline.priority === 'critical'
								? '🚨'
								: deadline.priority === 'high'
								? '⚠️'
								: '📅'
						}
					</div>
				</div>
			`;
		});

		html += '</div>';
		return html;
	}

	// Get insights and recommendations
	getInsights() {
		const stats = this.getApplicationStats();
		const ieltsStats = this.getIELTSStats();
		const deadlines = notificationManager
			? notificationManager.getUpcomingDeadlines(30)
			: [];

		const insights = [];

		// Application insights
		if (stats.combined.byStatus.not_started > stats.combined.total / 2) {
			insights.push({
				type: 'warning',
				message: `You have ${stats.combined.byStatus.not_started} universities not yet started. Consider prioritizing them!`,
			});
		}

		if (stats.combined.taskCompletion < 30) {
			insights.push({
				type: 'warning',
				message:
					'Task completion is low. Break down your work into smaller daily goals.',
			});
		}

		// Deadline insights
		const criticalDeadlines = deadlines.filter(
			(d) => d.priority === 'critical',
		);
		if (criticalDeadlines.length > 0) {
			insights.push({
				type: 'critical',
				message: `🚨 ${criticalDeadlines.length} critical deadline(s) approaching within 7 days!`,
			});
		}

		// IELTS insights
		if (ieltsStats.daysTracked > 0 && ieltsStats.latestScore < 7.0) {
			insights.push({
				type: 'warning',
				message:
					'Your IELTS score is below target. Focus more on weak areas.',
			});
		}

		if (ieltsStats.completion > 80) {
			insights.push({
				type: 'success',
				message: '🎉 Great progress on IELTS preparation! Keep it up!',
			});
		}

		// Positive insights
		if (stats.combined.byStatus.admitted > 0) {
			insights.push({
				type: 'success',
				message: `🎉 Congratulations! You've been admitted to ${stats.combined.byStatus.admitted} university/universities!`,
			});
		}

		if (stats.combined.completion > 70) {
			insights.push({
				type: 'success',
				message: "Excellent application progress! You're on track!",
			});
		}

		return insights;
	}
}

// Export singleton instance
const analyticsManager = new AnalyticsManager();
