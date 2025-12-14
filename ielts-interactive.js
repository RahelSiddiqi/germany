// IELTS Interactive Learning System
// Comprehensive tools for IELTS preparation

// ==================== VOCABULARY FLASHCARD SYSTEM ====================
const IELTS_VOCABULARY = {
	// Day 1: Opinion & Argument + Cause/Effect (70 words)
	academic: [
		{
			word: 'notwithstanding',
			definition: 'Despite; in spite of',
			example: 'Notwithstanding the challenges, the company succeeded.',
			level: 'C1',
		},
		{
			word: 'predominantly',
			definition: 'Mainly; chiefly',
			example: 'The region is predominantly agricultural.',
			level: 'B2',
		},
		{
			word: 'invariably',
			definition: 'Always; without exception',
			example: 'She invariably arrives on time.',
			level: 'C1',
		},
		{
			word: 'contentious',
			definition: 'Controversial; disputed',
			example: 'Climate change remains a contentious issue.',
			level: 'B2',
		},
		{
			word: 'plausible',
			definition: 'Believable; reasonable',
			example: 'His explanation was plausible but not proven.',
			level: 'B2',
		},
		{
			word: 'compelling',
			definition: 'Convincing; powerful',
			example: 'The evidence presented was compelling.',
			level: 'B2',
		},
		{
			word: 'debatable',
			definition: 'Arguable; open to discussion',
			example: 'Whether this policy is effective remains debatable.',
			level: 'B2',
		},
		{
			word: 'concede',
			definition: 'Admit; acknowledge',
			example: 'I concede that your point has merit.',
			level: 'B2',
		},
		{
			word: 'assert',
			definition: 'State confidently; declare',
			example: 'The researcher asserts that this theory is correct.',
			level: 'B2',
		},
		{
			word: 'substantiate',
			definition: 'Support with evidence; prove',
			example: 'You must substantiate your claims with data.',
			level: 'C1',
		},
		{
			word: 'catalyst',
			definition: 'Trigger; something that causes change',
			example: 'Social media was a catalyst for revolution.',
			level: 'B2',
		},
		{
			word: 'exacerbate',
			definition: 'Worsen; make worse',
			example: 'Stress can exacerbate health problems.',
			level: 'C1',
		},
		{
			word: 'mitigate',
			definition: 'Reduce; lessen the severity',
			example: 'We must mitigate the effects of pollution.',
			level: 'B2',
		},
		{
			word: 'ramification',
			definition: 'Long-term effect; implication',
			example:
				'The ramifications of this decision will be felt for years.',
			level: 'C1',
		},
		{
			word: 'repercussion',
			definition: 'Negative result; backlash',
			example: 'The policy had serious repercussions.',
			level: 'C1',
		},
		{
			word: 'infrastructure',
			definition: 'Basic systems/facilities',
			example: 'Investing in infrastructure is crucial for development.',
			level: 'B2',
		},
		{
			word: 'socioeconomic',
			definition: 'Related to social and economic factors',
			example: 'Socioeconomic status affects educational outcomes.',
			level: 'C1',
		},
		{
			word: 'disparity',
			definition: 'Inequality; significant difference',
			example: 'There is a wide disparity between rich and poor.',
			level: 'B2',
		},
		{
			word: 'marginalized',
			definition: 'Excluded; pushed to the edge',
			example: 'Marginalized communities face systemic challenges.',
			level: 'C1',
		},
		{
			word: 'legislation',
			definition: 'Laws; legal rules',
			example: 'New legislation was passed to protect workers.',
			level: 'B2',
		},
		{
			word: 'cognitive',
			definition: 'Related to mental processes',
			example: 'Cognitive development is important in childhood.',
			level: 'B2',
		},
		{
			word: 'pedagogical',
			definition: 'Related to teaching methods',
			example: 'Pedagogical approaches vary across cultures.',
			level: 'C1',
		},
		{
			word: 'sustainable',
			definition: 'Environmentally responsible',
			example: 'We must adopt sustainable farming practices.',
			level: 'B2',
		},
		{
			word: 'biodiversity',
			definition: 'Variety of living organisms',
			example: 'Rainforests have high biodiversity.',
			level: 'B2',
		},
		{
			word: 'phenomenon',
			definition: 'A fact or situation observed',
			example: 'Global warming is a well-documented phenomenon.',
			level: 'B2',
		},
		{
			word: 'hypothesis',
			definition: 'A proposed explanation',
			example: 'The hypothesis was tested rigorously.',
			level: 'B2',
		},
		{
			word: 'empirical',
			definition: 'Based on observation',
			example: 'The study used empirical data.',
			level: 'C1',
		},
		{
			word: 'paradigm',
			definition: 'A typical example or pattern',
			example: 'This represents a new paradigm in education.',
			level: 'C1',
		},
		{
			word: 'inherent',
			definition: 'Existing as a natural part',
			example: 'There are inherent risks in any investment.',
			level: 'B2',
		},
		{
			word: 'ambiguous',
			definition: 'Having multiple meanings',
			example: 'The instructions were ambiguous.',
			level: 'B2',
		},
	],
	// Day 2: Reading & Comprehension + Text Structure
	reading: [
		{
			word: 'skim',
			definition: 'Read quickly for main ideas',
			example: 'Skim the passage to find the topic sentence.',
			level: 'B1',
		},
		{
			word: 'scan',
			definition: 'Search for specific information',
			example: 'Scan the text for names and dates.',
			level: 'B1',
		},
		{
			word: 'paraphrase',
			definition: 'Restate in different words',
			example: 'You must paraphrase, not copy directly.',
			level: 'B2',
		},
		{
			word: 'infer',
			definition: 'Conclude from evidence',
			example: 'We can infer his mood from his actions.',
			level: 'B2',
		},
		{
			word: 'explicit',
			definition: 'Clearly stated',
			example: 'The instructions were explicit and clear.',
			level: 'B2',
		},
		{
			word: 'implicit',
			definition: 'Implied, not directly stated',
			example: 'His criticism was implicit in his tone.',
			level: 'B2',
		},
		{
			word: 'context',
			definition: 'Surrounding circumstances',
			example: 'Understand words in context.',
			level: 'B1',
		},
		{
			word: 'comprehend',
			definition: 'Understand fully',
			example: "It's difficult to comprehend complex texts.",
			level: 'B2',
		},
		{
			word: 'synopsis',
			definition: 'Brief summary',
			example: 'Give me a synopsis of the article.',
			level: 'C1',
		},
		{
			word: 'extract',
			definition: 'A passage; to remove',
			example: 'Read the extract carefully.',
			level: 'B2',
		},
		{
			word: 'analyze',
			definition: 'Examine in detail',
			example: 'Analyze the data carefully.',
			level: 'B2',
		},
		{
			word: 'evaluate',
			definition: 'Assess value or quality',
			example: "Evaluate the author's argument.",
			level: 'B2',
		},
		{
			word: 'interpret',
			definition: 'Explain meaning',
			example: 'How do you interpret this graph?',
			level: 'B2',
		},
		{
			word: 'perspective',
			definition: 'Point of view',
			example: 'Consider different perspectives.',
			level: 'B2',
		},
		{
			word: 'bias',
			definition: 'Unfair preference',
			example: 'The article shows political bias.',
			level: 'B2',
		},
		{
			word: 'thesis',
			definition: 'Main argument',
			example: 'State your thesis clearly.',
			level: 'B2',
		},
		{
			word: 'elaborate',
			definition: 'Explain in more detail',
			example: 'Could you elaborate on that?',
			level: 'B2',
		},
		{
			word: 'contradict',
			definition: 'Say the opposite',
			example: 'These facts contradict each other.',
			level: 'B2',
		},
		{
			word: 'criterion',
			definition: 'Standard for judgment',
			example: 'What criteria are used?',
			level: 'B2',
		},
		{
			word: 'coherent',
			definition: 'Logical and consistent',
			example: 'Present a coherent argument.',
			level: 'B2',
		},
	],
	// Day 3: Listening & Everyday Situations
	listening: [
		{
			word: 'accommodation',
			definition: 'Housing/lodging',
			example: 'I need to book accommodation.',
			level: 'B1',
		},
		{
			word: 'reservation',
			definition: 'Advance booking',
			example: 'I have a reservation for tonight.',
			level: 'B1',
		},
		{
			word: 'deposit',
			definition: 'Initial payment',
			example: 'A deposit of £200 is required.',
			level: 'B1',
		},
		{
			word: 'refund',
			definition: 'Money returned',
			example: 'Can I get a refund?',
			level: 'B1',
		},
		{
			word: 'itinerary',
			definition: 'Travel plan',
			example: "Here's your complete itinerary.",
			level: 'B2',
		},
		{
			word: 'complimentary',
			definition: 'Free of charge',
			example: 'Breakfast is complimentary.',
			level: 'B2',
		},
		{
			word: 'mandatory',
			definition: 'Required; compulsory',
			example: 'Attendance is mandatory.',
			level: 'B2',
		},
		{
			word: 'adjacent',
			definition: 'Next to',
			example: 'The café is adjacent to the library.',
			level: 'B2',
		},
		{
			word: 'vicinity',
			definition: 'Nearby area',
			example: 'There are shops in the vicinity.',
			level: 'B2',
		},
		{
			word: 'premises',
			definition: 'Building and grounds',
			example: 'No smoking on the premises.',
			level: 'B2',
		},
		{
			word: 'tuition',
			definition: 'Teaching/fees',
			example: 'Tuition fees are £9,000 annually.',
			level: 'B2',
		},
		{
			word: 'dissertation',
			definition: 'Long essay/thesis',
			example: 'My dissertation is due in May.',
			level: 'B2',
		},
		{
			word: 'plagiarism',
			definition: "Copying others' work",
			example: 'Plagiarism is a serious offense.',
			level: 'B2',
		},
		{
			word: 'amenity',
			definition: 'Useful feature',
			example: 'The hotel has excellent amenities.',
			level: 'B2',
		},
		{
			word: 'consultation',
			definition: 'Meeting for advice',
			example: 'Book a consultation with your tutor.',
			level: 'B2',
		},
		{
			word: 'transcript',
			definition: 'Written version of audio',
			example: 'The transcript shows every word spoken.',
			level: 'B2',
		},
		{
			word: 'abbreviate',
			definition: 'Shorten a word',
			example: 'Abbreviate "number" as "no."',
			level: 'B2',
		},
		{
			word: 'distractor',
			definition: 'Wrong answer option',
			example: 'Identify distractors in MCQ.',
			level: 'C1',
		},
		{
			word: 'synonym',
			definition: 'Word with same meaning',
			example: '"Big" and "large" are synonyms.',
			level: 'B1',
		},
		{
			word: 'antonym',
			definition: 'Word with opposite meaning',
			example: '"Hot" and "cold" are antonyms.',
			level: 'B1',
		},
	],
	// Speaking phrases and connectors
	speaking: [
		{
			word: 'absolutely',
			definition: 'Completely; without doubt',
			example: 'I absolutely agree with you.',
			level: 'B1',
		},
		{
			word: 'personally',
			definition: 'From my own viewpoint',
			example: 'Personally, I prefer working from home.',
			level: 'B1',
		},
		{
			word: 'undoubtedly',
			definition: 'Without any doubt',
			example: 'This is undoubtedly the best option.',
			level: 'B2',
		},
		{
			word: 'frankly',
			definition: 'Speaking honestly',
			example: 'Frankly, I think we need to reconsider.',
			level: 'B2',
		},
		{
			word: 'essentially',
			definition: 'Basically; fundamentally',
			example: 'Essentially, we have two choices.',
			level: 'B2',
		},
		{
			word: 'relatively',
			definition: 'In comparison to something else',
			example: 'The test was relatively easy.',
			level: 'B2',
		},
		{
			word: 'particularly',
			definition: 'Especially',
			example: 'I particularly enjoyed the music.',
			level: 'B2',
		},
		{
			word: 'presumably',
			definition: 'I assume that',
			example: "Presumably, you've heard the news.",
			level: 'B2',
		},
		{
			word: 'apparently',
			definition: 'It seems that',
			example: 'Apparently, the meeting was cancelled.',
			level: 'B2',
		},
		{
			word: 'moreover',
			definition: 'Additionally; furthermore',
			example: 'The job pays well. Moreover, it has great benefits.',
			level: 'B2',
		},
		{
			word: 'nevertheless',
			definition: 'However; still; despite that',
			example: 'He is young. Nevertheless, he has great experience.',
			level: 'B2',
		},
		{
			word: 'conversely',
			definition: 'On the other hand; opposite',
			example: 'Some prefer coffee. Conversely, others drink tea.',
			level: 'B2',
		},
		{
			word: 'subsequently',
			definition: 'Afterwards; following that',
			example: 'He studied hard. Subsequently, he passed the exam.',
			level: 'B2',
		},
		{
			word: 'ultimately',
			definition: 'In the end; finally',
			example: 'Ultimately, hard work pays off.',
			level: 'B2',
		},
		{
			word: 'interestingly',
			definition: 'In an interesting way',
			example: 'Interestingly, the results were unexpected.',
			level: 'B2',
		},
		{
			word: 'significantly',
			definition: 'In an important way',
			example: 'This has significantly improved my skills.',
			level: 'B2',
		},
		{
			word: 'arguably',
			definition: 'It can be argued that',
			example: 'This is arguably the best solution.',
			level: 'B2',
		},
		{
			word: 'admittedly',
			definition: 'It must be admitted',
			example: 'Admittedly, I was wrong.',
			level: 'B2',
		},
		{
			word: 'supposedly',
			definition: 'According to what is believed',
			example: 'He supposedly left early.',
			level: 'B2',
		},
		{
			word: 'accordingly',
			definition: 'Therefore; as a result',
			example: 'Prices rose. Accordingly, sales fell.',
			level: 'B2',
		},
	],
	// Writing Task 1 & 2 vocabulary
	writing: [
		{
			word: 'illustrate',
			definition: 'To show or demonstrate',
			example: 'The graph illustrates the trend.',
			level: 'B2',
		},
		{
			word: 'demonstrate',
			definition: 'To show clearly',
			example: 'The data demonstrates a clear pattern.',
			level: 'B2',
		},
		{
			word: 'indicate',
			definition: 'To point out or show',
			example: 'The results indicate a positive outcome.',
			level: 'B2',
		},
		{
			word: 'constitute',
			definition: 'To make up or form',
			example: 'Women constitute 60% of the workforce.',
			level: 'B2',
		},
		{
			word: 'fluctuate',
			definition: 'To rise and fall irregularly',
			example: 'Prices fluctuated throughout the year.',
			level: 'B2',
		},
		{
			word: 'plummet',
			definition: 'To fall sharply',
			example: 'Sales plummeted in the fourth quarter.',
			level: 'B2',
		},
		{
			word: 'surge',
			definition: 'To increase suddenly',
			example: 'There was a surge in demand.',
			level: 'B2',
		},
		{
			word: 'plateau',
			definition: 'To reach a stable level',
			example: 'Growth plateaued after 2020.',
			level: 'B2',
		},
		{
			word: 'decline',
			definition: 'To decrease gradually',
			example: 'Unemployment declined steadily.',
			level: 'B2',
		},
		{
			word: 'peak',
			definition: 'To reach the highest point',
			example: 'Temperatures peaked in July.',
			level: 'B2',
		},
		{
			word: 'stabilize',
			definition: 'Become steady',
			example: 'The currency stabilized after the crisis.',
			level: 'B2',
		},
		{
			word: 'account for',
			definition: 'Represent; explain',
			example: 'Exports account for 40% of GDP.',
			level: 'B2',
		},
		{
			word: 'outnumber',
			definition: 'Be more than',
			example: 'Women outnumber men in this field.',
			level: 'B2',
		},
		{
			word: 'remain constant',
			definition: 'Stay the same',
			example: 'The rate remained constant.',
			level: 'B2',
		},
		{
			word: 'marginally',
			definition: 'Slightly',
			example: 'Sales increased marginally.',
			level: 'B2',
		},
		{
			word: 'substantially',
			definition: 'Considerably; significantly',
			example: 'Costs rose substantially.',
			level: 'B2',
		},
		{
			word: 'moderately',
			definition: 'To a medium degree',
			example: 'Prices increased moderately.',
			level: 'B2',
		},
		{
			word: 'exponentially',
			definition: 'At an increasing rate',
			example: 'The population grew exponentially.',
			level: 'C1',
		},
		{
			word: 'comparatively',
			definition: 'In comparison',
			example: 'This is comparatively better.',
			level: 'B2',
		},
		{
			word: 'respectively',
			definition: 'In the order mentioned',
			example: 'UK and US scored 80% and 75% respectively.',
			level: 'B2',
		},
	],
	// Environment & Society topics
	topics: [
		{
			word: 'sustainable',
			definition: 'Long-term viable; eco-friendly',
			example: 'We must adopt sustainable practices.',
			level: 'B2',
		},
		{
			word: 'depletion',
			definition: 'Reduction; using up resources',
			example: 'Overfishing caused fish stock depletion.',
			level: 'B2',
		},
		{
			word: 'ecological',
			definition: 'Related to ecosystems',
			example: 'Ecological balance is disrupted by pollution.',
			level: 'B2',
		},
		{
			word: 'carbon footprint',
			definition: 'Total greenhouse gas emissions',
			example: 'We should reduce our carbon footprint.',
			level: 'B2',
		},
		{
			word: 'renewable',
			definition: 'Can be replaced naturally',
			example: 'Solar energy is a renewable resource.',
			level: 'B2',
		},
		{
			word: 'well-being',
			definition: 'Health; state of being well',
			example: 'Mental well-being is as important as physical health.',
			level: 'B2',
		},
		{
			word: 'preventive',
			definition: 'Designed to prevent',
			example: 'Preventive medicine is more effective.',
			level: 'B2',
		},
		{
			word: 'chronic',
			definition: 'Long-lasting; persistent',
			example: 'Chronic stress can cause serious illness.',
			level: 'B2',
		},
		{
			word: 'urbanization',
			definition: 'Process of becoming urban',
			example: 'Rapid urbanization caused housing shortages.',
			level: 'B2',
		},
		{
			word: 'demographic',
			definition: 'Related to population stats',
			example: 'Demographic changes affect pensions.',
			level: 'B2',
		},
		{
			word: 'globalization',
			definition: 'Worldwide integration',
			example: 'Globalization has increased trade.',
			level: 'B2',
		},
		{
			word: 'automation',
			definition: 'Use of machines to do work',
			example: 'Factory automation replaced many workers.',
			level: 'B2',
		},
		{
			word: 'digital literacy',
			definition: 'Ability to use technology',
			example: 'Digital literacy is essential today.',
			level: 'B2',
		},
		{
			word: 'competency',
			definition: 'Skill; ability',
			example: 'Language competency is required.',
			level: 'B2',
		},
		{
			word: 'productivity',
			definition: 'Effectiveness; output per input',
			example: 'Remote work improved productivity.',
			level: 'B2',
		},
		{
			word: 'innovation',
			definition: 'New ideas; invention',
			example: 'Innovation drives economic growth.',
			level: 'B2',
		},
		{
			word: 'proficiency',
			definition: 'High level of skill',
			example: 'She achieved proficiency in three languages.',
			level: 'B2',
		},
		{
			word: 'curriculum',
			definition: 'Subject matter taught',
			example: 'The school curriculum needs updating.',
			level: 'B2',
		},
		{
			word: 'governance',
			definition: 'System of managing/ruling',
			example: 'Good governance ensures transparency.',
			level: 'B2',
		},
		{
			word: 'subsidize',
			definition: 'Support financially',
			example: 'Governments subsidize agriculture.',
			level: 'B2',
		},
	],
};

