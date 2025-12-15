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
	if (tab === 'plan') displayPlan();
}

function displayProgress() {
	const stats = document.getElementById('stats');
	if (scores.length === 0) {
		stats.innerHTML = '<p>No scores yet. Start tracking!</p>';
		return;
	}
	const avg = (
		scores.reduce((sum, s) => sum + parseFloat(s.avg), 0) / scores.length
	).toFixed(1);
	const latest = scores[scores.length - 1];
	stats.innerHTML = `
        <div class="stat">
            <h3>Overall Average</h3>
            <p class="big">${avg} / 9</p>
        </div>
        <div class="stat">
            <h3>Latest (Day ${latest.day})</h3>
            <p>L: ${latest.l} | R: ${latest.r} | W: ${latest.w} | S: ${latest.s}</p>
        </div>
        <div class="stat">
            <h3>Target</h3>
            <p class="big">8.5</p>
        </div>
        <div class="stat">
            <h3>Days Tracked</h3>
            <p class="big">${scores.length} / 15</p>
        </div>
    `;
}

// displayPlan() - Now uses MASTER_PLAN.ieltsSchedule as single source of truth
function displayPlan() {
	const plan = document.getElementById('plan-content');
	if (!plan) return;

	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};

	// Auto-import rescheduled tasks
	const nextBucket = JSON.parse(localStorage.getItem('ielts-next')) || {};
	if (Object.keys(nextBucket).length > 0) {
		const merged = { ...nextBucket, ...tasks };
		localStorage.setItem('ielts-tasks', JSON.stringify(merged));
		localStorage.removeItem('ielts-next');
	}

	// Streak tracking
	const todayStr = new Date().toISOString().slice(0, 10);
	const streakData = JSON.parse(localStorage.getItem('ielts-streak')) || {
		lastActive: null,
		streak: 0,
	};
	if (streakData.lastActive !== todayStr) {
		const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
			.toISOString()
			.slice(0, 10);
		streakData.streak =
			streakData.lastActive === yesterday
				? (streakData.streak || 0) + 1
				: getCompletedCount() > 0
				? 1
				: streakData.streak || 0;
		streakData.lastActive = todayStr;
		localStorage.setItem('ielts-streak', JSON.stringify(streakData));
	}

	// Check if MASTER_PLAN is available
	if (typeof MASTER_PLAN === 'undefined' || !MASTER_PLAN.ieltsSchedule) {
		plan.innerHTML =
			'<div style="text-align:center; padding:40px; color:#666;"><p>⏳ Loading study plan...</p><p style="font-size:12px; margin-top:10px;">Make sure master-plan.js is loaded.</p></div>';
		return;
	}

	// Calculate overall progress
	let totalTasks = 0;
	let completedTasks = 0;
	MASTER_PLAN.ieltsSchedule.forEach((day) => {
		totalTasks += day.tasks.length;
		day.tasks.forEach((_, idx) => {
			const taskId = 'mp-d' + day.day + '-' + idx;
			if (tasks[taskId]) completedTasks++;
		});
	});
	const progressPercent =
		totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

	// Define phases for grouping
	const phases = [
		{ name: 'Phase 1: Diagnosis & Foundation', days: [1, 2], icon: '🎯' },
		{ name: 'Phase 2: Section Mastery', days: [3, 4, 5, 6], icon: '📚' },
		{ name: 'Phase 3: Writing & Speaking', days: [7, 8], icon: '✍️' },
		{ name: 'Phase 4: Integration', days: [9, 10], icon: '🔄' },
		{ name: 'Phase 5: Mock Test #1', days: [11, 12], icon: '🎯' },
		{ name: 'Phase 6: Refinement & Mock #2', days: [13, 14], icon: '📊' },
		{ name: 'Phase 7: Final Prep', days: [15], icon: '🏆' },
	];

	let planHTML =
		'<div class="legend">' +
		'<span class="legend-item listening">🎧 Listening</span>' +
		'<span class="legend-item reading">📚 Reading</span>' +
		'<span class="legend-item writing">✍️ Writing</span>' +
		'<span class="legend-item speaking">🎤 Speaking</span>' +
		'<span class="legend-item vocab">📝 Vocab/Grammar</span>' +
		'<span class="legend-item mock">🎯 Mock/Test</span>' +
		'</div>' +
		'<div class="plan-toolbar" style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin:8px 0 14px 0;">' +
		'<button class="action-btn ielts-btn" onclick="skipBusyDay()">😮‍💨 I\'m busy today</button>' +
		'<button class="action-btn ielts-btn" onclick="rescheduleIncomplete()">🔁 Reschedule incomplete</button>' +
		'<div style="margin-left:auto; font-size:14px; color:#555;">' +
		'🔥 Streak: <strong id="streak-count">' +
		(streakData.streak || 0) +
		'</strong> days' +
		' | 📊 Progress: <strong>' +
		progressPercent +
		'%</strong> (' +
		completedTasks +
		'/' +
		totalTasks +
		')' +
		'</div></div>';

	// Render each phase
	phases.forEach(function (phase) {
		const phaseDays = MASTER_PLAN.ieltsSchedule.filter(function (d) {
			return phase.days.includes(d.day);
		});
		if (phaseDays.length === 0) return;

		// Calculate phase progress
		let phaseTotal = 0;
		let phaseCompleted = 0;
		phaseDays.forEach(function (day) {
			phaseTotal += day.tasks.length;
			day.tasks.forEach(function (_, idx) {
				if (tasks['mp-d' + day.day + '-' + idx]) phaseCompleted++;
			});
		});
		const phasePercent =
			phaseTotal > 0
				? Math.round((phaseCompleted / phaseTotal) * 100)
				: 0;
		const phaseComplete = phasePercent === 100;

		planHTML +=
			'<h3 style="margin-top:20px; display:flex; justify-content:space-between; align-items:center; padding:10px; background:' +
			(phaseComplete ? '#10b981' : '#f3f4f6') +
			'; border-radius:8px; color:' +
			(phaseComplete ? '#fff' : '#1f2937') +
			';">' +
			'<span>' +
			phase.icon +
			' ' +
			phase.name +
			'</span>' +
			'<span style="font-size:12px; font-weight:normal;">' +
			phasePercent +
			'% (' +
			phaseCompleted +
			'/' +
			phaseTotal +
			')</span></h3>';

		phaseDays.forEach(function (day) {
			// Day progress
			let dayCompleted = 0;
			day.tasks.forEach(function (_, idx) {
				if (tasks['mp-d' + day.day + '-' + idx]) dayCompleted++;
			});
			const dayPercent =
				day.tasks.length > 0
					? Math.round((dayCompleted / day.tasks.length) * 100)
					: 0;
			const dayComplete = dayPercent === 100;

			planHTML +=
				'<div class="day-section" style="margin:10px 0; border:1px solid ' +
				(dayComplete ? '#10b981' : '#e5e7eb') +
				'; border-radius:8px; overflow:hidden;' +
				(dayComplete ? 'background:#f0fdf4;' : '') +
				'">' +
				'<div class="day-header" style="background:' +
				(dayComplete ? '#10b981' : '#f8f9fa') +
				'; padding:12px 15px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="toggleDaySection(this)">' +
				'<div><strong style="color:' +
				(dayComplete ? '#fff' : '#1f2937') +
				';">Day ' +
				day.day +
				': ' +
				day.focus +
				'</strong>' +
				'<span style="font-size:12px; color:' +
				(dayComplete ? '#d1fae5' : '#6b7280') +
				'; margin-left:10px;">' +
				day.date +
				' • ' +
				day.hours +
				'h</span>' +
				(day.targetScore
					? '<span style="font-size:11px; color:' +
					  (dayComplete ? '#d1fae5' : '#059669') +
					  '; margin-left:8px;">🎯 ' +
					  day.targetScore +
					  '</span>'
					: '') +
				'</div><div style="display:flex; align-items:center; gap:10px;">' +
				'<span style="font-size:12px; color:' +
				(dayComplete ? '#d1fae5' : '#6b7280') +
				';">' +
				dayCompleted +
				'/' +
				day.tasks.length +
				'</span>' +
				'<span class="day-arrow" style="font-size:16px; color:' +
				(dayComplete ? '#fff' : '#6b7280') +
				'; transition:transform 0.2s;">▼</span>' +
				'</div></div><div class="day-tasks" style="display:none; padding:10px;">' +
				'<table class="task-table" style="margin:0; border:none;"><tr><th style="width:30px;">✓</th><th style="width:100px;">Time</th><th>Task</th><th style="width:30px;">📖</th></tr>';

			day.tasks.forEach(function (t, idx) {
				const taskId = 'mp-d' + day.day + '-' + idx;
				const checked = tasks[taskId] ? 'checked' : '';
				const taskIcon = getTaskIconFromText(t.task);

				// Calculate duration from time range
				let duration = '';
				if (t.time && t.time.includes('-')) {
					const parts = t.time.split('-');
					if (parts.length === 2) {
						const [sh, sm] = parts[0].split(':').map(Number);
						const [eh, em] = parts[1].split(':').map(Number);
						const mins = eh * 60 + em - (sh * 60 + sm);
						if (mins >= 60) duration = mins / 60 + 'h';
						else if (mins > 0) duration = mins + 'm';
					}
				}

				planHTML +=
					'<tr class="' +
					(checked ? 'completed-task' : '') +
					'" style="' +
					(checked
						? 'opacity:0.6; text-decoration:line-through;'
						: '') +
					'">' +
					'<td><input type="checkbox" ' +
					checked +
					' onchange="toggleTask(\'' +
					taskId +
					'\')"></td>' +
					'<td style="font-size:11px; color:#0d9488; white-space:nowrap; text-align:center;"><div style="font-weight:600;">' +
					t.time +
					'</div>' +
					(duration
						? '<div style="font-size:10px; color:#14b8a6;">' +
						  duration +
						  '</div>'
						: '') +
					'</td>' +
					'<td>' +
					taskIcon +
					' ' +
					t.task +
					'</td>' +
					'<td style="text-align:center;"><a href="#ielts-practice" onclick="showPage(\'ielts-practice\'); openIELTSFolder && openIELTSFolder(\'d' +
					day.day +
					'\')" style="font-size:16px; text-decoration:none;" title="Day ' +
					day.day +
					' Resources">📖</a></td></tr>';
			});

			planHTML += '</table></div></div>';
		});
	});

	planHTML +=
		'<div class="progress-summary" style="margin-top:20px; padding:15px; background:linear-gradient(135deg, #f0fdf4, #ecfdf5); border-radius:8px; text-align:center; border:1px solid #10b981;">' +
		'<h4 style="margin:0 0 10px 0; color:#059669;">🎯 Target: Band ' +
		MASTER_PLAN.targetIELTS +
		' by ' +
		MASTER_PLAN.examDate +
		'</h4>' +
		'<div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; font-size:14px;">' +
		'<div>✅ <strong>' +
		completedTasks +
		'</strong> done</div>' +
		'<div>📋 <strong>' +
		(totalTasks - completedTasks) +
		'</strong> remaining</div>' +
		'<div>📅 <strong>' +
		MASTER_PLAN.daysRemaining +
		'</strong> days left</div>' +
		'<div>🔥 <strong>' +
		(streakData.streak || 0) +
		'</strong> day streak</div>' +
		'</div></div>';

	plan.innerHTML = planHTML;

	// Trigger Firebase sync if available
	if (typeof cloudSync !== 'undefined' && cloudSync.syncEnabled) {
		cloudSync.syncToCloud();
	}
}

