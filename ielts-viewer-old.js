// IELTS Practice Folder Browser & Markdown Viewer
// Theme-aware and mobile-friendly

// Text-to-Speech for vocabulary
function speakWord(word) {
	if ('speechSynthesis' in window) {
		// Cancel any ongoing speech
		window.speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(word);
		utterance.lang = 'en-GB'; // British English
		utterance.rate = 0.85; // Slightly slower for clarity

		// Get available voices and prefer British English
		const voices = window.speechSynthesis.getVoices();
		const britishVoice = voices.find(
			(v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB'),
		);
		if (britishVoice) {
			utterance.voice = britishVoice;
		}

		window.speechSynthesis.speak(utterance);
	} else {
		console.warn('Speech synthesis not supported');
	}
}

// Preload voices
if ('speechSynthesis' in window) {
	window.speechSynthesis.getVoices();
	window.speechSynthesis.onvoiceschanged = () => {
		window.speechSynthesis.getVoices();
	};
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
	d7: {
		name: 'Day 7',
		icon: '📅',
		files: ['vocab.md', 'writing-task2.md'],
	},
	d8: {
		name: 'Day 8',
		icon: '📅',
		files: ['vocab.md', 'speaking-complete.md'],
	},
	d9: {
		name: 'Day 9',
		icon: '📅',
		files: ['vocab.md', 'mixed-practice.md'],
	},
	d10: {
		name: 'Day 10',
		icon: '📅',
		files: ['weakness-focus.md'],
	},
	d11: {
		name: 'Day 11',
		icon: '📅',
		files: ['mock-test-1.md'],
	},
	d12: {
		name: 'Day 12',
		icon: '📅',
		files: ['review-analysis.md'],
	},
	d13: {
		name: 'Day 13',
		icon: '📅',
		files: ['vocab.md', 'targeted-practice.md'],
	},
	d14: {
		name: 'Day 14',
		icon: '📅',
		files: ['mock-test-2.md'],
	},
	d15: {
		name: 'Day 15',
		icon: '📅',
		files: ['final-prep.md'],
	},
};

let currentFolder = null;
let currentFile = null;

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

	// Show folders, hide others
	container.style.display = 'grid';
	if (fileList) fileList.style.display = 'none';
	if (viewer) viewer.style.display = 'none';
	if (quiz) quiz.style.display = 'none';

	// Render folder cards
	container.innerHTML = Object.entries(IELTS_FOLDERS)
		.map(
			([key, folder]) => `
		<div class="folder-card" onclick="openIELTSFolder('${key}')">
			<div class="folder-icon">${folder.icon}</div>
			<div class="folder-name">${folder.name}</div>
			<div class="folder-count">${folder.files.length} file${
				folder.files.length !== 1 ? 's' : ''
			}</div>
		</div>
	`,
		)
		.join('');

	if (Object.keys(IELTS_FOLDERS).length === 0) {
		container.innerHTML =
			'<div class="empty-state"><p>No practice folders yet</p></div>';
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
	if (folderName) folderName.textContent = folder.name;

	let files = folder.files;

	if (filesDiv) {
		if (files.length === 0) {
			filesDiv.innerHTML = `
				<div class="empty-state">
					<p>No files in this folder yet</p>
					<p class="hint">Add .md files to ielts/${folderId}/</p>
				</div>
			`;
		} else {
			filesDiv.innerHTML = files
				.map((file) => {
					const isVocab = file.includes('vocab');
					const isIPA = file.includes('ipa');
					const icon = isVocab ? '🔤' : isIPA ? '🔈' : '📄';
					const name = file.replace('.md', '').replace(/_/g, ' ');

					return `
					<div class="file-card">
						<div class="file-info" onclick="openIELTSFile('${folderId}', '${file}')">
							<span class="file-icon">${icon}</span>
							<span class="file-name">${name}</span>
						</div>
						<div class="file-actions">
							<button class="btn-icon" onclick="openIELTSFile('${folderId}', '${file}')" title="View">
								👁️
							</button>
							${
								isVocab
									? `<button class="btn-icon" onclick="startQuizFromFile('${folderId}', '${file}')" title="Quiz">
								🧪
							</button>`
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

		// Build navigation header
		const folderKeys = Object.keys(IELTS_FOLDERS);
		const currentIndex = folderKeys.indexOf(folderId);
		const prevFolder =
			currentIndex > 0 ? folderKeys[currentIndex - 1] : null;
		const nextFolder =
			currentIndex < folderKeys.length - 1
				? folderKeys[currentIndex + 1]
				: null;

		// File navigation within folder
		const fileIndex = folder.files.indexOf(filename);
		const prevFile = fileIndex > 0 ? folder.files[fileIndex - 1] : null;
		const nextFile =
			fileIndex < folder.files.length - 1
				? folder.files[fileIndex + 1]
				: null;

		content.innerHTML = `
			<div class="md-viewer-header">
				<div class="md-viewer-nav">
					${
						prevFolder
							? `
						<button class="nav-btn prev" onclick="openIELTSFolder('${prevFolder}')" title="Previous Day">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
							${IELTS_FOLDERS[prevFolder].name}
						</button>
					`
							: '<span></span>'
					}
					<div class="md-viewer-title">
						<span class="folder-badge">${folderName}</span>
						<h2>${displayName}</h2>
					</div>
					${
						nextFolder
							? `
						<button class="nav-btn next" onclick="openIELTSFolder('${nextFolder}')" title="Next Day">
							${IELTS_FOLDERS[nextFolder].name}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
						</button>
					`
							: '<span></span>'
					}
				</div>
				<div class="md-viewer-file-nav">
					${
						prevFile
							? `
						<button class="file-nav-btn" onclick="openIELTSFile('${folderId}', '${prevFile}')">
							← ${prevFile.replace('.md', '').replace(/[-_]/g, ' ')}
						</button>
					`
							: ''
					}
					${
						nextFile
							? `
						<button class="file-nav-btn" onclick="openIELTSFile('${folderId}', '${nextFile}')">
							${nextFile.replace('.md', '').replace(/[-_]/g, ' ')} →
						</button>
					`
							: ''
					}
				</div>
			</div>
			<div class="md-viewer-body">
				<div class="loading-spinner">Loading content...</div>
			</div>
		`;

		try {
			const res = await fetch(path);
			if (!res.ok) throw new Error(`Failed to load ${path}`);
			const md = await res.text();
			const body = content.querySelector('.md-viewer-body');
			if (body) {
				body.innerHTML = renderMarkdownThemed(md);
				// Add speak buttons to vocabulary tables
				addSpeakButtonsToTables(body);
			}
		} catch (err) {
			const body = content.querySelector('.md-viewer-body');
			if (body)
				body.innerHTML = `<div class="error-state">⚠️ ${err.message}</div>`;
		}
	}
}

// Add speak buttons to vocabulary tables
function addSpeakButtonsToTables(container) {
	const tables = container.querySelectorAll('.themed-table');
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
						speakBtn.className = 'speak-btn';
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
		quizContent.innerHTML = '<div class="loading">Generating quiz...</div>';

		try {
			const res = await fetch(path);
			if (!res.ok) throw new Error(`Failed to load ${path}`);
			const md = await res.text();
			const questions = parseVocabForQuiz(md);

			if (questions.length === 0) {
				quizContent.innerHTML =
					'<div class="error-state">No vocabulary table found for quiz</div>';
				return;
			}

			renderQuiz(questions.slice(0, 10), quizContent);
		} catch (err) {
			quizContent.innerHTML = `<div class="error-state">⚠️ ${err.message}</div>`;
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

		// Parse header to find column indices
		const headerCells = rows[0]
			.split('|')
			.map((c) => c.trim().toLowerCase())
			.filter(Boolean);

		// Find column indices (flexible matching)
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

		// Fallback: if no headers found, assume simple 2-column format (word | meaning)
		if (wordIndex === -1) wordIndex = 0;
		if (meaningIndex === -1) meaningIndex = 1;

		const dataRows = rows.slice(2); // Skip header and separator rows

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
				questions.push({
					word: word,
					meaning: meaning,
					ipa: ipa,
				});
			}
		});
	});

	return questions;
}

// Render quiz
function renderQuiz(questions, container) {
	const shuffled = [...questions].sort(() => Math.random() - 0.5);

	const html = `
		<div class="quiz-wrapper">
			<h3>🧪 Vocabulary Quiz</h3>
			<p class="quiz-info">${shuffled.length} questions</p>

			<form id="vocab-quiz-form" onsubmit="gradeQuiz(event)">
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
						<div class="quiz-question">
							<div class="question-text">
								<strong>${i + 1}.</strong> What does "<span class="quiz-word">${
							q.word
						}</span>" mean?
								${q.ipa ? `<span class="quiz-ipa">${q.ipa}</span>` : ''}
							</div>
							<div class="quiz-options">
								${options
									.map(
										(opt) => `
									<label class="quiz-option">
										<input type="radio" name="q${i}" value="${opt}" data-correct="${q.meaning}">
										<span class="option-text">${opt}</span>
									</label>
								`,
									)
									.join('')}
							</div>
						</div>
					`;
					})
					.join('')}

				<button type="submit" class="btn btn-primary quiz-submit">📊 Check Answers</button>
			</form>

			<div id="quiz-results" style="display:none"></div>
		</div>
	`;

	container.innerHTML = html;
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

		if (selected) {
			const isCorrect = selected.value === correctAnswer;
			if (isCorrect) {
				correct++;
				q.classList.add('correct');
				q.classList.remove('incorrect');
			} else {
				q.classList.add('incorrect');
				q.classList.remove('correct');
			}
		} else {
			q.classList.add('unanswered');
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

	results.innerHTML = `
		<div class="quiz-summary">
			<div class="score-circle ${percentage >= 70 ? 'passing' : 'failing'}">
				<span class="score-emoji">${emoji}</span>
				<span class="score-value">${percentage}%</span>
			</div>
			<p class="score-text">${correct}/${total} correct</p>
			<button class="btn btn-secondary" onclick="backToFiles()">Try Another</button>
		</div>
	`;
	results.style.display = 'block';
	form.querySelector('.quiz-submit').style.display = 'none';
}

// Theme-aware markdown renderer
function renderMarkdownThemed(md) {
	// First, extract and convert tables before escaping HTML
	// Match tables: lines starting with | that have at least 2 rows
	const tableRegex = /(?:^|\n)((?:\|[^\n]+\|\n?)+)/gm;

	let html = md;

	// Process tables first (before HTML escaping)
	html = html.replace(tableRegex, (match, tableBlock) => {
		const rows = tableBlock
			.trim()
			.split('\n')
			.filter((r) => r.trim().startsWith('|'));
		if (rows.length < 2) return match;

		// Parse each row into cells
		const parsedRows = rows.map((r) => {
			// Remove leading/trailing pipes and split by |
			const cleaned = r.trim().replace(/^\||\|$/g, '');
			return cleaned.split('|').map((c) => c.trim());
		});

		// Skip separator rows (like |---|---|)
		const dataRows = parsedRows.filter(
			(row) => !row.every((c) => /^:?-+:?$/.test(c)),
		);

		if (dataRows.length < 1) return match;

		// First row is header
		const headerRow = dataRows[0];
		const bodyRows = dataRows.slice(1);

		// Build HTML table
		const thead = `<tr>${headerRow
			.map((c) => `<th>${escapeHtml(c)}</th>`)
			.join('')}</tr>`;
		const tbody = bodyRows
			.map(
				(row) =>
					`<tr>${row
						.map(
							(c) =>
								`<td>${processInlineMarkdown(
									escapeHtml(c),
								)}</td>`,
						)
						.join('')}</tr>`,
			)
			.join('');

		return `\n<div class="table-wrapper"><table class="themed-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table></div>\n`;
	});

	// Now escape remaining HTML (but not in already-converted tables)
	// We need a different approach - escape before table processing

	// Actually, let's rebuild this more carefully
	return renderMarkdownProper(md);
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

// Helper: process inline markdown (bold, italic, links, code)
function processInlineMarkdown(str) {
	return str
		.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
		.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.*?)\*/g, '<em>$1</em>')
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(
			/\[(.*?)\]\((.*?)\)/g,
			'<a href="$2" target="_blank" rel="noopener">$1</a>',
		);
}

// Proper markdown renderer
function renderMarkdownProper(md) {
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
			// End of table
			output.push(renderTable(tableRows));
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
				'<ul>' +
					listItems
						.map(
							(li) =>
								`<li>${processInlineMarkdown(
									escapeHtml(li),
								)}</li>`,
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
			output.push(
				`<h${level}>${processInlineMarkdown(
					escapeHtml(text),
				)}</h${level}>`,
			);
			continue;
		}

		// Horizontal rule
		if (/^---+$/.test(trimmed)) {
			output.push('<hr>');
			continue;
		}

		// Blockquote
		if (/^>\s*/.test(trimmed)) {
			const text = trimmed.replace(/^>\s*/, '');
			output.push(
				`<blockquote>${processInlineMarkdown(
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
		output.push(`<p>${processInlineMarkdown(escapeHtml(trimmed))}</p>`);
	}

	// Handle remaining table
	if (inTable && tableRows.length > 0) {
		output.push(renderTable(tableRows));
	}

	// Handle remaining list
	if (inList && listItems.length > 0) {
		output.push(
			'<ul>' +
				listItems
					.map(
						(li) =>
							`<li>${processInlineMarkdown(escapeHtml(li))}</li>`,
					)
					.join('') +
				'</ul>',
		);
	}

	return output.join('\n');
}

// Render a markdown table to HTML
function renderTable(rows) {
	if (rows.length < 2) return rows.join('\n');

	// Parse rows into cells, filter out undefined/null
	const parsedRows = rows
		.filter((r) => r != null && typeof r === 'string')
		.map((r) => {
			const cleaned = r.replace(/^\||\|$/g, '');
			return cleaned.split('|').map((c) => c.trim());
		});

	// Find and remove separator row
	const dataRows = parsedRows.filter(
		(row) => !row.every((c) => /^:?-+:?$/.test(c)),
	);

	if (dataRows.length < 1) return rows.join('\n');

	const headerRow = dataRows[0];
	const bodyRows = dataRows.slice(1);

	// Check if this is a vocabulary table (has "Word" column)
	const wordColIndex = headerRow.findIndex((h) =>
		h.toLowerCase().includes('word'),
	);
	const hasAudioColumn = headerRow.some((h) =>
		h.toLowerCase().includes('audio'),
	);

	// Remove Audio column if present
	let filteredHeaderRow = headerRow;
	let filteredBodyRows = bodyRows;
	if (hasAudioColumn) {
		const audioColIndex = headerRow.findIndex((h) =>
			h.toLowerCase().includes('audio'),
		);
		filteredHeaderRow = headerRow.filter((_, i) => i !== audioColIndex);
		filteredBodyRows = bodyRows.map((row) =>
			row.filter((_, i) => i !== audioColIndex),
		);
	}

	// Add audio column header if it's a vocab table
	const finalHeaderRow =
		wordColIndex >= 0 ? [...filteredHeaderRow, '🔊'] : filteredHeaderRow;

	const thead = `<tr>${finalHeaderRow
		.map((c) => `<th>${processInlineMarkdown(escapeHtml(c))}</th>`)
		.join('')}</tr>`;

	const tbody = filteredBodyRows
		.map((row) => {
			// Get the word for audio (clean markdown bold)
			const word =
				wordColIndex >= 0 && row[wordColIndex]
					? row[wordColIndex].replace(/\*\*/g, '').trim()
					: null;

			const cells = row
				.map(
					(c) =>
						`<td>${processInlineMarkdown(
							escapeHtml(c || ''),
						)}</td>`,
				)
				.join('');

			// Add audio button cell if it's a vocab table
			const audioCell =
				wordColIndex >= 0 && word
					? `<td class="audio-cell"><button class="audio-btn" onclick="speakWord('${word.replace(
							/'/g,
							"\\'",
					  )}')">▶</button></td>`
					: '';

			return `<tr>${cells}${audioCell}</tr>`;
		})
		.join('');

	return `<div class="table-wrapper"><table class="themed-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table></div>`;
}

// Legacy function
async function loadIELTSMarkdown(path) {
	const container = document.getElementById('ielts-md-viewer');
	if (!container) return;

	container.innerHTML = '<div class="loading">Loading...</div>';

	try {
		const res = await fetch(path);
		if (!res.ok) throw new Error('Failed to load ' + path);
		const md = await res.text();
		container.innerHTML = renderMarkdownThemed(md);
	} catch (err) {
		container.innerHTML = `<div class="error-state">⚠️ ${err.message}</div>`;
	}
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
	if (document.getElementById('ielts-folder-list')) {
		initIELTSPractice();
	}
});