let flashcardState = {
	currentCategory: 'academic',
	currentIndex: 0,
	showingAnswer: false,
	learned: JSON.parse(localStorage.getItem('ielts-vocab-learned') || '[]'),
	shuffle: false,
};

function initFlashcards() {
	updateFlashcardDisplay();
}

function updateFlashcardDisplay() {
	const container = document.getElementById('flashcard-container');
	if (!container) return;

	const words = IELTS_VOCABULARY[flashcardState.currentCategory];
	const currentWord = words[flashcardState.currentIndex];
	const isLearned = flashcardState.learned.includes(currentWord.word);
	const levelColors = {
		B1: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
		B2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
		C1: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
		C2: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
	};
	const levelColor = levelColors[currentWord.level] || levelColors['B2'];

	container.innerHTML = `
		<div class="space-y-4">
			<!-- Category Tabs -->
			<div class="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
				${Object.keys(IELTS_VOCABULARY)
					.map(
						(cat) => `
					<button onclick="changeVocabCategory('${cat}')"
						class="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
						${
							flashcardState.currentCategory === cat
								? 'bg-teal-600 text-white'
								: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
						}">
						${cat.charAt(0).toUpperCase() + cat.slice(1)} (${IELTS_VOCABULARY[cat].length})
					</button>
				`,
					)
					.join('')}
			</div>

			<!-- Progress -->
			<div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
				<span>Card ${flashcardState.currentIndex + 1} of ${words.length}</span>
				<span class="flex items-center gap-2">
					<span class="px-2 py-0.5 rounded ${levelColor} text-xs font-medium">${
		currentWord.level || 'B2'
	}</span>
					<span>${flashcardState.learned.length} learned</span>
				</span>
			</div>

			<!-- Flashcard -->
			<div onclick="flipFlashcard()" class="cursor-pointer">
				<div class="bg-white dark:bg-gray-800 rounded-xl border-2 ${
					isLearned
						? 'border-green-400'
						: 'border-gray-200 dark:border-gray-700'
				} p-4 sm:p-6 min-h-[180px] sm:min-h-[200px] flex flex-col items-center justify-center text-center transition-all hover:shadow-lg">
					${
						flashcardState.showingAnswer
							? `
						<p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Definition:</p>
						<p class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">${currentWord.definition}</p>
						<p class="text-xs sm:text-sm text-teal-600 dark:text-teal-400 italic">"${currentWord.example}"</p>
					`
							: `
						<p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">${currentWord.word}</p>
						<p class="text-xs text-gray-400 mt-3 sm:mt-4">Tap to see definition</p>
					`
					}
				</div>
			</div>

			<!-- Controls -->
			<div class="flex items-center justify-between gap-2">
				<button onclick="prevFlashcard()" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
					</svg>
				</button>

				<div class="flex gap-2">
					<button onclick="toggleLearnedWord('${currentWord.word}')"
						class="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors
						${
							isLearned
								? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
								: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20'
						}">
						${isLearned ? '✓ Learned' : 'Mark Learned'}
					</button>
					<button onclick="shuffleFlashcards()" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" title="Shuffle">
						🔀
					</button>
				</div>

				<button onclick="nextFlashcard()" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
					</svg>
				</button>
			</div>
		</div>
	`;
}