// Get task icon based on task content
function getTaskIconFromText(task) {
	const t = (task || '').toLowerCase();
	if (t.includes('listening') || t.includes('bbc') || t.includes('audio'))
		return '🎧';
	if (
		t.includes('reading') ||
		t.includes('passage') ||
		t.includes('60 min strict')
	)
		return '📚';
	if (
		t.includes('writing') ||
		t.includes('essay') ||
		t.includes('task 1') ||
		t.includes('task 2')
	)
		return '✍️';
	if (
		t.includes('speaking') ||
		t.includes('cue card') ||
		t.includes('part 1') ||
		t.includes('part 2') ||
		t.includes('part 3')
	)
		return '🎤';
	if (
		t.includes('vocab') ||
		t.includes('grammar') ||
		t.includes('word') ||
		t.includes('synonym')
	)
		return '📝';
	if (
		t.includes('mock') ||
		t.includes('test') ||
		t.includes('score') ||
		t.includes('cambridge')
	)
		return '🎯';
	if (
		t.includes('break') ||
		t.includes('lunch') ||
		t.includes('dinner') ||
		t.includes('rest') ||
		t.includes('snack')
	)
		return '☕';
	if (
		t.includes('daad') ||
		t.includes('scholarship') ||
		t.includes('motivation')
	)
		return '🎓';
	if (
		t.includes('register') ||
		t.includes('order') ||
		t.includes('setup') ||
		t.includes('schedule')
	)
		return '⚙️';
	if (t.includes('analyze') || t.includes('review') || t.includes('mistake'))
		return '🔍';
	return '📌';
}

