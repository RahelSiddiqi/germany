// Global variables
let germanyUniversities = [];
let schengenUniversities = [];
let scholarshipGuide = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
	loadAllData();
	updateDashboardStats();
	showPage('dashboard');
});

// Load all university data
async function loadAllData() {
	await Promise.all([loadGermanyData(), loadSchengenData()]);
	updateDashboardStats();
}

// Page navigation
function showPage(pageId) {
	// Remove active class from all pages and links
	document
		.querySelectorAll('.page')
		.forEach((page) => page.classList.remove('active'));
	document
		.querySelectorAll('.menu a')
		.forEach((link) => link.classList.remove('active'));

	// Show the selected page
	const page = document.getElementById(pageId);
	if (page) {
		page.classList.add('active');
	}

	// Add active class to the corresponding menu link
	document.querySelectorAll('.menu a').forEach((link) => {
		const href = link.getAttribute('href');
		if (href === `#${pageId}`) {
			link.classList.add('active');
		}
	});

	if (pageId === 'ielts') {
		displayIELTSPlan();
	} else if (pageId === 'germany') {
		displayGermanyUniversities();
	} else if (pageId === 'germany-progress') {
		displayGermanyProgress();
	} else if (pageId === 'schengen') {
		displaySchengenUniversities();
	} else if (pageId === 'schengen-progress') {
		displaySchengenProgress();
	} else if (pageId === 'scholarships') {
		displayScholarships();
	}

	document.getElementById('sidebar').classList.remove('open');

	// Close mobile sidebar on page change
	if (window.innerWidth <= 768) {
		document.getElementById('sidebar').classList.remove('active');
	}
}

function toggleMenu() {
	document.getElementById('sidebar').classList.toggle('active');
}

// Toggle expand/collapse for accordion cards
function toggleExpand(element) {
	const header = element;
	const content = header.nextElementSibling;
	const toggle = header.querySelector('.expandable-toggle');
	if (content && toggle) {
		content.classList.toggle('open');
		toggle.classList.toggle('open');
	}
}

// Utility functions
function getDefaultTasks() {
	return [
		{ name: 'Research program requirements', completed: false },
		{ name: 'Prepare documents (CV, Transcripts)', completed: false },
		{ name: 'Write motivation letter', completed: false },
		{ name: 'Get recommendation letters', completed: false },
		{ name: 'Submit application', completed: false },
		{ name: 'Track application status', completed: false },
		{ name: 'Receive admission decision', completed: false },
	];
}

function getStatusLabel(status) {
	const labels = {
		not_started: '🔵 Not Started',
		researching: '🟡 Researching',
		preparing: '🟠 Preparing',
		submitted: '🟢 Submitted',
		admitted: '✅ Admitted',
		rejected: '❌ Rejected',
	};
	return labels[status] || labels['not_started'];
}

// GERMANY FUNCTIONS

async function loadGermanyData() {
	try {
		const response = await fetch('germany-universities.json');
		const data = await response.json();
		germanyUniversities = data.cyber_security_programs || [];
		scholarshipGuide = data.scholarship_guide || null;

		const saved = localStorage.getItem('germany-applications');
		if (saved) {
			const savedApps = JSON.parse(saved);
			germanyUniversities.forEach((uni) => {
				const savedUni = savedApps.find(
					(s) => s.university === uni.university,
				);
				if (savedUni) {
					uni.status = savedUni.status || 'not_started';
					uni.tasks = savedUni.tasks || getDefaultTasks();
				} else {
					uni.tasks = getDefaultTasks();
				}
			});
		} else {
			germanyUniversities.forEach((uni) => {
				uni.tasks = getDefaultTasks();
			});
		}
	} catch (error) {
		console.error('Error loading Germany universities:', error);
	}
}