function flipFlashcard() {
	flashcardState.showingAnswer = !flashcardState.showingAnswer;
	updateFlashcardDisplay();
}

function nextFlashcard() {
	const words = IELTS_VOCABULARY[flashcardState.currentCategory];
	flashcardState.currentIndex =
		(flashcardState.currentIndex + 1) % words.length;
	flashcardState.showingAnswer = false;
	updateFlashcardDisplay();
}

function prevFlashcard() {
	const words = IELTS_VOCABULARY[flashcardState.currentCategory];
	flashcardState.currentIndex =
		(flashcardState.currentIndex - 1 + words.length) % words.length;
	flashcardState.showingAnswer = false;
	updateFlashcardDisplay();
}

function changeVocabCategory(category) {
	flashcardState.currentCategory = category;
	flashcardState.currentIndex = 0;
	flashcardState.showingAnswer = false;
	updateFlashcardDisplay();
}

function toggleLearnedWord(word) {
	const index = flashcardState.learned.indexOf(word);
	if (index > -1) {
		flashcardState.learned.splice(index, 1);
	} else {
		flashcardState.learned.push(word);
	}
	localStorage.setItem(
		'ielts-vocab-learned',
		JSON.stringify(flashcardState.learned),
	);
	updateFlashcardDisplay();
}

