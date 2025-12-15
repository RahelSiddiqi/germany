// IELTS Practice Folder Browser & Markdown Viewer
// Tailwind CSS version - mobile-friendly

// Text-to-Speech for vocabulary
function speakWord(word) {
	if ('speechSynthesis' in window) {
		window.speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(word);
		utterance.lang = 'en-GB';
		utterance.rate = 0.85;
		const voices = window.speechSynthesis.getVoices();
		const britishVoice = voices.find(
			(v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB'),
		);
		if (britishVoice) utterance.voice = britishVoice;
		window.speechSynthesis.speak(utterance);
	}
}

// Preload voices
if ('speechSynthesis' in window) {
	window.speechSynthesis.getVoices();
	window.speechSynthesis.onvoiceschanged = () =>
		window.speechSynthesis.getVoices();
}

// Define available folders and their contents (15-day plan)
const IELTS_FOLDERS = {
	d1: {
		name: 'Day 1',
		icon: '📅',
		files: [
			'vocab.md',
			'ipa.md',
			'vowels.md',
			'consonants.md',
			'pronunciation-practice.md',
			'all-sounds-complete.md',
		],
	},
	d2: {
		name: 'Day 2',
		icon: '📅',
		files: ['vocab.md', 'reading-strategies.md', 'listening-strategies.md'],
	},
	d3: {
		name: 'Day 3',
		icon: '📅',
		files: ['vocab.md', 'listening-practice.md'],
	},
	d4: {
		name: 'Day 4',
		icon: '📅',
		files: ['vocab.md', 'reading-practice.md'],
	},
	d5: {
		name: 'Day 5',
		icon: '📅',
		files: ['vocab.md', 'writing-task1.md', 'speaking-part2.md'],
	},
	d6: {
		name: 'Day 6',
		icon: '📅',
		files: ['vocab.md', 'writing-task1-advanced.md'],
	},
	d7: { name: 'Day 7', icon: '📅', files: ['vocab.md', 'writing-task2.md'] },
	d8: {
		name: 'Day 8',
		icon: '📅',
		files: ['vocab.md', 'speaking-complete.md'],
	},
	d9: { name: 'Day 9', icon: '📅', files: ['vocab.md', 'mixed-practice.md'] },
	d10: { name: 'Day 10', icon: '📅', files: ['weakness-focus.md'] },
	d11: { name: 'Day 11', icon: '📅', files: ['mock-test-1.md'] },
	d12: { name: 'Day 12', icon: '📅', files: ['review-analysis.md'] },
	d13: {
		name: 'Day 13',
		icon: '📅',
		files: ['vocab.md', 'targeted-practice.md'],
	},
	d14: { name: 'Day 14', icon: '📅', files: ['mock-test-2.md'] },
	d15: { name: 'Day 15', icon: '📅', files: ['final-prep.md'] },
};

// Get ordered folder keys
const FOLDER_ORDER = Object.keys(IELTS_FOLDERS);

let currentFolder = null;
let currentFile = null;

// Navigate to previous/next day
function navigateIELTSDay(direction) {
	if (!currentFolder) return;

	const currentIndex = FOLDER_ORDER.indexOf(currentFolder);
	const newIndex = currentIndex + direction;

	if (newIndex >= 0 && newIndex < FOLDER_ORDER.length) {
		openIELTSFolder(FOLDER_ORDER[newIndex]);
	}
}

// Update navigation button states
function updateDayNavButtons() {
	const prevBtn = document.getElementById('ielts-prev-day');
	const nextBtn = document.getElementById('ielts-next-day');

	if (!currentFolder) return;

	const currentIndex = FOLDER_ORDER.indexOf(currentFolder);

	if (prevBtn) {
		prevBtn.disabled = currentIndex <= 0;
	}
	if (nextBtn) {
		nextBtn.disabled = currentIndex >= FOLDER_ORDER.length - 1;
	}
}

// Initialize folder view when page loads
function initIELTSPractice() {
	showIELTSFolders();
}

// Show folder grid
function showIELTSFolders() {
	const container = document.getElementById('ielts-folder-list');
	const fileList = document.getElementById('ielts-file-list');
	const viewer = document.getElementById('ielts-content-viewer');
	const quiz = document.getElementById('ielts-quiz-container');

	if (!container) return;

	container.style.display = 'grid';
	if (fileList) fileList.style.display = 'none';
	if (viewer) viewer.style.display = 'none';
	if (quiz) quiz.style.display = 'none';

	container.innerHTML = Object.entries(IELTS_FOLDERS)
		.map(
			([key, folder]) => `
		<div onclick="openIELTSFolder('${key}')"
			 class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-teal-300 dark:hover:border-teal-600 transition-all group">
			<div class="text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">${
				folder.icon
			}</div>
			<div class="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">${
				folder.name
			}</div>
			<div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">${
				folder.files.length
			} file${folder.files.length !== 1 ? 's' : ''}</div>
		</div>
	`,
		)
		.join('');

	if (Object.keys(IELTS_FOLDERS).length === 0) {
		container.innerHTML = `
			<div class="col-span-full text-center py-16 text-gray-500 dark:text-gray-400">
				<p>No practice folders yet</p>
			</div>
		`;
	}
}

// Open a folder and show its files
async function openIELTSFolder(folderId) {
	const folder = IELTS_FOLDERS[folderId];
	if (!folder) return;

	currentFolder = folderId;

	const container = document.getElementById('ielts-folder-list');
	const fileList = document.getElementById('ielts-file-list');
	const filesDiv = document.getElementById('ielts-files');
	const folderName = document.getElementById('current-folder-name');

	if (container) container.style.display = 'none';
	if (fileList) fileList.style.display = 'block';

	// Update navigation buttons
	updateDayNavButtons();
	if (folderName) folderName.textContent = folder.name;

	let files = folder.files;

	if (filesDiv) {
		if (files.length === 0) {
			filesDiv.innerHTML = `
				<div class="text-center py-16 text-gray-500 dark:text-gray-400">
					<p class="text-lg">No files in this folder yet</p>
					<p class="text-sm mt-2">Add .md files to ielts/${folderId}/</p>
				</div>
			`;
		} else {
			filesDiv.innerHTML = files
				.map((file) => {
					const isVocab = file.includes('vocab');
					const isIPA = file.includes('ipa');
					const icon = isVocab ? '🔤' : isIPA ? '🔈' : '📄';
					const name = file
						.replace('.md', '')
						.replace(/_/g, ' ')
						.replace(/-/g, ' ');

					return `
					<div class="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600 transition-colors">
						<div class="flex items-center gap-3 cursor-pointer flex-1" onclick="openIELTSFile('${folderId}', '${file}')">
							<span class="text-xl">${icon}</span>
							<span class="font-medium text-gray-900 dark:text-white capitalize">${name}</span>
						</div>
						<div class="flex items-center gap-2">
							<button onclick="openIELTSFile('${folderId}', '${file}')"
									class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
									title="View">
								👁️
							</button>
							${
								isVocab
									? `
								<button onclick="startQuizFromFile('${folderId}', '${file}')"
										class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
										title="Quiz">
									🧪
								</button>
							`
									: ''
							}
						</div>
					</div>
				`;
				})
				.join('');
		}
	}
}

// Open a file and render its content
async function openIELTSFile(folderId, filename) {
	const path = `ielts/${folderId}/${filename}`;
	currentFile = { folder: folderId, file: filename };

	const fileList = document.getElementById('ielts-file-list');
	const viewer = document.getElementById('ielts-content-viewer');
	const content = document.getElementById('ielts-md-content');

	if (fileList) fileList.style.display = 'none';
	if (viewer) viewer.style.display = 'block';

	if (content) {
		const folder = IELTS_FOLDERS[folderId];
		const folderName = folder ? folder.name : folderId;
		const displayName = filename.replace('.md', '').replace(/[-_]/g, ' ');

		// Build navigation
		const folderKeys = Object.keys(IELTS_FOLDERS);
		const currentIndex = folderKeys.indexOf(folderId);
		const prevFolder =
			currentIndex > 0 ? folderKeys[currentIndex - 1] : null;
		const nextFolder =
			currentIndex < folderKeys.length - 1
				? folderKeys[currentIndex + 1]
				: null;

		const fileIndex = folder.files.indexOf(filename);
		const prevFile = fileIndex > 0 ? folder.files[fileIndex - 1] : null;
		const nextFile =
			fileIndex < folder.files.length - 1
				? folder.files[fileIndex + 1]
				: null;

		content.innerHTML = `
			<div class="space-y-3 sm:space-y-4">
				<!-- Day Navigation -->
				<div class="flex items-center justify-between gap-2 sm:gap-4 p-2 sm:p-4 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 mx-1 sm:mx-0">
					${
						prevFolder
							? `
						<button onclick="openIELTSFolder('${prevFolder}')"
								class="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
							<svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
							</svg>
							<span class="hidden sm:inline">${IELTS_FOLDERS[prevFolder].name}</span>
						</button>
					`
							: '<span></span>'
					}
					<div class="text-center flex-1 min-w-0">
						<span class="px-2 py-0.5 sm:px-3 sm:py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-[10px] sm:text-xs font-medium">${folderName}</span>
						<h2 class="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mt-1 sm:mt-2 capitalize truncate">${displayName}</h2>
					</div>
					${
						nextFolder
							? `
						<button onclick="openIELTSFolder('${nextFolder}')"
								class="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
							<span class="hidden sm:inline">${IELTS_FOLDERS[nextFolder].name}</span>
							<svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</button>
					`
							: '<span></span>'
					}
				</div>

				<!-- File Navigation -->
				${
					prevFile || nextFile
						? `
					<div class="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
						${
							prevFile
								? `
							<button onclick="openIELTSFile('${folderId}', '${prevFile}')"
									class="text-teal-600 dark:text-teal-400 hover:underline truncate max-w-[120px] sm:max-w-none">
								← ${prevFile.replace('.md', '').replace(/[-_]/g, ' ')}
							</button>
						`
								: ''
						}
						${
							prevFile && nextFile
								? '<span class="text-gray-300 dark:text-gray-600">|</span>'
								: ''
						}
						${
							nextFile
								? `
							<button onclick="openIELTSFile('${folderId}', '${nextFile}')"
									class="text-teal-600 dark:text-teal-400 hover:underline truncate max-w-[120px] sm:max-w-none">
								${nextFile.replace('.md', '').replace(/[-_]/g, ' ')} →
							</button>
						`
								: ''
						}
					</div>
				`
						: ''
				}

				<!-- Content -->
				<div class="md-content bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 -mx-2 sm:mx-0">
					<div class="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
						<div class="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-3"></div>
						Loading content...
					</div>
				</div>
			</div>
		`;

		try {
			const res = await fetch(path);
			if (!res.ok) throw new Error(`Failed to load ${path}`);
			const md = await res.text();
			const body = content.querySelector('.md-content');
			if (body) {
				body.innerHTML = renderMarkdownTailwind(md);
				addSpeakButtonsToTables(body);
			}
		} catch (err) {
			const body = content.querySelector('.md-content');
			if (body)
				body.innerHTML = `<div class="text-center py-8 text-red-500">⚠️ ${err.message}</div>`;
		}
	}
}

// Add speak buttons to vocabulary tables
function addSpeakButtonsToTables(container) {
	const tables = container.querySelectorAll('table');
	tables.forEach((table) => {
		const headers = table.querySelectorAll('th');
		let wordColIndex = -1;

		headers.forEach((th, i) => {
			const text = th.textContent.toLowerCase();
			if (
				text.includes('word') ||
				text === 'vocabulary' ||
				text === 'term'
			) {
				wordColIndex = i;
			}
		});

		if (wordColIndex >= 0) {
			const rows = table.querySelectorAll('tbody tr');
			rows.forEach((row) => {
				const cells = row.querySelectorAll('td');
				if (cells[wordColIndex]) {
					const word = cells[wordColIndex].textContent.trim();
					if (
						word &&
						!cells[wordColIndex].querySelector('.speak-btn')
					) {
						const speakBtn = document.createElement('button');
						speakBtn.className =
							'speak-btn ml-2 text-teal-500 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors';
						speakBtn.innerHTML = '🔊';
						speakBtn.title = `Speak: ${word}`;
						speakBtn.onclick = (e) => {
							e.stopPropagation();
							speakWord(word);
						};
						cells[wordColIndex].appendChild(speakBtn);
					}
				}
			});
		}
	});
}

// Back to file list
function backToFiles() {
	const viewer = document.getElementById('ielts-content-viewer');
	const quiz = document.getElementById('ielts-quiz-container');
	const fileList = document.getElementById('ielts-file-list');

	if (viewer) viewer.style.display = 'none';
	if (quiz) quiz.style.display = 'none';
	if (fileList) fileList.style.display = 'block';
}

// Start quiz from file
async function startQuizFromFile(folderId, filename) {
	const path = `ielts/${folderId}/${filename}`;

	const fileList = document.getElementById('ielts-file-list');
	const quiz = document.getElementById('ielts-quiz-container');
	const quizContent = document.getElementById('quiz-content');

	if (fileList) fileList.style.display = 'none';
	if (quiz) quiz.style.display = 'block';

	if (quizContent) {
		quizContent.innerHTML = `
			<div class="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
				<div class="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-3"></div>
				Generating quiz...
			</div>
		`;

		try {
			const res = await fetch(path);
			if (!res.ok) throw new Error(`Failed to load ${path}`);
			const md = await res.text();
			const questions = parseVocabForQuiz(md);

			if (questions.length === 0) {
				quizContent.innerHTML = `<div class="text-center py-8 text-amber-600 dark:text-amber-400">No vocabulary table found for quiz</div>`;
				return;
			}

			renderQuiz(questions.slice(0, 10), quizContent);
		} catch (err) {
			quizContent.innerHTML = `<div class="text-center py-8 text-red-500">⚠️ ${err.message}</div>`;
		}
	}
}

// Parse vocabulary table for quiz
function parseVocabForQuiz(md) {
	const questions = [];
	const tableMatch = md.match(/\|(.+)\|[\s\S]*?(?=\n\n|\n#|$)/g);

	if (!tableMatch) return questions;

	tableMatch.forEach((table) => {
		const rows = table.split('\n').filter((r) => r.trim().startsWith('|'));
		if (rows.length < 2) return;

		const headerCells = rows[0]
			.split('|')
			.map((c) => c.trim().toLowerCase())
			.filter(Boolean);
		let wordIndex = headerCells.findIndex(
			(h) => h === 'word' || h.includes('word'),
		);
		let meaningIndex = headerCells.findIndex(
			(h) =>
				h === 'english meaning' ||
				h === 'meaning' ||
				h.includes('meaning'),
		);
		let ipaIndex = headerCells.findIndex(
			(h) => h === 'pronunciation' || h === 'ipa' || h.includes('pronun'),
		);

		if (wordIndex === -1) wordIndex = 0;
		if (meaningIndex === -1) meaningIndex = 1;

		const dataRows = rows.slice(2);

		dataRows.forEach((row) => {
			const cells = row
				.split('|')
				.map((c) => c.trim())
				.filter(Boolean);
			const word = cells[wordIndex]
				? cells[wordIndex].replace(/\*\*/g, '').trim()
				: '';
			const meaning = cells[meaningIndex]
				? cells[meaningIndex].trim()
				: '';
			const ipa =
				ipaIndex >= 0 && cells[ipaIndex] ? cells[ipaIndex].trim() : '';

			if (
				word &&
				meaning &&
				!word.match(/^[-]+$/) &&
				!word.match(/^\d+$/)
			) {
				questions.push({ word, meaning, ipa });
			}
		});
	});

	return questions;
}

// Render quiz
function renderQuiz(questions, container) {
	const shuffled = [...questions].sort(() => Math.random() - 0.5);

	container.innerHTML = `
		<div class="space-y-6">
			<div class="text-center">
				<h3 class="text-xl font-bold text-gray-900 dark:text-white">🧪 Vocabulary Quiz</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${
					shuffled.length
				} questions</p>
			</div>

			<form id="vocab-quiz-form" onsubmit="gradeQuiz(event)" class="space-y-6">
				${shuffled
					.map((q, i) => {
						const wrongAnswers = questions
							.filter((x) => x.word !== q.word)
							.sort(() => Math.random() - 0.5)
							.slice(0, 3)
							.map((x) => x.meaning);
						const options = [...wrongAnswers, q.meaning].sort(
							() => Math.random() - 0.5,
						);

						return `
						<div class="quiz-question bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
							<div class="mb-4">
								<span class="font-medium text-gray-900 dark:text-white">${i + 1}.</span>
								What does "<span class="text-teal-600 dark:text-teal-400 font-semibold">${
									q.word
								}</span>" mean?
								${
									q.ipa
										? `<span class="text-sm text-gray-500 dark:text-gray-400 ml-2">${q.ipa}</span>`
										: ''
								}
							</div>
							<div class="space-y-2">
								${options
									.map(
										(opt) => `
									<label class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
										<input type="radio" name="q${i}" value="${opt}" data-correct="${q.meaning}"
											   class="w-4 h-4 text-teal-600 focus:ring-teal-500">
										<span class="text-gray-700 dark:text-gray-300">${opt}</span>
									</label>
								`,
									)
									.join('')}
							</div>
						</div>
					`;
					})
					.join('')}

				<button type="submit" class="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors">
					📊 Check Answers
				</button>
			</form>

			<div id="quiz-results" class="hidden"></div>
		</div>
	`;
}

// Grade quiz
function gradeQuiz(event) {
	event.preventDefault();

	const form = document.getElementById('vocab-quiz-form');
	const results = document.getElementById('quiz-results');
	const questions = form.querySelectorAll('.quiz-question');

	let correct = 0;
	let total = questions.length;

	questions.forEach((q, i) => {
		const selected = form.querySelector(`input[name="q${i}"]:checked`);
		const correctAnswer = form.querySelector(`input[name="q${i}"]`).dataset
			.correct;

		q.classList.remove(
			'border-green-500',
			'border-red-500',
			'bg-green-50',
			'dark:bg-green-900/20',
			'bg-red-50',
			'dark:bg-red-900/20',
		);

		if (selected) {
			const isCorrect = selected.value === correctAnswer;
			if (isCorrect) {
				correct++;
				q.classList.add(
					'border-green-500',
					'bg-green-50',
					'dark:bg-green-900/20',
				);
			} else {
				q.classList.add(
					'border-red-500',
					'bg-red-50',
					'dark:bg-red-900/20',
				);
			}
		} else {
			q.classList.add('border-amber-500');
		}
	});

	const percentage = Math.round((correct / total) * 100);
	const emoji =
		percentage >= 90
			? '🏆'
			: percentage >= 70
			? '👍'
			: percentage >= 50
			? '📚'
			: '💪';
	const bgClass =
		percentage >= 70
			? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
			: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';

	results.innerHTML = `
		<div class="text-center p-6 ${bgClass} rounded-xl border-2">
			<div class="text-4xl mb-2">${emoji}</div>
			<div class="text-3xl font-bold text-gray-900 dark:text-white">${percentage}%</div>
			<p class="text-gray-600 dark:text-gray-400 mt-1">${correct}/${total} correct</p>
			<button onclick="backToFiles()" class="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors">
				Try Another
			</button>
		</div>
	`;
	results.classList.remove('hidden');
	form.querySelector('button[type="submit"]').style.display = 'none';
}

// Helper: escape HTML
function escapeHtml(str) {
	return str.replace(
		/[&<>"']/g,
		(c) =>
			({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;',
			}[c]),
	);
}

// Helper: process inline markdown
function processInlineMarkdown(str) {
	return str
		.replace(
			/\*\*\*(.*?)\*\*\*/g,
			'<strong class="font-bold"><em>$1</em></strong>',
		)
		.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
		.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
		.replace(
			/`([^`]+)`/g,
			'<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-teal-600 dark:text-teal-400">$1</code>',
		)
		.replace(
			/\[(.*?)\]\((.*?)\)/g,
			'<a href="$2" target="_blank" rel="noopener" class="text-teal-600 dark:text-teal-400 hover:underline">$1</a>',
		);
}

// Tailwind-styled markdown renderer
function renderMarkdownTailwind(md) {
	const lines = md.split('\n');
	const output = [];
	let inTable = false;
	let tableRows = [];
	let inList = false;
	let listItems = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();

		// Table detection
		if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
			if (!inTable) {
				inTable = true;
				tableRows = [];
			}
			tableRows.push(trimmed);
			continue;
		} else if (inTable) {
			output.push(renderTableTailwind(tableRows));
			inTable = false;
			tableRows = [];
		}

		// List items
		if (/^[-*]\s+/.test(trimmed)) {
			if (!inList) {
				inList = true;
				listItems = [];
			}
			listItems.push(trimmed.replace(/^[-*]\s+/, ''));
			continue;
		} else if (inList) {
			output.push(
				'<ul class="space-y-1.5 sm:space-y-2 my-3 sm:my-4">' +
					listItems
						.map(
							(li) =>
								`<li class="flex items-start gap-2"><span class="text-teal-500 mt-0.5 sm:mt-1 text-sm">•</span><span class="text-gray-700 dark:text-gray-300 text-sm sm:text-base">${processInlineMarkdown(
									escapeHtml(li),
								)}</span></li>`,
						)
						.join('') +
					'</ul>',
			);
			inList = false;
			listItems = [];
		}

		// Headings
		if (/^#{1,6}\s/.test(trimmed)) {
			const level = trimmed.match(/^#+/)[0].length;
			const text = trimmed.replace(/^#+\s+/, '');
			const classes = {
				1: 'text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-4 sm:mt-6 mb-3 sm:mb-4',
				2: 'text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-4 sm:mt-6 mb-2 sm:mb-3',
				3: 'text-base sm:text-lg font-semibold text-gray-900 dark:text-white mt-4 sm:mt-5 mb-2',
				4: 'text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 mt-3 sm:mt-4 mb-2',
				5: 'text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mt-2 sm:mt-3 mb-1',
				6: 'text-xs font-medium text-gray-600 dark:text-gray-300 mt-2 mb-1',
			};
			output.push(
				`<h${level} class="${classes[level]}">${processInlineMarkdown(
					escapeHtml(text),
				)}</h${level}>`,
			);
			continue;
		}

		// Horizontal rule
		if (/^---+$/.test(trimmed)) {
			output.push(
				'<hr class="my-6 border-gray-200 dark:border-gray-700">',
			);
			continue;
		}

		// Blockquote
		if (/^>\s*/.test(trimmed)) {
			const text = trimmed.replace(/^>\s*/, '');
			output.push(
				`<blockquote class="border-l-4 border-teal-500 pl-4 py-2 my-4 bg-teal-50 dark:bg-teal-900/20 text-gray-700 dark:text-gray-300 italic">${processInlineMarkdown(
					escapeHtml(text),
				)}</blockquote>`,
			);
			continue;
		}

		// Empty line
		if (trimmed === '') {
			continue;
		}

		// Regular paragraph
		output.push(
			`<p class="text-gray-700 dark:text-gray-300 my-2 sm:my-3 leading-relaxed text-sm sm:text-base">${processInlineMarkdown(
				escapeHtml(trimmed),
			)}</p>`,
		);
	}

	if (inTable && tableRows.length > 0) {
		output.push(renderTableTailwind(tableRows));
	}

	if (inList && listItems.length > 0) {
		output.push(
			'<ul class="space-y-1.5 sm:space-y-2 my-3 sm:my-4">' +
				listItems
					.map(
						(li) =>
							`<li class="flex items-start gap-2"><span class="text-teal-500 mt-0.5 sm:mt-1 text-sm">•</span><span class="text-gray-700 dark:text-gray-300 text-sm sm:text-base">${processInlineMarkdown(
								escapeHtml(li),
							)}</span></li>`,
					)
					.join('') +
				'</ul>',
		);
	}

	return output.join('\n');
}

// Render table with Tailwind - Mobile optimized with IPA/Vocab special handling
function renderTableTailwind(rows) {
	if (rows.length < 2) return rows.join('\n');

	const parsedRows = rows
		.filter((r) => r != null && typeof r === 'string')
		.map((r) => {
			const cleaned = r.replace(/^\||\|$/g, '');
			return cleaned.split('|').map((c) => c.trim());
		});

	const dataRows = parsedRows.filter(
		(row) => !row.every((c) => /^:?-+:?$/.test(c)),
	);
	if (dataRows.length < 1) return rows.join('\n');

	const headerRow = dataRows[0];
	const bodyRows = dataRows.slice(1);

	// Detect table type
	const headerLower = headerRow.map((h) => h.toLowerCase());
	const isIPATable =
		headerLower.some((h) => h.includes('symbol') || h.includes('ipa')) &&
		headerLower.some(
			(h) =>
				h.includes('sound') ||
				h.includes('বাংলা') ||
				h.includes('bangla'),
		);
	const isVocabTable =
		headerLower.some((h) => h === 'word' || h.includes('word')) &&
		(headerLower.includes('type') || headerLower.includes('level'));

	const wordColIndex = headerRow.findIndex(
		(h) => h.toLowerCase().includes('word') || h.toLowerCase() === 'word',
	);
	const hasAudioColumn = headerRow.some((h) =>
		h.toLowerCase().includes('audio'),
	);

	let filteredHeaderRow = headerRow;
	let filteredBodyRows = bodyRows;

	// Remove Audio column if exists
	if (hasAudioColumn) {
		const audioColIndex = headerRow.findIndex((h) =>
			h.toLowerCase().includes('audio'),
		);
		filteredHeaderRow = headerRow.filter((_, i) => i !== audioColIndex);
		filteredBodyRows = bodyRows.map((row) =>
			row.filter((_, i) => i !== audioColIndex),
		);
	}

	// Special handling for IPA tables - merge Sound + বাংলা হিন্ট
	if (isIPATable) {
		return renderIPATable(filteredHeaderRow, filteredBodyRows);
	}

	// Special handling for Vocab tables - compact layout
	if (isVocabTable) {
		return renderVocabTable(
			filteredHeaderRow,
			filteredBodyRows,
			wordColIndex,
		);
	}

	const finalHeaderRow =
		wordColIndex >= 0 ? [...filteredHeaderRow, '🔊'] : filteredHeaderRow;

	const thead = `<tr>${finalHeaderRow
		.map(
			(c) =>
				`<th class="px-2 py-2 sm:px-3 sm:py-2.5 text-left text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700">${processInlineMarkdown(
					escapeHtml(c),
				)}</th>`,
		)
		.join('')}</tr>`;

	const tbody = filteredBodyRows
		.map((row) => {
			const word =
				wordColIndex >= 0 && row[wordColIndex]
					? row[wordColIndex].replace(/\*\*/g, '').trim()
					: null;
			const cells = row
				.map(
					(c) =>
						`<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">${processInlineMarkdown(
							escapeHtml(c || ''),
						)}</td>`,
				)
				.join('');
			const audioCell =
				wordColIndex >= 0 && word
					? `<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 text-center"><button onclick="speakWord('${word.replace(
							/'/g,
							"\\'",
					  )}')" class="text-teal-500 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors text-lg">▶</button></td>`
					: '';
			return `<tr class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">${cells}${audioCell}</tr>`;
		})
		.join('');

	return `
		<div class="overflow-x-auto my-3 sm:my-6 -mx-2 sm:mx-0 sm:rounded-xl border-y sm:border border-gray-200 dark:border-gray-700">
			<table class="w-full text-left">
				<thead>${thead}</thead>
				<tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">${tbody}</tbody>
			</table>
		</div>
	`;
}