function displayScholarships() {
	const container = document.getElementById('scholarship-content');
	if (!container) return;

	if (!scholarshipGuide) {
		container.innerHTML =
			'<div style="text-align:center; padding: 60px 20px; color: #666;"><p style="font-size: 18px;">⚠️ Scholarship guide not loaded</p><p style="font-size: 14px;">Please refresh the page to load Germany data.</p></div>';
		return;
	}

	const {
		major_scholarships = [],
		application_tips = [],
		living_costs_reality = {},
		blocked_account_requirement = {},
	} = scholarshipGuide;

	const majorScholarshipsHtml = `
		<div class="scholarship-section">
			<h3 style="color: #333; margin-bottom: 20px; font-size: 22px;">💰 Major Scholarships</h3>
			<div class="scholarship-grid">
				${major_scholarships
					.map(
						(s) => `
						<div class="scholarship-card">
							<h4 style="color: #667eea; margin: 0 0 12px 0;">${s.name}</h4>
							<div class="scholarship-details">
								<div class="detail-row"><span class="label">💵 Amount:</span> <span class="value">${
									s.amount || 'N/A'
								}</span></div>
								<div class="detail-row"><span class="label">⏱️ Duration:</span> <span class="value">${
									s.duration || 'N/A'
								}</span></div>
								<div class="detail-row"><span class="label">📅 Deadline:</span> <span class="value">${
									s.deadline || 'N/A'
								}</span></div>
								<div class="detail-row"><span class="label">✅ Eligibility:</span> <span class="value">${
									s.eligibility || 'N/A'
								}</span></div>
								${
									s.success_rate
										? `<div class="detail-row"><span class="label">📊 Success Rate:</span> <span class="value" style="color: #4CAF50; font-weight: 600;">${s.success_rate}</span></div>`
										: ''
								}
							</div>
							${
								s.note
									? `<div style="margin-top:12px; padding: 10px; background: #fff3cd; border-left: 3px solid #ffc107; border-radius: 4px; font-size:0.9em;">💡 ${s.note}</div>`
									: ''
							}
							${
								s.website
									? `<a href="${s.website}" target="_blank" class="btn btn-primary" style="margin-top: 12px; display: inline-block;">Visit Website →</a>`
									: ''
							}
						</div>
					`,
					)
					.join('')}
			</div>
		</div>`;

	const tipsHtml = `
		<div class="scholarship-section">
			<h3 style="color: #333; margin-bottom: 20px; font-size: 22px;">📝 Application Tips</h3>
			<div class="tips-list">
				${application_tips
					.map(
						(tip, index) =>
							`<div class="tip-item"><span class="tip-number">${
								index + 1
							}</span><span>${tip}</span></div>`,
					)
					.join('')}
			</div>
		</div>`;

	const livingCostsHtml = `
		<div class="scholarship-section">
			<h3 style="color: #333; margin-bottom: 20px; font-size: 22px;">🏠 Living Cost Reality</h3>
			<div class="info-card">
				${
					living_costs_reality.monthly_minimum
						? `<div class="highlight-box"><strong>Monthly Minimum:</strong> ${living_costs_reality.monthly_minimum}</div>`
						: ''
				}
				${
					living_costs_reality.breakdown
						? `<h4 style="margin: 20px 0 10px 0;">Cost Breakdown:</h4><div class="breakdown-grid">${Object.entries(
								living_costs_reality.breakdown,
						  )
								.map(
									([k, v]) =>
										`<div class="breakdown-item"><span>${k}:</span> <strong>${v}</strong></div>`,
								)
								.join('')}</div>`
						: ''
				}
				${
					living_costs_reality.student_job_rules
						? `<div style="margin-top: 16px; padding: 12px; background: #e8f5e9; border-radius: 6px;"><strong>💼 Student Jobs:</strong> ${living_costs_reality.student_job_rules}</div>`
						: ''
				}
				${
					Array.isArray(living_costs_reality.cheapest_cities)
						? `<div style="margin-top: 16px;"><strong>💵 Cheapest Cities:</strong><ul style="margin: 8px 0; padding-left: 24px;">${living_costs_reality.cheapest_cities
								.map((city) => `<li>${city}</li>`)
								.join('')}</ul></div>`
						: ''
				}
				${
					living_costs_reality.survival_tip
						? `<div style="margin-top: 16px; padding: 12px; background: #fff3cd; border-left: 3px solid #ffc107; border-radius: 4px;">💡 <strong>Survival Tip:</strong> ${living_costs_reality.survival_tip}</div>`
						: ''
				}
			</div>
		</div>`;

	const blockedAccountHtml = `
		<div class="scholarship-section">
			<h3 style="color: #333; margin-bottom: 20px; font-size: 22px;">🏦 Blocked Account Requirement</h3>
			<div class="info-card">
				${
					blocked_account_requirement.amount
						? `<div class="highlight-box"><strong>Required Amount:</strong> ${blocked_account_requirement.amount}</div>`
						: ''
				}
				${
					blocked_account_requirement.purpose
						? `<p style="margin: 12px 0;"><strong>Purpose:</strong> ${blocked_account_requirement.purpose}</p>`
						: ''
				}
				${
					blocked_account_requirement.when_needed
						? `<p style="margin: 12px 0;"><strong>When Needed:</strong> ${blocked_account_requirement.when_needed}</p>`
						: ''
				}
				${
					blocked_account_requirement.note
						? `<div style="margin: 12px 0; padding: 10px; background: #fff3cd; border-radius: 6px;">${blocked_account_requirement.note}</div>`
						: ''
				}
				${
					Array.isArray(blocked_account_requirement.providers)
						? `<p style="margin: 12px 0;"><strong>Providers:</strong> ${blocked_account_requirement.providers.join(
								', ',
						  )}</p>`
						: ''
				}
				${
					blocked_account_requirement.tip
						? `<div style="margin-top: 12px; padding: 10px; background: #e3f2fd; border-left: 3px solid #2196F3; border-radius: 4px;">💡 ${blocked_account_requirement.tip}</div>`
						: ''
				}
			</div>
		</div>`;

	container.innerHTML = `${majorScholarshipsHtml}${tipsHtml}${livingCostsHtml}${blockedAccountHtml}`;
}

