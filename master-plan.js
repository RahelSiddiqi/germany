// Master Action Plan Integration - Band 8.0-8.5 IELTS Strategy
// Links all planning documents with dashboard functionality

const MASTER_PLAN = {
	targetIELTS: 8.5,
	examDate: '2025-12-29', // December 29, 2025
	startDate: '2025-12-14', // Day 1 starts today
	daysRemaining: 15,

	// Critical Milestones
	milestones: {
		ielts: {
			registration: '2025-12-14',
			booksOrder: '2025-12-14',
			diagnosticTest: '2025-12-14',
			mockTest1: '2025-12-21',
			mockTest2: '2025-12-25',
			examDay: '2025-12-29',
			resultsDay: '2026-01-11', // 13 days after exam
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

	// 15-Day IELTS ULTRA-INTENSIVE Schedule
	ieltsSchedule: [
		{
			day: 1,
			date: '2025-12-14',
			phase: 'Diagnosis',
			focus: 'Diagnostic Test + Baseline Assessment',
			hours: 14,
			tasks: [
				'Take Cambridge IELTS 18 Test 1 (full, timed)',
				'Score yourself honestly',
				'Identify weak areas per section',
				'Register for IELTS exam (Dec 28)',
				'Order Cambridge IELTS books 13-18',
				'Set up ultra-intensive study schedule (13-15 hrs/day)',
			],
			targetScore: 'Establish baseline',
		},
		{
			day: 2,
			date: '2025-12-15',
			phase: 'Foundation',
			focus: 'Vocabulary + Grammar Combined',
			hours: 14,
			tasks: [
				'Learn 70 Band 8+ academic words (accelerated)',
				'Write vocabulary in notebook + create example sentences',
				'Review all complex grammar structures',
				'Write 2 Task 2 essays (grammar + vocab focus)',
				'Start DAAD motivation letter draft',
				'Request recommendation letters',
			],
			targetScore: '70+ advanced words + zero grammar errors',
		},
		{
			day: 3,
			date: '2025-12-16',
			phase: 'Section Practice',
			focus: 'LISTENING Mastery - Target 37-39/40',
			hours: 14,
			tasks: [
				'Cambridge 17 Listening Tests 1-2',
				'Cambridge 16 Listening Tests 1-2',
				'Analyze every mistake deeply',
				'Practice note-taking at native speed',
				'BBC Radio exposure (accent training)',
				'Synonym matching drills',
			],
			targetScore: 'L: 37-39/40',
		},
		{
			day: 4,
			date: '2025-12-17',
			phase: 'Section Practice',
			focus: 'READING Mastery - Target 37-39/40',
			hours: 14,
			tasks: [
				'Cambridge 17 Reading Tests 1-2 (60 min strict)',
				'Cambridge 16 Reading Tests 1-2',
				'True/False/Not Given deep dive',
				'Speed reading drills',
				'Vocabulary from passages (50 words)',
				'Time management optimization',
			],
			targetScore: 'R: 37-39/40 within 60 mins',
		},
		{
			day: 5,
			date: '2025-12-18',
			phase: 'Section Practice',
			focus: 'WRITING Task 1 + Task 2 Combined',
			hours: 14,
			tasks: [
				'Study Band 8-9 Task 1 models',
				'Write 4 Task 1 essays (all types)',
				'Study Band 8-9 Task 2 models',
				'Write 3 Task 2 essays',
				'Get professional feedback (Fiverr)',
				'Complex grammar structures practice',
			],
			targetScore: 'W: Band 8.0+',
		},
		{
			day: 6,
			date: '2025-12-19',
			phase: 'Section Practice',
			focus: 'SPEAKING Parts 1, 2 & 3 Combined',
			hours: 14,
			tasks: [
				'Study Band 8-9 speaking videos',
				'Practice 50 Part 1 topics (record)',
				'Prepare 20 cue cards (Part 2)',
				'Practice 50 Part 3 abstract questions',
				'Record all answers and self-evaluate',
				'iTalki practice session (if possible)',
			],
			targetScore: 'S: Band 8.0+',
		},
		{
			day: 7,
			date: '2025-12-20',
			phase: 'Intensive Practice',
			focus: 'Listening + Reading Combined',
			hours: 14,
			tasks: [
				'Cambridge 15 Listening Tests 1-3',
				'Cambridge 15 Reading Tests 1-3',
				'Error pattern analysis',
				'Speed drills for both sections',
				'Vocabulary review (200+ words total)',
				'Timed practice under pressure',
			],
			targetScore: 'L+R: Both 37-39/40',
		},
		{
			day: 8,
			date: '2025-12-21',
			phase: 'Assessment',
			focus: 'FULL MOCK TEST #1',
			hours: 14,
			tasks: [
				'Cambridge IELTS 14 (all sections, timed)',
				'Score strictly',
				'Deep analysis of all mistakes',
				'Calculate band scores',
				'Identify remaining gaps',
				'Create targeted improvement plan',
			],
			targetScore: 'Overall: 7.5-8.0 minimum',
		},
		{
			day: 9,
			date: '2025-12-22',
			phase: 'Refinement',
			focus: 'Weakest Section Intensive',
			hours: 14,
			tasks: [
				'Focus 10 hours on weakest section from Mock #1',
				'If Listening: 8-10 tests',
				'If Reading: 8-10 passages',
				'If Writing: 6-8 essays with feedback',
				'If Speaking: 30+ recorded responses',
				'Vocabulary mastery (1000+ words total)',
			],
			targetScore: 'Weak section → 8.0+',
		},
		{
			day: 10,
			date: '2025-12-23',
			phase: 'Refinement',
			focus: 'Writing Perfection + Speaking Fluency',
			hours: 14,
			tasks: [
				'Write 4 Task 1 essays (perfect structure)',
				'Write 4 Task 2 essays (complex arguments)',
				'Get all essays reviewed',
				'Practice 40 speaking questions',
				'Record and analyze fluency',
				'Grammar error elimination',
			],
			targetScore: 'W+S: Both Band 8.0+',
		},
		{
			day: 11,
			date: '2025-12-24',
			phase: 'Intensive Practice',
			focus: 'All Sections Combined Practice',
			hours: 14,
			tasks: [
				'Cambridge 13 Listening Tests 1-2',
				'Cambridge 13 Reading Tests 1-2',
				'Write 2 complete Writing tests',
				'Practice 20 speaking topics',
				'Maintain sharpness in all areas',
				'Review all common mistakes',
			],
			targetScore: 'All sections consistent 8.0+',
		},
		{
			day: 12,
			date: '2025-12-25',
			phase: 'Assessment',
			focus: 'FULL MOCK TEST #2 + Christmas',
			hours: 12,
			tasks: [
				'Cambridge IELTS 13 (all sections, exam conditions)',
				'Score strictly',
				'Compare with Mock #1 (improvement?)',
				'Final gap identification',
				'Celebrate Christmas (light evening)',
				'SUBMIT DAAD APPLICATION (Deadline: Dec 28)',
			],
			targetScore: 'Overall: 8.0-8.5 target',
		},
		{
			day: 13,
			date: '2025-12-26',
			phase: 'Strategic Rest',
			focus: 'Christmas - Light Review Only',
			hours: 4,
			tasks: [
				'Review vocabulary flashcards (1000+ words)',
				'Watch Band 8-9 videos',
				'Light reading (2 passages)',
				'Rest and mental preparation',
				'Family time (you deserve it!)',
				'Early sleep for recovery',
			],
			targetScore: 'Mental recovery + consolidation',
		},
		{
			day: 14,
			date: '2025-12-27',
			phase: 'Final Polish',
			focus: 'Fine-tuning All Sections',
			hours: 12,
			tasks: [
				'2 listening tests (maintain sharpness)',
				'2 reading passages (speed maintenance)',
				'2 writing essays (both tasks)',
				'Speaking fluency drills (15 topics)',
				'Review all error patterns',
				'Mental confidence building',
			],
			targetScore: 'Confidence at peak',
		},
		{
			day: 15,
			date: '2025-12-28',
			phase: 'Rest & Prep',
			focus: 'Final Rest Day Before Exam',
			hours: 3,
			tasks: [
				'1 listening test only (ear sharpness)',
				'Light vocabulary review (20 min)',
				'Organize exam materials (ID, pencils, confirmation)',
				'Pack everything for exam',
				'Relaxation and visualization',
				'EARLY SLEEP (9 PM) - Critical!',
			],
			targetScore: 'Well-rested, fully prepared',
		},
		{
			day: 16,
			date: '2025-12-29',
			phase: 'EXAM DAY',
			focus: 'CRUSH THE EXAM!',
			hours: 0,
			tasks: [
				'Wake up 3 hours before exam',
				'Healthy breakfast',
				'Arrive 30 minutes early',
				'Stay calm, trust your preparation',
				'Remember all techniques',
				'ACHIEVE BAND 8.0-8.5!',
			],
			targetScore: 'Band 8.0-8.5 ACHIEVED!',
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
		if (daysPassed <= 2) return '🔍 Diagnosis & Foundation';
		if (daysPassed <= 7) return '💪 Intensive Section Practice';
		if (daysPassed === 8) return '📝 Mock Test #1';
		if (daysPassed <= 11) return '⚡ Refinement & Intensive Practice';
		if (daysPassed === 12) return '📝 Mock Test #2';
		if (daysPassed === 13) return '🎄 Strategic Rest (Christmas)';
		if (daysPassed <= 14) return '✨ Final Polish';
		if (daysPassed === 15) return '😴 Rest & Prep';
		return '🎯 EXAM DAY!';
	},
};

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
	module.exports = MASTER_PLAN;
}
