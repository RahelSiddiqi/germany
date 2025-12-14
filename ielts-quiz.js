// IELTS Quiz Generator from vocab.md
// Produces simple multiple-choice questions based on English meanings

async function startIELTSQuiz(path = 'ielts/d1/vocab.md', count = 10) {
	const container = document.getElementById('ielts-md-viewer');
	if (!container) return;
	container.innerHTML =
		'<div class="flex items-center justify-center p-8"><div class="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full"></div><span class="ml-3 text-gray-600">Preparing quiz...</span></div>';
	try {
		const res = await fetch(path);
		if (!res.ok) throw new Error('Failed to load ' + path);
		const md = await res.text();
		const items = parseVocabTable(md);
		if (items.length < 4) throw new Error('Not enough items to quiz.');
		const quiz = buildQuiz(items, count);
		container.innerHTML = renderQuiz(quiz);
	} catch (err) {
		container.innerHTML = `<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg">⚠️ ${err.message}</div>`;
		console.error(err);
	}
}

function parseVocabTable(md) {
	// Parse rows from markdown tables: assume columns include Word and বাংলা অর্থ / English Meaning
	const lines = md.split('\n');
	const items = [];
	let headers = [];
	let inTable = false;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith('|') && line.endsWith('|')) {
			const cells = line
				.slice(1, -1)
				.split('|')
				.map((c) => c.trim());
			if (!inTable) {
				headers = cells;
				inTable = true;
				continue;
			}
			// skip separator row
			if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
			const idxWord = headers.findIndex((h) => /word/i.test(h));
			const idxMeaning = headers.findIndex((h) =>
				/english\s*meaning/i.test(h),
			);
			const idxBangla = headers.findIndex((h) => /বাংলা/i.test(h));
			const idxIPA = headers.findIndex((h) =>
				/pronunciation|ipa/i.test(h),
			);
			const word = cells[idxWord] || '';
			const meaning = cells[idxMeaning] || '';
			const bn = cells[idxBangla] || '';
			const ipa = cells[idxIPA] || '';
			if (word && meaning)
				items.push({ word: stripBold(word), meaning, bn, ipa });
		} else {
			inTable = false;
		}
	}
	return items;
}

function stripBold(s) {
	return s.replace(/^\*\*|\*\*$/g, '').trim();
}

function buildQuiz(items, count) {
	const shuffled = items.slice().sort(() => Math.random() - 0.5);
	const selected = shuffled.slice(0, Math.min(count, items.length));
	return selected.map((item, i) => {
		// Build 3 distractors
		const distractors = items
			.filter((x) => x.word !== item.word)
			.slice(0)
			.sort(() => Math.random() - 0.5)
			.slice(0, 3)
			.map((x) => x.meaning);
		const options = [item.meaning, ...distractors].sort(
			() => Math.random() - 0.5,
		);
		return {
			id: i + 1,
			prompt: `Which meaning matches "${item.word}" ${
				item.ipa ? '(' + item.ipa + ')' : ''
			}?`,
			options,
			answer: item.meaning,
			meta: item,
		};
	});
}

function renderQuiz(quiz) {
	return `
    <div class="space-y-4">
      ${quiz
			.map(
				(q) => `
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm" data-answer="${escapeHtml(
			q.answer,
		)}">
          <div class="font-medium text-gray-900 dark:text-white mb-3">
            <span class="inline-flex items-center justify-center w-7 h-7 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold mr-2">Q${
				q.id
			}</span>
            ${escapeHtml(q.prompt)}
          </div>
          <div class="space-y-2">
            ${q.options
				.map(
					(opt) => `
              <label class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <input type="radio" name="q${q.id}" value="${escapeHtml(
						opt,
					)}" class="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 focus:ring-2">
                <span class="ml-3 text-gray-700 dark:text-gray-300">${escapeHtml(
					opt,
				)}</span>
              </label>
            `,
				)
				.join('')}
          </div>
        </div>
      `,
			)
			.join('')}
      <div class="flex gap-3 pt-2">
        <button onclick="gradeQuiz()" class="flex-1 inline-flex items-center justify-center px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          Submit Answers
        </button>
        <button onclick="startIELTSQuiz()" class="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          New Quiz
        </button>
      </div>
      <div id="quiz-result" class="mt-4"></div>
    </div>
  `;
}

function gradeQuiz() {
	const cards = Array.from(document.querySelectorAll('[data-answer]'));
	let correct = 0;
	let total = cards.length;

	cards.forEach((card) => {
		const inputs = card.querySelectorAll('input[type="radio"]');
		if (inputs.length === 0) return;

		const name = inputs[0].name;
		const chosen = document.querySelector(`input[name="${name}"]:checked`);
		const answer = card.getAttribute('data-answer');

		// Reset all option styles
		card.querySelectorAll('label').forEach((label) => {
			label.classList.remove(
				'bg-green-100',
				'dark:bg-green-900/30',
				'border-green-500',
				'bg-red-100',
				'dark:bg-red-900/30',
				'border-red-500',
			);
		});

		// Highlight correct answer
		inputs.forEach((input) => {
			const label = input.closest('label');
			if (input.value === answer) {
				label.classList.add(
					'bg-green-100',
					'dark:bg-green-900/30',
					'border-green-500',
				);
			}
			if (chosen && input === chosen && input.value !== answer) {
				label.classList.add(
					'bg-red-100',
					'dark:bg-red-900/30',
					'border-red-500',
				);
			}
		});

		if (chosen && chosen.value === answer) correct++;
	});

	const percentage = Math.round((correct / total) * 100);
	const result = document.getElementById('quiz-result');

	let bgColor, textColor, icon, message;
	if (percentage >= 80) {
		bgColor =
			'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
		textColor = 'text-green-800 dark:text-green-200';
		icon = '🎉';
		message = 'Excellent work!';
	} else if (percentage >= 60) {
		bgColor =
			'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700';
		textColor = 'text-yellow-800 dark:text-yellow-200';
		icon = '👍';
		message = 'Good job! Keep practicing.';
	} else {
		bgColor =
			'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
		textColor = 'text-red-800 dark:text-red-200';
		icon = '📚';
		message = 'Review the vocabulary and try again.';
	}

	result.innerHTML = `
		<div class="${bgColor} ${textColor} border rounded-xl p-4">
			<div class="flex items-center justify-between">
				<div>
					<div class="text-2xl font-bold">${icon} ${correct}/${total}</div>
					<div class="text-sm opacity-80">${message}</div>
				</div>
				<div class="text-3xl font-bold">${percentage}%</div>
			</div>
		</div>
	`;
}

function escapeHtml(s) {
	return s.replace(
		/[&<>]/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]),
	);
}
