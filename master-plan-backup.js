// Master Action Plan Integration - Band 8.0-8.5 IELTS Strategy
// Links all planning documents with dashboard functionality

const MASTER_PLAN = {
	targetIELTS: 8.5,
	examDate: '2025-12-28', // December 28, 2025
	startDate: '2025-12-13', // Today
	daysRemaining: 15,

	// Critical Milestones
	milestones: {
		ielts: {
			registration: '2025-12-14',
			booksOrder: '2025-12-14',
			diagnosticTest: '2025-12-13',
			mockTest1: '2025-12-20',
			mockTest2: '2025-12-24',
			examDay: '2025-12-28',
			resultsDay: '2026-01-10', // 13 days after exam
		},
		scholarships: {
			daadStart: '2025-12-16',
			daadSubmit: '2025-12-28',
			heinrichBoll: '2026-03-01',
			friedrichEbert: '2026-04-30',
			hannsSeidel: '2026-07-31',
		},
		universities: {
			ouluDeadline: '2026-01-03', // FIRST - Same as IELTS exam!
			luxembourgDeadline: '2026-01-15',
			rwthDeadline: '2026-03-01',
			tuDarmstadtDeadline: '2026-05-31',
			tumDeadline: '2026-05-31',
		},
	},

	// 19-Day IELTS Intensive Schedule
	ieltsSchedule: [
		{
			day: 1,
			date: '2025-12-13',
			phase: 'Diagnosis',
			focus: 'Diagnostic Test + Baseline Assessment',
			hours: 12,
			tasks: [
				'Take Cambridge IELTS 18 Test 1 (full, timed)',
				'Score yourself honestly',
				'Identify weak areas per section',
				'Register for IELTS exam (Jan 1-3)',
				'Order Cambridge IELTS books 13-18',
				'Set up study schedule',
			],
			targetScore: 'Establish baseline',
		},
		{
			day: 2,
			date: '2025-12-14',
			phase: 'Foundation',
			focus: 'Advanced Vocabulary Building - 50 words',
			hours: 12,
			tasks: [
				'Learn 50 Band 8+ academic words',
				'Create Anki flashcards',
				'Practice vocabulary in context',
				'Start DAAD motivation letter draft',
				'Request recommendation letters',
			],
			targetScore: '50+ advanced words learned',
		},
		{
			day: 3,
			date: '2025-12-15',
			phase: 'Foundation',
			focus: 'Grammar Perfection - Complex Structures',
			hours: 12,
			tasks: [
				'Review complex conditionals, passive voice, inversion',
				'Error correction exercises',
				'Write 2 Task 2 essays (grammar focus)',
				'Family financial discussion',
				'Gather academic documents for applications',
			],
			targetScore: 'Zero grammar errors in practice',
		},
		{
			day: 4,
			date: '2025-12-16',
			phase: 'Section Practice',
			focus: 'LISTENING Mastery - Target 37-39/40',
			hours: 12,
			tasks: [
				'Cambridge 17 Listening Tests 1-2',
				'Analyze every mistake',
				'Practice note-taking at native speed',
				'BBC Radio exposure (accent training)',
				'Continue DAAD application',
			],
			targetScore: 'L: 36-38/40',
		},
		{
			day: 5,
			date: '2025-12-17',
			phase: 'Section Practice',
			focus: 'LISTENING Advanced Techniques',
			hours: 12,
			tasks: [
				'Cambridge 16 Listening Tests 1-2',
				'Focus on Sections 3-4 (hardest)',
				'Synonym matching practice',
				'Spelling drills',
				'Finalize DAAD documents',
			],
			targetScore: 'L: 37-39/40 consistent',
		},
		{
			day: 6,
			date: '2025-12-18',
			phase: 'Section Practice',
			focus: 'READING Mastery - Target 37-39/40',
			hours: 12,
			tasks: [
				'Cambridge 17 Reading Tests 1-2 (60 min strict)',
				'True/False/Not Given deep dive',
				'Time management drills',
				'Vocabulary from passages (30-40 words)',
				'Create academic CV',
			],
			targetScore: 'R: 36-38/40',
		},
		{
			day: 7,
			date: '2025-12-19',
			phase: 'Section Practice',
			focus: 'READING Speed & Accuracy',
			hours: 12,
			tasks: [
				'Cambridge 16 Reading Tests 1-2',
				'Skimming and scanning mastery',
				'Matching headings technique',
				'Speed reading drills',
				'Document translation (if needed)',
			],
			targetScore: 'R: 37-39/40 within 60 mins',
		},
		{
			day: 8,
			date: '2025-12-20',
			phase: 'Section Practice',
			focus: 'WRITING Task 1 Perfection',
			hours: 12,
			tasks: [
				'Study Band 8-9 Task 1 models',
				'Write 6 Task 1 essays (all types)',
				'Overview statement mastery',
				'Advanced vocabulary phrases',
				'Follow up with recommendation letter writers',
			],
			targetScore: 'W1: Band 8.0+',
		},
		{
			day: 9,
			date: '2025-12-21',
			phase: 'Section Practice',
			focus: 'WRITING Task 2 Mastery',
			hours: 12,
			tasks: [
				'Study Band 8-9 Task 2 models',
				'Write 3 Task 2 essays (opinion, discussion, problem-solution)',
				'Get professional feedback (Fiverr)',
				'Complex grammar structures practice',
				'Research professors at target universities',
			],
			targetScore: 'W2: Band 8.0+',
		},
		{
			day: 10,
			date: '2025-12-22',
			phase: 'Section Practice',
			focus: 'SPEAKING Parts 1 & 2',
			hours: 12,
			tasks: [
				'Study Band 8-9 speaking videos',
				'Practice 40 Part 1 topics (record)',
				'Prepare 15 cue cards (Part 2)',
				'Record 2-min responses for each',
				'Identify improvement areas',
			],
			targetScore: 'S: Band 8.0+ fluency',
		},
		{
			day: 11,
			date: '2025-12-23',
			phase: 'Section Practice',
			focus: 'SPEAKING Part 3 Advanced Discussion',
			hours: 12,
			tasks: [
				'Practice 50 Part 3 abstract questions',
				'Record detailed answers (1-2 min each)',
				'Advanced vocabulary in context',
				'Critical thinking responses',
				'iTalki practice session (if possible)',
			],
			targetScore: 'S: Band 8.0+ sophistication',
		},
		{
			day: 12,
			date: '2025-12-24',
			phase: 'Assessment',
			focus: 'FULL MOCK TEST #1',
			hours: 12,
			tasks: [
				'Cambridge IELTS 15 (all sections, timed)',
				'Score strictly',
				'Deep analysis of all mistakes',
				'Calculate band scores',
				'Create improvement action plan',
				'Submit DAAD application (if ready)',
			],
			targetScore: 'Overall: 7.5-8.0 minimum',
		},
		{
			day: 13,
			date: '2025-12-25',
			phase: 'Strategic Rest',
			focus: 'Christmas - Light Practice + Mental Prep',
			hours: 4,
			tasks: [
				'Review vocabulary flashcards (500+ words)',
				'Watch Band 8-9 videos',
				'Light reading (1 passage)',
				'Rest and recharge',
				'Mental preparation',
			],
			targetScore: 'Brain consolidation',
		},
		{
			day: 14,
			date: '2025-12-26',
			phase: 'Refinement',
			focus: 'Weakest Section Intensive Practice',
			hours: 12,
			tasks: [
				'Focus 8 hours on weakest section from Mock #1',
				'If Listening: 6-8 tests',
				'If Reading: 6-8 passages',
				'If Writing: 4-6 essays with feedback',
				'If Speaking: 20+ recorded responses',
				'Review all previous mistakes',
			],
			targetScore: 'Weak section → 7.5+',
		},
		{
			day: 15,
			date: '2025-12-27',
			phase: 'Refinement',
			focus: 'Second-Weakest Section + Balance',
			hours: 12,
			tasks: [
				'Focus on second-weakest section (6 hours)',
				'Maintain strong sections (6 hours)',
				'Vocabulary review (1000+ words)',
				'Grammar error pattern elimination',
				'Apply to University of Oulu (deadline Jan 3!)',
			],
			targetScore: 'All sections 7.5+',
		},
		{
			day: 16,
			date: '2025-12-28',
			phase: 'Assessment',
			focus: 'FULL MOCK TEST #2',
			hours: 12,
			tasks: [
				'Cambridge IELTS 14 (all sections, exam conditions)',
				'Score strictly',
				'Compare with Mock #1 (improvement?)',
				'Identify final gaps',
				'Targeted practice on remaining weaknesses',
				'SUBMIT DAAD APPLICATION (FINAL DEADLINE!)',
			],
			targetScore: 'Overall: 8.0+ target',
		},
		{
			day: 17,
			date: '2025-12-29',
			phase: 'Polish',
			focus: 'Final Refinement + Confidence Building',
			hours: 10,
			tasks: [
				'2 listening tests (maintain sharpness)',
				'2 reading passages (speed maintenance)',
				'1 full writing practice (both tasks)',
				'Speaking fluency drills',
				'Review all common mistakes',
				'Mental preparation and visualization',
			],
			targetScore: 'Confidence at 100%',
		},
		{
			day: 18,
			date: '2025-12-30',
			phase: 'Rest',
			focus: 'Light Practice + Rest',
			hours: 5,
			tasks: [
				'1 listening test (ear sharpness)',
				'1 reading passage',
				'Light vocabulary review',
				'Organize exam materials (ID, pencils, confirmation)',
				'Relaxation activities',
			],
			targetScore: 'Fresh mind',
		},
		{
			day: 19,
			date: '2025-12-31',
			phase: 'Rest',
			focus: 'REST DAY - New Years Eve',
			hours: 1,
			tasks: [
				'Light vocabulary review (15 min only)',
				'Pack exam materials',
				'Prepare everything for exam',
				'Early sleep (9-10 PM)',
				'Skip parties - YOUR FUTURE is priority!',
				'Visualization of success',
			],
			targetScore: 'Well-rested, confident',
		},
		{
			day: 20,
			date: '2026-01-01',
			phase: 'EXAM PREP',
			focus: 'Pre-Exam Day OR Exam Day',
			hours: 0,
			tasks: [
				'If exam Jan 1: TAKE EXAM TODAY!',
				'If exam Jan 2-3: Final light review',
				'Stay calm and confident',
				'Remember all techniques',
				'Trust your preparation',
			],
			targetScore: 'Band 8.0-8.5 ACHIEVED!',
		},
		{
			day: 21,
			date: '2026-01-02',
			phase: 'EXAM',
			focus: 'Exam Day (if not Jan 1)',
			hours: 0,
			tasks: [
				'Wake up 3 hours before exam',
				'Healthy breakfast',
				'Arrive 30 minutes early',
				'Stay calm, trust preparation',
				'CRUSH THE EXAM!',
			],
			targetScore: 'Band 8.0-8.5!',
		},
	],

	// University Application Timeline
	universityTimeline: [
		{
			deadline: '2026-01-03',
			university: 'University of Oulu, Finland',
			priority: 'URGENT - First Application!',
			documents: [
				'Transcripts',
				'CV',
				'Motivation Letter',
				'IELTS (can submit later)',
			],
			fee: '€100',
			status: 'not_started',
		},
		{
			deadline: '2026-01-15',
			university: 'University of Luxembourg',
			priority: 'High',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS'],
			fee: '€75',
			status: 'not_started',
		},
		{
			deadline: '2026-02-01',
			university: 'KU Leuven, Belgium',
			priority: 'High',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS'],
			fee: '€50',
			status: 'not_started',
		},
		{
			deadline: '2026-03-01',
			university: 'RWTH Aachen University',
			priority: 'High - Dream School',
			documents: [
				'Transcripts',
				'CV',
				'Motivation Letter',
				'IELTS 8.0+',
				'Recommendation Letters',
			],
			fee: '€100',
			status: 'not_started',
		},
		{
			deadline: '2026-04-01',
			university: 'University of Tartu, Estonia',
			priority: 'Safety School',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS'],
			fee: '€100',
			status: 'not_started',
		},
		{
			deadline: '2026-04-30',
			university: 'Masaryk University, Czech Republic',
			priority: 'Safety School',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS'],
			fee: '€30',
			status: 'not_started',
		},
		{
			deadline: '2026-05-01',
			university: 'TalTech, Estonia',
			priority: 'Safety School',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS'],
			fee: '€100',
			status: 'not_started',
		},
		{
			deadline: '2026-05-31',
			university: 'TU Darmstadt',
			priority: 'DREAM SCHOOL - #1 IT Security Germany!',
			documents: [
				'Transcripts',
				'CV',
				'Motivation Letter',
				'IELTS 8.0+',
				'Recommendation Letters',
			],
			fee: '€75',
			status: 'not_started',
		},
		{
			deadline: '2026-05-31',
			university: 'Technical University Munich (TUM)',
			priority: 'DREAM SCHOOL - #1 Germany!',
			documents: [
				'Transcripts',
				'CV',
				'Motivation Letter',
				'IELTS 8.0+',
				'Recommendation Letters',
			],
			fee: '€100',
			status: 'not_started',
		},
		{
			deadline: '2026-06-01',
			university: 'Karlsruhe Institute of Technology (KIT)',
			priority: 'Target School',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS 8.0+'],
			fee: '€60',
			status: 'not_started',
		},
		{
			deadline: '2026-06-30',
			university: 'Saarland University',
			priority: 'Target School - CISPA Research!',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS 8.0+'],
			fee: '€50',
			status: 'not_started',
		},
		{
			deadline: '2026-06-30',
			university: 'FAU Erlangen-Nürnberg',
			priority: 'Target School',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS 8.0+'],
			fee: '€60',
			status: 'not_started',
		},
		{
			deadline: '2026-07-15',
			university: 'University of Passau',
			priority: 'Target School - Budget Friendly!',
			documents: ['Transcripts', 'CV', 'Motivation Letter', 'IELTS 8.0+'],
			fee: '€30',
			status: 'not_started',
		},
	],

	// Scholarship Application Timeline
	scholarshipTimeline: [
		{
			deadline: '2025-12-28',
			scholarship: 'DAAD Scholarships',
			amount: '€934/month + insurance (€22,000+ total)',
			priority: 'HIGHEST PRIORITY!',
			documents: [
				'Motivation Letter',
				'CV',
				'Transcripts',
				'Recommendation Letters',
				'Research Proposal',
				'IELTS',
			],
			status: 'in_progress',
		},
		{
			deadline: '2026-03-01',
			scholarship: 'Heinrich Böll Foundation',
			amount: '€934/month',
			priority: 'High - Environmental Focus',
			documents: [
				'Motivation Letter',
				'CV',
				'Transcripts',
				'Recommendation Letters',
				'Social Engagement Essay',
			],
			status: 'not_started',
		},
		{
			deadline: '2026-04-30',
			scholarship: 'Friedrich Ebert Foundation',
			amount: '€934/month',
			priority: 'High - Social Justice Focus',
			documents: [
				'Motivation Letter',
				'CV',
				'Transcripts',
				'Recommendation Letters',
			],
			status: 'not_started',
		},
		{
			deadline: '2026-07-31',
			scholarship: 'Hanns Seidel Foundation',
			amount: '€934/month',
			priority: 'Medium - Less Competitive',
			documents: [
				'Motivation Letter',
				'CV',
				'Transcripts',
				'Recommendation Letters',
			],
			status: 'not_started',
		},
		{
			deadline: 'After Admission',
			scholarship: 'Deutschlandstipendium',
			amount: '€300/month',
			priority: 'APPLY AT ALL ADMITTED UNIVERSITIES!',
			documents: ['Short motivation letter', 'CV', 'Transcripts'],
			status: 'not_started',
			note: 'Apply to every university that admits you - 30-40% success rate!',
		},
	],

	// Success Metrics
	successMetrics: {
		ielts: {
			targetOverall: 8.5,
			minimumAcceptable: 7.0,
			sectionTargets: {
				listening: 8.5,
				reading: 8.5,
				writing: 8.0,
				speaking: 8.0,
			},
		},
		applications: {
			totalUniversities: 12,
			dreamSchools: 3,
			targetSchools: 5,
			safetySchools: 4,
			expectedAdmissions: '3-5 admissions (95% probability)',
		},
		scholarships: {
			applied: 6,
			expectedSuccess: '60-80% get at least one',
			totalPotentialFunding: '€22,000-€25,000 over 2 years',
		},
		financial: {
			totalNeed2Years: '€20,000-€25,000',
			scholarshipPotential: '€7,200-€22,000',
			partTimeWork: '€12,000-€17,000',
			familySupport: '€6,000-€12,000',
			conclusion: 'FULLY DOABLE even without full scholarship!',
		},
	},

	// Daily Checklist Generator
	getDailyTasks: function (date) {
		const scheduleDay = this.ieltsSchedule.find((d) => d.date === date);
		if (scheduleDay) {
			return scheduleDay.tasks;
		}
		return [
			'Continue preparation',
			'Review weak areas',
			'Practice all sections',
		];
	},

	// Progress Calculator
	calculateProgress: function () {
		const today = new Date();
		const start = new Date(this.startDate);
		const exam = new Date(this.examDate);
		const daysPassed = Math.floor((today - start) / (1000 * 60 * 60 * 24));
		const totalDays = Math.floor((exam - start) / (1000 * 60 * 60 * 24));
		const progressPercentage = Math.min(
			100,
			(daysPassed / totalDays) * 100,
		);

		return {
			daysPassed,
			daysRemaining: totalDays - daysPassed,
			progressPercentage: Math.round(progressPercentage),
			currentPhase: this.getCurrentPhase(daysPassed),
		};
	},

	getCurrentPhase: function (daysPassed) {
		if (daysPassed <= 3) return 'Diagnosis & Foundation';
		if (daysPassed <= 11) return 'Intensive Section Practice';
		if (daysPassed <= 17) return 'Refinement & Assessment';
		if (daysPassed <= 19) return 'Rest & Final Prep';
		return 'EXAM TIME!';
	},
};

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
	module.exports = MASTER_PLAN;
}