// Render IPA table with merged Sound + Bangla Hint column and speaker icon
function renderIPATable(headerRow, bodyRows) {
	const headerLower = headerRow.map((h) => h.toLowerCase());

	// Find column indices
	const symbolIdx = headerLower.findIndex((h) => h.includes('symbol'));
	const soundIdx = headerLower.findIndex(
		(h) => h === 'sound' || h.includes('sound'),
	);
	const banglaIdx = headerLower.findIndex(
		(h) =>
			h.includes('বাংলা') || h.includes('bangla') || h.includes('হিন্ট'),
	);
	const exampleIdx = headerLower.findIndex((h) => h.includes('example'));
	const ipaIdx = headerLower.findIndex(
		(h) => h === 'ipa' && !h.includes('symbol'),
	);
	const spellingIdx = headerLower.findIndex((h) => h.includes('spelling'));
	const voicedIdx = headerLower.findIndex((h) => h.includes('voiced'));

	// Build compact header
	const compactHeaders = ['Symbol', 'Sound / Hint', '🔊', 'Example', 'IPA'];
	if (spellingIdx >= 0) compactHeaders.push('Spellings');
	if (voicedIdx >= 0) compactHeaders.push('V?');

	const thead = `<tr>${compactHeaders
		.map(
			(h) =>
				`<th class="px-2 py-2 sm:px-3 sm:py-2.5 text-left text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700">${h}</th>`,
		)
		.join('')}</tr>`;

	const tbody = bodyRows
		.map((row) => {
			const symbol = row[symbolIdx] || '';
			const sound = row[soundIdx] || '';
			const bangla = row[banglaIdx] || '';
			const example = row[exampleIdx] || '';
			const ipa = ipaIdx >= 0 ? row[ipaIdx] || '' : '';
			const spelling = spellingIdx >= 0 ? row[spellingIdx] || '' : '';
			const voiced = voicedIdx >= 0 ? row[voicedIdx] || '' : '';

			const exampleWord = example.replace(/\*\*/g, '').trim();

			// Merged Sound + Bangla cell
			const soundBanglaCell = `
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5">
				<div class="text-xs sm:text-sm text-gray-900 dark:text-white font-medium">${processInlineMarkdown(
					escapeHtml(sound),
				)}</div>
				<div class="text-[10px] sm:text-xs text-purple-600 dark:text-purple-400">${processInlineMarkdown(
					escapeHtml(bangla),
				)}</div>
			</td>
		`;

			// Speaker button cell
			const speakerCell = exampleWord
				? `
			<td class="px-1 py-1.5 text-center">
				<button onclick="speakWord('${exampleWord.replace(/'/g, "\\'")}')"
					class="p-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-800/50 transition-colors">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
				</button>
			</td>
		`
				: '<td class="px-1 py-1.5"></td>';

			let cells = `
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 font-mono text-sm sm:text-base text-teal-600 dark:text-teal-400 font-bold">${processInlineMarkdown(
				escapeHtml(symbol),
			)}</td>
			${soundBanglaCell}
			${speakerCell}
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">${processInlineMarkdown(
				escapeHtml(example),
			)}</td>
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 font-mono text-xs text-gray-500 dark:text-gray-400">${processInlineMarkdown(
				escapeHtml(ipa),
			)}</td>
		`;

			if (spellingIdx >= 0) {
				cells += `<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 text-xs text-gray-500 dark:text-gray-400">${processInlineMarkdown(
					escapeHtml(spelling),
				)}</td>`;
			}
			if (voicedIdx >= 0) {
				const voicedIcon =
					voiced.toLowerCase() === 'yes'
						? '✓'
						: voiced.toLowerCase() === 'no'
						? '✗'
						: voiced;
				cells += `<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 text-xs text-center ${
					voiced.toLowerCase() === 'yes'
						? 'text-green-500'
						: 'text-gray-400'
				}">${voicedIcon}</td>`;
			}

			return `<tr class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">${cells}</tr>`;
		})
		.join('');

	return `
		<div class="overflow-x-auto my-3 sm:my-6 -mx-2 sm:mx-0 sm:rounded-xl border-y sm:border border-gray-200 dark:border-gray-700">
			<table class="w-full text-left">
				<thead>${thead}</thead>
				<tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">${tbody}</tbody>
			</table>
		</div>
	`;
}

