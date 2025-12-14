// Global variables
let germanyUniversities = [];
let schengenUniversities = [];
let scholarshipGuide = null;
let dataLoaded = false;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
	// Initialize cloud sync first
	if (typeof cloudSync !== 'undefined') {
		await cloudSync.init();
	}

	// Load data first, then show page
	await loadAllData();
	dataLoaded = true;

	// Restore last page or check URL hash or default to band8-tracker
	const hash = window.location.hash.replace('#', '');
	const savedPage =
		hash || localStorage.getItem('currentPage') || 'band8-tracker';
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

	// Hide loading screen and show content
	const loadingScreen = document.getElementById('loading-screen');
	const mainContent = document.querySelector('.main-content');
	if (loadingScreen) {
		loadingScreen.classList.add('opacity-0');
		setTimeout(() => loadingScreen.remove(), 300);
	}
	if (mainContent) {
		mainContent.classList.add('loaded');
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

	// Hide all pages
	document
		.querySelectorAll('.page')
		.forEach((page) => page.classList.add('hidden'));

	// Remove active class from all nav links
	document
		.querySelectorAll('.nav-link')
		.forEach((link) =>
			link.classList.remove(
				'bg-teal-50',
				'dark:bg-teal-900/30',
				'text-teal-700',
				'dark:text-teal-300',
			),
		);

	// Show the selected page
	const page = document.getElementById(pageId);
	if (page) {
		page.classList.remove('hidden');
	}

	// Add active class to the corresponding nav link
	document.querySelectorAll('.nav-link').forEach((link) => {
		const dataPage = link.getAttribute('data-page');
		if (dataPage === pageId) {
			link.classList.add(
				'bg-teal-50',
				'dark:bg-teal-900/30',
				'text-teal-700',
				'dark:text-teal-300',
			);
		}
	});

	// Page-specific initialization
	if (pageId === 'ielts') {
		displayIELTSPlan();
	} else if (pageId === 'ielts-practice') {
		if (typeof initIELTSPractice === 'function') {
			initIELTSPractice();
		}
	} else if (pageId === 'ielts-tools') {
		if (typeof openIELTSTool === 'function') {
			openIELTSTool('vocab');
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
		displayScholarshipTracker();
	} else if (pageId === 'analytics') {
		if (typeof updateAnalyticsPage === 'function') {
			updateAnalyticsPage();
		}
	} else if (pageId === 'settings') {
		if (typeof updateStorageDisplay === 'function') {
			updateStorageDisplay();
		}
	}

	// Close sidebar on mobile
	const sidebar = document.getElementById('sidebar');
	const overlay = document.getElementById('sidebar-overlay');
	if (sidebar) {
		sidebar.classList.remove('translate-x-0');
		sidebar.classList.add('-translate-x-full', 'lg:translate-x-0');
	}
	if (overlay) {
		overlay.classList.add('hidden');
	}
}

function toggleMenu() {
	const sidebar = document.getElementById('sidebar');
	const overlay = document.getElementById('sidebar-overlay');

	if (sidebar.classList.contains('-translate-x-full')) {
		sidebar.classList.remove('-translate-x-full');
		sidebar.classList.add('translate-x-0');
		if (overlay) overlay.classList.remove('hidden');
	} else {
		sidebar.classList.add('-translate-x-full');
		sidebar.classList.remove('translate-x-0');
		if (overlay) overlay.classList.add('hidden');
	}
}

// Toggle dark mode
function toggleDarkMode() {
	document.documentElement.classList.toggle('dark');
	const isDark = document.documentElement.classList.contains('dark');
	localStorage.setItem('darkMode', isDark ? 'true' : 'false');
}

// Initialize dark mode on load
(function initDarkMode() {
	const savedDarkMode = localStorage.getItem('darkMode');
	if (
		savedDarkMode === 'true' ||
		(!savedDarkMode &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark');
	}
})();

// Toggle expand/collapse for accordion cards
function toggleExpand(element) {
	const header = element;
	const content = header.nextElementSibling;
	const toggle = header.querySelector('.expand-toggle');

	if (content) {
		content.classList.toggle('hidden');
		if (toggle) {
			toggle.textContent = content.classList.contains('hidden')
				? '▶'
				: '▼';
		}
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

function getStatusBadgeClass(status) {
	const classes = {
		not_started:
			'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
		researching:
			'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
		preparing:
			'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
		submitted:
			'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
		admitted:
			'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
		rejected:
			'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
	};
	return classes[status] || classes['not_started'];
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
		container.innerHTML = `
			<div class="text-center py-16 text-gray-500 dark:text-gray-400">
				<p class="text-lg">⚠️ Scholarship guide not loaded</p>
				<p class="text-sm mt-2">Please refresh the page to load Germany data.</p>
			</div>
		`;
		return;
	}

	const {
		major_scholarships = [],
		application_tips = [],
		living_costs_reality = {},
		blocked_account_requirement = {},
	} = scholarshipGuide;

	container.innerHTML = `
		<div class="space-y-8">
			<!-- Major Scholarships -->
			<div>
				<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">💰 Major Scholarships</h3>
				<div class="grid gap-4 md:grid-cols-2">
					${major_scholarships
						.map(
							(s) => `
						<div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
							<h4 class="font-bold text-lg text-teal-600 dark:text-teal-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">${
								s.name
							}</h4>
							<div class="space-y-3 text-sm">
								<div class="flex items-start gap-3">
									<span class="text-lg">💵</span>
									<div>
										<span class="text-gray-500 dark:text-gray-400 text-xs block">Amount</span>
										<span class="text-gray-900 dark:text-white font-medium">${
											s.amount || 'N/A'
										}</span>
									</div>
								</div>
								<div class="flex items-start gap-3">
									<span class="text-lg">⏱️</span>
									<div>
										<span class="text-gray-500 dark:text-gray-400 text-xs block">Duration</span>
										<span class="text-gray-900 dark:text-white font-medium">${
											s.duration || 'N/A'
										}</span>
									</div>
								</div>
								<div class="flex items-start gap-3">
									<span class="text-lg">📅</span>
									<div>
										<span class="text-gray-500 dark:text-gray-400 text-xs block">Deadline</span>
										<span class="text-red-600 dark:text-red-400 font-bold">${
											s.deadline || 'N/A'
										}</span>
									</div>
								</div>
								<div class="flex items-start gap-3">
									<span class="text-lg">✅</span>
									<div>
										<span class="text-gray-500 dark:text-gray-400 text-xs block">Eligibility</span>
										<span class="text-gray-900 dark:text-white">${s.eligibility || 'N/A'}</span>
									</div>
								</div>
								${
									s.success_rate
										? `
								<div class="flex items-start gap-3">
									<span class="text-lg">📊</span>
									<div>
										<span class="text-gray-500 dark:text-gray-400 text-xs block">Success Rate</span>
										<span class="font-bold text-green-600 dark:text-green-400">${s.success_rate}</span>
									</div>
								</div>
								`
										: ''
								}
							</div>
							${
								s.note
									? `
							<div class="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-400 rounded-r-lg">
								<p class="text-sm text-amber-800 dark:text-amber-200 font-medium">💡 ${s.note}</p>
							</div>
							`
									: ''
							}
							<div class="flex items-center gap-2 mt-4">
								${
									s.website
										? `
								<a href="${s.website}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg">
									<span>Visit Website</span>
									<span>→</span>
								</a>
								`
										: ''
								}
								<button onclick="trackScholarship('${
									s.name
								}')" class="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg">
									<span>📋</span>
									<span>Track</span>
								</button>
							</div>
						</div>
					`,
						)
						.join('')}
				</div>
			</div>

			<!-- Application Tips -->
			<div>
				<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📝 Application Tips</h3>
				<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
					<ol class="space-y-3">
						${application_tips
							.map(
								(tip, index) => `
							<li class="flex gap-3">
								<span class="flex-shrink-0 w-6 h-6 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full flex items-center justify-center text-sm font-medium">${
									index + 1
								}</span>
								<span class="text-gray-700 dark:text-gray-300">${tip}</span>
							</li>
						`,
							)
							.join('')}
					</ol>
				</div>
			</div>

			<!-- Living Costs -->
			<div>
				<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🏠 Living Cost Reality</h3>
				<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
					${
						living_costs_reality.monthly_minimum
							? `
						<div class="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
							<strong class="text-teal-700 dark:text-teal-300">Monthly Minimum:</strong>
							<span class="text-teal-600 dark:text-teal-400 font-bold ml-2">${living_costs_reality.monthly_minimum}</span>
						</div>
					`
							: ''
					}
					${
						living_costs_reality.breakdown
							? `
						<div>
							<h4 class="font-medium text-gray-900 dark:text-white mb-3">Cost Breakdown:</h4>
							<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
								${Object.entries(living_costs_reality.breakdown)
									.map(
										([k, v]) => `
									<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
										<div class="text-xs text-gray-500 dark:text-gray-400">${k}</div>
										<div class="font-medium text-gray-900 dark:text-white">${v}</div>
									</div>
								`,
									)
									.join('')}
							</div>
						</div>
					`
							: ''
					}
					${
						living_costs_reality.student_job_rules
							? `
						<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
							<strong class="text-green-700 dark:text-green-300">💼 Student Jobs:</strong>
							<p class="text-green-600 dark:text-green-400 mt-1">${living_costs_reality.student_job_rules}</p>
						</div>
					`
							: ''
					}
					${
						Array.isArray(living_costs_reality.cheapest_cities)
							? `
						<div>
							<strong class="text-gray-900 dark:text-white">💵 Cheapest Cities:</strong>
							<div class="flex flex-wrap gap-2 mt-2">
								${living_costs_reality.cheapest_cities
									.map(
										(city) => `
									<span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">${city}</span>
								`,
									)
									.join('')}
							</div>
						</div>
					`
							: ''
					}
					${
						living_costs_reality.survival_tip
							? `
						<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded">
							<strong class="text-amber-700 dark:text-amber-300">💡 Survival Tip:</strong>
							<p class="text-amber-600 dark:text-amber-400 mt-1">${living_costs_reality.survival_tip}</p>
						</div>
					`
							: ''
					}
				</div>
			</div>

			<!-- Blocked Account -->
			<div>
				<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🏦 Blocked Account Requirement</h3>
				<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
					${
						blocked_account_requirement.amount
							? `
						<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
							<strong class="text-blue-700 dark:text-blue-300">Required Amount:</strong>
							<span class="text-blue-600 dark:text-blue-400 font-bold ml-2">${blocked_account_requirement.amount}</span>
						</div>
					`
							: ''
					}
					${
						blocked_account_requirement.purpose
							? `<p class="text-gray-700 dark:text-gray-300"><strong>Purpose:</strong> ${blocked_account_requirement.purpose}</p>`
							: ''
					}
					${
						blocked_account_requirement.when_needed
							? `<p class="text-gray-700 dark:text-gray-300"><strong>When Needed:</strong> ${blocked_account_requirement.when_needed}</p>`
							: ''
					}
					${
						blocked_account_requirement.note
							? `
						<div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-700 dark:text-amber-300">${blocked_account_requirement.note}</div>
					`
							: ''
					}
					${
						Array.isArray(blocked_account_requirement.providers)
							? `
						<p class="text-gray-700 dark:text-gray-300"><strong>Providers:</strong> ${blocked_account_requirement.providers.join(
							', ',
						)}</p>
					`
							: ''
					}
					${
						blocked_account_requirement.tip
							? `
						<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded text-blue-700 dark:text-blue-300">💡 ${blocked_account_requirement.tip}</div>
					`
							: ''
					}
				</div>
			</div>
		</div>
	`;
}

function displayGermanyUniversities() {
	const container = document.getElementById('germany-list');
	if (!container) return;

	container.innerHTML = germanyUniversities
		.map(
			(uni) => `
		<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
			<div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" onclick="toggleExpand(this)">
				<div class="flex items-start justify-between gap-4">
					<div class="flex-1">
						<h3 class="font-semibold text-gray-900 dark:text-white">${uni.university} ${
				uni.ranking || ''
			}</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${uni.program}</p>
					</div>
					<span class="expand-toggle text-gray-400 text-sm">▶</span>
				</div>
				<div class="flex items-center gap-3 mt-3">
					<span class="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium">⏰ ${
						uni.application_deadline
					}</span>
					<span class="px-3 py-1 ${getStatusBadgeClass(
						uni.status,
					)} rounded-full text-xs font-medium">${getStatusLabel(
				uni.status,
			)}</span>
				</div>
			</div>
			<div class="hidden border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
				${
					uni.highlights
						? `<p class="text-sm text-amber-600 dark:text-amber-400 mb-4 font-medium">💡 ${uni.highlights}</p>`
						: ''
				}
				${
					uni.application_opens
						? `
					<div class="p-3 bg-green-100 dark:bg-green-900/40 rounded-lg mb-4 text-sm text-green-800 dark:text-green-300 font-medium">
						⏰ Applications open: <strong>${uni.application_opens}</strong>
					</div>
				`
						: ''
				}
				<div class="grid grid-cols-2 gap-3 text-sm mb-4">
					<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"><span class="text-gray-500 dark:text-gray-400">📍</span> ${
						uni.location
					}</div>
					<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"><span class="text-gray-500 dark:text-gray-400">⏱️</span> ${
						uni.duration
					}</div>
					<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"><span class="text-gray-500 dark:text-gray-400">💰</span> ${
						uni.tuition
					}</div>
					<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"><span class="text-gray-500 dark:text-gray-400">🌐</span> ${
						uni.language
					}</div>
				</div>
				${
					uni.requirements
						? `<p class="text-sm text-gray-700 dark:text-gray-300 mb-4">📝 ${uni.requirements}</p>`
						: ''
				}
				${
					uni.scholarships && uni.scholarships.length > 0
						? `
					<div class="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg mb-4">
						<strong class="text-amber-700 dark:text-amber-300">💰 Scholarships Available:</strong>
						<ul class="mt-2 space-y-1 text-sm text-amber-600 dark:text-amber-400">
							${uni.scholarships.map((s) => `<li>• ${s}</li>`).join('')}
						</ul>
					</div>
				`
						: ''
				}
				${
					uni.notes
						? `
					<div class="p-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded text-sm text-amber-700 dark:text-amber-300 mb-4">
						⚠️ <strong>Important:</strong> ${uni.notes}
					</div>
				`
						: ''
				}
				<div class="flex gap-3 items-center">
					<a href="${
						uni.website
					}" target="_blank" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors">Visit Website</a>
					<div class="relative">
						<select onchange="changeGermanyStatus('${uni.university}', this.value)"
							class="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 cursor-pointer">
							<option value="not_started" ${
								uni.status === 'not_started' ? 'selected' : ''
							}>📋 Not Started</option>
							<option value="in_progress" ${
								uni.status === 'in_progress' ? 'selected' : ''
							}>🔄 In Progress</option>
							<option value="documents_ready" ${
								uni.status === 'documents_ready'
									? 'selected'
									: ''
							}>📑 Docs Ready</option>
							<option value="submitted" ${
								uni.status === 'submitted' ? 'selected' : ''
							}>✅ Submitted</option>
							<option value="admitted" ${
								uni.status === 'admitted' ? 'selected' : ''
							}>🎉 Admitted</option>
							<option value="rejected" ${
								uni.status === 'rejected' ? 'selected' : ''
							}>❌ Rejected</option>
						</select>
						<div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
							<svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
							</svg>
						</div>
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

	const tracked = localStorage.getItem('germany-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];

	if (germanyUniversities.length === 0) {
		container.innerHTML = `
			<div class="text-center py-16 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
				<p class="text-lg">📝 Loading University Data...</p>
			</div>
		`;
		return;
	}

	container.innerHTML = germanyUniversities
		.map((uni) => {
			const trackedUni = trackedUniversities.find(
				(t) => t.university === uni.university,
			);

			if (trackedUni) {
				const completedTasks = trackedUni.tasks.filter(
					(t) => t.completed,
				).length;
				const totalTasks = trackedUni.tasks.length;
				const progress = Math.round(
					(completedTasks / totalTasks) * 100,
				);
				const progressColor =
					progress === 100
						? 'bg-green-500'
						: progress >= 50
						? 'bg-teal-500'
						: 'bg-amber-500';
				const statusIcon =
					progress === 100 ? '✅' : progress >= 50 ? '🔄' : '📋';
				
				const statusColors = {
					not_started: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
					researching: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
					preparing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
					submitted: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
					admitted: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
					rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
				};
				const statusColor = statusColors[trackedUni.status] || statusColors.not_started;
				const note = getUniversityNote('germany', trackedUni.university);

				return `
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
					<!-- Collapsed Header with Progress -->
					<div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" onclick="toggleProgressExpand(this)">
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3 flex-1 min-w-0">
								<div class="w-12 h-12 rounded-xl ${progressColor} bg-opacity-20 flex items-center justify-center text-2xl">
									${statusIcon}
								</div>
								<div class="flex-1 min-w-0">
									<h4 class="font-bold text-gray-900 dark:text-white truncate">${
										trackedUni.university
									}</h4>
									<div class="flex items-center gap-2 mt-1 flex-wrap">
										<span class="px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}">${getStatusLabel(trackedUni.status)}</span>
										${uni.application_deadline ? `<span class="text-xs text-gray-500 dark:text-gray-400">⏰ ${uni.application_deadline}</span>` : ''}
									</div>
								</div>
							</div>
							<div class="flex flex-col items-end gap-1">
								<div class="flex items-center gap-2">
									<div class="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
										<div class="h-full ${progressColor} rounded-full transition-all duration-500" style="width: ${progress}%"></div>
									</div>
									<span class="text-sm font-bold ${progress === 100 ? 'text-green-500' : 'text-gray-600 dark:text-gray-400'}">${progress}%</span>
								</div>
								<span class="expand-toggle text-gray-400 text-sm transition-transform">▶</span>
							</div>
						</div>
					</div>

					<!-- Expanded Details -->
					<div class="hidden border-t border-gray-200 dark:border-gray-700">
						<!-- Status & Info Bar -->
						<div class="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border-b border-gray-100 dark:border-gray-700">
							<div class="flex flex-wrap items-center gap-3">
								<div class="flex items-center gap-2">
									<label class="text-xs text-gray-500 dark:text-gray-400">Status:</label>
									<select onchange="changeTrackedGermanyStatus('${trackedUni.university}', this.value)"
										class="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
										<option value="not_started" ${trackedUni.status === 'not_started' ? 'selected' : ''}>📋 Not Started</option>
										<option value="researching" ${trackedUni.status === 'researching' ? 'selected' : ''}>🔍 Researching</option>
										<option value="preparing" ${trackedUni.status === 'preparing' ? 'selected' : ''}>📝 Preparing</option>
										<option value="submitted" ${trackedUni.status === 'submitted' ? 'selected' : ''}>✅ Submitted</option>
										<option value="admitted" ${trackedUni.status === 'admitted' ? 'selected' : ''}>🎉 Admitted</option>
										<option value="rejected" ${trackedUni.status === 'rejected' ? 'selected' : ''}>❌ Rejected</option>
									</select>
								</div>
								${uni.tuition ? `<span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">💰 ${uni.tuition}</span>` : ''}
								${uni.location ? `<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">📍 ${uni.location}</span>` : ''}
							</div>
						</div>
						
						<!-- Tasks Section -->
						<div class="p-4 bg-gray-50 dark:bg-gray-900/50">
							<h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Application Tasks</h5>
							<div class="grid gap-2">
								${trackedUni.tasks
									.map(
										(task, index) => `
									<label class="flex items-center gap-3 p-3 rounded-xl ${
										task.completed
											? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
											: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
									} cursor-pointer transition-all hover:shadow-sm border">
										<input type="checkbox"
											   class="w-5 h-5 rounded-lg border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 focus:ring-offset-0"
											   ${task.completed ? 'checked' : ''}
											   onchange="toggleGermanyTask('${trackedUni.university}', ${index})">
										<span class="text-sm flex-1 ${
											task.completed
												? 'text-gray-400 dark:text-gray-500 line-through'
												: 'text-gray-700 dark:text-gray-300'
										}">${task.name}</span>
										${task.completed ? '<span class="text-green-500 text-lg">✓</span>' : '<span class="w-5 h-5 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600"></span>'}
									</label>
								`,
									)
									.join('')}
							</div>
						</div>
						
						<!-- Notes Section -->
						<div class="p-4 border-t border-gray-200 dark:border-gray-700">
							<h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">📝 Personal Notes</h5>
							<textarea 
								placeholder="Add notes about this application..."
								onblur="saveUniversityNote('germany', '${trackedUni.university}', this.value)"
								class="w-full p-3 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
								rows="2">${note}</textarea>
						</div>
						
						<!-- Actions -->
						<div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
							<div class="flex gap-3">
								${uni.website ? `<a href="${uni.website}" target="_blank" class="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium text-center transition-colors">🔗 Visit Website</a>` : ''}
								<button onclick="untrackGermanyUniversity('${trackedUni.university}')"
									class="px-4 py-2.5 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
									🗑️ Remove
								</button>
							</div>
						</div>
					</div>
				</div>
			`;
			} else {
				return `
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
					<div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50" onclick="toggleProgressExpand(this)">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<span class="text-xl">📝</span>
								<div>
									<h4 class="font-semibold text-gray-900 dark:text-white">${uni.university}</h4>
									<span class="text-xs text-gray-500 dark:text-gray-400">Not tracked yet</span>
								</div>
							</div>
							<span class="expand-toggle text-gray-400 text-sm transition-transform">▶</span>
						</div>
					</div>
					<div class="hidden border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
						<div class="space-y-2 text-sm mb-4">
							<p class="text-gray-600 dark:text-gray-400"><strong>📚 Program:</strong> ${
								uni.program || 'N/A'
							}</p>
							<p class="text-gray-600 dark:text-gray-400"><strong>⏰ Deadline:</strong> ${
								uni.application_deadline || 'N/A'
							}</p>
							<p class="text-gray-600 dark:text-gray-400"><strong>💰 Tuition:</strong> ${
								uni.tuition || 'N/A'
							}</p>
							<p class="text-gray-600 dark:text-gray-400"><strong>📍 Location:</strong> ${
								uni.location || 'N/A'
							}</p>
						</div>
						<button onclick="trackGermanyUniversity('${
							uni.university
						}')" class="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors">
							Start Tracking
						</button>
					</div>
				</div>
			`;
			}
		})
		.join('');
}

// Toggle expand/collapse for progress items
function toggleProgressExpand(element) {
	const parent = element.parentElement;
	const details = parent.querySelector('.hidden, .block');
	const toggle = element.querySelector('.expand-toggle');

	if (details) {
		const isHidden = details.classList.contains('hidden');
		details.classList.toggle('hidden', !isHidden);
		details.classList.toggle('block', isHidden);
		if (toggle) {
			toggle.style.transform = isHidden
				? 'rotate(90deg)'
				: 'rotate(0deg)';
		}
	}
}

// Untrack university
function untrackGermanyUniversity(universityName) {
	const tracked = localStorage.getItem('germany-applications');
	let trackedUniversities = tracked ? JSON.parse(tracked) : [];
	trackedUniversities = trackedUniversities.filter(
		(u) => u.university !== universityName,
	);
	localStorage.setItem(
		'germany-applications',
		JSON.stringify(trackedUniversities),
	);
	displayGermanyProgress();
	updateDashboardStats();

	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`Removed ${universityName} from tracker`,
			'info',
			3000,
		);
	}
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

// Change status directly via dropdown
function changeGermanyStatus(universityName, newStatus) {
	const uni = germanyUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	uni.status = newStatus;
	saveGermanyApplications();
	displayGermanyUniversities();
	updateDashboardStats();

	// Show feedback
	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`✅ ${universityName} status updated to ${getStatusLabel(
				newStatus,
			)}`,
			'success',
			3000,
		);
	}
}

// Change status for tracked university in progress view
function changeTrackedGermanyStatus(universityName, newStatus) {
	const tracked = localStorage.getItem('germany-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];
	
	const uni = trackedUniversities.find(t => t.university === universityName);
	if (!uni) return;

	uni.status = newStatus;
	localStorage.setItem('germany-applications', JSON.stringify(trackedUniversities));
	displayGermanyProgress();
	updateDashboardStats();

	// Sync to cloud
	if (typeof cloudSync !== 'undefined' && cloudSync.syncEnabled) {
		cloudSync.syncToCloud();
	}

	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`✅ Status updated to ${getStatusLabel(newStatus)}`,
			'success',
			2000,
		);
	}
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

	const alreadyTracked = trackedUniversities.find(
		(t) => t.university === uni.university,
	);
	if (alreadyTracked) {
		alert('This university is already being tracked!');
		return;
	}

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

function saveGermanyApplications() {
	const dataToSave = germanyUniversities.map((uni) => ({
		university: uni.university,
		status: uni.status,
		tasks: uni.tasks,
	}));
	localStorage.setItem('germany-applications', JSON.stringify(dataToSave));
}

// SCHENGEN FUNCTIONS
async function loadSchengenData() {
	try {
		const response = await fetch('schengen-universities.json');
		const data = await response.json();
		const programs = data.cyber_security_programs || [];

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
		<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
			<div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" onclick="toggleExpand(this)">
				<div class="flex items-start justify-between gap-4">
					<div class="flex-1">
						<h3 class="font-semibold text-gray-900 dark:text-white">${uni.university} ${
				uni.country || ''
			}</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${uni.program}</p>
						${
							uni.ranking
								? `<p class="text-xs text-gray-500 dark:text-gray-500 mt-1">${uni.ranking}</p>`
								: ''
						}
					</div>
					<span class="expand-toggle text-gray-400 text-sm">▶</span>
				</div>
				<div class="flex items-center gap-3 mt-3">
					<span class="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium">⏰ ${
						uni.application_deadline
					}</span>
					<span class="px-3 py-1 ${getStatusBadgeClass(
						uni.status,
					)} rounded-full text-xs font-medium">${getStatusLabel(
				uni.status,
			)}</span>
				</div>
			</div>
			<div class="hidden border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
				${
					uni.application_opens
						? `
					<div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4 text-sm text-green-700 dark:text-green-300">
						⏰ Applications open: <strong>${uni.application_opens}</strong>
					</div>
				`
						: ''
				}
				<div class="grid grid-cols-2 gap-3 text-sm mb-4">
					<div class="p-2 bg-white dark:bg-gray-700/50 rounded"><span class="text-gray-500 dark:text-gray-400">📍</span> ${
						uni.location
					}</div>
					<div class="p-2 bg-white dark:bg-gray-700/50 rounded"><span class="text-gray-500 dark:text-gray-400">⏱️</span> ${
						uni.duration
					}</div>
					<div class="p-2 bg-white dark:bg-gray-700/50 rounded"><span class="text-gray-500 dark:text-gray-400">💰</span> ${
						uni.tuition
					}</div>
					<div class="p-2 bg-white dark:bg-gray-700/50 rounded"><span class="text-gray-500 dark:text-gray-400">🏠</span> ${
						uni.living_costs || 'N/A'
					}</div>
					<div class="p-2 bg-white dark:bg-gray-700/50 rounded"><span class="text-gray-500 dark:text-gray-400">🌐</span> ${
						uni.language
					}</div>
				</div>
				${
					uni.requirements
						? `<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">📝 ${uni.requirements}</p>`
						: ''
				}
				${
					uni.highlights
						? `
					<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4 text-sm text-blue-700 dark:text-blue-300">🌟 ${uni.highlights}</div>
				`
						: ''
				}
				${
					uni.why_best
						? `
					<div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-4 text-sm text-purple-700 dark:text-purple-300"><strong>🏆 Why Best:</strong> ${uni.why_best}</div>
				`
						: ''
				}
				${
					uni.scholarships && uni.scholarships.length > 0
						? `
					<div class="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg mb-4">
						<strong class="text-amber-700 dark:text-amber-300">💰 Scholarships Available:</strong>
						<ul class="mt-2 space-y-1 text-sm text-amber-600 dark:text-amber-400">
							${uni.scholarships.map((s) => `<li>• ${s}</li>`).join('')}
						</ul>
					</div>
				`
						: ''
				}
				${
					uni.notes
						? `
					<div class="p-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded text-sm text-amber-700 dark:text-amber-300 mb-4">
						⚠️ <strong>Note:</strong> ${uni.notes}
					</div>
				`
						: ''
				}
				<div class="flex gap-3 items-center">
					<a href="${
						uni.website
					}" target="_blank" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors">Visit Website</a>
					<div class="relative">
						<select onchange="changeSchengenStatus('${uni.university}', this.value)"
							class="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 cursor-pointer">
							<option value="not_started" ${
								uni.status === 'not_started' ? 'selected' : ''
							}>📋 Not Started</option>
							<option value="in_progress" ${
								uni.status === 'in_progress' ? 'selected' : ''
							}>🔄 In Progress</option>
							<option value="documents_ready" ${
								uni.status === 'documents_ready'
									? 'selected'
									: ''
							}>📑 Docs Ready</option>
							<option value="submitted" ${
								uni.status === 'submitted' ? 'selected' : ''
							}>✅ Submitted</option>
							<option value="admitted" ${
								uni.status === 'admitted' ? 'selected' : ''
							}>🎉 Admitted</option>
							<option value="rejected" ${
								uni.status === 'rejected' ? 'selected' : ''
							}>❌ Rejected</option>
						</select>
						<div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
							<svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
							</svg>
						</div>
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

	const tracked = localStorage.getItem('schengen-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];

	if (schengenUniversities.length === 0) {
		container.innerHTML = `
			<div class="text-center py-16 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
				<p class="text-lg">📝 Loading University Data...</p>
			</div>
		`;
		return;
	}

	container.innerHTML = schengenUniversities
		.map((uni) => {
			const trackedUni = trackedUniversities.find(
				(t) => t.university === uni.university,
			);

			if (trackedUni) {
				const completedTasks = trackedUni.tasks.filter(
					(t) => t.completed,
				).length;
				const totalTasks = trackedUni.tasks.length;
				const progress = Math.round(
					(completedTasks / totalTasks) * 100,
				);
				const progressColor =
					progress === 100
						? 'bg-green-500'
						: progress >= 50
						? 'bg-teal-500'
						: 'bg-amber-500';
				const statusIcon =
					progress === 100 ? '✅' : progress >= 50 ? '🔄' : '📋';
				
				const statusColors = {
					not_started: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
					researching: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
					preparing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
					submitted: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
					admitted: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
					rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
				};
				const statusColor = statusColors[trackedUni.status] || statusColors.not_started;
				const note = getUniversityNote('schengen', trackedUni.university);

				return `
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
					<div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" onclick="toggleProgressExpand(this)">
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3 flex-1 min-w-0">
								<div class="w-12 h-12 rounded-xl ${progressColor} bg-opacity-20 flex items-center justify-center text-2xl">
									${statusIcon}
								</div>
								<div class="flex-1 min-w-0">
									<h4 class="font-bold text-gray-900 dark:text-white truncate">${trackedUni.university}</h4>
									<div class="flex items-center gap-2 mt-1 flex-wrap">
										<span class="px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}">${getStatusLabel(trackedUni.status)}</span>
										${uni.country ? `<span class="text-xs text-gray-500 dark:text-gray-400">🌍 ${uni.country}</span>` : ''}
										${uni.application_deadline ? `<span class="text-xs text-gray-500 dark:text-gray-400">⏰ ${uni.application_deadline}</span>` : ''}
									</div>
								</div>
							</div>
							<div class="flex flex-col items-end gap-1">
								<div class="flex items-center gap-2">
									<div class="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
										<div class="h-full ${progressColor} rounded-full transition-all duration-500" style="width: ${progress}%"></div>
									</div>
									<span class="text-sm font-bold ${progress === 100 ? 'text-green-500' : 'text-gray-600 dark:text-gray-400'}">${progress}%</span>
								</div>
								<span class="expand-toggle text-gray-400 text-sm transition-transform">▶</span>
							</div>
						</div>
					</div>
					<div class="hidden border-t border-gray-200 dark:border-gray-700">
						<div class="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border-b border-gray-100 dark:border-gray-700">
							<div class="flex flex-wrap items-center gap-3">
								<div class="flex items-center gap-2">
									<label class="text-xs text-gray-500 dark:text-gray-400">Status:</label>
									<select onchange="changeTrackedSchengenStatus('${trackedUni.university}', this.value)"
										class="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
										<option value="not_started" ${trackedUni.status === 'not_started' ? 'selected' : ''}>📋 Not Started</option>
										<option value="researching" ${trackedUni.status === 'researching' ? 'selected' : ''}>🔍 Researching</option>
										<option value="preparing" ${trackedUni.status === 'preparing' ? 'selected' : ''}>📝 Preparing</option>
										<option value="submitted" ${trackedUni.status === 'submitted' ? 'selected' : ''}>✅ Submitted</option>
										<option value="admitted" ${trackedUni.status === 'admitted' ? 'selected' : ''}>🎉 Admitted</option>
										<option value="rejected" ${trackedUni.status === 'rejected' ? 'selected' : ''}>❌ Rejected</option>
									</select>
								</div>
								${uni.tuition ? `<span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">💰 ${uni.tuition}</span>` : ''}
								${uni.location ? `<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">📍 ${uni.location}</span>` : ''}
							</div>
						</div>
						<div class="p-4 bg-gray-50 dark:bg-gray-900/50">
							<h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Application Tasks</h5>
							<div class="grid gap-2">
								${trackedUni.tasks
									.map(
										(task, index) => `
									<label class="flex items-center gap-3 p-3 rounded-xl ${
										task.completed
											? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
											: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
									} cursor-pointer transition-all hover:shadow-sm border">
										<input type="checkbox"
											   class="w-5 h-5 rounded-lg border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500"
											   ${task.completed ? 'checked' : ''}
											   onchange="toggleSchengenTask('${trackedUni.university}', ${index})">
										<span class="text-sm flex-1 ${
											task.completed
												? 'text-gray-400 dark:text-gray-500 line-through'
												: 'text-gray-700 dark:text-gray-300'
										}">${task.name}</span>
										${task.completed ? '<span class="text-green-500 text-lg">✓</span>' : '<span class="w-5 h-5 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600"></span>'}
									</label>
								`,
									)
									.join('')}
							</div>
						</div>
						<div class="p-4 border-t border-gray-200 dark:border-gray-700">
							<h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">📝 Personal Notes</h5>
							<textarea 
								placeholder="Add notes about this application..."
								onblur="saveUniversityNote('schengen', '${trackedUni.university}', this.value)"
								class="w-full p-3 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
								rows="2">${note}</textarea>
						</div>
						<div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
							<div class="flex gap-3">
								${uni.website ? `<a href="${uni.website}" target="_blank" class="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium text-center transition-colors">🔗 Visit Website</a>` : ''}
								<button onclick="untrackSchengenUniversity('${trackedUni.university}')"
									class="px-4 py-2.5 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
									🗑️ Remove
								</button>
							</div>
						</div>
					</div>
				</div>
			`;
			} else {
				return `
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
					<div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50" onclick="toggleProgressExpand(this)">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<span class="text-xl">📝</span>
								<div>
									<h4 class="font-semibold text-gray-900 dark:text-white">${uni.university}</h4>
									<span class="text-xs text-gray-500 dark:text-gray-400">Not tracked yet</span>
								</div>
							</div>
							<span class="expand-toggle text-gray-400 text-sm transition-transform">▶</span>
						</div>
					</div>
					<div class="hidden border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
						<div class="space-y-2 text-sm mb-4">
							<p class="text-gray-600 dark:text-gray-400"><strong>📚 Program:</strong> ${
								uni.program || 'N/A'
							}</p>
							<p class="text-gray-600 dark:text-gray-400"><strong>⏰ Deadline:</strong> ${
								uni.application_deadline || 'N/A'
							}</p>
							<p class="text-gray-600 dark:text-gray-400"><strong>💰 Tuition:</strong> ${
								uni.tuition || 'N/A'
							}</p>
							<p class="text-gray-600 dark:text-gray-400"><strong>📍 Location:</strong> ${
								uni.location || 'N/A'
							}</p>
						</div>
						<button onclick="trackSchengenUniversity('${
							uni.university
						}')" class="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors">
							Start Tracking
						</button>
					</div>
				</div>
			`;
			}
		})
		.join('');
}

// Untrack Schengen university
function untrackSchengenUniversity(universityName) {
	const tracked = localStorage.getItem('schengen-applications');
	let trackedUniversities = tracked ? JSON.parse(tracked) : [];
	trackedUniversities = trackedUniversities.filter(
		(u) => u.university !== universityName,
	);
	localStorage.setItem(
		'schengen-applications',
		JSON.stringify(trackedUniversities),
	);
	displaySchengenProgress();
	updateDashboardStats();

	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`Removed ${universityName} from tracker`,
			'info',
			3000,
		);
	}
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

// Change Schengen status directly via dropdown
function changeSchengenStatus(universityName, newStatus) {
	const uni = schengenUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	uni.status = newStatus;
	saveSchengenApplications();
	displaySchengenUniversities();
	updateDashboardStats();

	// Show feedback
	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`✅ ${universityName} status updated to ${getStatusLabel(
				newStatus,
			)}`,
			'success',
			3000,
		);
	}
}

// Change status for tracked Schengen university in progress view
function changeTrackedSchengenStatus(universityName, newStatus) {
	const tracked = localStorage.getItem('schengen-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];
	
	const uni = trackedUniversities.find(t => t.university === universityName);
	if (!uni) return;

	uni.status = newStatus;
	localStorage.setItem('schengen-applications', JSON.stringify(trackedUniversities));
	displaySchengenProgress();
	updateDashboardStats();

	// Sync to cloud
	if (typeof cloudSync !== 'undefined' && cloudSync.syncEnabled) {
		cloudSync.syncToCloud();
	}

	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`✅ Status updated to ${getStatusLabel(newStatus)}`,
			'success',
			2000,
		);
	}
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

function trackSchengenUniversity(universityName) {
	const uni = schengenUniversities.find(
		(u) => u.university === universityName,
	);
	if (!uni) return;

	const tracked = localStorage.getItem('schengen-applications');
	const trackedUniversities = tracked ? JSON.parse(tracked) : [];

	const alreadyTracked = trackedUniversities.find(
		(t) => t.university === uni.university,
	);
	if (alreadyTracked) {
		alert('This university is already being tracked!');
		return;
	}

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

function saveSchengenApplications() {
	const dataToSave = schengenUniversities.map((uni) => ({
		university: uni.university,
		status: uni.status,
		tasks: uni.tasks,
	}));
	localStorage.setItem('schengen-applications', JSON.stringify(dataToSave));
}

// SCHOLARSHIP TRACKING FUNCTIONS
function getDefaultScholarshipTasks() {
	return [
		{ task: 'Research eligibility requirements', completed: false },
		{ task: 'Prepare motivation letter', completed: false },
		{ task: 'Get recommendation letters', completed: false },
		{ task: 'Gather academic transcripts', completed: false },
		{ task: 'Complete online application', completed: false },
		{ task: 'Submit before deadline', completed: false },
	];
}

function displayScholarshipTracker() {
	const container = document.getElementById('scholarship-tracker-list');
	const summary = document.getElementById('scholarship-tracker-summary');
	if (!container) return;

	const tracked = localStorage.getItem('scholarship-applications');
	const trackedScholarships = tracked ? JSON.parse(tracked) : [];

	if (trackedScholarships.length === 0) {
		container.innerHTML = `
			<div class="text-center py-8 text-gray-500 dark:text-gray-400">
				<p class="text-4xl mb-2">📋</p>
				<p>No scholarships tracked yet</p>
				<p class="text-sm mt-1">Click "Track" on any scholarship below to start tracking</p>
			</div>
		`;
		if (summary) summary.textContent = '0 tracked';
		return;
	}

	if (summary) summary.textContent = `${trackedScholarships.length} tracked`;

	container.innerHTML = trackedScholarships
		.map((scholarship, index) => {
			const completedTasks = scholarship.tasks.filter(
				(t) => t.completed,
			).length;
			const totalTasks = scholarship.tasks.length;
			const progress = Math.round((completedTasks / totalTasks) * 100);

			const statusColors = {
				not_started:
					'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
				researching:
					'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
				preparing:
					'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
				submitted:
					'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
				awarded:
					'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
				rejected:
					'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
			};

			const statusColor =
				statusColors[scholarship.status] || statusColors.not_started;

			return `
				<div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden" data-expanded="false">
					<div class="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onclick="toggleProgressExpand(this)">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3 flex-1 min-w-0">
								<span class="expand-toggle text-gray-400 transition-transform text-sm">▶</span>
								<div class="min-w-0 flex-1">
									<h4 class="font-semibold text-gray-900 dark:text-white truncate">${
										scholarship.name
									}</h4>
									<div class="flex items-center gap-2 mt-1">
										<span class="text-xs ${statusColor} px-2 py-0.5 rounded-full">${getStatusLabel(
				scholarship.status,
			)}</span>
										<span class="text-xs text-gray-500 dark:text-gray-400">${completedTasks}/${totalTasks} tasks</span>
									</div>
								</div>
							</div>
							<div class="flex items-center gap-2">
								<div class="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
									<div class="h-full bg-teal-500 rounded-full transition-all" style="width: ${progress}%"></div>
								</div>
								<span class="text-xs font-medium text-gray-600 dark:text-gray-300 w-8">${progress}%</span>
							</div>
						</div>
					</div>
					<div class="hidden border-t border-gray-200 dark:border-gray-600">
						<div class="p-4 space-y-3">
							<div class="flex items-center gap-2 mb-3">
								<label class="text-xs text-gray-500 dark:text-gray-400">Status:</label>
								<select onchange="changeScholarshipStatus('${scholarship.name}', this.value)"
									class="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
									<option value="not_started" ${
										scholarship.status === 'not_started'
											? 'selected'
											: ''
									}>Not Started</option>
									<option value="researching" ${
										scholarship.status === 'researching'
											? 'selected'
											: ''
									}>Researching</option>
									<option value="preparing" ${
										scholarship.status === 'preparing'
											? 'selected'
											: ''
									}>Preparing</option>
									<option value="submitted" ${
										scholarship.status === 'submitted'
											? 'selected'
											: ''
									}>Submitted</option>
									<option value="awarded" ${
										scholarship.status === 'awarded'
											? 'selected'
											: ''
									}>Awarded</option>
									<option value="rejected" ${
										scholarship.status === 'rejected'
											? 'selected'
											: ''
									}>Rejected</option>
								</select>
							</div>
							${scholarship.tasks
								.map(
									(task, taskIndex) => `
								<label class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50 cursor-pointer">
									<input type="checkbox" ${task.completed ? 'checked' : ''}
										onchange="toggleScholarshipTask('${scholarship.name}', ${taskIndex})"
										class="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500">
									<span class="${
										task.completed
											? 'line-through text-gray-400 dark:text-gray-500'
											: 'text-gray-700 dark:text-gray-300'
									} text-sm">${task.task}</span>
								</label>
							`,
								)
								.join('')}
							<button onclick="untrackScholarship('${scholarship.name}')"
								class="mt-3 w-full py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
								🗑️ Remove from Tracker
							</button>
						</div>
					</div>
				</div>
			`;
		})
		.join('');
}

function trackScholarship(scholarshipName) {
	const tracked = localStorage.getItem('scholarship-applications');
	const trackedScholarships = tracked ? JSON.parse(tracked) : [];

	const alreadyTracked = trackedScholarships.find(
		(s) => s.name === scholarshipName,
	);
	if (alreadyTracked) {
		if (typeof notificationManager !== 'undefined') {
			notificationManager.showInAppNotification(
				'This scholarship is already being tracked!',
				'info',
				3000,
			);
		}
		return;
	}

	trackedScholarships.push({
		name: scholarshipName,
		status: 'not_started',
		tasks: getDefaultScholarshipTasks(),
	});

	localStorage.setItem(
		'scholarship-applications',
		JSON.stringify(trackedScholarships),
	);
	displayScholarshipTracker();

	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`📋 Now tracking ${scholarshipName}`,
			'success',
			3000,
		);
	}
}

function untrackScholarship(scholarshipName) {
	const tracked = localStorage.getItem('scholarship-applications');
	let trackedScholarships = tracked ? JSON.parse(tracked) : [];
	trackedScholarships = trackedScholarships.filter(
		(s) => s.name !== scholarshipName,
	);
	localStorage.setItem(
		'scholarship-applications',
		JSON.stringify(trackedScholarships),
	);
	displayScholarshipTracker();

	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`Removed ${scholarshipName} from tracker`,
			'info',
			3000,
		);
	}
}

function toggleScholarshipTask(scholarshipName, taskIndex) {
	const tracked = localStorage.getItem('scholarship-applications');
	const trackedScholarships = tracked ? JSON.parse(tracked) : [];

	const scholarship = trackedScholarships.find(
		(s) => s.name === scholarshipName,
	);
	if (!scholarship) return;

	scholarship.tasks[taskIndex].completed =
		!scholarship.tasks[taskIndex].completed;
	localStorage.setItem(
		'scholarship-applications',
		JSON.stringify(trackedScholarships),
	);
	displayScholarshipTracker();
}

function changeScholarshipStatus(scholarshipName, newStatus) {
	const tracked = localStorage.getItem('scholarship-applications');
	const trackedScholarships = tracked ? JSON.parse(tracked) : [];

	const scholarship = trackedScholarships.find(
		(s) => s.name === scholarshipName,
	);
	if (!scholarship) return;

	scholarship.status = newStatus;
	localStorage.setItem(
		'scholarship-applications',
		JSON.stringify(trackedScholarships),
	);
	displayScholarshipTracker();

	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`✅ ${scholarshipName} status updated to ${getStatusLabel(
				newStatus,
			)}`,
			'success',
			3000,
		);
	}
}

// IELTS FUNCTIONS
function displayIELTSPlan() {
	const container = document.getElementById('ielts-plan-content');
	if (!container) return;

	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};

	const renderTask = (id, time, task, duration, resource = '') => {
		const isChecked = tasks[id] ? true : false;
		const bgClass = isChecked ? 'bg-teal-50 dark:bg-teal-900/20' : '';
		const textClass = isChecked
			? 'line-through text-gray-400 dark:text-gray-500'
			: 'text-gray-700 dark:text-gray-300';

		if (time.startsWith('DAY')) {
			return `
				<tr>
					<td colspan="4" class="py-2 px-2 sm:px-4 bg-teal-600 dark:bg-teal-700 font-bold text-white text-center text-xs sm:text-sm">
						${time}
					</td>
				</tr>
			`;
		}

		const resourceLink = resource
			? `<a href="${resource}" target="_blank" class="text-teal-600 dark:text-teal-400 hover:underline text-[10px] sm:text-xs">📎 Resource</a>`
			: '';

		return `
			<tr class="${bgClass} hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors border-b border-gray-100 dark:border-gray-700" data-task-id="${id}">
				<td class="py-1.5 sm:py-2 px-1.5 sm:px-3 text-center align-top">
					<input type="checkbox"
						   class="w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 cursor-pointer"
						   ${isChecked ? 'checked' : ''}
						   onchange="toggleIELTSTask('${id}', this)">
				</td>
				<td class="py-1.5 sm:py-2 px-1 sm:px-2 align-top whitespace-nowrap">
					<div class="text-[9px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">${time}</div>
					<div class="text-[9px] sm:text-xs text-teal-600 dark:text-teal-400">${duration}</div>
				</td>
				<td class="py-1.5 sm:py-2 px-1 sm:px-2 text-[10px] sm:text-sm ${textClass}">${task}</td>
				<td class="py-1.5 sm:py-2 px-1 sm:px-2 align-top hidden sm:table-cell">${resourceLink}</td>
			</tr>
		`;
	};

	const renderDaySection = (title, emoji, tasks) => `
		<div class="bg-white dark:bg-gray-800 rounded-none sm:rounded-xl border-y sm:border border-gray-200 dark:border-gray-700 overflow-hidden">
			<div class="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 px-3 py-2 sm:px-4 sm:py-3">
				<h3 class="text-sm sm:text-base font-bold text-white">${emoji} ${title}</h3>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full text-left">
					<thead class="bg-gray-50 dark:bg-gray-800/50">
						<tr>
							<th class="py-1.5 sm:py-2 px-1.5 sm:px-3 text-center text-[9px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 w-8">✓</th>
							<th class="py-1.5 sm:py-2 px-1 sm:px-2 text-[9px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 w-14 sm:w-20">Time</th>
							<th class="py-1.5 sm:py-2 px-1 sm:px-2 text-[9px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400">Task & Focus</th>
							<th class="py-1.5 sm:py-2 px-1 sm:px-2 text-[9px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 hidden sm:table-cell w-20">Resource</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100 dark:divide-gray-700">
						${tasks}
					</tbody>
				</table>
			</div>
		</div>
	`;

	container.innerHTML = `
		<div class="space-y-3 sm:space-y-6">
			<!-- Essential Resources Banner -->
			<div class="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-none sm:rounded-xl p-3 sm:p-4 border-y sm:border border-blue-200 dark:border-blue-800">
				<h4 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-2">📚 Essential Resources for Band 8.0+</h4>
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] sm:text-xs">
					<a href="https://www.ielts.org/for-test-takers/sample-test-questions" target="_blank" class="flex items-center gap-1 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 transition-colors text-gray-800 dark:text-gray-100 font-medium">
						<span>🎯</span> <span class="truncate">Official IELTS</span>
					</a>
					<a href="https://ieltsliz.com/" target="_blank" class="flex items-center gap-1 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 transition-colors text-gray-800 dark:text-gray-100 font-medium">
						<span>👩‍🏫</span> <span class="truncate">IELTS Liz</span>
					</a>
					<a href="https://takeielts.britishcouncil.org/take-ielts/prepare" target="_blank" class="flex items-center gap-1 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 transition-colors text-gray-800 dark:text-gray-100 font-medium">
						<span>🇬🇧</span> <span class="truncate">British Council</span>
					</a>
					<a href="https://www.youtube.com/@E2IELTS" target="_blank" class="flex items-center gap-1 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 transition-colors text-gray-800 dark:text-gray-100 font-medium">
						<span>▶️</span> <span class="truncate">E2 IELTS</span>
					</a>
				</div>
			</div>

			<!-- Days 1-2: Foundations -->
			${renderDaySection(
				'DAYS 1–2: Foundations & Test Format',
				'🎯',
				`
				${renderTask('d1-1', 'DAY 1', '', '')}
				${renderTask(
					'd1-2',
					'9:00–11:00',
					'🟦 IELTS Format: Understand all 4 sections, timing, scoring',
					'2h',
					'https://www.ielts.org/for-test-takers/test-format',
				)}
				${renderTask(
					'd1-3',
					'11:00–1:00',
					'🟨 Writing: Study Band 8-9 descriptors + sample essays',
					'2h',
					'https://ieltsliz.com/ielts-writing-task-2-band-scores-5-to-8/',
				)}
				${renderTask(
					'd1-4',
					'2:00–4:00',
					'🟨 Task 1: Learn all 6 chart types (line, bar, pie, table, process, map)',
					'2h',
					'https://ieltsliz.com/ielts-writing-task-1-lessons-and-tips/',
				)}
				${renderTask(
					'd1-5',
					'4:00–6:00',
					'🟨 Task 2: Study 5 essay types (opinion, discussion, problem/solution, advantages, two-part)',
					'2h',
					'https://ieltsliz.com/ielts-writing-task-2/',
				)}
				${renderTask(
					'd1-6',
					'7:00–9:00',
					'🟪 Speaking: Watch Band 9 sample videos, note techniques',
					'2h',
					'https://www.youtube.com/watch?v=FYGq8vBnXEw',
				)}
				${renderTask(
					'd1-7',
					'9:00–10:00',
					'🟧 Vocab: Learn 30 academic words from AWL',
					'1h',
					'https://www.victoria.ac.nz/lals/resources/academicwordlist',
				)}
				${renderTask('d2-1', 'DAY 2', '', '')}
				${renderTask(
					'd2-2',
					'9:00–11:00',
					'🟩 Reading: Master skimming (1 min/passage) & scanning techniques',
					'2h',
					'https://ieltsliz.com/ielts-reading-lessons-information-and-tips/',
				)}
				${renderTask(
					'd2-3',
					'11:00–1:00',
					'🟦 Listening: Learn note-taking, keywords, anticipation skills',
					'2h',
					'https://ieltsliz.com/ielts-listening/',
				)}
				${renderTask(
					'd2-4',
					'2:00–4:00',
					'🟩 Reading: Practice T/F/NG, Matching Headings question types',
					'2h',
					'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests',
				)}
				${renderTask(
					'd2-5',
					'4:00–6:00',
					'🟦 Listening: Practice Sections 1&2 (form filling, MCQ, maps)',
					'2h',
					'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/listening-practice-test-1',
				)}
				${renderTask(
					'd2-6',
					'7:00–9:00',
					'🟪 Speaking Part 1: Practice 15 common topics (work, study, hometown)',
					'2h',
					'https://ieltsliz.com/ielts-speaking-part-1-topics/',
				)}
				${renderTask(
					'd2-7',
					'9:00–10:00',
					'🟧 Vocab: 30 topic-specific words + collocations',
					'1h',
					'',
				)}
			`,
			)}

			<!-- Days 3-5: Listening & Reading Intensive -->
			${renderDaySection(
				'DAYS 3–5: Listening & Reading Mastery',
				'🎧',
				`
				${renderTask('d3-1', 'DAY 3', '', '')}
				${renderTask(
					'd3-2',
					'9:00–11:00',
					'🟦 Listening: Cambridge 15 Test 1 - All 4 sections (40 min) + review',
					'2h',
					'',
				)}
				${renderTask(
					'd3-3',
					'11:00–1:00',
					'🟦 Analyze errors: transcripts, spelling, plurals, keywords missed',
					'2h',
					'',
				)}
				${renderTask(
					'd3-4',
					'2:00–4:00',
					'🟩 Reading: Cambridge 15 Test 1 Passage 1&2 (timed 40 min)',
					'2h',
					'',
				)}
				${renderTask(
					'd3-5',
					'4:00–6:00',
					'🟩 Analyze: why wrong answers were tempting, find evidence in text',
					'2h',
					'',
				)}
				${renderTask(
					'd3-6',
					'7:00–9:00',
					'🟦 Listen to BBC 6 Minute English + TED Talk, take notes',
					'2h',
					'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
				)}
				${renderTask(
					'd3-7',
					'9:00–10:00',
					'🟧 Vocab: 25 academic + 10 topic words from practice',
					'1h',
					'',
				)}
				${renderTask('d4-1', 'DAY 4', '', '')}
				${renderTask(
					'd4-2',
					'9:00–11:00',
					'🟩 Reading: Cambridge 15 Test 1 Passage 3 + Full review',
					'2h',
					'',
				)}
				${renderTask(
					'd4-3',
					'11:00–1:00',
					'🟩 Practice weak question types (Matching Features, Sentence Completion)',
					'2h',
					'',
				)}
				${renderTask(
					'd4-4',
					'2:00–4:00',
					'🟦 Listening: Cambridge 14 Test 1 Sections 3&4 (academic context)',
					'2h',
					'',
				)}
				${renderTask(
					'd4-5',
					'4:00–6:00',
					'🟦 Focus: signpost words, speaker attitude, main ideas',
					'2h',
					'',
				)}
				${renderTask(
					'd4-6',
					'7:00–9:00',
					'🟨 Writing: Draft Task 1 (graph) in 20 min, self-assess',
					'2h',
					'',
				)}
				${renderTask(
					'd4-7',
					'9:00–10:00',
					'🟧 Vocab: Data description phrases (increase, surge, plummet)',
					'1h',
					'',
				)}
				${renderTask('d5-1', 'DAY 5', '', '')}
				${renderTask(
					'd5-2',
					'9:00–12:00',
					'🟥 MINI MOCK: Listening + Reading (Cambridge 14 Test 2)',
					'3h',
					'',
				)}
				${renderTask(
					'd5-3',
					'1:00–3:00',
					'🟥 Full error analysis: categorize mistakes, create error log',
					'2h',
					'',
				)}
				${renderTask(
					'd5-4',
					'3:00–5:00',
					'🟪 Speaking Part 2: Practice 5 cue cards (2 min each), record',
					'2h',
					'https://ieltsliz.com/ielts-speaking-part-2-topics/',
				)}
				${renderTask(
					'd5-5',
					'5:00–7:00',
					'🟪 Speaking Part 3: Practice follow-up questions, develop ideas',
					'2h',
					'https://ieltsliz.com/ielts-speaking-part-3-topics-2/',
				)}
				${renderTask(
					'd5-6',
					'8:00–10:00',
					'🟧 Review all vocab learned + create flashcards',
					'2h',
					'',
				)}
			`,
			)}

			<!-- Days 6-8: Writing & Speaking -->
			${renderDaySection(
				'DAYS 6–8: Writing & Speaking Focus',
				'✍️',
				`
				${renderTask('d6-1', 'DAY 6', '', '')}
				${renderTask(
					'd6-2',
					'9:00–11:00',
					'🟨 Task 1: Study high-band samples, learn key structures',
					'2h',
					'https://ieltsliz.com/ielts-writing-task-1-lessons-and-tips/',
				)}
				${renderTask(
					'd6-3',
					'11:00–1:00',
					'🟨 Task 1: Write 3 different chart types (20 min each)',
					'2h',
					'',
				)}
				${renderTask(
					'd6-4',
					'2:00–4:00',
					'🟨 Compare with model answers, note vocabulary gaps',
					'2h',
					'',
				)}
				${renderTask(
					'd6-5',
					'4:00–6:00',
					'🟦 Listening: Cambridge 13 Test 1 full practice',
					'2h',
					'',
				)}
				${renderTask(
					'd6-6',
					'7:00–9:00',
					'🟪 Speaking: Record Part 2, listen back, improve fluency',
					'2h',
					'',
				)}
				${renderTask(
					'd6-7',
					'9:00–10:00',
					'🟧 Vocab: Trend vocabulary (fluctuate, peak, remain stable)',
					'1h',
					'',
				)}
				${renderTask('d7-1', 'DAY 7', '', '')}
				${renderTask(
					'd7-2',
					'9:00–11:00',
					'🟨 Task 2: Master essay structure (intro, 2 body, conclusion)',
					'2h',
					'https://ieltsliz.com/ielts-writing-task-2/',
				)}
				${renderTask(
					'd7-3',
					'11:00–1:00',
					'🟨 Write Essay 1: Opinion essay (40 min timed)',
					'2h',
					'',
				)}
				${renderTask(
					'd7-4',
					'2:00–4:00',
					'🟨 Write Essay 2: Discussion essay (40 min timed)',
					'2h',
					'',
				)}
				${renderTask(
					'd7-5',
					'4:00–6:00',
					'🟨 Self-assess: Task Response, Coherence, Lexical, Grammar',
					'2h',
					'',
				)}
				${renderTask(
					'd7-6',
					'7:00–9:00',
					'🟩 Reading: Practice summary completion, table completion',
					'2h',
					'',
				)}
				${renderTask(
					'd7-7',
					'9:00–10:00',
					'🟧 Vocab: Essay linking words (moreover, nevertheless, consequently)',
					'1h',
					'',
				)}
				${renderTask('d8-1', 'DAY 8', '', '')}
				${renderTask(
					'd8-2',
					'9:00–11:00',
					'🟪 Speaking Part 1: Practice all common topics fluently',
					'2h',
					'',
				)}
				${renderTask(
					'd8-3',
					'11:00–1:00',
					'🟪 Speaking Part 2: 5 new cue cards, focus on extending ideas',
					'2h',
					'',
				)}
				${renderTask(
					'd8-4',
					'2:00–4:00',
					'🟪 Speaking Part 3: Complex questions, abstract ideas',
					'2h',
					'',
				)}
				${renderTask(
					'd8-5',
					'4:00–6:00',
					'🟪 Record full mock speaking test, self-evaluate',
					'2h',
					'',
				)}
				${renderTask(
					'd8-6',
					'7:00–9:00',
					'🟨 Writing: Practice timed Task 1 + Task 2 (1 hour total)',
					'2h',
					'',
				)}
				${renderTask(
					'd8-7',
					'9:00–10:00',
					'🟧 Vocab: Idioms & advanced phrases for speaking',
					'1h',
					'',
				)}
			`,
			)}

			<!-- Days 9-10: Integration -->
			${renderDaySection(
				'DAYS 9–10: Integration & Weak Areas',
				'🔄',
				`
				${renderTask('d9-1', 'DAY 9', '', '')}
				${renderTask(
					'd9-2',
					'9:00–12:00',
					'🟥 FULL MOCK TEST: Cambridge 13 Test 2 (L+R)',
					'3h',
					'',
				)}
				${renderTask(
					'd9-3',
					'1:00–3:00',
					'🟥 Writing: Task 1 + Task 2 under exam conditions',
					'2h',
					'',
				)}
				${renderTask(
					'd9-4',
					'3:00–4:00',
					'🟪 Speaking: Full mock test (Part 1, 2, 3)',
					'1h',
					'',
				)}
				${renderTask(
					'd9-5',
					'4:00–6:00',
					'📊 Score all sections, identify top 3 weak areas',
					'2h',
					'',
				)}
				${renderTask(
					'd9-6',
					'7:00–10:00',
					'⚠️ Intensive practice on weakest skill',
					'3h',
					'',
				)}
				${renderTask('d10-1', 'DAY 10', '', '')}
				${renderTask(
					'd10-2',
					'9:00–12:00',
					'⚠️ Weakest skill: Targeted practice with resources',
					'3h',
					'',
				)}
				${renderTask(
					'd10-3',
					'1:00–3:00',
					'⚠️ 2nd weakest skill: Problem question types',
					'2h',
					'',
				)}
				${renderTask(
					'd10-4',
					'3:00–5:00',
					'🟨 Writing: Review & rewrite previous essays with improvements',
					'2h',
					'',
				)}
				${renderTask(
					'd10-5',
					'5:00–7:00',
					'🟪 Speaking: Focus on fluency, reduce hesitation',
					'2h',
					'',
				)}
				${renderTask(
					'd10-6',
					'8:00–10:00',
					'🟧 Vocab: Review all words learned, test yourself',
					'2h',
					'',
				)}
			`,
			)}

			<!-- Days 11-13: Mock Tests & Review -->
			${renderDaySection(
				'DAYS 11–13: Full Mock Tests',
				'📝',
				`
				${renderTask('d11-1', 'DAY 11', '', '')}
				${renderTask(
					'd11-2',
					'9:00–12:30',
					'🟥 FULL MOCK #1: Cambridge 14 Test 3 (Listening + Reading)',
					'3.5h',
					'',
				)}
				${renderTask(
					'd11-3',
					'1:30–3:30',
					'🟥 FULL MOCK #1: Writing Task 1 + Task 2',
					'2h',
					'',
				)}
				${renderTask(
					'd11-4',
					'3:30–4:15',
					'🟥 FULL MOCK #1: Speaking (record)',
					'45m',
					'',
				)}
				${renderTask(
					'd11-5',
					'5:00–7:00',
					'📊 Score all sections, detailed error analysis',
					'2h',
					'',
				)}
				${renderTask(
					'd11-6',
					'8:00–10:00',
					'🔍 Review mistakes, understand correct answers',
					'2h',
					'',
				)}
				${renderTask('d12-1', 'DAY 12', '', '')}
				${renderTask(
					'd12-2',
					'9:00–11:00',
					'⚠️ Re-do incorrect questions from Mock #1',
					'2h',
					'',
				)}
				${renderTask(
					'd12-3',
					'11:00–1:00',
					'🟨 Writing: Improve essays based on feedback',
					'2h',
					'',
				)}
				${renderTask(
					'd12-4',
					'2:00–4:00',
					'🟪 Speaking: Work on pronunciation & intonation',
					'2h',
					'',
				)}
				${renderTask(
					'd12-5',
					'4:00–6:00',
					'🟩 Reading: Speed drills - 15 min per passage',
					'2h',
					'',
				)}
				${renderTask(
					'd12-6',
					'7:00–9:00',
					'🟦 Listening: Focus on Sections 3&4 (hardest)',
					'2h',
					'',
				)}
				${renderTask(
					'd12-7',
					'9:00–10:00',
					'🟧 Final vocab review + weak words',
					'1h',
					'',
				)}
				${renderTask('d13-1', 'DAY 13', '', '')}
				${renderTask(
					'd13-2',
					'9:00–12:30',
					'🟥 FULL MOCK #2: Cambridge 14 Test 4 (L+R)',
					'3.5h',
					'',
				)}
				${renderTask(
					'd13-3',
					'1:30–3:30',
					'🟥 FULL MOCK #2: Writing under exam conditions',
					'2h',
					'',
				)}
				${renderTask(
					'd13-4',
					'3:30–4:15',
					'🟥 FULL MOCK #2: Speaking (record & assess)',
					'45m',
					'',
				)}
				${renderTask(
					'd13-5',
					'5:00–7:00',
					'📊 Compare scores with Mock #1, track improvement',
					'2h',
					'',
				)}
				${renderTask(
					'd13-6',
					'8:00–10:00',
					'🔍 Final weak area identification',
					'2h',
					'',
				)}
			`,
			)}

			<!-- Days 14-15: Final Prep -->
			${renderDaySection(
				'DAYS 14–15: Final Preparation',
				'🏁',
				`
				${renderTask('d14-1', 'DAY 14', '', '')}
				${renderTask(
					'd14-2',
					'9:00–11:00',
					'⚠️ Final intensive on remaining weak areas',
					'2h',
					'',
				)}
				${renderTask(
					'd14-3',
					'11:00–1:00',
					'🟨 Writing: Perfect your Task 2 template/structure',
					'2h',
					'',
				)}
				${renderTask(
					'd14-4',
					'2:00–4:00',
					'🟪 Speaking: Confidence building, natural responses',
					'2h',
					'',
				)}
				${renderTask(
					'd14-5',
					'4:00–5:00',
					'📋 Review test day procedures & timing strategy',
					'1h',
					'https://ieltsliz.com/ielts-exam-tips-on-the-day/',
				)}
				${renderTask(
					'd14-6',
					'5:00–6:00',
					'🟧 Quick vocab review of high-frequency words',
					'1h',
					'',
				)}
				${renderTask(
					'd14-7',
					'7:00–8:00',
					'🧘 Light review, relaxation, early sleep',
					'1h',
					'',
				)}
				${renderTask('d15-1', 'DAY 15 - TEST DAY', '', '')}
				${renderTask(
					'd15-2',
					'Morning',
					'☀️ Light breakfast, arrive 30 min early',
					'—',
					'',
				)}
				${renderTask(
					'd15-3',
					'Before',
					'📋 Review timing: L(30+10), R(60), W(60), S(11-14)',
					'—',
					'',
				)}
				${renderTask(
					'd15-4',
					'During',
					'💪 Stay calm, manage time, check answers',
					'—',
					'',
				)}
				${renderTask(
					'd15-5',
					'Strategy',
					'✅ No blanks! Guess if unsure, check spelling',
					'—',
					'',
				)}
			`,
			)}

			<!-- Recommended Books -->
			<div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-none sm:rounded-xl p-3 sm:p-4 border-y sm:border border-amber-200 dark:border-amber-800">
				<h4 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-2">📖 Must-Have Books (Cambridge Official)</h4>
				<ul class="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 space-y-1">
					<li>• <strong>Cambridge IELTS 14-18</strong> - Real past papers (essential!)</li>
					<li>• <strong>Official Cambridge Guide to IELTS</strong> - Strategies & practice</li>
					<li>• <strong>Collins Vocabulary for IELTS</strong> - Band 7.5+ vocabulary</li>
					<li>• <strong>IELTS Trainer</strong> - 6 practice tests + tips</li>
				</ul>
			</div>

			<!-- Band 8 Tracker Link -->
			<div class="p-3 sm:p-4 bg-teal-50 dark:bg-teal-900/20 rounded-none sm:rounded-xl border-y sm:border border-teal-200 dark:border-teal-800 text-center">
				<p class="text-teal-700 dark:text-teal-300 text-xs sm:text-sm mb-2">
					📱 For detailed daily materials & practice files, visit the IELTS Practice section
				</p>
				<div class="flex justify-center gap-2">
					<a href="#ielts-practice" onclick="showPage('ielts-practice')" class="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-medium hover:bg-teal-700 transition-colors">
						📂 IELTS Practice
					</a>
					<a href="#band8-tracker" onclick="showPage('band8-tracker')" class="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 rounded-lg text-xs font-medium border border-teal-300 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors">
						🎯 Band 8 Tracker
					</a>
				</div>
			</div>
		</div>
	`;
}

function toggleIELTSTask(id, checkbox) {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	const isChecked = checkbox ? checkbox.checked : !tasks[id];
	tasks[id] = isChecked;
	localStorage.setItem('ielts-tasks', JSON.stringify(tasks));

	if (checkbox) {
		const row = checkbox.closest('tr');
		if (row) {
			if (isChecked) {
				row.classList.add('bg-teal-50', 'dark:bg-teal-900/20');
			} else {
				row.classList.remove('bg-teal-50', 'dark:bg-teal-900/20');
			}
			const taskText = row.querySelector('td:nth-child(3)');
			if (taskText) {
				if (isChecked) {
					taskText.classList.add(
						'line-through',
						'text-gray-400',
						'dark:text-gray-500',
					);
					taskText.classList.remove(
						'text-gray-700',
						'dark:text-gray-300',
					);
				} else {
					taskText.classList.remove(
						'line-through',
						'text-gray-400',
						'dark:text-gray-500',
					);
					taskText.classList.add(
						'text-gray-700',
						'dark:text-gray-300',
					);
				}
			}
		}
	}

	updateDashboardStats();

	if (typeof cloudSync !== 'undefined' && cloudSync.syncEnabled) {
		cloudSync.syncToCloud();
	}
}

function getIELTSCompletedCount() {
	const tasks = JSON.parse(localStorage.getItem('ielts-tasks')) || {};
	const vocabLearned = JSON.parse(
		localStorage.getItem('ielts-vocab-learned') || '[]',
	);
	// Count tasks + bonus for vocab (1 point per 5 words learned, max 10 points)
	const vocabBonus = Math.min(Math.floor(vocabLearned.length / 5), 10);
	return Object.values(tasks).filter(Boolean).length + vocabBonus;
}

// DASHBOARD STATS
function updateDashboardStats() {
	// IELTS
	const ieltsCompleted = getIELTSCompletedCount();
	const ieltsTotal = 70;
	const ieltsProgress = Math.round((ieltsCompleted / ieltsTotal) * 100);

	const ieltsProgressEl = document.getElementById('ielts-progress');
	const ieltsTasksEl = document.getElementById('ielts-tasks');
	if (ieltsProgressEl) ieltsProgressEl.textContent = `${ieltsProgress}%`;
	if (ieltsTasksEl)
		ieltsTasksEl.textContent = `${ieltsCompleted}/${ieltsTotal} tasks`;

	// Germany
	const germanySubmitted = germanyUniversities.filter(
		(u) => u.status === 'submitted' || u.status === 'admitted',
	).length;
	const germanyTotal = germanyUniversities.length;
	const germanyProgress =
		germanyTotal > 0
			? Math.round((germanySubmitted / germanyTotal) * 100)
			: 0;

	const germanyProgressEl = document.getElementById('germany-progress-stat');
	const germanyUnisEl = document.getElementById('germany-unis');
	if (germanyProgressEl)
		germanyProgressEl.textContent = `${germanyProgress}%`;
	if (germanyUnisEl)
		germanyUnisEl.textContent = `${germanySubmitted}/${germanyTotal} universities`;

	// Schengen
	const schengenSubmitted = schengenUniversities.filter(
		(u) => u.status === 'submitted' || u.status === 'admitted',
	).length;
	const schengenTotal = schengenUniversities.length;
	const schengenProgress =
		schengenTotal > 0
			? Math.round((schengenSubmitted / schengenTotal) * 100)
			: 0;

	const schengenProgressEl = document.getElementById(
		'schengen-progress-stat',
	);
	const schengenUnisEl = document.getElementById('schengen-unis');
	if (schengenProgressEl)
		schengenProgressEl.textContent = `${schengenProgress}%`;
	if (schengenUnisEl)
		schengenUnisEl.textContent = `${schengenSubmitted}/${schengenTotal} universities`;

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

	const nextDeadlineEl = document.getElementById('next-deadline');
	const deadlineUniEl = document.getElementById('deadline-uni');
	if (upcomingDeadlines.length > 0 && nextDeadlineEl && deadlineUniEl) {
		const next = upcomingDeadlines[0];
		nextDeadlineEl.textContent = next.application_deadline;
		deadlineUniEl.textContent = next.university.split(' ')[0];
	}

	// Update urgent deadlines widget
	updateUrgentDeadlinesWidget();

	// Update study streak
	updateStudyStreak();
}

// ==================== URGENT DEADLINES WIDGET ====================
function updateUrgentDeadlinesWidget() {
	const widget = document.getElementById('urgent-deadlines-widget');
	const list = document.getElementById('urgent-deadlines-list');
	if (!widget || !list) return;

	const today = new Date();
	const allUniversities = [...germanyUniversities, ...schengenUniversities];
	const urgentDeadlines = allUniversities
		.filter((uni) => {
			const deadline = new Date(uni.application_deadline);
			const daysRemaining = Math.ceil(
				(deadline - today) / (1000 * 60 * 60 * 24),
			);
			return (
				daysRemaining <= 30 &&
				daysRemaining >= 0 &&
				uni.status !== 'submitted' &&
				uni.status !== 'admitted'
			);
		})
		.map((uni) => {
			const deadline = new Date(uni.application_deadline);
			const daysRemaining = Math.ceil(
				(deadline - today) / (1000 * 60 * 60 * 24),
			);
			return { ...uni, daysRemaining };
		})
		.sort((a, b) => a.daysRemaining - b.daysRemaining)
		.slice(0, 5); // Show top 5

	if (urgentDeadlines.length === 0) {
		widget.classList.add('hidden');
		return;
	}

	widget.classList.remove('hidden');
	list.innerHTML = urgentDeadlines
		.map((uni) => {
			const urgencyClass =
				uni.daysRemaining <= 7
					? 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
					: uni.daysRemaining <= 14
					? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700'
					: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
			const textClass =
				uni.daysRemaining <= 7
					? 'text-red-700 dark:text-red-300'
					: uni.daysRemaining <= 14
					? 'text-amber-700 dark:text-amber-300'
					: 'text-blue-700 dark:text-blue-300';
			const icon =
				uni.daysRemaining <= 7
					? '🚨'
					: uni.daysRemaining <= 14
					? '⚠️'
					: '📅';

			return `
			<div class="flex items-center justify-between p-2 sm:p-3 ${urgencyClass} rounded-lg border">
				<div class="flex-1 min-w-0">
					<p class="font-medium text-gray-900 dark:text-white text-xs sm:text-sm truncate">${uni.university}</p>
					<p class="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 truncate">${uni.program}</p>
				</div>
				<div class="text-right flex-shrink-0 ml-2">
					<p class="font-bold ${textClass} text-sm sm:text-base">${icon} ${uni.daysRemaining}d</p>
					<p class="text-[10px] sm:text-xs text-gray-500">${uni.application_deadline}</p>
				</div>
			</div>
		`;
		})
		.join('');
}

// ==================== STUDY STREAK SYSTEM ====================
function updateStudyStreak() {
	const streakEl = document.getElementById('study-streak-days');
	const todayTimeEl = document.getElementById('today-study-time');
	if (!streakEl) return;

	const streakData = JSON.parse(
		localStorage.getItem('study-streak') ||
			'{"streak": 0, "lastDate": null, "todayMinutes": 0}',
	);
	const today = new Date().toDateString();

	// Check if streak is broken
	if (streakData.lastDate) {
		const lastDate = new Date(streakData.lastDate);
		const diffDays = Math.floor(
			(new Date() - lastDate) / (1000 * 60 * 60 * 24),
		);
		if (diffDays > 1) {
			streakData.streak = 0;
		}
	}

	// Reset today's minutes if it's a new day
	if (streakData.lastDate !== today) {
		streakData.todayMinutes = 0;
	}

	streakEl.textContent = streakData.streak;
	if (todayTimeEl) {
		todayTimeEl.textContent =
			streakData.todayMinutes >= 60
				? `${Math.floor(streakData.todayMinutes / 60)}h ${
						streakData.todayMinutes % 60
				  }m`
				: `${streakData.todayMinutes} min`;
	}
}

function logStudyTime() {
	const minutes = prompt('How many minutes did you study?', '30');
	if (!minutes || isNaN(parseInt(minutes))) return;

	const streakData = JSON.parse(
		localStorage.getItem('study-streak') ||
			'{"streak": 0, "lastDate": null, "todayMinutes": 0}',
	);
	const today = new Date().toDateString();

	// Check if this is a new day
	if (streakData.lastDate !== today) {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		if (streakData.lastDate === yesterday.toDateString()) {
			streakData.streak++;
		} else if (streakData.lastDate !== today) {
			streakData.streak = 1;
		}
		streakData.todayMinutes = 0;
	}

	streakData.todayMinutes += parseInt(minutes);
	streakData.lastDate = today;
	localStorage.setItem('study-streak', JSON.stringify(streakData));

	// Mark IELTS study if notification manager exists
	if (typeof notificationManager !== 'undefined') {
		notificationManager.markIELTSStudy();
	}

	updateStudyStreak();

	// Show confirmation
	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			`✅ Logged ${minutes} minutes of study! Keep it up! 🔥`,
			'success',
			3000,
		);
	}
}

function toggleDeadlineReminders() {
	// Show reminder settings modal
	const currentSettings = JSON.parse(
		localStorage.getItem('study-reminders') || '{}',
	);
	const enabled = !currentSettings.deadlineReminder;
	currentSettings.deadlineReminder = enabled;
	localStorage.setItem('study-reminders', JSON.stringify(currentSettings));

	if (typeof notificationManager !== 'undefined') {
		notificationManager.showInAppNotification(
			enabled
				? '🔔 Deadline reminders enabled!'
				: '🔕 Deadline reminders disabled',
			'info',
			3000,
		);
	}
}

// ==========================================
// SEARCH & FILTER FUNCTIONS
// ==========================================

function renderUniversityCard(uni, type) {
	const statusChangeFunc = type === 'germany' ? 'changeGermanyStatus' : 'changeSchengenStatus';
	const countryDisplay = type === 'schengen' && uni.country ? `<span class="text-gray-500 dark:text-gray-400">🌍</span> ${uni.country}` : '';
	
	return `
		<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
			<div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" onclick="toggleExpand(this)">
				<div class="flex items-start justify-between gap-4">
					<div class="flex-1">
						<h3 class="font-semibold text-gray-900 dark:text-white">${uni.university} ${uni.ranking || ''}</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${uni.program}</p>
					</div>
					<span class="expand-toggle text-gray-400 text-sm">▶</span>
				</div>
				<div class="flex items-center gap-3 mt-3 flex-wrap">
					<span class="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium">⏰ ${uni.application_deadline}</span>
					<span class="px-3 py-1 ${getStatusBadgeClass(uni.status)} rounded-full text-xs font-medium">${getStatusLabel(uni.status)}</span>
				</div>
			</div>
			<div class="hidden border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
				${uni.highlights ? `<p class="text-sm text-amber-600 dark:text-amber-400 mb-4 font-medium">💡 ${uni.highlights}</p>` : ''}
				<div class="grid grid-cols-2 gap-3 text-sm mb-4">
					<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"><span class="text-gray-500 dark:text-gray-400">📍</span> ${uni.location}</div>
					<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"><span class="text-gray-500 dark:text-gray-400">⏱️</span> ${uni.duration}</div>
					<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"><span class="text-gray-500 dark:text-gray-400">💰</span> ${uni.tuition}</div>
					<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200"><span class="text-gray-500 dark:text-gray-400">🌐</span> ${uni.language}</div>
					${countryDisplay ? `<div class="p-2 bg-white dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200">${countryDisplay}</div>` : ''}
				</div>
				${uni.requirements ? `<p class="text-sm text-gray-700 dark:text-gray-300 mb-4">📝 ${uni.requirements}</p>` : ''}
				<div class="flex gap-3 items-center flex-wrap">
					<a href="${uni.website}" target="_blank" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors">Visit Website</a>
					<select onchange="${statusChangeFunc}('${uni.university}', this.value)"
						class="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 cursor-pointer">
						<option value="not_started" ${uni.status === 'not_started' ? 'selected' : ''}>📋 Not Started</option>
						<option value="researching" ${uni.status === 'researching' ? 'selected' : ''}>🔍 Researching</option>
						<option value="preparing" ${uni.status === 'preparing' ? 'selected' : ''}>📝 Preparing</option>
						<option value="submitted" ${uni.status === 'submitted' ? 'selected' : ''}>✅ Submitted</option>
						<option value="admitted" ${uni.status === 'admitted' ? 'selected' : ''}>🎉 Admitted</option>
						<option value="rejected" ${uni.status === 'rejected' ? 'selected' : ''}>❌ Rejected</option>
					</select>
				</div>
			</div>
		</div>
	`;
}

function filterGermanyUniversities() {
	const searchTerm = document.getElementById('germany-search')?.value.toLowerCase() || '';
	const statusFilter = document.getElementById('germany-filter-status')?.value || 'all';
	
	const container = document.getElementById('germany-list');
	if (!container) return;

	const filtered = germanyUniversities.filter(uni => {
		const matchesSearch = uni.university.toLowerCase().includes(searchTerm) ||
			(uni.program && uni.program.toLowerCase().includes(searchTerm)) ||
			(uni.location && uni.location.toLowerCase().includes(searchTerm));
		const matchesStatus = statusFilter === 'all' || (uni.status || 'not_started') === statusFilter;
		return matchesSearch && matchesStatus;
	});

	if (filtered.length === 0) {
		container.innerHTML = `
			<div class="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
				<p class="text-4xl mb-2">🔍</p>
				<p>No universities found matching your criteria</p>
			</div>
		`;
		return;
	}

	container.innerHTML = filtered.map(uni => renderUniversityCard(uni, 'germany')).join('');
}

function filterSchengenUniversities() {
	const searchTerm = document.getElementById('schengen-search')?.value.toLowerCase() || '';
	const statusFilter = document.getElementById('schengen-filter-status')?.value || 'all';
	
	const container = document.getElementById('schengen-list');
	if (!container) return;

	const filtered = schengenUniversities.filter(uni => {
		const matchesSearch = uni.university.toLowerCase().includes(searchTerm) ||
			(uni.program && uni.program.toLowerCase().includes(searchTerm)) ||
			(uni.location && uni.location.toLowerCase().includes(searchTerm)) ||
			(uni.country && uni.country.toLowerCase().includes(searchTerm));
		const matchesStatus = statusFilter === 'all' || (uni.status || 'not_started') === statusFilter;
		return matchesSearch && matchesStatus;
	});

	if (filtered.length === 0) {
		container.innerHTML = `
			<div class="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
				<p class="text-4xl mb-2">🔍</p>
				<p>No universities found matching your criteria</p>
			</div>
		`;
		return;
	}

	container.innerHTML = filtered.map(uni => renderUniversityCard(uni, 'schengen')).join('');
}

// ==========================================
// DOCUMENT CHECKLIST FUNCTIONS
// ==========================================

const DEFAULT_DOCUMENTS = [
	{ id: 'passport', name: 'Valid Passport', required: true },
	{ id: 'transcripts', name: 'Academic Transcripts', required: true },
	{ id: 'degree', name: 'Degree Certificate', required: true },
	{ id: 'ielts', name: 'IELTS Score Report', required: true },
	{ id: 'motivation', name: 'Motivation Letter', required: true },
	{ id: 'cv', name: 'CV / Resume', required: true },
	{ id: 'recommendations', name: 'Recommendation Letters (2)', required: true },
	{ id: 'photo', name: 'Passport Photos', required: true },
	{ id: 'bank', name: 'Bank Statement / Financial Proof', required: true },
	{ id: 'insurance', name: 'Health Insurance', required: false },
	{ id: 'portfolio', name: 'Portfolio (if applicable)', required: false },
	{ id: 'work_exp', name: 'Work Experience Certificate', required: false },
];

function displayDocumentChecklist() {
	const container = document.getElementById('document-checklist');
	const progressEl = document.getElementById('doc-checklist-progress');
	if (!container) return;

	const saved = localStorage.getItem('document-checklist');
	const checkedDocs = saved ? JSON.parse(saved) : [];

	const completed = checkedDocs.length;
	const total = DEFAULT_DOCUMENTS.filter(d => d.required).length;
	
	if (progressEl) {
		progressEl.textContent = `${completed}/${total} required`;
	}

	container.innerHTML = DEFAULT_DOCUMENTS.map(doc => {
		const isChecked = checkedDocs.includes(doc.id);
		return `
			<label class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${isChecked ? 'bg-green-50 dark:bg-green-900/20' : ''}">
				<input type="checkbox" ${isChecked ? 'checked' : ''} 
					onchange="toggleDocument('${doc.id}')"
					class="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500">
				<span class="${isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'} text-sm flex-1">${doc.name}</span>
				${doc.required ? '<span class="text-xs text-red-500">Required</span>' : '<span class="text-xs text-gray-400">Optional</span>'}
			</label>
		`;
	}).join('');
}

function toggleDocument(docId) {
	const saved = localStorage.getItem('document-checklist');
	let checkedDocs = saved ? JSON.parse(saved) : [];

	if (checkedDocs.includes(docId)) {
		checkedDocs = checkedDocs.filter(id => id !== docId);
	} else {
		checkedDocs.push(docId);
	}

	localStorage.setItem('document-checklist', JSON.stringify(checkedDocs));
	displayDocumentChecklist();
}

// ==========================================
// CONFIRMATION DIALOG FUNCTIONS
// ==========================================

function showConfirmDialog(message, onConfirm, onCancel) {
	// Remove any existing dialog
	const existing = document.getElementById('confirm-dialog');
	if (existing) existing.remove();

	const dialog = document.createElement('div');
	dialog.id = 'confirm-dialog';
	dialog.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
	dialog.innerHTML = `
		<div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl">
			<p class="text-gray-900 dark:text-white font-medium mb-4">${message}</p>
			<div class="flex gap-3">
				<button onclick="handleConfirmDialog(false)" class="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
					Cancel
				</button>
				<button onclick="handleConfirmDialog(true)" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
					Confirm
				</button>
			</div>
		</div>
	`;

	// Store callbacks
	dialog._onConfirm = onConfirm;
	dialog._onCancel = onCancel;

	document.body.appendChild(dialog);

	// Close on backdrop click
	dialog.addEventListener('click', (e) => {
		if (e.target === dialog) {
			handleConfirmDialog(false);
		}
	});
}

function handleConfirmDialog(confirmed) {
	const dialog = document.getElementById('confirm-dialog');
	if (!dialog) return;

	if (confirmed && dialog._onConfirm) {
		dialog._onConfirm();
	} else if (!confirmed && dialog._onCancel) {
		dialog._onCancel();
	}

	dialog.remove();
}

// Wrap untrack functions with confirmation
const originalUntrackGermany = untrackGermanyUniversity;
untrackGermanyUniversity = function(universityName) {
	showConfirmDialog(
		`Remove "${universityName}" from your tracker? Your progress will be lost.`,
		() => originalUntrackGermany(universityName)
	);
};

const originalUntrackSchengen = untrackSchengenUniversity;
untrackSchengenUniversity = function(universityName) {
	showConfirmDialog(
		`Remove "${universityName}" from your tracker? Your progress will be lost.`,
		() => originalUntrackSchengen(universityName)
	);
};

const originalUntrackScholarship = untrackScholarship;
untrackScholarship = function(scholarshipName) {
	showConfirmDialog(
		`Remove "${scholarshipName}" from your tracker? Your progress will be lost.`,
		() => originalUntrackScholarship(scholarshipName)
	);
};

// ==========================================
// NOTES FUNCTIONS
// ==========================================

function saveUniversityNote(type, universityName, note) {
	const key = `${type}-notes`;
	const saved = localStorage.getItem(key);
	const notes = saved ? JSON.parse(saved) : {};
	notes[universityName] = note;
	localStorage.setItem(key, JSON.stringify(notes));
}

function getUniversityNote(type, universityName) {
	const key = `${type}-notes`;
	const saved = localStorage.getItem(key);
	const notes = saved ? JSON.parse(saved) : {};
	return notes[universityName] || '';
}

// Initialize document checklist on page load
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		displayDocumentChecklist();
	}, 500);
});
