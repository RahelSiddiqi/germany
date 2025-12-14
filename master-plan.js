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

	// 15-Day IELTS ULTRA-INTENSIVE Schedule (with time slots)
	ieltsSchedule: [
		{
			day: 1,
			date: '2025-12-14',
			phase: 'Diagnosis',
			focus: 'Diagnostic Test + Baseline Assessment',
			hours: 14,
			tasks: [
				{ time: '06:00-06:30', task: 'Wake up, breakfast, prepare' },
				{
					time: '06:30-09:30',
					task: 'Take Cambridge IELTS 18 Test 1 (full, timed)',
				},
				{ time: '09:30-10:00', task: 'Break + light snack' },
				{
					time: '10:00-12:00',
					task: 'Score yourself honestly + analyze mistakes',
				},
				{ time: '12:00-13:00', task: 'Lunch break' },
				{
					time: '13:00-15:00',
					task: 'Identify weak areas per section (detailed notes)',
				},
				{ time: '15:00-15:30', task: 'Break' },
				{
					time: '15:30-17:00',
					task: 'Register for IELTS exam (Dec 29)',
				},
				{
					time: '17:00-18:00',
					task: 'Order Cambridge IELTS books 13-18',
				},
				{ time: '18:00-19:00', task: 'Dinner break' },
				{
					time: '19:00-21:00',
					task: 'Set up ultra-intensive study schedule',
				},
				{
					time: '21:00-22:00',
					task: 'Review plan + vocabulary flashcards',
				},
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-09:00',
					task: 'Learn 35 Band 8+ academic words (Session 1)',
				},
				{ time: '09:00-09:30', task: 'Break' },
				{
					time: '09:30-12:00',
					task: 'Write vocabulary in notebook + example sentences',
				},
				{ time: '12:00-13:00', task: 'Lunch break' },
				{
					time: '13:00-15:00',
					task: 'Review complex grammar structures (conditionals, passive)',
				},
				{ time: '15:00-15:30', task: 'Break' },
				{
					time: '15:30-17:30',
					task: 'Write Task 2 Essay #1 (timed 40 min) + self-review',
				},
				{ time: '17:30-18:30', task: 'Dinner break' },
				{
					time: '18:30-20:00',
					task: 'Write Task 2 Essay #2 (timed 40 min) + self-review',
				},
				{
					time: '20:00-21:00',
					task: 'Learn 35 more Band 8+ words (Session 2)',
				},
				{
					time: '21:00-22:00',
					task: 'Start DAAD motivation letter draft',
				},
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-08:00',
					task: 'Cambridge 17 Listening Test 1 (40 min + analysis)',
				},
				{
					time: '08:00-09:30',
					task: 'Cambridge 17 Listening Test 2 (40 min + analysis)',
				},
				{ time: '09:30-10:00', task: 'Break' },
				{
					time: '10:00-11:30',
					task: 'Cambridge 16 Listening Test 1 (40 min + analysis)',
				},
				{
					time: '11:30-13:00',
					task: 'Cambridge 16 Listening Test 2 (40 min + analysis)',
				},
				{ time: '13:00-14:00', task: 'Lunch break' },
				{
					time: '14:00-16:00',
					task: 'Analyze every mistake deeply (error journal)',
				},
				{ time: '16:00-16:30', task: 'Break' },
				{
					time: '16:30-18:30',
					task: 'Practice note-taking at native speed',
				},
				{ time: '18:30-19:30', task: 'Dinner break' },
				{
					time: '19:30-21:00',
					task: 'BBC Radio exposure (accent training)',
				},
				{ time: '21:00-22:00', task: 'Synonym matching drills' },
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-07:30',
					task: 'Cambridge 17 Reading Test 1 (60 min strict)',
				},
				{ time: '07:30-08:30', task: 'Analyze mistakes Test 1' },
				{ time: '08:30-09:00', task: 'Break' },
				{
					time: '09:00-10:00',
					task: 'Cambridge 17 Reading Test 2 (60 min strict)',
				},
				{ time: '10:00-11:00', task: 'Analyze mistakes Test 2' },
				{
					time: '11:00-12:00',
					task: 'Cambridge 16 Reading Test 1 (60 min strict)',
				},
				{ time: '12:00-13:00', task: 'Lunch break' },
				{
					time: '13:00-14:00',
					task: 'Analyze mistakes + Cambridge 16 Test 2',
				},
				{
					time: '14:00-15:30',
					task: 'True/False/Not Given deep dive techniques',
				},
				{ time: '15:30-16:00', task: 'Break' },
				{ time: '16:00-18:00', task: 'Speed reading drills' },
				{ time: '18:00-19:00', task: 'Dinner break' },
				{
					time: '19:00-20:30',
					task: 'Vocabulary from passages (50 words)',
				},
				{
					time: '20:30-22:00',
					task: 'Time management optimization practice',
				},
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-08:00',
					task: 'Study Band 8-9 Task 1 models (graphs, charts)',
				},
				{
					time: '08:00-09:00',
					task: 'Write Task 1 Essay #1 (20 min) + self-review',
				},
				{ time: '09:00-09:30', task: 'Break' },
				{
					time: '09:30-10:30',
					task: 'Write Task 1 Essay #2 (process diagram)',
				},
				{
					time: '10:30-11:30',
					task: 'Write Task 1 Essay #3 (map/comparison)',
				},
				{
					time: '11:30-12:30',
					task: 'Write Task 1 Essay #4 (multiple graphs)',
				},
				{ time: '12:30-13:30', task: 'Lunch break' },
				{
					time: '13:30-15:00',
					task: 'Study Band 8-9 Task 2 models (essay types)',
				},
				{ time: '15:00-15:30', task: 'Break' },
				{
					time: '15:30-16:30',
					task: 'Write Task 2 Essay #1 (40 min timed)',
				},
				{
					time: '16:30-17:30',
					task: 'Write Task 2 Essay #2 (40 min timed)',
				},
				{ time: '17:30-18:30', task: 'Dinner break' },
				{
					time: '18:30-19:30',
					task: 'Write Task 2 Essay #3 (40 min timed)',
				},
				{
					time: '19:30-21:00',
					task: 'Get professional feedback (Fiverr/submit)',
				},
				{
					time: '21:00-22:00',
					task: 'Complex grammar structures practice',
				},
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-08:00',
					task: 'Study Band 8-9 speaking videos (YouTube)',
				},
				{
					time: '08:00-10:00',
					task: 'Practice 25 Part 1 topics (record answers)',
				},
				{ time: '10:00-10:30', task: 'Break' },
				{
					time: '10:30-12:30',
					task: 'Practice 25 more Part 1 topics (record)',
				},
				{ time: '12:30-13:30', task: 'Lunch break' },
				{
					time: '13:30-15:30',
					task: 'Prepare 10 cue cards (Part 2) with notes',
				},
				{ time: '15:30-16:00', task: 'Break' },
				{
					time: '16:00-18:00',
					task: 'Prepare 10 more cue cards (Part 2)',
				},
				{ time: '18:00-19:00', task: 'Dinner break' },
				{
					time: '19:00-20:30',
					task: 'Practice 50 Part 3 abstract questions (record)',
				},
				{
					time: '20:30-21:30',
					task: 'Self-evaluate all recorded answers',
				},
				{
					time: '21:30-22:30',
					task: 'iTalki practice session (if scheduled)',
				},
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-08:00',
					task: 'Cambridge 15 Listening Test 1 + analysis',
				},
				{
					time: '08:00-09:30',
					task: 'Cambridge 15 Listening Test 2 + analysis',
				},
				{ time: '09:30-10:00', task: 'Break' },
				{
					time: '10:00-11:30',
					task: 'Cambridge 15 Listening Test 3 + analysis',
				},
				{
					time: '11:30-12:30',
					task: 'Cambridge 15 Reading Test 1 (60 min)',
				},
				{ time: '12:30-13:30', task: 'Lunch break' },
				{
					time: '13:30-14:30',
					task: 'Cambridge 15 Reading Test 2 (60 min)',
				},
				{
					time: '14:30-15:30',
					task: 'Cambridge 15 Reading Test 3 (60 min)',
				},
				{ time: '15:30-16:00', task: 'Break' },
				{
					time: '16:00-17:30',
					task: 'Error pattern analysis (L+R combined)',
				},
				{ time: '17:30-18:30', task: 'Speed drills for both sections' },
				{ time: '18:30-19:30', task: 'Dinner break' },
				{
					time: '19:30-21:00',
					task: 'Vocabulary review (200+ words total)',
				},
				{ time: '21:00-22:00', task: 'Timed practice under pressure' },
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
				{
					time: '06:00-06:30',
					task: 'Wake up, light breakfast (exam simulation)',
				},
				{
					time: '06:30-07:15',
					task: 'MOCK Listening (40 min - exam conditions)',
				},
				{
					time: '07:15-08:15',
					task: 'MOCK Reading (60 min - exam conditions)',
				},
				{
					time: '08:15-09:15',
					task: 'MOCK Writing (60 min - exam conditions)',
				},
				{ time: '09:15-09:30', task: 'Short break' },
				{
					time: '09:30-10:00',
					task: 'MOCK Speaking (simulate with timer)',
				},
				{ time: '10:00-11:00', task: 'Score Listening strictly' },
				{ time: '11:00-12:00', task: 'Score Reading strictly' },
				{ time: '12:00-13:00', task: 'Lunch break' },
				{
					time: '13:00-15:00',
					task: 'Deep analysis - Listening mistakes',
				},
				{
					time: '15:00-17:00',
					task: 'Deep analysis - Reading mistakes',
				},
				{
					time: '17:00-18:00',
					task: 'Deep analysis - Writing (use rubric)',
				},
				{ time: '18:00-19:00', task: 'Dinner break' },
				{
					time: '19:00-20:30',
					task: 'Calculate band scores + identify gaps',
				},
				{
					time: '20:30-22:00',
					task: 'Create targeted improvement plan',
				},
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-08:30',
					task: 'Weakest section practice (Session 1)',
				},
				{
					time: '08:30-10:30',
					task: 'Weakest section practice (Session 2)',
				},
				{ time: '10:30-11:00', task: 'Break' },
				{
					time: '11:00-13:00',
					task: 'Weakest section practice (Session 3)',
				},
				{ time: '13:00-14:00', task: 'Lunch break' },
				{
					time: '14:00-16:00',
					task: 'Weakest section practice (Session 4)',
				},
				{ time: '16:00-16:30', task: 'Break' },
				{
					time: '16:30-18:30',
					task: 'Weakest section practice (Session 5)',
				},
				{ time: '18:30-19:30', task: 'Dinner break' },
				{
					time: '19:30-21:00',
					task: 'Error analysis + technique refinement',
				},
				{
					time: '21:00-22:00',
					task: 'Vocabulary mastery review (1000+ words)',
				},
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-07:30',
					task: 'Write Task 1 Essay #1 (graph) + self-review',
				},
				{
					time: '07:30-08:30',
					task: 'Write Task 1 Essay #2 (process) + self-review',
				},
				{ time: '08:30-09:00', task: 'Break' },
				{
					time: '09:00-10:00',
					task: 'Write Task 1 Essay #3 (map) + self-review',
				},
				{
					time: '10:00-11:00',
					task: 'Write Task 1 Essay #4 (table) + self-review',
				},
				{
					time: '11:00-12:30',
					task: 'Write Task 2 Essay #1 (opinion) - 40 min',
				},
				{ time: '12:30-13:30', task: 'Lunch break' },
				{
					time: '13:30-14:30',
					task: 'Write Task 2 Essay #2 (discuss both views)',
				},
				{
					time: '14:30-15:30',
					task: 'Write Task 2 Essay #3 (problem-solution)',
				},
				{ time: '15:30-16:00', task: 'Break' },
				{
					time: '16:00-17:00',
					task: 'Write Task 2 Essay #4 (advantage-disadvantage)',
				},
				{ time: '17:00-18:00', task: 'Submit all 8 essays for review' },
				{ time: '18:00-19:00', task: 'Dinner break' },
				{
					time: '19:00-20:30',
					task: 'Practice 40 speaking questions (record)',
				},
				{
					time: '20:30-21:30',
					task: 'Analyze recorded fluency + grammar',
				},
				{
					time: '21:30-22:00',
					task: 'Grammar error elimination practice',
				},
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-08:00',
					task: 'Cambridge 13 Listening Test 1 + analysis',
				},
				{
					time: '08:00-09:30',
					task: 'Cambridge 13 Listening Test 2 + analysis',
				},
				{ time: '09:30-10:00', task: 'Break' },
				{
					time: '10:00-11:00',
					task: 'Cambridge 13 Reading Test 1 (60 min)',
				},
				{
					time: '11:00-12:00',
					task: 'Cambridge 13 Reading Test 2 (60 min)',
				},
				{ time: '12:00-13:00', task: 'Lunch break' },
				{
					time: '13:00-14:00',
					task: 'Write complete Writing test #1 (Task 1 + 2)',
				},
				{
					time: '14:00-15:00',
					task: 'Write complete Writing test #2 (Task 1 + 2)',
				},
				{ time: '15:00-15:30', task: 'Break' },
				{
					time: '15:30-17:00',
					task: 'Practice 20 speaking topics (Part 1, 2, 3)',
				},
				{
					time: '17:00-18:00',
					task: 'Maintain sharpness - quick drills all sections',
				},
				{
					time: '18:00-19:00',
					task: 'Dinner break + Christmas Eve prep',
				},
				{
					time: '19:00-21:00',
					task: 'Review all common mistakes (error journal)',
				},
				{
					time: '21:00-22:00',
					task: 'Light review + early rest (Christmas Eve)',
				},
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
				{
					time: '06:00-06:30',
					task: 'Wake up, light breakfast (exam simulation)',
				},
				{
					time: '06:30-07:15',
					task: 'MOCK Listening - Cambridge 13 (40 min)',
				},
				{
					time: '07:15-08:15',
					task: 'MOCK Reading - Cambridge 13 (60 min)',
				},
				{
					time: '08:15-09:15',
					task: 'MOCK Writing (60 min - exam conditions)',
				},
				{
					time: '09:15-09:45',
					task: 'MOCK Speaking (simulate with timer)',
				},
				{ time: '09:45-10:00', task: 'Short break' },
				{ time: '10:00-12:00', task: 'Score all sections strictly' },
				{ time: '12:00-13:00', task: 'Lunch break' },
				{
					time: '13:00-15:00',
					task: 'Compare with Mock #1 (improvement analysis)',
				},
				{ time: '15:00-16:00', task: 'Final gap identification' },
				{ time: '16:00-17:00', task: 'SUBMIT DAAD APPLICATION' },
				{
					time: '17:00-22:00',
					task: '🎄 Celebrate Christmas! (you earned it!)',
				},
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
				{
					time: '09:00-10:00',
					task: 'Sleep in! Wake up late, relaxed breakfast',
				},
				{
					time: '10:00-11:00',
					task: 'Review vocabulary flashcards (1000+ words)',
				},
				{
					time: '11:00-12:00',
					task: 'Watch Band 8-9 speaking videos (YouTube)',
				},
				{ time: '12:00-14:00', task: 'Lunch + Family time' },
				{
					time: '14:00-15:00',
					task: 'Light reading (2 passages - relaxed pace)',
				},
				{
					time: '15:00-21:00',
					task: '🎄 Family time - REST (you deserve it!)',
				},
				{ time: '21:00-22:00', task: 'Early sleep for recovery' },
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
				{ time: '06:00-06:30', task: 'Wake up, morning routine' },
				{
					time: '06:30-08:00',
					task: 'Listening Test 1 (maintain sharpness)',
				},
				{
					time: '08:00-09:30',
					task: 'Listening Test 2 (maintain sharpness)',
				},
				{ time: '09:30-10:00', task: 'Break' },
				{
					time: '10:00-11:00',
					task: 'Reading passage 1 (speed maintenance)',
				},
				{
					time: '11:00-12:00',
					task: 'Reading passage 2 (speed maintenance)',
				},
				{ time: '12:00-13:00', task: 'Lunch break' },
				{
					time: '13:00-14:00',
					task: 'Write Task 1 essay (perfect structure)',
				},
				{
					time: '14:00-15:00',
					task: 'Write Task 2 essay (complex argument)',
				},
				{ time: '15:00-15:30', task: 'Break' },
				{
					time: '15:30-17:00',
					task: 'Speaking fluency drills (15 topics - record)',
				},
				{
					time: '17:00-18:00',
					task: 'Review all error patterns (final check)',
				},
				{ time: '18:00-19:00', task: 'Dinner break' },
				{
					time: '19:00-20:30',
					task: 'Mental confidence building + visualization',
				},
				{
					time: '20:30-22:00',
					task: 'Light review + early sleep preparation',
				},
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
				{
					time: '08:00-09:00',
					task: 'Sleep in! Wake up naturally, relaxed',
				},
				{
					time: '09:00-09:40',
					task: '1 listening test only (ear sharpness)',
				},
				{
					time: '09:40-10:00',
					task: 'Light vocabulary review (20 min)',
				},
				{
					time: '10:00-12:00',
					task: 'Relax - watch a movie, go for a walk',
				},
				{ time: '12:00-13:00', task: 'Healthy lunch' },
				{
					time: '13:00-14:00',
					task: 'Organize exam materials (ID, pencils, confirmation)',
				},
				{
					time: '14:00-15:00',
					task: 'Pack everything for exam + check venue location',
				},
				{
					time: '15:00-18:00',
					task: 'Complete relaxation - NO STUDYING!',
				},
				{ time: '18:00-19:00', task: 'Light dinner (nothing heavy)' },
				{
					time: '19:00-20:30',
					task: 'Relaxation and positive visualization',
				},
				{ time: '20:30-21:00', task: 'Prepare clothes, final check' },
				{ time: '21:00', task: '💤 EARLY SLEEP (9 PM) - Critical!' },
			],
			targetScore: 'Well-rested, fully prepared',
		},
		{
			day: 16,
			date: '2025-12-29',
			phase: 'EXAM DAY',
			focus: '🏆 CRUSH THE EXAM!',
			hours: 0,
			tasks: [
				{ time: '05:00-05:30', task: 'Wake up (3 hours before exam)' },
				{ time: '05:30-06:15', task: 'Light exercise + shower' },
				{
					time: '06:15-07:00',
					task: 'Healthy breakfast (protein + carbs)',
				},
				{ time: '07:00-07:30', task: 'Final review of key vocabulary' },
				{ time: '07:30-08:00', task: 'Travel to exam venue' },
				{
					time: '08:00-08:30',
					task: 'Arrive 30 minutes early, check-in',
				},
				{
					time: '08:30-09:00',
					task: 'Relax, stay calm, trust your preparation',
				},
				{
					time: '09:00-12:00',
					task: '📝 EXAM: Listening → Reading → Writing',
				},
				{
					time: '12:00-14:00',
					task: 'Lunch break + Speaking test prep',
				},
				{
					time: '14:00-15:00',
					task: '🎤 Speaking test - be confident!',
				},
				{ time: '15:00+', task: '🎉 CELEBRATE! You did it!' },
			],
			targetScore: '🏆 Band 8.0-8.5 ACHIEVED!',
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