// Render Vocab table with compact layout - Word+IPA merged, Level+Type merged
function renderVocabTable(headerRow, bodyRows, wordColIndex) {
	const headerLower = headerRow.map((h) => h.toLowerCase());

	// Find column indices
	const numIdx = headerLower.findIndex(
		(h) => h === '#' || h === 'no' || h === 'no.',
	);
	const typeIdx = headerLower.findIndex((h) => h === 'type');
	const levelIdx = headerLower.findIndex((h) => h === 'level');
	const pronIdx = headerLower.findIndex(
		(h) => h.includes('pronun') || h === 'ipa',
	);
	const meaningIdx = headerLower.findIndex(
		(h) => h.includes('meaning') && h.includes('english'),
	);
	const banglaIdx = headerLower.findIndex(
		(h) => h.includes('বাংলা') || h.includes('bangla'),
	);
	const exampleIdx = headerLower.findIndex(
		(h) => h.includes('example') || h.includes('sentence'),
	);

	// Build compact header: Word (with IPA below), Type/Level, English, বাংলা, Example, 🔊
	const compactHeaders = [
		'Word',
		'Type',
		'English Meaning',
		'বাংলা',
		'Example',
		'🔊',
	];

	const thead = `<tr>${compactHeaders
		.map(
			(h) =>
				`<th class="px-2 py-2 sm:px-3 sm:py-2.5 text-left text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700">${h}</th>`,
		)
		.join('')}</tr>`;

	const tbody = bodyRows
		.map((row) => {
			const word = wordColIndex >= 0 ? row[wordColIndex] || '' : '';
			const wordClean = word.replace(/\*\*/g, '').trim();
			const type = typeIdx >= 0 ? row[typeIdx] || '' : '';
			const level = levelIdx >= 0 ? row[levelIdx] || '' : '';
			const pron = pronIdx >= 0 ? row[pronIdx] || '' : '';
			const meaning = meaningIdx >= 0 ? row[meaningIdx] || '' : '';
			const bangla = banglaIdx >= 0 ? row[banglaIdx] || '' : '';
			const example = exampleIdx >= 0 ? row[exampleIdx] || '' : '';

			// Word + IPA cell (stacked)
			const wordCell = `
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5">
				<div class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">${processInlineMarkdown(
					escapeHtml(word),
				)}</div>
				${
					pron
						? `<div class="text-[10px] sm:text-xs text-purple-600 dark:text-purple-400 font-mono">${processInlineMarkdown(
								escapeHtml(pron),
						  )}</div>`
						: ''
				}
			</td>
		`;

			// Type + Level merged
			const levelBadge = level
				? `<span class="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium ${
						level === 'C1'
							? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
							: level === 'B2'
							? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
							: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
				  }">${level}</span>`
				: '';

			const typeCell = `
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5">
				<div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">${processInlineMarkdown(
					escapeHtml(type),
				)}</div>
				${levelBadge}
			</td>
		`;

			// Speaker button
			const speakerCell = wordClean
				? `
			<td class="px-1 py-1.5 text-center">
				<button onclick="speakWord('${wordClean.replace(/'/g, "\\'")}')"
					class="p-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-800/50 transition-colors">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
				</button>
			</td>
		`
				: '<td class="px-1 py-1.5"></td>';

			return `<tr class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
			${wordCell}
			${typeCell}
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">${processInlineMarkdown(
				escapeHtml(meaning),
			)}</td>
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">${processInlineMarkdown(
				escapeHtml(bangla),
			)}</td>
			<td class="px-2 py-1.5 sm:px-3 sm:py-2.5 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic max-w-[150px] sm:max-w-[200px] truncate" title="${escapeHtml(
				example,
			)}">${processInlineMarkdown(escapeHtml(example))}</td>
			${speakerCell}
		</tr>`;
		})
		.join('');

	return `
		<div class="overflow-x-auto my-3 sm:my-6 -mx-2 sm:mx-0 sm:rounded-xl border-y sm:border border-gray-200 dark:border-gray-700">
			<table class="w-full text-left">
				<thead>${thead}</thead>
				<tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">${tbody}</tbody>
			</table>
		</div>
	`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
	if (document.getElementById('ielts-folder-list')) {
		initIELTSPractice();
	}
});