function displayGermanyUniversities() {
	const container = document.getElementById('germany-list');
	if (!container) return;

	container.innerHTML = germanyUniversities
		.map(
			(uni) => `
        <div class="expandable-card">
            <div class="expandable-header" onclick="toggleExpand(this)">
                <div style="flex: 1;">
                    <h3 style="margin: 0; font-size: 18px;">${uni.university} ${
				uni.ranking || ''
			}</h3>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #666;">${
						uni.program
					}</p>
                </div>
                <span class="deadline-badge">⏰ ${
					uni.application_deadline
				}</span>
                <span class="expandable-toggle">▶</span>
            </div>
            <div class="expandable-content">
                <div class="uni-card">
                    ${
						uni.highlights
							? `<p style="font-size: 0.9em; color: #666; margin-top: 5px;">💡 ${uni.highlights}</p>`
							: ''
					}

                    ${
						uni.application_opens
							? `<div style="padding: 8px; background: #e8f5e9; border-radius: 5px; margin: 10px 0; font-size: 0.9em;">⏰ Applications open: <strong>${uni.application_opens}</strong></div>`
							: ''
					}

                    <div class="uni-details">
                        <div class="detail-item">📍 <strong>${
							uni.location
						}</strong></div>
                        <div class="detail-item">⏱️ ${uni.duration}</div>
                        <div class="detail-item">💰 ${uni.tuition}</div>
                        <div class="detail-item">🌐 ${uni.language}</div>
                        <div class="detail-item">📝 ${uni.requirements}</div>
                    </div>

                    ${
						uni.scholarships && uni.scholarships.length > 0
							? `
                    <div style="margin: 15px 0; padding: 12px; background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); border-radius: 8px;">
                        <strong>💰 Scholarships Available:</strong>
                        <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 0.9em;">
                            ${uni.scholarships
								.map((s) => `<li>${s}</li>`)
								.join('')}
                        </ul>
                    </div>
                    `
							: ''
					}

                    ${
						uni.notes
							? `<div style="padding: 10px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; margin: 10px 0; font-size: 0.9em;">⚠️ <strong>Important:</strong> ${uni.notes}</div>`
							: ''
					}

                    <div class="uni-footer">
                        <a href="${
							uni.website
						}" target="_blank" class="btn btn-primary">Visit Website</a>
                        <button onclick="updateGermanyStatus('${
							uni.university
						}')" class="btn btn-secondary">
                            ${getStatusLabel(uni.status)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
		)
		.join('');
}

function displayGermanyProgress() {
	const container = document.getElementById('germany-progress-list');
	if (!container) return;

	// Get tracked applications from localStorage
	const tracked = localStorage.getItem('germany-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];

	// Always show universities from JSON data
	if (germanyUniversities.length === 0) {
		container.innerHTML =
			'<div style="text-align:center; padding: 60px 20px; color: #666; background: #f9f9f9; border-radius: 10px; border: 2px dashed #ddd;"><p style="font-size: 18px; margin: 20px 0;">📝 Loading University Data...</p></div>';
		return;
	}

	container.innerHTML = germanyUniversities
		.map((uni) => {
			// Check if this university is being tracked
			const trackedUni = trackedUniversities.find(
				(t) => t.university === uni.university,
			);

			if (trackedUni) {
				// Show progress for tracked university
				const completedTasks = trackedUni.tasks.filter(
					(t) => t.completed,
				).length;
				const totalTasks = trackedUni.tasks.length;
				const progress = Math.round(
					(completedTasks / totalTasks) * 100,
				);

				return `
                <div class="progress-item">
                    <h4>${trackedUni.university}</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%">${progress}%</div>
                    </div>
                    <div class="task-checklist">
                        ${trackedUni.tasks
							.map(
								(task, index) => `
                            <div class="task-item">
                                <input type="checkbox"
                                    ${task.completed ? 'checked' : ''}
                                    onchange="toggleGermanyTask('${
										trackedUni.university
									}', ${index})">
                                <span>${task.name}</span>
                            </div>
                        `,
							)
							.join('')}
                    </div>
                </div>
            `;
			} else {
				// Show expandable card for non-tracked university
				return `
                <div class="expandable-card">
                    <div class="expandable-header" onclick="toggleExpand(this)">
                        <h4>${uni.university}</h4>
                        <span class="expandable-toggle">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="uni-details">
                            <div class="detail-item"><strong>📚 Program:</strong> ${
								uni.program
							}</div>
                            <div class="detail-item"><strong>⏰ Deadline:</strong> ${
								uni.deadline
							}</div>
                            <div class="detail-item"><strong>💰 Tuition:</strong> ${
								uni.tuition
							}</div>
                            <div class="detail-item"><strong>📍 Location:</strong> ${
								uni.location
							}</div>
                            ${
								uni.language
									? `<div class="detail-item"><strong>🗣️ Language:</strong> ${uni.language}</div>`
									: ''
							}
                        </div>
                        <button onclick="trackGermanyUniversity('${
							uni.university
						}')" class="btn btn-primary" style="margin-top: 15px;">
                            Start Tracking
                        </button>
                    </div>
                </div>
            `;
			}
		})
		.join('');
}

function updateGermanyStatus(universityName) {
	const statuses = [
		'not_started',
		'researching',
		'preparing',
		'submitted',
		'admitted',
		'rejected',
	];
	const uni = germanyUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	const currentIndex = statuses.indexOf(uni.status || 'not_started');
	const nextIndex = (currentIndex + 1) % statuses.length;
	uni.status = statuses[nextIndex];

	saveGermanyApplications();
	displayGermanyUniversities();
	updateDashboardStats();
}

function toggleGermanyTask(universityName, taskIndex) {
	const uni = germanyUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	uni.tasks[taskIndex].completed = !uni.tasks[taskIndex].completed;
	saveGermanyApplications();
	displayGermanyProgress();
	updateDashboardStats();
}

function trackGermanyUniversity(universityName) {
	const uni = germanyUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	const tracked = localStorage.getItem('germany-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];

	// Add to tracked list with default tasks
	trackedUniversities.push({
		university: uni.university,
		status: 'not_started',
		tasks: getDefaultTasks(),
	});

	localStorage.setItem(
		'germany-applications',
		JSON.stringify(trackedUniversities),
	);
	displayGermanyProgress();
	updateDashboardStats();
}

function trackSchengenUniversity(universityName) {
	const uni = schengenUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	const tracked = localStorage.getItem('schengen-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];

	// Add to tracked list with default tasks
	trackedUniversities.push({
		university: uni.university,
		status: 'not_started',
		tasks: getDefaultTasks(),
	});

	localStorage.setItem(
		'schengen-applications',
		JSON.stringify(trackedUniversities),
	);
	displaySchengenProgress();
	updateDashboardStats();
}

function saveGermanyApplications() {
	const dataToSave = germanyUniversities.map((uni) => ({
		university: uni.university,
		status: uni.status,
		tasks: uni.tasks,
	}));
	localStorage.setItem('germany-applications', JSON.stringify(dataToSave));
}

function addGermanyUniversity() {
	const name = document.getElementById('germany-uni-name').value.trim();
	const status = document.getElementById('germany-uni-status').value;

	if (!name) {
		alert('Please enter a university name');
		return;
	}

	const existing = germanyUniversities.find((u) => u.university === name);
	if (existing) {
		alert('This university is already added');
		return;
	}

	germanyUniversities.push({
		university: name,
		status: status,
		tasks: getDefaultTasks(),
	});

	saveGermanyApplications();
	document.getElementById('germany-uni-name').value = '';
	displayGermanyProgress();
	updateDashboardStats();
}

// SCHENGEN FUNCTIONS
async function loadSchengenData() {
	try {
		const response = await fetch('schengen-universities.json');
		const data = await response.json();
		const programs = data.cyber_security_programs || [];
		schengenUniversities = programs.sort((a, b) => {
			const dateA = new Date(a.application_deadline);
			const dateB = new Date(b.application_deadline);
			return dateA - dateB;
		});

		const saved = localStorage.getItem('schengen-applications');
		if (saved) {
			const savedApps = JSON.parse(saved);
			schengenUniversities.forEach((uni) => {
				const savedUni = savedApps.find(
					(s) => s.university === uni.university,
				);
				if (savedUni) {
					uni.status = savedUni.status || 'not_started';
					uni.tasks = savedUni.tasks || getDefaultTasks();
				} else {
					uni.tasks = getDefaultTasks();
				}
			});
		} else {
			schengenUniversities.forEach((uni) => {
				uni.tasks = getDefaultTasks();
			});
		}
	} catch (error) {
		console.error('Error loading Schengen universities:', error);
	}
}

function displaySchengenUniversities() {
	const container = document.getElementById('schengen-list');
	if (!container) return;

	container.innerHTML = schengenUniversities
		.map(
			(uni) => `
        <div class="expandable-card">
            <div class="expandable-header" onclick="toggleExpand(this)">
                <div style="flex: 1;">
                    <h3 style="margin: 0; font-size: 18px;">${uni.university} ${
				uni.country
			}</h3>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #666;">${
						uni.program
					}</p>
                    ${
						uni.ranking
							? `<p style="font-size: 0.85em; color: #666; margin: 2px 0 0 0;">${uni.ranking}</p>`
							: ''
					}
                </div>
                <span class="deadline-badge">⏰ ${
					uni.application_deadline
				}</span>
                <span class="expandable-toggle">▶</span>
            </div>
            <div class="expandable-content">
                <div class="uni-card">
                    ${
						uni.application_opens
							? `<div style="padding: 8px; background: #e8f5e9; border-radius: 5px; margin: 10px 0; font-size: 0.9em;">⏰ Applications open: <strong>${uni.application_opens}</strong></div>`
							: ''
					}

                    <div class="uni-details">
                        <div class="detail-item">📍 <strong>${
							uni.location
						}</strong></div>
                        <div class="detail-item">⏱️ ${uni.duration}</div>
                        <div class="detail-item">💰 ${uni.tuition}</div>
                        <div class="detail-item">🏠 Living: ${
							uni.living_costs || 'N/A'
						}</div>
                        <div class="detail-item">🌐 ${uni.language}</div>
                        <div class="detail-item">📝 ${uni.requirements}</div>
                    </div>

                    ${
						uni.highlights
							? `<div style="padding: 10px; background: #e3f2fd; border-radius: 5px; margin: 10px 0; font-size: 0.9em;">🌟 ${uni.highlights}</div>`
							: ''
					}

                    ${
						uni.why_best
							? `<div style="padding: 10px; background: #f3e5f5; border-radius: 5px; margin: 10px 0; font-size: 0.9em;"><strong>🏆 Why Best:</strong> ${uni.why_best}</div>`
							: ''
					}

                    ${
						uni.scholarships && uni.scholarships.length > 0
							? `
                    <div style="margin: 15px 0; padding: 12px; background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); border-radius: 8px;">
                        <strong>💰 Scholarships Available:</strong>
                        <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 0.9em;">
                            ${uni.scholarships
								.map((s) => `<li>${s}</li>`)
								.join('')}
                        </ul>
                    </div>
                    `
							: ''
					}

                    ${
						uni.notes
							? `<div style="padding: 10px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; margin: 10px 0; font-size: 0.9em;">⚠️ <strong>Note:</strong> ${uni.notes}</div>`
							: ''
					}

                    <div class="uni-footer">
                        <a href="${
							uni.website
						}" target="_blank" class="btn btn-primary">Visit Website</a>
                        <button onclick="updateSchengenStatus('${
							uni.university
						}')" class="btn btn-secondary">
                            ${getStatusLabel(uni.status)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
		)
		.join('');
}