function shuffleFlashcards() {
	const words = IELTS_VOCABULARY[flashcardState.currentCategory];
	flashcardState.currentIndex = Math.floor(Math.random() * words.length);
	flashcardState.showingAnswer = false;
	updateFlashcardDisplay();
}

// ==================== WRITING PRACTICE TIMER ====================
let writingTimer = {
	task1Time: 20 * 60, // 20 minutes in seconds
	task2Time: 40 * 60, // 40 minutes in seconds
	currentTime: 0,
	isRunning: false,
	interval: null,
	currentTask: 'task2',
	wordCount: 0,
};

function initWritingPractice() {
	const container = document.getElementById('writing-practice-container');
	if (!container) return;

	writingTimer.currentTime = writingTimer.task2Time;
	updateWritingDisplay();
}

function updateWritingDisplay() {
	const container = document.getElementById('writing-practice-container');
	if (!container) return;

	const minutes = Math.floor(writingTimer.currentTime / 60);
	const seconds = writingTimer.currentTime % 60;
	const timeColor =
		writingTimer.currentTime < 300 ? 'text-red-600' : 'text-teal-600';

	const savedEssays = JSON.parse(
		localStorage.getItem('ielts-essays') || '[]',
	);

	container.innerHTML = `
		<div class="space-y-4">
			<!-- Task Selection -->
			<div class="flex gap-2">
				<button onclick="selectWritingTask('task1')"
					class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors
					${
						writingTimer.currentTask === 'task1'
							? 'bg-teal-600 text-white'
							: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
					}">
					Task 1 (20 min)
				</button>
				<button onclick="selectWritingTask('task2')"
					class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors
					${
						writingTimer.currentTask === 'task2'
							? 'bg-teal-600 text-white'
							: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
					}">
					Task 2 (40 min)
				</button>
			</div>

			<!-- Timer Display -->
			<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
				<div class="text-4xl font-mono font-bold ${timeColor} dark:${timeColor.replace(
		'600',
		'400',
	)}">
					${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
				</div>
				<div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
					${
						writingTimer.currentTask === 'task1'
							? 'Task 1: 150+ words'
							: 'Task 2: 250+ words'
					}
				</div>
			</div>

			<!-- Timer Controls -->
			<div class="flex gap-2 justify-center">
				<button onclick="toggleWritingTimer()"
					class="px-6 py-2 rounded-lg text-sm font-medium transition-colors
					${
						writingTimer.isRunning
							? 'bg-red-600 text-white hover:bg-red-700'
							: 'bg-teal-600 text-white hover:bg-teal-700'
					}">
					${writingTimer.isRunning ? '⏸ Pause' : '▶ Start'}
				</button>
				<button onclick="resetWritingTimer()"
					class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
					↺ Reset
				</button>
			</div>

			<!-- Writing Area -->
			<div class="space-y-2">
				<div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
					<span>Your Essay:</span>
					<span id="word-count-display">Words: ${writingTimer.wordCount}</span>
				</div>
				<textarea
					id="essay-textarea"
					oninput="updateWordCount(this)"
					placeholder="Start writing your essay here..."
					class="w-full h-48 p-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
				>${localStorage.getItem('ielts-current-essay') || ''}</textarea>
			</div>

			<!-- Save Button -->
			<div class="flex gap-2">
				<button onclick="saveEssay()"
					class="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors">
					💾 Save Essay
				</button>
				<button onclick="showSavedEssays()"
					class="py-2 px-4 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
					📁 Saved (${savedEssays.length})
				</button>
			</div>

			<!-- Writing Tips -->
			<div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
				<p class="text-xs font-medium text-amber-800 dark:text-amber-300 mb-1">💡 Quick Tips:</p>
				<ul class="text-xs text-amber-700 dark:text-amber-400 space-y-0.5">
					<li>• Spend 3-5 minutes planning before writing</li>
					<li>• Use paragraphs: Intro → Body 1 → Body 2 → Conclusion</li>
					<li>• Include linking words: However, Moreover, Furthermore</li>
					<li>• Leave 2-3 minutes to check for errors</li>
				</ul>
			</div>
		</div>
	`;
}

function selectWritingTask(task) {
	writingTimer.currentTask = task;
	writingTimer.currentTime =
		task === 'task1' ? writingTimer.task1Time : writingTimer.task2Time;
	writingTimer.isRunning = false;
	if (writingTimer.interval) clearInterval(writingTimer.interval);
	updateWritingDisplay();
}

function toggleWritingTimer() {
	if (writingTimer.isRunning) {
		clearInterval(writingTimer.interval);
		writingTimer.isRunning = false;
	} else {
		writingTimer.isRunning = true;
		writingTimer.interval = setInterval(() => {
			if (writingTimer.currentTime > 0) {
				writingTimer.currentTime--;
				updateTimerDisplay();
			} else {
				clearInterval(writingTimer.interval);
				writingTimer.isRunning = false;
				alert('⏰ Time is up! Please stop writing.');
				updateWritingDisplay();
			}
		}, 1000);
	}
	updateWritingDisplay();
}