// Toggle day section visibility
function toggleDaySection(header) {
	const tasksDiv = header.nextElementSibling;
	const arrow = header.querySelector('.day-arrow');
	if (tasksDiv.style.display === 'none') {
		tasksDiv.style.display = 'block';
		if (arrow) arrow.style.transform = 'rotate(180deg)';
	} else {
		tasksDiv.style.display = 'none';
		if (arrow) arrow.style.transform = 'rotate(0deg)';
	}
}

function renderTask(id, time, task, duration) {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	const checked = tasks[id] ? 'checked' : '';
	const rowClass = time.startsWith('DAY') ? 'day-header' : '';

	// Register weight by task type for weighted completion
	registerTaskWeight(id, task);

	if (time.startsWith('DAY')) {
		return `<tr class="${rowClass}"><td colspan="4"><b>${time}</b></td></tr>`;
	}

	return `
		<tr>
			<td><input type="checkbox" ${checked} onchange="toggleTask('${id}')"></td>
			<td>${time}</td>
			<td>${task}</td>
			<td>${duration}</td>
		</tr>
	`;
}

function toggleTask(id) {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	tasks[id] = !tasks[id];
	localStorage.setItem('ielts-tasks', JSON.stringify(tasks));
	// Update streak lastActive
	const sd = JSON.parse(localStorage.getItem('ielts-streak')) || {
		lastActive: null,
		streak: 0,
	};
	sd.lastActive = new Date().toISOString().slice(0, 10);
	localStorage.setItem('ielts-streak', JSON.stringify(sd));

	// Trigger Firebase sync if available
	if (typeof cloudSync !== 'undefined' && cloudSync.syncEnabled) {
		cloudSync.syncToCloud();
	}

	displayPlan(); // Real-time update
}

