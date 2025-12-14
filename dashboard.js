// Global variables
let germanyUniversities = [];
let schengenUniversities = [];
let scholarshipGuide = null;
let dataLoaded = false;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
	// Load data first, then show page
	await loadAllData();
	dataLoaded = true;
	
	// Restore last page or check URL hash or default to band8-tracker
	const hash = window.location.hash.replace('#', '');
	const savedPage = hash || localStorage.getItem('currentPage') || 'band8-tracker';
	showPage(savedPage);
	
	updateDashboardStats();
	
	// Update storage display
	if (typeof updateStorageDisplay === 'function') {
		updateStorageDisplay();
	}
	// Update analytics
	if (typeof updateAnalyticsPage === 'function') {
		updateAnalyticsPage();
	}
});

// Handle hash change (back/forward navigation)
window.addEventListener('hashchange', () => {
	const hash = window.location.hash.replace('#', '');
	if (hash && dataLoaded) {
		showPage(hash);
	}
});

// Load all university data
async function loadAllData() {
	await Promise.all([loadGermanyData(), loadSchengenData()]);
	updateDashboardStats();
}

// Page navigation
function showPage(pageId) {
	// Save current page to localStorage
	localStorage.setItem('currentPage', pageId);

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

	// Page-specific initialization
	if (pageId === 'ielts') {
		displayIELTSPlan();
	} else if (pageId === 'ielts-practice') {
		if (typeof initIELTSPractice === 'function') {
			initIELTSPractice();
		}
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
	} else if (pageId === 'analytics') {
		if (typeof updateAnalyticsPage === 'function') {
			updateAnalyticsPage();
		}
	} else if (pageId === 'settings') {
		if (typeof updateStorageDisplay === 'function') {
			updateStorageDisplay();
		}
	}

	// Close sidebar
	const sidebar = document.getElementById('sidebar');
	if (sidebar) {
		sidebar.classList.remove('open');
		sidebar.classList.remove('active');
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
		germanyUniversities = [
			...(data.cyber_security_programs || []),
			...(data.additional_universities || []),
		];
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
                <h3>${uni.university} ${uni.ranking || ''}</h3>
                <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.4;">${
					uni.program
				}</p>
                <div class="expandable-header-bottom">
                    <span class="deadline-badge">⏰ ${
						uni.application_deadline
					}</span>
                    <span class="expandable-toggle">▶</span>
                </div>
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
                        <span class="expandable-toggle open">▶</span>
                    </div>
                    <div class="expandable-content open">
                        <div class="uni-details">
                            <div class="detail-item"><strong>📚 Program:</strong> ${
								uni.program || 'N/A'
							}</div>
                            <div class="detail-item"><strong>⏰ Deadline:</strong> ${
								uni.application_deadline || 'N/A'
							}</div>
                            <div class="detail-item"><strong>💰 Tuition:</strong> ${
								uni.tuition || 'N/A'
							}</div>
                            <div class="detail-item"><strong>📍 Location:</strong> ${
								uni.location || 'N/A'
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

	// Check if already tracked
	const alreadyTracked = trackedUniversities.find(
		(t) => t.university === uni.university,
	);
	if (alreadyTracked) {
		alert('This university is already being tracked!');
		return;
	}

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

	// Check if already tracked
	const alreadyTracked = trackedUniversities.find(
		(t) => t.university === uni.university,
	);
	if (alreadyTracked) {
		alert('This university is already being tracked!');
		return;
	}

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

		// Load additional Schengen universities
		let additionalPrograms = [];
		try {
			const additionalResponse = await fetch(
				'additional-schengen-cybersecurity-universities.json',
			);
			additionalPrograms = await additionalResponse.json();
		} catch (err) {
			console.warn(
				'Failed to load additional Schengen universities:',
				err,
			);
		}

		schengenUniversities = [...programs, ...additionalPrograms].sort(
			(a, b) => {
				const dateA = new Date(a.application_deadline);
				const dateB = new Date(b.application_deadline);
				return dateA - dateB;
			},
		);

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
                <h3>${uni.university} ${uni.country}</h3>
                <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.4;">${
					uni.program
				}</p>
                ${
					uni.ranking
						? `<p style="margin: 0; font-size: 13px; color: #888;">${uni.ranking}</p>`
						: ''
				}
                <div class="expandable-header-bottom">
                    <span class="deadline-badge">⏰ ${
						uni.application_deadline
					}</span>
                    <span class="expandable-toggle">▶</span>
                </div>
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
                        <span class="expandable-toggle open">▶</span>
                    </div>
                    <div class="expandable-content open">
                        <div class="uni-details">
                            <div class="detail-item"><strong>📚 Program:</strong> ${
								uni.program || 'N/A'
							}</div>
                            <div class="detail-item"><strong>⏰ Deadline:</strong> ${
								uni.application_deadline || 'N/A'
							}</div>
                            <div class="detail-item"><strong>💰 Tuition:</strong> ${
								uni.tuition || 'N/A'
							}</div>
                            <div class="detail-item"><strong>📍 Location:</strong> ${
								uni.location || 'N/A'
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
            ${renderTask('d1-1', 'DAY 1 (SUNDAY)', '', '')}
            ${renderTask(
				'd1-2',
				'9:00–11:00 AM',
				'🟦 IELTS Overview: Study all 4 sections format, Band 8.0-8.5 descriptors, scoring criteria',
				'2h',
			)}
            ${renderTask(
				'd1-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd1-4',
				'12:30–2:00 PM',
				'🟨 Writing Task 1: Review all 6 diagram types (line, bar, pie, table, process, map)',
				'1.5h',
			)}
            ${renderTask(
				'd1-5',
				'2:00–5:00 PM',
				'🟨 Writing Task 2: Study 5 essay types (opinion, discussion, problem-solution, two-part, advantages-disadvantages)',
				'3h',
			)}
            ${renderTask(
				'd1-6',
				'5:00–7:00 PM',
				'🟨 Write 1 Task 2 essay + self-assess against Band 8 criteria',
				'2h',
			)}
            ${renderTask(
				'd1-7',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd1-8',
				'8:30–10:30 PM',
				'🟪 Speaking: Watch Band 8-9 sample answers for all 3 parts, note vocabulary & structures used',
				'2h',
			)}
            ${renderTask(
				'd1-9',
				'10:30–11:30 PM',
				'<b>🟥 Mini Mock Test: Listening Section 1 (10 questions) + detailed review of answers</b>',
				'1h',
			)}
            ${renderTask('d2-1', 'DAY 2 (MONDAY)', '', '')}
            ${renderTask(
				'd2-2',
				'9:00–11:00 AM',
				'🟩 Reading: Master skimming & scanning techniques, practice with 3 passages, identify keywords',
				'2h',
			)}
            ${renderTask(
				'd2-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd2-4',
				'12:30–5:00 PM',
				'🟦 Listening: Note-taking strategies, practice all 4 sections, focus on spelling accuracy & numbers',
				'4.5h',
			)}
            ${renderTask(
				'd2-5',
				'5:00–7:00 PM',
				'🟩 Reading: Complete 2 full passages under timed conditions (20 mins each) + error analysis',
				'2h',
			)}
            ${renderTask(
				'd2-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd2-7',
				'8:30–10:30 PM',
				'🟦 Listening: Practice maps, diagrams, form filling - target 38+/40 correct answers',
				'2h',
			)}
            ${renderTask(
				'd2-8',
				'10:30–11:30 PM',
				'🟧 Vocabulary: Learn 30 Band 8+ academic words with collocations + write example sentences',
				'1h',
			)}
        </table>

        <h3>DAYS 3–5: Listening & Reading Mastery</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d3-1', 'DAY 3 (TUESDAY)', '', '')}
            ${renderTask(
				'd3-2',
				'9:00–11:00 AM',
				'🟦 Listening Section 1: Form filling, MCQ, conversation completion - practice 5 sets',
				'2h',
			)}
            ${renderTask(
				'd3-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd3-4',
				'12:30–5:00 PM',
				'🟦 Listening Sections 2&3: Maps, diagrams, note completion - master spatial awareness',
				'4.5h',
			)}
            ${renderTask(
				'd3-5',
				'5:00–7:00 PM',
				'🟧 Vocabulary: Learn 30 topic-specific words (education, environment, technology)',
				'2h',
			)}
            ${renderTask(
				'd3-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd3-7',
				'8:30–10:30 PM',
				'🟦 Listening practice: Complete 2 full tests (all 4 sections) - target 35+/40',
				'2h',
			)}
            ${renderTask(
				'd3-8',
				'10:30–11:30 PM',
				'📊 Review listening mistakes + note common error patterns',
				'1h',
			)}
            ${renderTask('d4-1', 'DAY 4 (WEDNESDAY)', '', '')}
            ${renderTask(
				'd4-2',
				'9:00–11:00 AM',
				'🟩 Reading Passage 1: Matching headings, paragraph info - learn paragraph structure analysis',
				'2h',
			)}
            ${renderTask(
				'd4-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd4-4',
				'12:30–5:00 PM',
				'🟩 Reading Passages 2&3: T/F/NG, Y/N/NG questions - master inference skills',
				'4.5h',
			)}
            ${renderTask(
				'd4-5',
				'5:00–7:00 PM',
				'🟦 Listening Section 4: Academic lectures, note completion - practice 4 lectures',
				'2h',
			)}
            ${renderTask(
				'd4-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd4-7',
				'8:30–10:30 PM',
				'🟩 Reading: Complete 3 full passages under exam conditions (60 mins) + review',
				'2h',
			)}
            ${renderTask(
				'd4-8',
				'10:30–11:30 PM',
				'🟧 Vocabulary: 30 advanced academic words + practice paraphrasing',
				'1h',
			)}
            ${renderTask('d5-1', 'DAY 5 (THURSDAY)', '', '')}
            ${renderTask(
				'd5-2',
				'9:00–11:00 AM',
				'🟦 Listening: Complete Sections 1&2 practice - focus on accuracy and capturing key details',
				'2h',
			)}
            ${renderTask(
				'd5-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd5-4',
				'12:30–3:00 PM',
				'🟨 Writing Task 1: Practice all diagram types - write 3 responses (150+ words)',
				'2.5h',
			)}
            ${renderTask(
				'd5-5',
				'3:00–5:00 PM',
				'🟪 Speaking Part 2: Practice 8 cue cards - record yourself & evaluate',
				'2h',
			)}
            ${renderTask(
				'd5-6',
				'5:00–7:00 PM',
				'🟪 Grammar: Master complex structures (conditionals, passives, relative clauses)',
				'2h',
			)}
            ${renderTask(
				'd5-7',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd5-8',
				'8:30–10:30 PM',
				'🟩 Reading: Speed practice - 3 passages in 50 minutes (target 35+/40)',
				'2h',
			)}
            ${renderTask(
				'd5-9',
				'10:30–11:30 PM',
				'📊 Weekly review: Progress analysis + identify weak areas',
				'1h',
			)}
        </table>

        <h3>DAYS 6–8: Writing & Speaking</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d6-1', 'DAY 6 (FRIDAY - FULL DAY)', '', '')}
            ${renderTask(
				'd6-2',
				'8:00–11:00 AM',
				'🟨 Writing Task 1: Deep study of structure, vocabulary, and Band 8+ samples for all diagram types',
				'3h',
			)}
            ${renderTask(
				'd6-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd6-4',
				'12:30–5:00 PM',
				'🟨 Task 1 Practice: Write 4 responses (graph, table, chart, process) - 150+ words each',
				'4.5h',
			)}
            ${renderTask(
				'd6-5',
				'5:00–7:00 PM',
				'🟦 Listening: Full practice test (all 4 sections) - aim for 36+/40',
				'2h',
			)}
            ${renderTask(
				'd6-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd6-7',
				'8:30–10:30 PM',
				'🟩 Reading: Practice inference & opinion questions - 2 passages',
				'2h',
			)}
            ${renderTask(
				'd6-8',
				'10:30–11:30 PM',
				'🟪 Vocabulary: 30 writing-specific words (trends, comparisons, data)',
				'1h',
			)}
            ${renderTask(
				'd6-9',
				'11:30 PM–12:30 AM',
				'🟨 Extra practice: Write 1 more Task 1 response + self-review',
				'1h',
			)}
            ${renderTask('d7-1', 'DAY 7 (SATURDAY)', '', '')}
            ${renderTask(
				'd7-2',
				'9:00–11:00 AM',
				'🟨 Writing Task 2: Study essay structures for all 5 question types + Band 8-9 samples',
				'2h',
			)}
            ${renderTask(
				'd7-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd7-4',
				'12:30–3:00 PM',
				'🟨 Essay 1: Education topic (250+ words, opinion essay)',
				'2.5h',
			)}
            ${renderTask(
				'd7-5',
				'3:00–5:00 PM',
				'🟨 Essay 2: Environment topic (250+ words, problem-solution)',
				'2h',
			)}
            ${renderTask(
				'd7-6',
				'5:00–7:00 PM',
				'🟨 Essay 3: Technology topic (250+ words, discussion essay)',
				'2h',
			)}
            ${renderTask(
				'd7-7',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd7-8',
				'8:30–10:30 PM',
				'🟪 Speaking Part 3: Practice extended responses on abstract topics + record yourself',
				'2h',
			)}
            ${renderTask(
				'd7-9',
				'10:30–11:30 PM',
				'🟪 Review all 3 essays + note improvements needed',
				'1h',
			)}
            ${renderTask('d8-1', 'DAY 8 (SUNDAY)', '', '')}
            ${renderTask(
				'd8-2',
				'9:00–11:00 AM',
				'🟪 Speaking Part 2: Practice 6 cue cards from different topics - record responses',
				'2h',
			)}
            ${renderTask(
				'd8-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd8-4',
				'12:30–5:00 PM',
				'🟪 Speaking Parts 1&3: Practice common questions + advanced vocabulary usage',
				'4.5h',
			)}
            ${renderTask(
				'd8-5',
				'5:00–7:00 PM',
				'🟦 Listening: Focus on Sections 3&4 (academic contexts) - 4 practice tests',
				'2h',
			)}
            ${renderTask(
				'd8-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd8-7',
				'8:30–10:30 PM',
				'🟪 Speaking: Full mock speaking test (all 3 parts) with timer',
				'2h',
			)}
            ${renderTask(
				'd8-8',
				'10:30–11:30 PM',
				'🟪 Vocabulary: 30 speaking idioms & collocations for Band 8+',
				'1h',
			)}
        </table>

        <h3>DAYS 9–10: Integration & Weakness Focus</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d9-1', 'DAY 9 (MONDAY)', '', '')}
            ${renderTask(
				'd9-2',
				'9:00–11:00 AM',
				'🟦 Listening: Sections 1&2 practice - master everyday & social contexts',
				'2h',
			)}
            ${renderTask(
				'd9-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd9-4',
				'12:30–3:00 PM',
				'🟩 Reading: Complete 2 passages focusing on difficult question types',
				'2.5h',
			)}
            ${renderTask(
				'd9-5',
				'3:00–5:00 PM',
				'🟨 Writing: Task 1 + Task 2 under timed conditions (60 mins total)',
				'2h',
			)}
            ${renderTask(
				'd9-6',
				'5:00–7:00 PM',
				'🟪 Speaking: Practice 5 different cue cards + Part 3 follow-ups',
				'2h',
			)}
            ${renderTask(
				'd9-7',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd9-8',
				'8:30–10:30 PM',
				'📊 Review all 4 sections - identify remaining weak areas',
				'2h',
			)}
            ${renderTask(
				'd9-9',
				'10:30–11:30 PM',
				'🟪 Grammar: Final complex structures review',
				'1h',
			)}
            ${renderTask('d10-1', 'DAY 10 (TUESDAY)', '', '')}
            ${renderTask(
				'd10-2',
				'9:00–11:00 AM',
				'⚠️ Focus on WEAKEST section - intensive targeted practice',
				'2h',
			)}
            ${renderTask(
				'd10-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd10-4',
				'12:30–5:00 PM',
				'⚠️ Continue weakest section - drill specific question types',
				'4.5h',
			)}
            ${renderTask(
				'd10-5',
				'5:00–7:00 PM',
				'⚠️ 2nd weakest section - focused improvement',
				'2h',
			)}
            ${renderTask(
				'd10-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd10-7',
				'8:30–10:30 PM',
				'⚠️ 2nd weakest section continued - practice till confidence builds',
				'2h',
			)}
            ${renderTask(
				'd10-8',
				'10:30–11:30 PM',
				'📊 Prepare for Mock Test tomorrow - review strategies',
				'1h',
			)}
        </table>

        <h3>DAYS 11–12: Full Mock Tests</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask(
				'd11-1',
				'DAY 11 (WEDNESDAY - FULL MOCK TEST #1)',
				'',
				'',
			)}
            ${renderTask(
				'd11-2',
				'9:00–10:00 AM',
				'🟦 LISTENING: Complete test (all 4 sections, 40 questions)',
				'1h',
			)}
            ${renderTask(
				'd11-3',
				'10:00–11:00 AM',
				'🟩 READING: Complete test (3 passages, 40 questions)',
				'1h',
			)}
            ${renderTask(
				'd11-4',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd11-5',
				'12:30–1:30 PM',
				'🟨 WRITING: Task 1 (20 mins) + Task 2 (40 mins)',
				'1h',
			)}
            ${renderTask(
				'd11-6',
				'1:30–2:00 PM',
				'🟪 SPEAKING: Full mock interview (11-14 mins all 3 parts)',
				'30m',
			)}
            ${renderTask(
				'd11-7',
				'2:00–5:00 PM',
				'📊 Mark all answers + detailed performance analysis',
				'3h',
			)}
            ${renderTask(
				'd11-8',
				'5:00–7:00 PM',
				'📊 Review mistakes + create action plan for improvement',
				'2h',
			)}
            ${renderTask(
				'd11-9',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd11-10',
				'8:30–11:30 PM',
				'📝 Re-do all incorrect questions + understand why answers were wrong',
				'3h',
			)}
            ${renderTask(
				'd12-1',
				'DAY 12 (THURSDAY - Review & Correction)',
				'',
				'',
			)}
            ${renderTask(
				'd12-2',
				'9:00–11:00 AM',
				'🟦🟩 Listening & Reading: Re-practice all mistake types',
				'2h',
			)}
            ${renderTask(
				'd12-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd12-4',
				'12:30–5:00 PM',
				'🟦🟩 Continue drilling weak question types from mock test',
				'4.5h',
			)}
            ${renderTask(
				'd12-5',
				'5:00–7:00 PM',
				'🟨🟪 Rewrite essays + practice speaking responses with improvements',
				'2h',
			)}
            ${renderTask(
				'd12-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd12-7',
				'8:30–10:30 PM',
				'🟨🟪 Writing & Speaking correction - apply feedback',
				'2h',
			)}
            ${renderTask(
				'd12-8',
				'10:30–11:30 PM',
				'🟪 Vocabulary: Review all words learned + add 20 new ones',
				'1h',
			)}
        </table>

        <h3>DAYS 13–14: Final Refinement & Mock #2</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask('d13-1', 'DAY 13 (FRIDAY - FULL DAY)', '', '')}
            ${renderTask(
				'd13-2',
				'8:00–11:00 AM',
				'⚠️ Practice weakest question types × 4 - intensive drilling (from mock test results)',
				'3h',
			)}
            ${renderTask(
				'd13-3',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd13-4',
				'12:30–5:00 PM',
				'⚠️ Continue targeted practice on specific weak areas',
				'4.5h',
			)}
            ${renderTask(
				'd13-5',
				'5:00–7:00 PM',
				'🟧 Vocabulary & Grammar: Final comprehensive review of all learned material',
				'2h',
			)}
            ${renderTask(
				'd13-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd13-7',
				'8:30–10:30 PM',
				'🟧 Grammar: Review all complex structures for writing & speaking',
				'2h',
			)}
            ${renderTask(
				'd13-8',
				'10:30–11:30 PM',
				'📊 Prepare for final mock test tomorrow - organize materials',
				'1h',
			)}
            ${renderTask(
				'd13-9',
				'11:30 PM–12:30 AM',
				'🟪 Final vocabulary review: 50 essential Band 8+ words + collocations',
				'1h',
			)}
            ${renderTask(
				'd14-1',
				'DAY 14 (SATURDAY - FULL MOCK TEST #2)',
				'',
				'',
			)}
            ${renderTask(
				'd14-2',
				'9:00–10:00 AM',
				'🟦 LISTENING: Complete test (all 4 sections) - target 37+/40',
				'1h',
			)}
            ${renderTask(
				'd14-4',
				'10:00–11:00 AM',
				'🟩 READING: Complete test (3 passages) - target 37+/40',
				'1h',
			)}
            ${renderTask(
				'd14-4',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd14-5',
				'12:30–1:30 PM',
				'🟨 WRITING: Task 1 (20 mins) + Task 2 (40 mins) - aim for Band 8+',
				'1h',
			)}
            ${renderTask(
				'd14-6',
				'1:30–2:00 PM',
				'🟪 SPEAKING: Full mock (all 3 parts) - natural & confident',
				'30m',
			)}
            ${renderTask(
				'd14-7',
				'2:00–5:00 PM',
				'📊 Mark test + compare scores with Mock #1 - measure improvement',
				'3h',
			)}
            ${renderTask(
				'd14-8',
				'5:00–7:00 PM',
				'📊 Detailed analysis + final learning points',
				'2h',
			)}
            ${renderTask(
				'd14-9',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd14-10',
				'8:30–11:30 PM',
				'📝 Review only critical errors - don’t over-study before exam day',
				'3h',
			)}
        </table>

        <h3>DAY 15: Final Preparation (EXAM EVE - SUNDAY)</h3>
        <table class="task-table">
            <tr><th>✓</th><th>Time</th><th>Task</th><th>Dur</th></tr>
            ${renderTask(
				'd15-1',
				'9:00–11:00 AM',
				'🟦 Light Listening practice - 1 test only, no stress',
				'2h',
			)}
            ${renderTask(
				'd15-2',
				'11:00 AM–12:30 PM',
				'🍽️ Break + Lunch',
				'1.5h',
			)}
            ${renderTask(
				'd15-3',
				'12:30–3:00 PM',
				'🟩 Light Reading - 1 passage only, stay relaxed',
				'2.5h',
			)}
            ${renderTask(
				'd15-4',
				'3:00–5:00 PM',
				'🟧 Vocabulary: Quick review of key words & phrases (no new learning)',
				'2h',
			)}
            ${renderTask(
				'd15-5',
				'5:00–7:00 PM',
				'📋 Organize exam materials: ID, pencils, eraser, water bottle',
				'2h',
			)}
            ${renderTask(
				'd15-6',
				'7:00–8:30 PM',
				'🍽️ Dinner Break + Rest',
				'1.5h',
			)}
            ${renderTask(
				'd15-7',
				'8:30–9:30 PM',
				'✨ Mental preparation: Visualization, deep breathing, positive affirmations',
				'1h',
			)}
            ${renderTask(
				'd15-8',
				'9:30–10:30 PM',
				'💤 Early sleep preparation - NO studying, relax & rest well',
				'1h',
			)}
            ${renderTask(
				'd15-9',
				'10:30 PM',
				'🛌 Sleep early! Target: 8 hours quality sleep before EXAM DAY',
				'--',
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
		'germany-progress-stat',
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
		'schengen-progress-stat',
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