function updateTimerDisplay() {
	const timerEl = document.querySelector(
		'#writing-practice-container .text-4xl',
	);
	if (timerEl) {
		const minutes = Math.floor(writingTimer.currentTime / 60);
		const seconds = writingTimer.currentTime % 60;
		timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(
			seconds,
		).padStart(2, '0')}`;
		if (writingTimer.currentTime < 300) {
			timerEl.classList.remove('text-teal-600');
			timerEl.classList.add('text-red-600');
		}
	}
}

function resetWritingTimer() {
	clearInterval(writingTimer.interval);
	writingTimer.isRunning = false;
	writingTimer.currentTime =
		writingTimer.currentTask === 'task1'
			? writingTimer.task1Time
			: writingTimer.task2Time;
	updateWritingDisplay();
}

function updateWordCount(textarea) {
	const text = textarea.value.trim();
	writingTimer.wordCount = text ? text.split(/\s+/).length : 0;
	localStorage.setItem('ielts-current-essay', textarea.value);
	document.getElementById(
		'word-count-display',
	).textContent = `Words: ${writingTimer.wordCount}`;
}

function saveEssay() {
	const textarea = document.getElementById('essay-textarea');
	if (!textarea || !textarea.value.trim()) {
		alert('Please write something before saving.');
		return;
	}

	const essays = JSON.parse(localStorage.getItem('ielts-essays') || '[]');
	essays.unshift({
		id: Date.now(),
		task: writingTimer.currentTask,
		content: textarea.value,
		wordCount: writingTimer.wordCount,
		date: new Date().toLocaleDateString(),
	});
	localStorage.setItem('ielts-essays', JSON.stringify(essays.slice(0, 20))); // Keep last 20
	textarea.value = '';
	writingTimer.wordCount = 0;
	localStorage.removeItem('ielts-current-essay');
	updateWritingDisplay();
	alert('Essay saved successfully!');
}

function showSavedEssays() {
	const essays = JSON.parse(localStorage.getItem('ielts-essays') || '[]');
	const container = document.getElementById('writing-practice-container');
	if (!container) return;

	container.innerHTML = `
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<h4 class="font-bold text-gray-900 dark:text-white">Saved Essays</h4>
				<button onclick="updateWritingDisplay()" class="text-sm text-teal-600 dark:text-teal-400 hover:underline">← Back</button>
			</div>
			${
				essays.length === 0
					? `
				<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No saved essays yet.</p>
			`
					: essays
							.map(
								(essay) => `
				<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
					<div class="flex justify-between items-start mb-2">
						<span class="text-xs font-medium px-2 py-0.5 rounded-full ${
							essay.task === 'task1'
								? 'bg-blue-100 text-blue-700'
								: 'bg-purple-100 text-purple-700'
						}">
							${essay.task === 'task1' ? 'Task 1' : 'Task 2'}
						</span>
						<span class="text-xs text-gray-500">${essay.date}</span>
					</div>
					<p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">${essay.content.substring(
						0,
						150,
					)}...</p>
					<div class="flex justify-between items-center mt-2">
						<span class="text-xs text-gray-500">${essay.wordCount} words</span>
						<button onclick="deleteEssay(${
							essay.id
						})" class="text-xs text-red-600 hover:underline">Delete</button>
					</div>
				</div>
			`,
							)
							.join('')
			}
		</div>
	`;
}

function deleteEssay(id) {
	let essays = JSON.parse(localStorage.getItem('ielts-essays') || '[]');
	essays = essays.filter((e) => e.id !== id);
	localStorage.setItem('ielts-essays', JSON.stringify(essays));
	showSavedEssays();
}

// ==================== SPEAKING PRACTICE RECORDER ====================
let speakingState = {
	isRecording: false,
	mediaRecorder: null,
	audioChunks: [],
	recordings: JSON.parse(
		localStorage.getItem('ielts-speaking-recordings') || '[]',
	),
	currentTopic: null,
	timer: 0,
	timerInterval: null,
	part: 2,
};

const SPEAKING_TOPICS = {
	part1: [
		'Tell me about your hometown.',
		'Do you work or study?',
		'What do you like about your job/studies?',
		'What do you usually do in your free time?',
		'Do you prefer reading books or watching movies?',
		'How often do you use the internet?',
		'What kind of music do you like?',
		'Do you prefer to eat at home or in restaurants?',
		'What is your favorite season?',
		'Do you like to travel?',
	],
	part2: [
		'Describe a book that you have read recently.\n\nYou should say:\n• what the book was about\n• why you decided to read it\n• what you learned from it\n• and explain whether you would recommend it to others.',
		'Describe a person who has influenced you.\n\nYou should say:\n• who the person is\n• how you know them\n• what they have done\n• and explain why they influenced you.',
		'Describe a place you would like to visit.\n\nYou should say:\n• where it is\n• how you know about it\n• what you would do there\n• and explain why you want to visit.',
		'Describe a skill you want to learn.\n\nYou should say:\n• what the skill is\n• why you want to learn it\n• how you would learn it\n• and explain how this skill would help you.',
		'Describe a memorable event in your life.\n\nYou should say:\n• what the event was\n• when it happened\n• who was there\n• and explain why it was memorable.',
	],
	part3: [
		'How has technology changed education?',
		'What are the advantages of learning a foreign language?',
		'Do you think cities will become more or less crowded in the future?',
		'How can governments encourage people to protect the environment?',
		'What qualities make a good leader?',
		'Is it better to work alone or in a team?',
		'How has globalization affected local cultures?',
		'What are the pros and cons of social media?',
	],
};

function initSpeakingPractice() {
	updateSpeakingDisplay();
}

function updateSpeakingDisplay() {
	const container = document.getElementById('speaking-practice-container');
	if (!container) return;

	const topics = SPEAKING_TOPICS[`part${speakingState.part}`];
	const currentTopic =
		speakingState.currentTopic ||
		topics[Math.floor(Math.random() * topics.length)];
	speakingState.currentTopic = currentTopic;

	const minutes = Math.floor(speakingState.timer / 60);
	const seconds = speakingState.timer % 60;
	const maxTime = speakingState.part === 2 ? 120 : 60;

	container.innerHTML = `
		<div class="space-y-4">
			<!-- Part Selection -->
			<div class="flex gap-2">
				${[1, 2, 3]
					.map(
						(part) => `
					<button onclick="selectSpeakingPart(${part})"
						class="flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors
						${
							speakingState.part === part
								? 'bg-purple-600 text-white'
								: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
						}">
						Part ${part}
					</button>
				`,
					)
					.join('')}
			</div>

			<!-- Topic Card -->
			<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
				<div class="flex justify-between items-start mb-2">
					<span class="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
						Part ${speakingState.part} ${
		speakingState.part === 2 ? '(2 minutes)' : '(30-60 seconds)'
	}
					</span>
					<button onclick="getNewTopic()" class="text-xs text-teal-600 dark:text-teal-400 hover:underline">🔄 New Topic</button>
				</div>
				<p class="text-sm text-gray-900 dark:text-white whitespace-pre-line">${currentTopic}</p>
			</div>

			<!-- Timer -->
			<div class="text-center">
				<div class="text-3xl font-mono font-bold ${
					speakingState.timer > maxTime
						? 'text-red-600'
						: 'text-purple-600'
				} dark:text-purple-400">
					${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
				</div>
				<div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
					<div class="h-full bg-purple-600 transition-all duration-1000"
						style="width: ${Math.min((speakingState.timer / maxTime) * 100, 100)}%"></div>
				</div>
			</div>

			<!-- Recording Controls -->
			<div class="flex gap-2 justify-center">
				<button onclick="toggleSpeakingRecording()"
					class="px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
					${
						speakingState.isRecording
							? 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
							: 'bg-purple-600 text-white hover:bg-purple-700'
					}">
					${speakingState.isRecording ? '⏹ Stop' : '🎙 Record'}
				</button>
				<button onclick="resetSpeakingTimer()"
					class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
					↺ Reset
				</button>
			</div>

			<!-- Saved Recordings -->
			${
				speakingState.recordings.length > 0
					? `
				<div class="space-y-2">
					<h4 class="text-sm font-medium text-gray-900 dark:text-white">Recent Recordings:</h4>
					${speakingState.recordings
						.slice(0, 3)
						.map(
							(rec, i) => `
						<div class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<button onclick="playRecording(${i})" class="text-purple-600 hover:text-purple-800">▶</button>
							<span class="text-xs text-gray-600 dark:text-gray-400 flex-1">Part ${rec.part} - ${rec.duration}s - ${rec.date}</span>
							<button onclick="deleteRecording(${i})" class="text-red-500 text-xs hover:underline">✕</button>
						</div>
					`,
						)
						.join('')}
				</div>
			`
					: ''
			}

			<!-- Speaking Tips -->
			<div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
				<p class="text-xs font-medium text-purple-800 dark:text-purple-300 mb-1">💡 Speaking Tips:</p>
				<ul class="text-xs text-purple-700 dark:text-purple-400 space-y-0.5">
					<li>• Speak naturally - don't memorize scripts</li>
					<li>• Use a variety of vocabulary and grammar</li>
					<li>• Extend your answers with examples</li>
					<li>• It's okay to pause briefly to think</li>
				</ul>
			</div>
		</div>
	`;
}

function selectSpeakingPart(part) {
	speakingState.part = part;
	speakingState.currentTopic = null;
	speakingState.timer = 0;
	updateSpeakingDisplay();
}

function getNewTopic() {
	const topics = SPEAKING_TOPICS[`part${speakingState.part}`];
	speakingState.currentTopic =
		topics[Math.floor(Math.random() * topics.length)];
	speakingState.timer = 0;
	updateSpeakingDisplay();
}

async function toggleSpeakingRecording() {
	if (speakingState.isRecording) {
		// Stop recording
		speakingState.mediaRecorder.stop();
		clearInterval(speakingState.timerInterval);
		speakingState.isRecording = false;
	} else {
		// Start recording
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			speakingState.mediaRecorder = new MediaRecorder(stream);
			speakingState.audioChunks = [];

			speakingState.mediaRecorder.ondataavailable = (e) => {
				speakingState.audioChunks.push(e.data);
			};

			speakingState.mediaRecorder.onstop = () => {
				const audioBlob = new Blob(speakingState.audioChunks, {
					type: 'audio/wav',
				});
				const audioUrl = URL.createObjectURL(audioBlob);

				// Save recording reference
				speakingState.recordings.unshift({
					url: audioUrl,
					part: speakingState.part,
					duration: speakingState.timer,
					date: new Date().toLocaleDateString(),
					topic: speakingState.currentTopic?.substring(0, 50) + '...',
				});

				// Keep only last 5 recordings (browser memory)
				speakingState.recordings = speakingState.recordings.slice(0, 5);
				updateSpeakingDisplay();
			};

			speakingState.mediaRecorder.start();
			speakingState.isRecording = true;
			speakingState.timer = 0;

			speakingState.timerInterval = setInterval(() => {
				speakingState.timer++;
				updateSpeakingTimerDisplay();
			}, 1000);

			updateSpeakingDisplay();
		} catch (err) {
			alert(
				'Could not access microphone. Please allow microphone access and try again.',
			);
		}
	}
}

function updateSpeakingTimerDisplay() {
	const timerEl = document.querySelector(
		'#speaking-practice-container .text-3xl',
	);
	const progressEl = document.querySelector(
		'#speaking-practice-container .h-full',
	);
	if (timerEl) {
		const minutes = Math.floor(speakingState.timer / 60);
		const seconds = speakingState.timer % 60;
		timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(
			seconds,
		).padStart(2, '0')}`;

		const maxTime = speakingState.part === 2 ? 120 : 60;
		if (progressEl) {
			progressEl.style.width = `${Math.min(
				(speakingState.timer / maxTime) * 100,
				100,
			)}%`;
		}
		if (speakingState.timer > maxTime) {
			timerEl.classList.add('text-red-600');
		}
	}
}