function displaySchengenProgress() {
	const container = document.getElementById('schengen-progress-list');
	if (!container) return;

	// Get tracked applications from localStorage
	const tracked = localStorage.getItem('schengen-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];

	// Always show universities from JSON data
	if (schengenUniversities.length === 0) {
		container.innerHTML =
			'<div style="text-align:center; padding: 60px 20px; color: #666; background: #f9f9f9; border-radius: 10px; border: 2px dashed #ddd;"><p style="font-size: 18px; margin: 20px 0;">📝 Loading University Data...</p></div>';
		return;
	}

	container.innerHTML = schengenUniversities
		.map((uni) => {
			// Check if this university is being tracked
			const trackedUni = trackedUniversities.find(
				(t) => t.university === uni.university,
			);

			if (trackedUni) {
				// Show progress for tracked university
				const completedTasks = trackedUni.tasks.filter(
					(t) => t.completed,
				).length;
				const totalTasks = trackedUni.tasks.length;
				const progress = Math.round(
					(completedTasks / totalTasks) * 100,
				);

				return `
                <div class="progress-item">
                    <h4>${trackedUni.university}</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%">${progress}%</div>
                    </div>
                    <div class="task-checklist">
                        ${trackedUni.tasks
							.map(
								(task, index) => `
                            <div class="task-item">
                                <input type="checkbox"
                                    ${task.completed ? 'checked' : ''}
                                    onchange="toggleSchengenTask('${
										trackedUni.university
									}', ${index})">
                                <span>${task.name}</span>
                            </div>
                        `,
							)
							.join('')}
                    </div>
                </div>
            `;
			} else {
				// Show expandable card for non-tracked university
				return `
                <div class="expandable-card">
                    <div class="expandable-header" onclick="toggleExpand(this)">
                        <h4>${uni.university}</h4>
                        <span class="expandable-toggle">▼</span>
                    </div>
                    <div class="expandable-content">
                        <div class="uni-details">
                            <div class="detail-item"><strong>📚 Program:</strong> ${
								uni.program
							}</div>
                            <div class="detail-item"><strong>⏰ Deadline:</strong> ${
								uni.deadline
							}</div>
                            <div class="detail-item"><strong>💰 Tuition:</strong> ${
								uni.tuition
							}</div>
                            <div class="detail-item"><strong>📍 Location:</strong> ${
								uni.location
							}</div>
                            ${
								uni.language
									? `<div class="detail-item"><strong>🗣️ Language:</strong> ${uni.language}</div>`
									: ''
							}
                        </div>
                        <button onclick="trackSchengenUniversity('${
							uni.university
						}')" class="btn btn-primary" style="margin-top: 15px;">
                            Start Tracking
                        </button>
                    </div>
                </div>
            `;
			}
		})
		.join('');
}