function getCompletedCount() {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	return Object.values(tasks).filter(Boolean).length;
}

function registerTaskWeight(id, task) {
	const weights = JSON.parse(localStorage.getItem('ielts-weights')) || {};
	if (weights[id]) return; // keep existing
	const t = (task || '').toLowerCase();
	let w = 1;
	if (t.includes('mock')) w = 3;
	else if (t.includes('speaking')) w = 2;
	else if (t.includes('listening')) w = 2;
	else if (t.includes('reading')) w = 2;
	else if (t.includes('writing')) w = 2;
	else if (t.includes('vocab') || t.includes('grammar')) w = 1;
	weights[id] = w;
	localStorage.setItem('ielts-weights', JSON.stringify(weights));
}

function getWeightedCompletion() {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	const weights = JSON.parse(localStorage.getItem('ielts-weights')) || {};
	let total = 0;
	let completed = 0;
	Object.entries(tasks).forEach(([id, done]) => {
		const w = weights[id] || 1;
		total += w;
		if (done) completed += w;
	});
	return { total, completed };
}

displayScores();

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js');
}

// Busy-day: mark long tasks unchecked and create a lighter set
function skipBusyDay() {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	// Heuristic: uncheck long-duration mocks and multi-hour items for today-like ids
	Object.keys(tasks).forEach((id) => {
		if (
			/mock|FULL MOCK|Mini Mock|Listening Section 4|All 4 Sections/i.test(
				id,
			) ||
			/d\d-\d+/.test(id)
		) {
			// no-op on id; rely on user-visible items; here we simply leave state
		}
	});
	// Add a light checklist set
	const light = {
		'light-1': true, // 10-min vocab review
		'light-2': true, // 1 cue card
		'light-3': true, // 10-min listening
	};
	localStorage.setItem('ielts-tasks', JSON.stringify({ ...tasks, ...light }));
	displayPlan();
}

// Reschedule incomplete: move unchecked tasks to a "next" bucket
function rescheduleIncomplete() {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	const next = JSON.parse(localStorage.getItem('ielts-next')) || {};
	Object.entries(tasks).forEach(([id, done]) => {
		if (!done && /^d\d-\d+$/.test(id)) {
			next[id] = false;
			delete tasks[id];
		}
	});
	localStorage.setItem('ielts-tasks', JSON.stringify(tasks));
	localStorage.setItem('ielts-next', JSON.stringify(next));
	displayPlan();
}