function resetSpeakingTimer() {
	if (speakingState.isRecording) {
		speakingState.mediaRecorder.stop();
		clearInterval(speakingState.timerInterval);
		speakingState.isRecording = false;
	}
	speakingState.timer = 0;
	updateSpeakingDisplay();
}

function playRecording(index) {
	const rec = speakingState.recordings[index];
	if (rec && rec.url) {
		const audio = new Audio(rec.url);
		audio.play();
	}
}

function deleteRecording(index) {
	speakingState.recordings.splice(index, 1);
	updateSpeakingDisplay();
}

// ==================== SCORE TRACKER ====================
function initScoreTracker() {
	updateScoreDisplay();
}

function updateScoreDisplay() {
	const container = document.getElementById('score-tracker-container');
	if (!container) return;

	const scores = JSON.parse(
		localStorage.getItem('ielts-mock-scores') || '[]',
	);

	// Calculate averages
	const avgScores = {
		listening: 0,
		reading: 0,
		writing: 0,
		speaking: 0,
		overall: 0,
	};
	if (scores.length > 0) {
		scores.forEach((s) => {
			avgScores.listening += s.listening || 0;
			avgScores.reading += s.reading || 0;
			avgScores.writing += s.writing || 0;
			avgScores.speaking += s.speaking || 0;
		});
		Object.keys(avgScores).forEach((key) => {
			if (key !== 'overall') {
				avgScores[key] = (avgScores[key] / scores.length).toFixed(1);
			}
		});
		avgScores.overall = (
			(parseFloat(avgScores.listening) +
				parseFloat(avgScores.reading) +
				parseFloat(avgScores.writing) +
				parseFloat(avgScores.speaking)) /
			4
		).toFixed(1);
	}

	container.innerHTML = `
		<div class="space-y-4">
			<!-- Average Scores -->
			<div class="grid grid-cols-5 gap-2">
				${['listening', 'reading', 'writing', 'speaking', 'overall']
					.map(
						(skill) => `
					<div class="text-center p-2 rounded-lg ${
						skill === 'overall'
							? 'bg-teal-100 dark:bg-teal-900/30'
							: 'bg-gray-100 dark:bg-gray-700'
					}">
						<div class="text-lg sm:text-xl font-bold ${
							skill === 'overall'
								? 'text-teal-600 dark:text-teal-400'
								: 'text-gray-900 dark:text-white'
						}">
							${avgScores[skill] || '-'}
						</div>
						<div class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 capitalize">${skill
							.charAt(0)
							.toUpperCase()}</div>
					</div>
				`,
					)
					.join('')}
			</div>

			<!-- Add New Score -->
			<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
				<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Add Mock Test Score:</h4>
				<div class="grid grid-cols-4 gap-2 mb-3">
					<div>
						<label class="text-xs text-gray-500">L</label>
						<input type="number" id="score-listening" min="0" max="9" step="0.5" placeholder="0-9"
							class="w-full p-2 text-sm rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
					</div>
					<div>
						<label class="text-xs text-gray-500">R</label>
						<input type="number" id="score-reading" min="0" max="9" step="0.5" placeholder="0-9"
							class="w-full p-2 text-sm rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
					</div>
					<div>
						<label class="text-xs text-gray-500">W</label>
						<input type="number" id="score-writing" min="0" max="9" step="0.5" placeholder="0-9"
							class="w-full p-2 text-sm rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
					</div>
					<div>
						<label class="text-xs text-gray-500">S</label>
						<input type="number" id="score-speaking" min="0" max="9" step="0.5" placeholder="0-9"
							class="w-full p-2 text-sm rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
					</div>
				</div>
				<button onclick="saveMockScore()"
					class="w-full py-2 rounded-lg text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors">
					💾 Save Score
				</button>
			</div>

			<!-- Score History -->
			${
				scores.length > 0
					? `
				<div class="space-y-2">
					<h4 class="text-sm font-medium text-gray-900 dark:text-white">Score History:</h4>
					<div class="space-y-2 max-h-40 overflow-y-auto">
						${scores
							.map(
								(s, i) => `
							<div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs">
								<span class="text-gray-500">${s.date}</span>
								<div class="flex gap-2">
									<span>L:${s.listening}</span>
									<span>R:${s.reading}</span>
									<span>W:${s.writing}</span>
									<span>S:${s.speaking}</span>
									<span class="font-bold text-teal-600">${s.overall}</span>
								</div>
								<button onclick="deleteScore(${i})" class="text-red-500 hover:underline">✕</button>
							</div>
						`,
							)
							.join('')}
					</div>
				</div>
			`
					: ''
			}

			<!-- Target -->
			<div class="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-lg p-3 border border-teal-200 dark:border-teal-800 text-center">
				<p class="text-xs text-gray-600 dark:text-gray-400">Target Score</p>
				<p class="text-2xl font-bold text-teal-600 dark:text-teal-400">8.0</p>
				${
					avgScores.overall > 0
						? `
					<p class="text-xs ${
						parseFloat(avgScores.overall) >= 8
							? 'text-green-600'
							: 'text-amber-600'
					}">
						${
							parseFloat(avgScores.overall) >= 8
								? '🎉 On track!'
								: `📈 Need +${(
										8 - parseFloat(avgScores.overall)
								  ).toFixed(1)} more`
						}
					</p>
				`
						: ''
				}
			</div>
		</div>
	`;
}

function saveMockScore() {
	const listening = parseFloat(
		document.getElementById('score-listening').value,
	);
	const reading = parseFloat(document.getElementById('score-reading').value);
	const writing = parseFloat(document.getElementById('score-writing').value);
	const speaking = parseFloat(
		document.getElementById('score-speaking').value,
	);

	if (
		isNaN(listening) ||
		isNaN(reading) ||
		isNaN(writing) ||
		isNaN(speaking)
	) {
		alert('Please enter all scores (0-9)');
		return;
	}

	const overall = ((listening + reading + writing + speaking) / 4).toFixed(1);

	const scores = JSON.parse(
		localStorage.getItem('ielts-mock-scores') || '[]',
	);
	scores.unshift({
		listening,
		reading,
		writing,
		speaking,
		overall,
		date: new Date().toLocaleDateString(),
	});
	localStorage.setItem(
		'ielts-mock-scores',
		JSON.stringify(scores.slice(0, 20)),
	);

	updateScoreDisplay();
}

function deleteScore(index) {
	const scores = JSON.parse(
		localStorage.getItem('ielts-mock-scores') || '[]',
	);
	scores.splice(index, 1);
	localStorage.setItem('ielts-mock-scores', JSON.stringify(scores));
	updateScoreDisplay();
}

// ==================== LISTENING PRACTICE ====================
const LISTENING_RESOURCES = [
	{
		title: 'BBC 6 Minute English',
		url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
		type: 'podcast',
	},
	{
		title: 'British Council Practice',
		url: 'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/listening-practice-test-1',
		type: 'test',
	},
	{ title: 'TED Talks', url: 'https://www.ted.com/talks', type: 'video' },
	{
		title: 'IELTS Liz Listening',
		url: 'https://ieltsliz.com/ielts-listening/',
		type: 'tips',
	},
];