function updateSchengenStatus(universityName) {
	const statuses = [
		'not_started',
		'researching',
		'preparing',
		'submitted',
		'admitted',
		'rejected',
	];
	const uni = schengenUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	const currentIndex = statuses.indexOf(uni.status || 'not_started');
	const nextIndex = (currentIndex + 1) % statuses.length;
	uni.status = statuses[nextIndex];

	saveSchengenApplications();
	displaySchengenUniversities();
	updateDashboardStats();
}

function toggleSchengenTask(universityName, taskIndex) {
	const uni = schengenUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	uni.tasks[taskIndex].completed = !uni.tasks[taskIndex].completed;
	saveSchengenApplications();
	displaySchengenProgress();
	updateDashboardStats();
}

function saveSchengenApplications() {
	const dataToSave = schengenUniversities.map((uni) => ({
		university: uni.university,
		status: uni.status,
		tasks: uni.tasks,
	}));
	localStorage.setItem('schengen-applications', JSON.stringify(dataToSave));
}

function addSchengenUniversity() {
	const name = document.getElementById('schengen-uni-name').value.trim();
	const status = document.getElementById('schengen-uni-status').value;

	if (!name) {
		alert('Please enter a university name');
		return;
	}

	const existing = schengenUniversities.find((u) => u.university === name);
	if (existing) {
		alert('This university is already added');
		return;
	}

	schengenUniversities.push({
		university: name,
		status: status,
		tasks: getDefaultTasks(),
	});

	saveSchengenApplications();
	document.getElementById('schengen-uni-name').value = '';
	displaySchengenProgress();
	updateDashboardStats();
}

