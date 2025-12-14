// IELTS Quiz Generator from vocab.md
// Produces simple multiple-choice questions based on English meanings

async function startIELTSQuiz(path = 'ielts/d1/vocab.md', count = 10) {
	const container = document.getElementById('ielts-md-viewer');
	if (!container) return;
	container.innerHTML = '<p>Preparing quiz...</p>';
	try {
		const res = await fetch(path);
		if (!res.ok) throw new Error('Failed to load ' + path);
		const md = await res.text();
		const items = parseVocabTable(md);
		if (items.length < 4) throw new Error('Not enough items to quiz.');
		const quiz = buildQuiz(items, count);
		container.innerHTML = renderQuiz(quiz);
	} catch (err) {
		container.innerHTML = `<div class="alert">⚠️ ${err.message}</div>`;
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
			prompt: `Which meaning matches “${item.word}” ${
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
    <style>
      .quiz-card{background:#fff; border-radius:8px; padding:12px; margin-bottom:10px; border:1px solid #e5e7eb}
      .quiz-option{margin:6px 0;}
      .quiz-actions{margin-top:12px}
      .quiz-summary{padding:10px; background:#f1f5f9; border-radius:6px; margin-top:12px}
    </style>
    <div>
      ${quiz
			.map(
				(q) => `
        <div class="quiz-card" data-answer="${escapeHtml(q.answer)}">
          <div><strong>Q${q.id}.</strong> ${escapeHtml(q.prompt)}</div>
          <div>
            ${q.options
				.map(
					(opt) => `
              <label class="quiz-option">
                <input type="radio" name="q${q.id}" value="${escapeHtml(
						opt,
					)}"> ${escapeHtml(opt)}
              </label>
            `,
				)
				.join('')}
          </div>
        </div>
      `,
			)
			.join('')}
      <div class="quiz-actions">
        <button class="action-btn ielts-btn" onclick="gradeQuiz()">✅ Submit</button>
        <button class="action-btn ielts-btn" onclick="startIELTSQuiz()">🔁 New Quiz</button>
      </div>
      <div id="quiz-result" class="quiz-summary"></div>
    </div>
  `;
}

function gradeQuiz() {
	const cards = Array.from(document.querySelectorAll('.quiz-card'));
	let correct = 0;
	cards.forEach((card) => {
		const name = card.querySelector('input[type="radio"]').name;
		const chosen = document.querySelector(`input[name="${name}"]:checked`);
		const answer = card.getAttribute('data-answer');
		if (chosen && chosen.value === answer) correct++;
	});
	const result = document.getElementById('quiz-result');
	result.innerHTML = `<strong>Score:</strong> ${correct}/${cards.length}`;
}

function escapeHtml(s) {
	return s.replace(
		/[&<>]/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]),
	);
}