function initListeningPractice() {
	const container = document.getElementById('listening-practice-container');
	if (!container) return;

	container.innerHTML = `
		<div class="space-y-4">
			<div class="grid gap-2">
				${LISTENING_RESOURCES.map(
					(r) => `
					<a href="${r.url}" target="_blank"
						class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 transition-colors">
						<span class="text-2xl">${
							r.type === 'podcast'
								? '🎧'
								: r.type === 'test'
								? '📝'
								: r.type === 'video'
								? '🎬'
								: '💡'
						}</span>
						<div class="flex-1">
							<p class="text-sm font-medium text-gray-900 dark:text-white">${r.title}</p>
							<p class="text-xs text-gray-500 capitalize">${r.type}</p>
						</div>
						<span class="text-gray-400">→</span>
					</a>
				`,
				).join('')}
			</div>

			<!-- Note-taking Area -->
			<div class="space-y-2">
				<label class="text-sm font-medium text-gray-900 dark:text-white">📝 Listening Notes:</label>
				<textarea
					id="listening-notes"
					oninput="saveListeningNotes(this.value)"
					placeholder="Take notes while listening..."
					class="w-full h-32 p-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
				>${localStorage.getItem('ielts-listening-notes') || ''}</textarea>
			</div>

			<!-- Tips -->
			<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
				<p class="text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">🎧 Listening Tips:</p>
				<ul class="text-xs text-blue-700 dark:text-blue-400 space-y-0.5">
					<li>• Read questions before audio plays</li>
					<li>• Listen for signpost words (firstly, however, finally)</li>
					<li>• Watch for spelling and plurals</li>
					<li>• Never leave blanks - always guess</li>
				</ul>
			</div>
		</div>
	`;
}

function saveListeningNotes(value) {
	localStorage.setItem('ielts-listening-notes', value);
}

// ==================== READING PRACTICE ====================
function initReadingPractice() {
	const container = document.getElementById('reading-practice-container');
	if (!container) return;

	const savedTime = localStorage.getItem('ielts-reading-time') || '60:00';

	container.innerHTML = `
		<div class="space-y-4">
			<!-- Reading Timer -->
			<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
				<p class="text-xs text-gray-500 mb-1">Reading Test Timer (60 min)</p>
				<div class="text-3xl font-mono font-bold text-green-600 dark:text-green-400" id="reading-timer-display">
					${savedTime}
				</div>
				<div class="flex gap-2 justify-center mt-3">
					<button onclick="toggleReadingTimer()" id="reading-timer-btn"
						class="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700">
						▶ Start
					</button>
					<button onclick="resetReadingTimer()"
						class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
						↺ Reset
					</button>
				</div>
			</div>

			<!-- Question Type Practice -->
			<div class="space-y-2">
				<h4 class="text-sm font-medium text-gray-900 dark:text-white">Question Types:</h4>
				<div class="grid grid-cols-2 gap-2 text-xs">
					${[
						'Matching Headings',
						'True/False/Not Given',
						'Yes/No/Not Given',
						'Matching Features',
						'Sentence Completion',
						'Summary Completion',
						'Multiple Choice',
						'Short Answer',
					]
						.map(
							(type) => `
						<label class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
							<input type="checkbox" class="rounded text-green-600"
								onchange="toggleReadingType('${type}', this.checked)"
								${
									JSON.parse(
										localStorage.getItem(
											'ielts-reading-mastered',
										) || '[]',
									).includes(type)
										? 'checked'
										: ''
								}>
							<span class="text-gray-700 dark:text-gray-300">${type}</span>
						</label>
					`,
						)
						.join('')}
				</div>
			</div>

			<!-- Resources -->
			<div class="space-y-2">
				<a href="https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/reading-practice-test-1-academic"
					target="_blank"
					class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors">
					<span class="text-2xl">📖</span>
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-900 dark:text-white">British Council Practice Test</p>
						<p class="text-xs text-gray-500">Free official practice</p>
					</div>
					<span class="text-gray-400">→</span>
				</a>
			</div>

			<!-- Tips -->
			<div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
				<p class="text-xs font-medium text-green-800 dark:text-green-300 mb-1">📖 Reading Tips:</p>
				<ul class="text-xs text-green-700 dark:text-green-400 space-y-0.5">
					<li>• Spend ~20 min per passage (hardest last)</li>
					<li>• Skim passage first (1-2 min)</li>
					<li>• Answers appear in order</li>
					<li>• Don't spend too long on one question</li>
				</ul>
			</div>
		</div>
	`;
}

let readingTimerState = { running: false, seconds: 3600, interval: null };

function toggleReadingTimer() {
	const btn = document.getElementById('reading-timer-btn');
	if (readingTimerState.running) {
		clearInterval(readingTimerState.interval);
		readingTimerState.running = false;
		btn.innerHTML = '▶ Start';
		btn.classList.remove('bg-red-600', 'hover:bg-red-700');
		btn.classList.add('bg-green-600', 'hover:bg-green-700');
	} else {
		readingTimerState.running = true;
		btn.innerHTML = '⏸ Pause';
		btn.classList.remove('bg-green-600', 'hover:bg-green-700');
		btn.classList.add('bg-red-600', 'hover:bg-red-700');

		readingTimerState.interval = setInterval(() => {
			if (readingTimerState.seconds > 0) {
				readingTimerState.seconds--;
				const mins = Math.floor(readingTimerState.seconds / 60);
				const secs = readingTimerState.seconds % 60;
				const display = document.getElementById(
					'reading-timer-display',
				);
				if (display) {
					display.textContent = `${String(mins).padStart(
						2,
						'0',
					)}:${String(secs).padStart(2, '0')}`;
					localStorage.setItem(
						'ielts-reading-time',
						display.textContent,
					);
				}
			} else {
				clearInterval(readingTimerState.interval);
				alert('⏰ Time is up!');
			}
		}, 1000);
	}
}

function resetReadingTimer() {
	clearInterval(readingTimerState.interval);
	readingTimerState.running = false;
	readingTimerState.seconds = 3600;
	const display = document.getElementById('reading-timer-display');
	if (display) display.textContent = '60:00';
	localStorage.setItem('ielts-reading-time', '60:00');
	const btn = document.getElementById('reading-timer-btn');
	if (btn) {
		btn.innerHTML = '▶ Start';
		btn.classList.remove('bg-red-600', 'hover:bg-red-700');
		btn.classList.add('bg-green-600', 'hover:bg-green-700');
	}
}

function toggleReadingType(type, checked) {
	let mastered = JSON.parse(
		localStorage.getItem('ielts-reading-mastered') || '[]',
	);
	if (checked) {
		if (!mastered.includes(type)) mastered.push(type);
	} else {
		mastered = mastered.filter((t) => t !== type);
	}
	localStorage.setItem('ielts-reading-mastered', JSON.stringify(mastered));
}

// ==================== INITIALIZE ALL TOOLS ====================
function initIELTSTools() {
	initFlashcards();
	initWritingPractice();
	initSpeakingPractice();
	initScoreTracker();
	initListeningPractice();
	initReadingPractice();
}

// ==================== TAB SWITCHING ====================
function openIELTSTool(tool) {
	// Hide all tool containers
	const containers = document.querySelectorAll('.ielts-tool-content');
	containers.forEach((c) => c.classList.add('hidden'));

	// Remove active state from all tabs
	const tabs = document.querySelectorAll('.ielts-tool-tab');
	tabs.forEach((t) => {
		t.classList.remove('bg-teal-600', 'text-white');
		t.classList.add(
			'bg-gray-200',
			'dark:bg-gray-700',
			'text-gray-700',
			'dark:text-gray-300',
		);
	});

	// Show selected container
	const selectedContainer = document.getElementById(`${tool}-tool-container`);
	if (selectedContainer) {
		selectedContainer.classList.remove('hidden');
	}

	// Activate selected tab
	const selectedTab = document.getElementById(`tab-${tool}`);
	if (selectedTab) {
		selectedTab.classList.remove(
			'bg-gray-200',
			'dark:bg-gray-700',
			'text-gray-700',
			'dark:text-gray-300',
		);
		selectedTab.classList.add('bg-teal-600', 'text-white');
	}

	// Initialize the specific tool
	switch (tool) {
		case 'vocab':
			initVocabTool();
			break;
		case 'speaking':
			initSpeakingTool();
			break;
		case 'writing':
			initWritingTool();
			break;
		case 'mock':
			initMockTestTool();
			break;
		case 'resources':
			initResourcesTool();
			break;
	}
}