// IELTS FUNCTIONS
function displayIELTSPlan() {
	const container = document.getElementById('ielts-plan-content');
	if (!container) return;

	const renderTask = (id, time, task, duration) => {
		const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
		const checked = tasks[id] ? 'checked' : '';

		if (time.startsWith('DAY')) {
			return `<tr class="day-header"><td colspan="4"><b>${time}</b></td></tr>`;
		}

		return `
            <tr>
                <td><input type="checkbox" ${checked} onchange="toggleIELTSTask('${id}')"></td>
                <td>${time}</td>
                <td>${task}</td>
                <td>${duration}</td>
            </tr>
        `;
	};

	container.innerHTML = `
        <h3>DAYS 1–2: Foundations</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d1-1', 'DAY 1', '', '')}
            ${renderTask(
				'd1-2',
				'9:00–11:00 AM',
				'🟦 IELTS Overview + Band Descriptors',
				'2h',
			)}
            ${renderTask(
				'd1-3',
				'1:00–7:00 PM',
				'🟨 Writing Task 1&2 structure review',
				'6h',
			)}
            ${renderTask(
				'd1-4',
				'9:00–11:00 PM',
				'🟪 Speaking sample answers',
				'2h',
			)}
            ${renderTask(
				'd1-5',
				'11:30 PM',
				'<b>🟥 Mini Mock: Listening Section 1</b>',
				'20m',
			)}
            ${renderTask('d2-1', 'DAY 2', '', '')}
            ${renderTask(
				'd2-2',
				'9:00–11:00 AM',
				'🟩 Reading: Skimming/Scanning',
				'2h',
			)}
            ${renderTask(
				'd2-3',
				'1:00–7:00 PM',
				'🟦 Listening: Note-taking',
				'6h',
			)}
            ${renderTask(
				'd2-4',
				'9:00–11:00 PM',
				'🟩 Reading review + error analysis',
				'2h',
			)}
        </table>

        <h3>DAYS 3–5: Listening & Reading</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d3-1', 'DAY 3', '', '')}
            ${renderTask(
				'd3-2',
				'9:00–11:00 AM',
				'🟦 Section 1: Form + MCQ',
				'2h',
			)}
            ${renderTask(
				'd3-3',
				'1:00–4:00 PM',
				'🟦 Section 2&3: Map + Notes',
				'3h',
			)}
            ${renderTask(
				'd3-4',
				'5:00–7:00 PM',
				'�� Vocabulary: 25 terms',
				'2h',
			)}
            ${renderTask('d4-1', 'DAY 4', '', '')}
            ${renderTask(
				'd4-2',
				'9:00–11:00 AM',
				'🟩 Passage 1: Matching Headings',
				'2h',
			)}
            ${renderTask(
				'd4-3',
				'1:00–4:00 PM',
				'🟩 Passage 2&3: T/F/NG',
				'3h',
			)}
            ${renderTask(
				'd4-4',
				'5:00–7:00 PM',
				'🟦 Listening Section 4',
				'2h',
			)}
            ${renderTask('d5-1', 'DAY 5', '', '')}
            ${renderTask(
				'd5-2',
				'9:00–11:00 AM',
				'🟦 Listening Sections 1&2',
				'2h',
			)}
            ${renderTask(
				'd5-3',
				'1:00–3:00 PM',
				'🟨 Writing: Task 1 practice',
				'2h',
			)}
            ${renderTask(
				'd5-4',
				'3:00–5:00 PM',
				'🟪 Speaking: Part 2 cue cards',
				'2h',
			)}
        </table>

        <h3>DAYS 6–8: Writing & Speaking</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d6-1', 'DAY 6: Writing Task 1', '', '')}
            ${renderTask(
				'd6-2',
				'9:00–11:00 AM',
				'🟨 Task 1 structure study',
				'2h',
			)}
            ${renderTask(
				'd6-3',
				'1:00–4:00 PM',
				'🟨 Task 1: Graph/Table/Chart',
				'3h',
			)}
            ${renderTask('d6-4', '5:00–7:00 PM', '🟦 Listening practice', '2h')}
            ${renderTask('d7-1', 'DAY 7: Writing Task 2', '', '')}
            ${renderTask(
				'd7-2',
				'9:00–11:00 AM',
				'🟨 Task 2 essay structure',
				'2h',
			)}
            ${renderTask('d7-3', '1:00–3:00 PM', '🟨 Essay 1: Education', '2h')}
            ${renderTask(
				'd7-4',
				'3:00–5:00 PM',
				'🟨 Essay 2: Environment',
				'2h',
			)}
            ${renderTask('d8-1', 'DAY 8: Speaking', '', '')}
            ${renderTask(
				'd8-2',
				'9:00–11:00 AM',
				'🟪 Part 2: 3 cue cards',
				'2h',
			)}
            ${renderTask('d8-3', '1:00–4:00 PM', '🟪 Part 1&3 practice', '3h')}
            ${renderTask(
				'd8-4',
				'5:00–7:00 PM',
				'🟦 Listening Sections 3&4',
				'2h',
			)}
        </table>

        <h3>DAYS 9–10: Integration</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d9-1', 'DAY 9: Mixed', '', '')}
            ${renderTask(
				'd9-2',
				'9:00–11:00 AM',
				'🟦 Listening Sections 1&2',
				'2h',
			)}
            ${renderTask(
				'd9-3',
				'11:00–1:00 PM',
				'🟩 Reading Passages 1&2',
				'2h',
			)}
            ${renderTask('d9-4', '2:00–4:00 PM', '🟨 Writing Task 1&2', '2h')}
            ${renderTask(
				'd9-5',
				'4:00–6:00 PM',
				'🟪 Speaking: 3 cue cards',
				'2h',
			)}
            ${renderTask('d10-1', 'DAY 10: Weakness Focus', '', '')}
            ${renderTask(
				'd10-2',
				'9:00–1:00 PM',
				'⚠ Focus on weakest section',
				'4h',
			)}
            ${renderTask(
				'd10-3',
				'2:00–6:00 PM',
				'⚠ 2nd weakest section',
				'4h',
			)}
        </table>

        <h3>DAYS 11–12: Mock Tests</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d11-1', 'DAY 11: FULL MOCK #1', '', '')}
            ${renderTask(
				'd11-2',
				'9:00–11:00 AM',
				'🟦 LISTENING: All 4 Sections',
				'2h',
			)}
            ${renderTask(
				'd11-3',
				'11:00–1:00 PM',
				'🟩 READING: All 3 Passages',
				'2h',
			)}
            ${renderTask(
				'd11-4',
				'2:00–4:00 PM',
				'🟨 WRITING Task 1 + 2',
				'2h',
			)}
            ${renderTask(
				'd11-5',
				'4:00–6:00 PM',
				'🟪 SPEAKING: Full mock',
				'2h',
			)}
            ${renderTask(
				'd11-6',
				'6:00–8:00 PM',
				'📊 Analyze performance',
				'2h',
			)}
            ${renderTask('d12-1', 'DAY 12: Review', '', '')}
            ${renderTask('d12-2', '9:00–1:00 PM', '🟦🟩 Re-do mistakes', '4h')}
            ${renderTask(
				'd12-3',
				'2:00–6:00 PM',
				'🟨🟪 Correct & practice',
				'4h',
			)}
        </table>

        <h3>DAYS 13–14: Refinement & Mock #2</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d13-1', 'DAY 13: Targeted', '', '')}
            ${renderTask('d13-2', '9:00–1:00 PM', '⚠ Weak Q types × 3', '4h')}
            ${renderTask(
				'd13-3',
				'2:00–6:00 PM',
				'🟧 Vocab & Grammar review',
				'4h',
			)}
            ${renderTask('d14-1', 'DAY 14: FULL MOCK #2', '', '')}
            ${renderTask('d14-2', '9:00–11:00 AM', '🟦 LISTENING: All 4', '2h')}
            ${renderTask('d14-3', '11:00–1:00 PM', '🟩 READING: All 3', '2h')}
            ${renderTask(
				'd14-4',
				'2:00–4:00 PM',
				'🟨 WRITING Task 1 + 2',
				'2h',
			)}
            ${renderTask(
				'd14-5',
				'4:00–6:00 PM',
				'🟪 SPEAKING: Full mock',
				'2h',
			)}
        </table>

        <h3>DAY 15: Final Prep</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d15-1', '9:00–11:00 AM', '🟦 Light Listening', '2h')}
            ${renderTask('d15-2', '11:00–1:00 PM', '🟩 Light Reading', '2h')}
            ${renderTask(
				'd15-3',
				'2:00–5:00 PM',
				'🟧 Vocabulary: Final review',
				'3h',
			)}
            ${renderTask(
				'd15-4',
				'7:00–9:00 PM',
				'✨ Rest & mental prep',
				'2h',
			)}
        </table>

        <div class="ielts-progress-summary">
            <h4>Overall Progress</h4>
            <p>${getIELTSCompletedCount()} tasks completed</p>
        </div>
    `;
}

