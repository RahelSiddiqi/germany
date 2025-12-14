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

function displayPlan() {
	const plan = document.getElementById('plan-content');
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
		// If yesterday was last active, continue streak; else reset when user visits
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

	plan.innerHTML = `
		<div class="legend">
			<span class="legend-item listening">🟦 Listening</span>
			<span class="legend-item reading">🟩 Reading</span>
			<span class="legend-item writing">🟨 Writing</span>
			<span class="legend-item speaking">🟪 Speaking</span>
			<span class="legend-item vocab">🟧 Vocab/Grammar</span>
			<span class="legend-item mock">🟥 Mock Test</span>
		</div>

		<div class="plan-toolbar" style="display:flex; gap:8px; align-items:center; margin:8px 0 14px 0;">
			<button class="action-btn ielts-btn" onclick="skipBusyDay()">😮‍💨 I’m busy today (light plan)</button>
			<button class="action-btn ielts-btn" onclick="rescheduleIncomplete()">🔁 Reschedule incomplete to next day</button>
			<div style="margin-left:auto; font-size:14px; color:#555;">🔥 Streak: <strong id="streak-count">${
				streakData.streak || 0
			}</strong> days</div>
		</div>

		<h3>DAYS 1–2: Foundations & Setup</h3>
		<p>Goal: Master structure, band descriptors, timing. Set baseline.</p>
		<table class="task-table">
			<tr><th>✓</th><th>Time</th><th>Task</th><th>Duration</th></tr>
			${renderTask('d1-1', 'DAY 1', '', '')}
			${renderTask(
				'd1-2',
				'9:00–11:00 AM',
				'🟦 IELTS Overview + Band Descriptors',
				'2h',
			)}
			${renderTask(
				'd1-3',
				'9:00–11:00 AM',
				'🟨 Writing Task 1&2 structure review',
				'2h',
			)}
			${renderTask(
				'd1-4',
				'1:00–7:00 PM',
				'🟪 Speaking sample answers (Part 1,2,3)',
				'6h',
			)}
			${renderTask(
				'd1-5',
				'1:00–7:00 PM',
				'🟧 Vocabulary: 20 words (Academic Word List)',
				'—',
			)}
			${renderTask(
				'd1-6',
				'9:00–11:00 PM',
				'🟦 Listening TED audio (10 min) + transcription',
				'2h',
			)}
			${renderTask(
				'd1-7',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mini Mock: Listening Section 1</b>',
				'20 min',
			)}
			${renderTask('d2-1', 'DAY 2', '', '')}
			${renderTask(
				'd2-2',
				'9:00–11:00 AM',
				'🟩 Reading: Skimming/Scanning strategies',
				'2h',
			)}
			${renderTask(
				'd2-3',
				'9:00–11:00 AM',
				'🟦 Listening: Note-taking + keywords',
				'2h',
			)}
			${renderTask(
				'd2-4',
				'1:00–7:00 PM',
				'🟩 Reading Passage 1 (timed, 20 min)',
				'6h',
			)}
			${renderTask(
				'd2-5',
				'1:00–7:00 PM',
				'🟦 Listening Section 2 MCQ (15 min)',
				'—',
			)}
			${renderTask(
				'd2-6',
				'1:00–7:00 PM',
				'🟧 Vocabulary: 20 words + flashcards',
				'—',
			)}
			${renderTask(
				'd2-7',
				'9:00–11:00 PM',
				'🟩 Reading review + error analysis',
				'2h',
			)}
			${renderTask(
				'd2-8',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mini Mock: Reading Passage 1</b>',
				'20 min',
			)}
		</table>

		<h3>DAYS 3–5: Listening & Reading Intensive</h3>
		<p>Goal: Practice all question types. Target: 8.0+ in both sections.</p>
		<table class="task-table">
			<tr><th>✓</th><th>Time</th><th>Task</th><th>Duration</th></tr>
			${renderTask('d3-1', 'DAY 3: Listening Focus', '', '')}
			${renderTask(
				'd3-2',
				'9:00–11:00 AM',
				'🟦 Section 1: Form Completion + MCQ (Cambridge 15)',
				'2h',
			)}
			${renderTask('d3-3', '1:00–2:30 PM', '🟦 Section 2: Map Labeling', '1.5h')}
			${renderTask('d3-4', '2:30–4:00 PM', '🟦 Section 3: Note Completion', '1.5h')}
			${renderTask(
				'd3-5',
				'4:00–5:00 PM',
				'🟧 Error analysis: transcripts + common mistakes',
				'1h',
			)}
			${renderTask(
				'd3-6',
				'5:00–7:00 PM',
				'🟧 Vocabulary: 25 technical terms + phrases',
				'2h',
			)}
			${renderTask(
				'd3-7',
				'9:00–11:00 PM',
				'🟦 BBC 6 Minute English (10 min) + summarize',
				'2h',
			)}
			${renderTask(
				'd3-8',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mini Mock: Section 1 (Re-do)</b>',
				'20 min',
			)}
			${renderTask('d4-1', 'DAY 4: Reading Focus', '', '')}
			${renderTask(
				'd4-2',
				'9:00–11:00 AM',
				'🟩 Passage 1: Matching Headings (Cambridge 15)',
				'2h',
			)}
			${renderTask('d4-3', '1:00–2:30 PM', '🟩 Passage 2: T/F/Not Given', '1.5h')}
			${renderTask(
				'd4-4',
				'2:30–4:00 PM',
				'🟩 Passage 3: Sentence Completion',
				'1.5h',
			)}
			${renderTask('d4-5', '4:00–5:00 PM', '🟧 Error analysis: weak Q types', '1h')}
			${renderTask(
				'd4-6',
				'5:00–7:00 PM',
				'🟦 Listening Section 4 (Cambridge 14)',
				'2h',
			)}
			${renderTask(
				'd4-7',
				'9:00–11:00 PM',
				'🟧 Vocabulary: idioms & academic phrases',
				'2h',
			)}
			${renderTask(
				'd4-8',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mini Mock: Reading Passage 2</b>',
				'20 min',
			)}
			${renderTask('d5-1', 'DAY 5: Mixed Integration', '', '')}
			${renderTask(
				'd5-2',
				'9:00–10:30 AM',
				'🟦 Listening Sections 1&2 (Cambridge 14)',
				'1.5h',
			)}
			${renderTask('d5-3', '10:30–11:00 AM', '🟩 Reading Passage 3', '0.5h')}
			${renderTask(
				'd5-4',
				'1:00–3:00 PM',
				'🟨 Writing: Task 1 mini-practice (20 min × 2)',
				'2h',
			)}
			${renderTask(
				'd5-5',
				'3:00–5:00 PM',
				'🟪 Speaking: Part 2 cue cards (2 min × 3)',
				'2h',
			)}
			${renderTask('d5-6', '5:00–6:00 PM', '🟧 Vocabulary + grammar review', '1h')}
			${renderTask(
				'd5-7',
				'6:00–7:00 PM',
				'🟦 Listening: diagram labeling practice',
				'1h',
			)}
			${renderTask('d5-8', '9:00–11:00 PM', '🟩 Reading weak Qs re-do', '2h')}
		</table>

		<h3>DAYS 6–8: Writing & Speaking</h3>
		<p>Goal: Master structure, grammar, coherence. Target: 8.0+ in both.</p>
		<table class="task-table">
			<tr><th>✓</th><th>Time</th><th>Task</th><th>Duration</th></tr>
			${renderTask('d6-1', 'DAY 6: Writing Task 1', '', '')}
			${renderTask(
				'd6-2',
				'9:00–10:00 AM',
				'🟨 Task 1 structure: pie, line, bar, table',
				'1h',
			)}
			${renderTask('d6-3', '10:00–11:00 AM', '🟨 Task 1: Plan + Draft', '1h')}
			${renderTask('d6-4', '1:00–2:00 PM', '🟨 Task 1: Graph 1 (Cambridge 15)', '1h')}
			${renderTask('d6-5', '2:00–3:00 PM', '🟨 Task 1: Table 1 (Cambridge 15)', '1h')}
			${renderTask('d6-6', '3:00–4:00 PM', '🟨 Task 1: Chart 1 (Cambridge 14)', '1h')}
			${renderTask('d6-7', '4:00–5:00 PM', '🟧 Vocabulary: data description', '1h')}
			${renderTask('d6-8', '5:00–7:00 PM', '🟦 Listening Section 1&2', '2h')}
			${renderTask('d6-9', '9:00–11:00 PM', '🟨 Review Task 1 answers', '2h')}
			${renderTask(
				'd6-10',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mock: Task 1 (20 min)</b>',
				'20 min',
			)}
			${renderTask('d7-1', 'DAY 7: Writing Task 2', '', '')}
			${renderTask('d7-2', '9:00–10:00 AM', '🟨 Task 2 essay structure', '1h')}
			${renderTask('d7-3', '10:00–11:00 AM', '🟨 Essay types: agree/disagree', '1h')}
			${renderTask('d7-4', '1:00–2:00 PM', '🟨 Essay 1: Education technology', '1h')}
			${renderTask('d7-5', '2:00–3:00 PM', '🟨 Essay 2: Environmental policy', '1h')}
			${renderTask('d7-6', '3:00–4:00 PM', '🟧 Grammar: complex sentences', '1h')}
			${renderTask('d7-7', '4:00–5:00 PM', '🟧 Vocabulary: academic phrases', '1h')}
			${renderTask('d7-8', '5:00–7:00 PM', '🟪 Speaking Part 1&3', '2h')}
			${renderTask('d7-9', '9:00–11:00 PM', '🟨 Essay review', '2h')}
			${renderTask(
				'd7-10',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mock: Task 2 (40 min)</b>',
				'40 min',
			)}
			${renderTask('d8-1', 'DAY 8: Speaking', '', '')}
			${renderTask(
				'd8-2',
				'9:00–9:30 AM',
				'🟪 Speaking Part 2: Cue card strategy',
				'0.5h',
			)}
			${renderTask(
				'd8-3',
				'9:30–11:00 AM',
				'🟪 Part 2: Practice 3 cue cards',
				'1.5h',
			)}
			${renderTask('d8-4', '1:00–2:30 PM', '🟪 Part 1: 20 common questions', '1.5h')}
			${renderTask('d8-5', '2:30–4:00 PM', '🟪 Part 3: Follow-up discussion', '1.5h')}
			${renderTask('d8-6', '4:00–5:00 PM', '🟧 Idioms & complex phrases', '1h')}
			${renderTask('d8-7', '5:00–7:00 PM', '🟦 Listening Section 3&4', '2h')}
			${renderTask('d8-8', '9:00–11:00 PM', '🟪 Self-assess recordings', '2h')}
			${renderTask(
				'd8-9',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mock: Speaking Part 2</b>',
				'20 min',
			)}
		</table>

		<h3>DAYS 9–10: Integration & Weak Areas</h3>
		<table class="task-table">
			<tr><th>✓</th><th>Time</th><th>Task</th><th>Duration</th></tr>
			${renderTask('d9-1', 'DAY 9: Mixed Practice', '', '')}
			${renderTask('d9-2', '9:00–10:30 AM', '🟦 Listening Sections 1&2', '1.5h')}
			${renderTask('d9-3', '10:30–11:30 AM', '🟩 Reading Passage 1&2', '1h')}
			${renderTask('d9-4', '1:00–2:00 PM', '🟨 Writing Task 1: Bar chart', '1h')}
			${renderTask('d9-5', '2:00–3:00 PM', '🟨 Writing Task 2: Global warming', '1h')}
			${renderTask('d9-6', '3:00–4:00 PM', '🟪 Speaking: 3 new cue cards', '1h')}
			${renderTask('d9-7', '4:00–5:00 PM', '🟧 Error analysis Days 6–8', '1h')}
			${renderTask('d9-8', '5:00–7:00 PM', '🟧 Vocabulary: 30 new words', '2h')}
			${renderTask('d9-9', '9:00–11:00 PM', '🟨 Review Task 1&2 + speaking', '2h')}
			${renderTask(
				'd9-10',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mock: Reading Passage 3</b>',
				'20 min',
			)}
			${renderTask('d10-1', 'DAY 10: Weakness Focus', '', '')}
			${renderTask('d10-2', '9:00–11:00 AM', '⚠ Focus on weakest section', '2h')}
			${renderTask('d10-3', '1:00–3:00 PM', '⚠ 2nd weakest section', '2h')}
			${renderTask('d10-4', '3:00–4:00 PM', '🟧 Vocabulary: 25 words + idioms', '1h')}
			${renderTask('d10-5', '4:00–5:00 PM', '🟧 Grammar: problem areas', '1h')}
			${renderTask('d10-6', '5:00–7:00 PM', '🟨 Writing: Task 1 + Task 2', '2h')}
			${renderTask('d10-7', '9:00–11:00 PM', '🟪 Speaking: Part 2&3', '2h')}
			${renderTask(
				'd10-8',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mock: Listening Sec 4</b>',
				'20 min',
			)}
		</table>

		<h3>DAYS 11–12: Full Mock Tests</h3>
		<table class="task-table">
			<tr><th>✓</th><th>Time</th><th>Task</th><th>Duration</th></tr>
			${renderTask('d11-1', 'DAY 11: FULL MOCK #1', '', '')}
			${renderTask(
				'd11-2',
				'9:00–10:40 AM',
				'🟦 LISTENING: All 4 Sections',
				'1h 40m',
			)}
			${renderTask(
				'd11-3',
				'10:50 AM–12:30 PM',
				'🟩 READING: All 3 Passages',
				'1h 40m',
			)}
			${renderTask('d11-4', '12:30–1:00 PM', '🏁 Score & note mistakes', '0.5h')}
			${renderTask('d11-5', '1:00–2:30 PM', '🟨 WRITING Task 1 + 2', '1.5h')}
			${renderTask('d11-6', '2:30–3:30 PM', '🟧 Writing review', '1h')}
			${renderTask('d11-7', '3:30–5:00 PM', '🟪 SPEAKING: Full mock', '1.5h')}
			${renderTask('d11-8', '5:00–7:00 PM', '📊 Analyze performance', '2h')}
			${renderTask('d11-9', '9:00–11:30 PM', '🟧 Vocabulary & error review', '2.5h')}
			${renderTask('d11-10', '11:30 PM–12:00 AM', '📝 Log scores', '0.5h')}
			${renderTask('d12-1', 'DAY 12: Review & Fix', '', '')}
			${renderTask(
				'd12-2',
				'9:00–10:30 AM',
				'🟦 Re-do 20 listening mistakes',
				'1.5h',
			)}
			${renderTask('d12-3', '10:30–11:30 AM', '🟩 Re-do 10 reading mistakes', '1h')}
			${renderTask('d12-4', '1:00–2:30 PM', '🟨 Correct & re-write 2 tasks', '1.5h')}
			${renderTask('d12-5', '2:30–3:30 PM', '🟧 Grammar & vocabulary', '1h')}
			${renderTask('d12-6', '3:30–5:00 PM', '🟪 Review recordings', '1.5h')}
			${renderTask('d12-7', '5:00–7:00 PM', '📊 Identify top 3 weaknesses', '2h')}
			${renderTask('d12-8', '9:00–11:30 PM', '🟧 Practice weak areas', '2.5h')}
			${renderTask(
				'd12-9',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mock: Weakest Q type</b>',
				'20 min',
			)}
		</table>

		<h3>DAYS 13–14: Refinement & Mock #2</h3>
		<table class="task-table">
			<tr><th>✓</th><th>Time</th><th>Task</th><th>Duration</th></tr>
			${renderTask('d13-1', 'DAY 13: Targeted Practice', '', '')}
			${renderTask(
				'd13-2',
				'9:00–11:00 AM',
				'⚠ Listening: Top weak Q type × 3',
				'2h',
			)}
			${renderTask('d13-3', '1:00–3:00 PM', '⚠ Reading: Top weak Q type × 3', '2h')}
			${renderTask('d13-4', '3:00–4:00 PM', '⚠ Writing: Rewrite weak essay', '1h')}
			${renderTask('d13-5', '4:00–5:00 PM', '⚠ Speaking: Cue cards weak area', '1h')}
			${renderTask('d13-6', '5:00–7:00 PM', '🟧 Vocabulary: 100 words review', '2h')}
			${renderTask(
				'd13-7',
				'9:00–11:30 PM',
				'🟧 Grammar: conditional, passive',
				'2.5h',
			)}
			${renderTask(
				'd13-8',
				'11:30 PM–12:00 AM',
				'<b>🟥 Mock: Listening Sec 2</b>',
				'20 min',
			)}
			${renderTask('d14-1', 'DAY 14: FULL MOCK #2', '', '')}
			${renderTask(
				'd14-2',
				'9:00–10:40 AM',
				'🟦 LISTENING: All 4 Sections',
				'1h 40m',
			)}
			${renderTask(
				'd14-3',
				'10:50 AM–12:30 PM',
				'🟩 READING: All 3 Passages',
				'1h 40m',
			)}
			${renderTask('d14-4', '12:30–1:00 PM', '🏁 Quick score check', '0.5h')}
			${renderTask('d14-5', '1:00–2:30 PM', '🟨 WRITING Task 1 + 2', '1.5h')}
			${renderTask('d14-6', '2:30–3:30 PM', '🟪 SPEAKING: Full mock', '1h')}
			${renderTask('d14-7', '3:30–5:00 PM', '📊 Compare to Mock #1', '1.5h')}
			${renderTask('d14-8', '5:00–7:00 PM', '🟧 Error analysis', '2h')}
			${renderTask('d14-9', '9:00–11:30 PM', '🟧 Final vocab & grammar', '2.5h')}
			${renderTask(
				'd14-10',
				'11:30 PM–12:00 AM',
				'📝 Log scores & plan Day 15',
				'0.5h',
			)}
		</table>

		<h3>DAY 15: Final Prep</h3>
		<table class="task-table">
			<tr><th>✓</th><th>Time</th><th>Task</th><th>Duration</th></tr>
			${renderTask('d15-1', '9:00–10:00 AM', '🟦 Light Listening: 1 Section', '1h')}
			${renderTask('d15-2', '10:00–11:00 AM', '🟩 Light Reading: 1 Passage', '1h')}
			${renderTask('d15-3', '1:00–2:00 PM', '🟨 Writing: 1 Task 1 (no timer)', '1h')}
			${renderTask('d15-4', '2:00–3:00 PM', '🟪 Speaking: 2 cue cards', '1h')}
			${renderTask('d15-5', '3:00–5:00 PM', '🟧 Vocabulary: Final review', '2h')}
			${renderTask('d15-6', '5:00–7:00 PM', '📋 Exam day checklist', '2h')}
			${renderTask('d15-7', '7:00–9:00 PM', '✨ Rest, meal, hydrate', '2h')}
			${renderTask(
				'd15-8',
				'9:00–11:30 PM',
				'🧘 Visualization & mental prep',
				'2.5h',
			)}
			${renderTask(
				'd15-9',
				'11:30 PM–12:00 AM',
				'<b>🟥 Final Mock: Reading Sec 1</b>',
				'20 min',
			)}
		</table>

		<div class="progress-summary">
		<div class="progress-summary">
			<h4>Overall Progress</h4>
			<p>${getCompletedCount()} tasks completed</p>
			<p>Weighted: ${getWeightedCompletion().completed} / ${
		getWeightedCompletion().total
	} points</p>
		</div>
	`;
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