function initVocabTool() {
	const container = document.getElementById('vocab-tool-container');
	if (!container) return;

	container.innerHTML = `
		<div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">📚 Band 8+ Vocabulary Builder</h3>
			<div id="flashcard-container"></div>
		</div>
	`;
	initFlashcards();
}

function initSpeakingTool() {
	const container = document.getElementById('speaking-tool-container');
	if (!container) return;

	container.innerHTML = `
		<div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎤 Speaking Practice Timer</h3>
			<div id="speaking-practice-container"></div>
		</div>
	`;
	initSpeakingPractice();
}

function initWritingTool() {
	const container = document.getElementById('writing-tool-container');
	if (!container) return;

	container.innerHTML = `
		<div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">✍️ Writing Practice</h3>
			<div id="writing-practice-container"></div>
		</div>
	`;
	initWritingPractice();
}

function initMockTestTool() {
	const container = document.getElementById('mock-tool-container');
	if (!container) return;

	container.innerHTML = `
		<div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 Mock Test Center</h3>

			<!-- Listening Timer -->
			<div class="border-b border-gray-200 dark:border-gray-700 pb-6">
				<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">🎧 Listening Test (30 min)</h4>
				<div id="listening-practice-container"></div>
			</div>

			<!-- Reading Timer -->
			<div class="border-b border-gray-200 dark:border-gray-700 pb-6">
				<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">📖 Reading Test (60 min)</h4>
				<div id="reading-practice-container"></div>
			</div>

			<!-- Score Tracker -->
			<div>
				<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">📊 Score Tracker</h4>
				<div id="score-tracker-container"></div>
			</div>
		</div>
	`;
	initListeningPractice();
	initReadingPractice();
	initScoreTracker();
}

// Export for global use
window.initIELTSTools = initIELTSTools;
window.openIELTSTool = openIELTSTool;
window.initFlashcards = initFlashcards;
window.initWritingPractice = initWritingPractice;
window.initSpeakingPractice = initSpeakingPractice;
window.initScoreTracker = initScoreTracker;
window.initListeningPractice = initListeningPractice;
window.initReadingPractice = initReadingPractice;
window.initVocabTool = initVocabTool;
window.initSpeakingTool = initSpeakingTool;
window.initWritingTool = initWritingTool;
window.initMockTestTool = initMockTestTool;

// Vocabulary functions
window.nextFlashcard = nextFlashcard;
window.prevFlashcard = prevFlashcard;
window.changeVocabCategory = changeVocabCategory;
window.toggleLearnedWord = toggleLearnedWord;
window.flipFlashcard = flipFlashcard;
window.shuffleFlashcards = shuffleFlashcards;

// Writing functions
window.selectWritingTask = selectWritingTask;
window.toggleWritingTimer = toggleWritingTimer;
window.resetWritingTimer = resetWritingTimer;
window.saveEssay = saveEssay;
window.deleteEssay = deleteEssay;
window.showSavedEssays = showSavedEssays;
window.updateWritingDisplay = updateWritingDisplay;

// Speaking functions
window.selectSpeakingPart = selectSpeakingPart;
window.toggleSpeakingRecording = toggleSpeakingRecording;
window.resetSpeakingTimer = resetSpeakingTimer;
window.getNewTopic = getNewTopic;
window.playRecording = playRecording;
window.deleteRecording = deleteRecording;

// Score tracker functions
window.saveMockScore = saveMockScore;
window.deleteScore = deleteScore;

// Reading functions
window.toggleReadingTimer = toggleReadingTimer;
window.resetReadingTimer = resetReadingTimer;
window.toggleReadingType = toggleReadingType;

// Resources function
window.initResourcesTool = initResourcesTool;

// ==================== IELTS RESOURCES LIBRARY ====================
function initResourcesTool() {
	const container = document.getElementById('resources-tool-container');
	if (!container) return;

	container.innerHTML = `
		<div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">📖 IELTS Study Resources</h3>

			<div class="space-y-6">
				<!-- Cambridge IELTS Books -->
				<div>
					<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
						<span>📚</span> Cambridge IELTS Books (Official)
					</h4>
					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
						${[19, 18, 17, 16, 15, 14, 13]
							.map(
								(num) => `
							<a href="https://www.cambridgeenglish.org/exams-and-tests/ielts/" target="_blank"
								class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
								<div class="text-2xl mb-1">📕</div>
								<div class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">IELTS ${num}</div>
								<div class="text-[10px] text-gray-500">Cambridge</div>
							</a>
						`,
							)
							.join('')}
					</div>
				</div>

				<!-- Free Online Resources -->
				<div>
					<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
						<span>🌐</span> Free Online Practice
					</h4>
					<div class="grid gap-3 sm:grid-cols-2">
						<a href="https://ieltsliz.com/" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">👩‍🏫</span>
							<div>
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">IELTS Liz</div>
								<div class="text-xs text-gray-500">Free lessons & tips</div>
							</div>
						</a>
						<a href="https://www.ielts.org/for-test-takers/sample-test-questions" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">📝</span>
							<div>
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">IELTS.org</div>
								<div class="text-xs text-gray-500">Official sample tests</div>
							</div>
						</a>
						<a href="https://www.britishcouncil.org/exam/ielts/prepare" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">🇬🇧</span>
							<div>
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">British Council</div>
								<div class="text-xs text-gray-500">Free prep materials</div>
							</div>
						</a>
						<a href="https://www.idp.com/australia/ielts/prepare/" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">🌏</span>
							<div>
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">IDP IELTS</div>
								<div class="text-xs text-gray-500">Practice & resources</div>
							</div>
						</a>
					</div>
				</div>

				<!-- YouTube Channels -->
				<div>
					<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
						<span>▶️</span> YouTube Channels
					</h4>
					<div class="grid gap-3 sm:grid-cols-2">
						<a href="https://www.youtube.com/@iaborameen" target="_blank"
							class="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
							<span class="text-2xl">🎬</span>
							<div>
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">IELTS with Abo Rameen</div>
								<div class="text-xs text-gray-500">Band 9 strategies</div>
							</div>
						</a>
						<a href="https://www.youtube.com/@IELTSLiz" target="_blank"
							class="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
							<span class="text-2xl">🎬</span>
							<div>
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">IELTS Liz</div>
								<div class="text-xs text-gray-500">All sections covered</div>
							</div>
						</a>
						<a href="https://www.youtube.com/@E2IELTS" target="_blank"
							class="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
							<span class="text-2xl">🎬</span>
							<div>
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">E2 IELTS</div>
								<div class="text-xs text-gray-500">High-quality lessons</div>
							</div>
						</a>
						<a href="https://www.youtube.com/@AsadYaqub" target="_blank"
							class="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
							<span class="text-2xl">🎬</span>
							<div>
								<div class="text-sm font-medium text-gray-700 dark:text-gray-300">Asad Yaqub</div>
								<div class="text-xs text-gray-500">Tips & mock tests</div>
							</div>
						</a>
					</div>
				</div>

				<!-- Daily Practice Folder -->
				<div>
					<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
						<span>📂</span> Your IELTS Study Material (15 Days)
					</h4>
					<div class="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
						<p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
							Access your prepared materials in the <strong>IELTS Tracker</strong> page. Each day includes:
						</p>
						<ul class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
							<li>✅ 70 vocabulary words with examples</li>
							<li>✅ Reading strategies & practice</li>
							<li>✅ Listening techniques</li>
							<li>✅ Writing templates (Task 1 & 2)</li>
							<li>✅ Speaking topics & sample answers</li>
							<li>✅ Pronunciation guides</li>
						</ul>
						<button onclick="showPage('ielts')" class="mt-3 text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline">
							→ Go to IELTS Tracker
						</button>
					</div>
				</div>
			</div>
		</div>
	`;
}