function toggleIELTSTask(id) {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	tasks[id] = !tasks[id];
	localStorage.setItem('ielts-tasks', JSON.stringify(tasks));
	displayIELTSPlan();
	updateDashboardStats();
}

function getIELTSCompletedCount() {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	return Object.values(tasks).filter(Boolean).length;
}

// DASHBOARD STATS
function updateDashboardStats() {
	// IELTS
	const ieltsCompleted = getIELTSCompletedCount();
	const ieltsTotal = 70;
	const ieltsProgress = Math.round((ieltsCompleted / ieltsTotal) * 100);

	document.getElementById('ielts-progress').textContent = `${ieltsProgress}%`;
	document.getElementById(
		'ielts-tasks',
	).textContent = `${ieltsCompleted}/${ieltsTotal} tasks`;

	// Germany
	const germanySubmitted = germanyUniversities.filter(
		(u) => u.status === 'submitted' || u.status === 'admitted',
	).length;
	const germanyTotal = germanyUniversities.length;
	const germanyProgress =
		germanyTotal > 0
			? Math.round((germanySubmitted / germanyTotal) * 100)
			: 0;

	document.getElementById(
		'germany-progress',
	).textContent = `${germanyProgress}%`;
	document.getElementById(
		'germany-unis',
	).textContent = `${germanySubmitted}/${germanyTotal} universities`;

	// Schengen
	const schengenSubmitted = schengenUniversities.filter(
		(u) => u.status === 'submitted' || u.status === 'admitted',
	).length;
	const schengenTotal = schengenUniversities.length;
	const schengenProgress =
		schengenTotal > 0
			? Math.round((schengenSubmitted / schengenTotal) * 100)
			: 0;

	document.getElementById(
		'schengen-progress',
	).textContent = `${schengenProgress}%`;
	document.getElementById(
		'schengen-unis',
	).textContent = `${schengenSubmitted}/${schengenTotal} universities`;

	// Next deadline
	const today = new Date();
	const allUniversities = [...germanyUniversities, ...schengenUniversities];
	const upcomingDeadlines = allUniversities
		.map((uni) => ({
			...uni,
			deadlineDate: new Date(uni.application_deadline),
		}))
		.filter((uni) => uni.deadlineDate >= today)
		.sort((a, b) => a.deadlineDate - b.deadlineDate);

	if (upcomingDeadlines.length > 0) {
		const next = upcomingDeadlines[0];
		document.getElementById('next-deadline').textContent =
			next.application_deadline;
		document.getElementById('deadline-uni').textContent =
			next.university.split(' ')[0];
	}
}
