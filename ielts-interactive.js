// IELTS Interactive Learning System
// Comprehensive tools for IELTS preparation

// ==================== VOCABULARY FLASHCARD SYSTEM ====================
const IELTS_VOCABULARY = {
	// Day 1: Opinion & Argument + Cause/Effect (70 words)
	academic: [
		{
			word: 'notwithstanding',
			phonetic: '/ˌnɒtwɪθˈstændɪŋ/',
			definition: 'Despite; in spite of',
			example: 'Notwithstanding the challenges, the company succeeded.',
			level: 'C1',
			type: 'Preposition',
		},
		{
			word: 'predominantly',
			phonetic: '/prɪˈdɒmɪnəntli/',
			definition: 'Mainly; chiefly',
			example: 'The region is predominantly agricultural.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'invariably',
			phonetic: '/ɪnˈveəriəbli/',
			definition: 'Always; without exception',
			example: 'She invariably arrives on time.',
			level: 'C1',
			type: 'Adverb',
		},
		{
			word: 'contentious',
			phonetic: '/kənˈtenʃəs/',
			definition: 'Controversial; disputed',
			example: 'Climate change remains a contentious issue.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'plausible',
			phonetic: '/ˈplɔːzəbl/',
			definition: 'Believable; reasonable',
			example: 'His explanation was plausible but not proven.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'compelling',
			phonetic: '/kəmˈpelɪŋ/',
			definition: 'Convincing; powerful',
			example: 'The evidence presented was compelling.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'debatable',
			phonetic: '/dɪˈbeɪtəbl/',
			definition: 'Arguable; open to discussion',
			example: 'Whether this policy is effective remains debatable.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'concede',
			phonetic: '/kənˈsiːd/',
			definition: 'Admit; acknowledge',
			example: 'I concede that your point has merit.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'assert',
			phonetic: '/əˈsɜːt/',
			definition: 'State confidently; declare',
			example: 'The researcher asserts that this theory is correct.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'substantiate',
			phonetic: '/səbˈstænʃieɪt/',
			definition: 'Support with evidence; prove',
			example: 'You must substantiate your claims with data.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'catalyst',
			phonetic: '/ˈkætəlɪst/',
			definition: 'Trigger; something that causes change',
			example: 'Social media was a catalyst for revolution.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'exacerbate',
			phonetic: '/ɪɡˈzæsəbeɪt/',
			definition: 'Worsen; make worse',
			example: 'Stress can exacerbate health problems.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'mitigate',
			phonetic: '/ˈmɪtɪɡeɪt/',
			definition: 'Reduce; lessen the severity',
			example: 'We must mitigate the effects of pollution.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'ramification',
			phonetic: '/ˌræmɪfɪˈkeɪʃən/',
			definition: 'Long-term effect; implication',
			example:
				'The ramifications of this decision will be felt for years.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'repercussion',
			phonetic: '/ˌriːpəˈkʌʃən/',
			definition: 'Negative result; backlash',
			example: 'The policy had serious repercussions.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'infrastructure',
			phonetic: '/ˈɪnfrəstrʌktʃə/',
			definition: 'Basic systems/facilities',
			example: 'Investing in infrastructure is crucial for development.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'socioeconomic',
			phonetic: '/ˌsəʊʃiəʊˌiːkəˈnɒmɪk/',
			definition: 'Related to social and economic factors',
			example: 'Socioeconomic status affects educational outcomes.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'disparity',
			phonetic: '/dɪˈspærəti/',
			definition: 'Inequality; significant difference',
			example: 'There is a wide disparity between rich and poor.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'marginalized',
			phonetic: '/ˈmɑːdʒɪnəlaɪzd/',
			definition: 'Excluded; pushed to the edge',
			example: 'Marginalized communities face systemic challenges.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'legislation',
			phonetic: '/ˌledʒɪˈsleɪʃən/',
			definition: 'Laws; legal rules',
			example: 'New legislation was passed to protect workers.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'cognitive',
			phonetic: '/ˈkɒɡnɪtɪv/',
			definition: 'Related to mental processes',
			example: 'Cognitive development is important in childhood.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'pedagogical',
			phonetic: '/ˌpɛdəˈɡɒdʒɪkəl/',
			definition: 'Related to teaching methods',
			example: 'Pedagogical approaches vary across cultures.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'sustainable',
			phonetic: '/səˈsteɪnəbl/',
			definition: 'Environmentally responsible',
			example: 'We must adopt sustainable farming practices.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'biodiversity',
			phonetic: '/ˌbaɪəʊdaɪˈvɜːsɪti/',
			definition: 'Variety of living organisms',
			example: 'Rainforests have high biodiversity.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'phenomenon',
			phonetic: '/fɪˈnɒmɪnən/',
			definition: 'A fact or situation observed',
			example: 'Global warming is a well-documented phenomenon.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'hypothesis',
			phonetic: '/haɪˈpɒθəsɪs/',
			definition: 'A proposed explanation',
			example: 'The hypothesis was tested rigorously.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'empirical',
			phonetic: '/ɪmˈpɪrɪkəl/',
			definition: 'Based on observation',
			example: 'The study used empirical data.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'paradigm',
			phonetic: '/ˈpærədaɪm/',
			definition: 'A typical example or pattern',
			example: 'This represents a new paradigm in education.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'inherent',
			phonetic: '/ɪnˈhɪərənt/',
			definition: 'Existing as a natural part',
			example: 'There are inherent risks in any investment.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'ambiguous',
			phonetic: '/æmˈbɪɡjuəs/',
			definition: 'Having multiple meanings',
			example: 'The instructions were ambiguous.',
			level: 'B2',
			type: 'Adjective',
		},
	],
	// Day 2: Reading & Comprehension + Text Structure
	reading: [
		{
			word: 'skim',
			phonetic: '/skɪm/',
			definition: 'Read quickly for main ideas',
			example: 'Skim the passage to find the topic sentence.',
			level: 'B1',
			type: 'Verb',
		},
		{
			word: 'scan',
			phonetic: '/skæn/',
			definition: 'Search for specific information',
			example: 'Scan the text for names and dates.',
			level: 'B1',
			type: 'Verb',
		},
		{
			word: 'paraphrase',
			phonetic: '/ˈpærəfreɪz/',
			definition: 'Restate in different words',
			example: 'You must paraphrase, not copy directly.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'infer',
			phonetic: '/ɪnˈfɜː/',
			definition: 'Conclude from evidence',
			example: 'We can infer his mood from his actions.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'explicit',
			phonetic: '/ɪkˈsplɪsɪt/',
			definition: 'Clearly stated',
			example: 'The instructions were explicit and clear.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'implicit',
			phonetic: '/ɪmˈplɪsɪt/',
			definition: 'Implied, not directly stated',
			example: 'His criticism was implicit in his tone.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'context',
			phonetic: '/ˈkɒntekst/',
			definition: 'Surrounding circumstances',
			example: 'Understand words in context.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'comprehend',
			phonetic: '/ˌkɒmprɪˈhend/',
			definition: 'Understand fully',
			example: "It's difficult to comprehend complex texts.",
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'synopsis',
			phonetic: '/sɪˈnɒpsɪs/',
			definition: 'Brief summary',
			example: 'Give me a synopsis of the article.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'extract',
			phonetic: '/ˈekstrækt/',
			definition: 'A passage; to remove',
			example: 'Read the extract carefully.',
			level: 'B2',
			type: 'Noun/Verb',
		},
		{
			word: 'analyze',
			phonetic: '/ˈænəlaɪz/',
			definition: 'Examine in detail',
			example: 'Analyze the data carefully.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'evaluate',
			phonetic: '/ɪˈvæljueɪt/',
			definition: 'Assess value or quality',
			example: "Evaluate the author's argument.",
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'interpret',
			phonetic: '/ɪnˈtɜːprɪt/',
			definition: 'Explain meaning',
			example: 'How do you interpret this graph?',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'perspective',
			phonetic: '/pəˈspektɪv/',
			definition: 'Point of view',
			example: 'Consider different perspectives.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'bias',
			phonetic: '/ˈbaɪəs/',
			definition: 'Unfair preference',
			example: 'The article shows political bias.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'thesis',
			phonetic: '/ˈθiːsɪs/',
			definition: 'Main argument',
			example: 'State your thesis clearly.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'elaborate',
			phonetic: '/ɪˈlæbəreɪt/',
			definition: 'Explain in more detail',
			example: 'Could you elaborate on that?',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'contradict',
			phonetic: '/ˌkɒntrəˈdɪkt/',
			definition: 'Say the opposite',
			example: 'These facts contradict each other.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'criterion',
			phonetic: '/kraɪˈtɪəriən/',
			definition: 'Standard for judgment',
			example: 'What criteria are used?',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'coherent',
			phonetic: '/kəʊˈhɪərənt/',
			definition: 'Logical and consistent',
			example: 'Present a coherent argument.',
			level: 'B2',
			type: 'Adjective',
		},
	],
	// Day 3: Listening & Everyday Situations
	listening: [
		{
			word: 'accommodation',
			phonetic: '/əˌkɒməˈdeɪʃən/',
			definition: 'Housing/lodging',
			example: 'I need to book accommodation.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'reservation',
			phonetic: '/ˌrezəˈveɪʃən/',
			definition: 'Advance booking',
			example: 'I have a reservation for tonight.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'deposit',
			phonetic: '/dɪˈpɒzɪt/',
			definition: 'Initial payment',
			example: 'A deposit of £200 is required.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'refund',
			phonetic: '/ˈriːfʌnd/',
			definition: 'Money returned',
			example: 'Can I get a refund?',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'itinerary',
			phonetic: '/aɪˈtɪnərəri/',
			definition: 'Travel plan',
			example: "Here's your complete itinerary.",
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'complimentary',
			phonetic: '/ˌkɒmplɪˈmentəri/',
			definition: 'Free of charge',
			example: 'Breakfast is complimentary.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'mandatory',
			phonetic: '/ˈmændətɔːri/',
			definition: 'Required; compulsory',
			example: 'Attendance is mandatory.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'adjacent',
			phonetic: '/əˈdʒeɪsənt/',
			definition: 'Next to',
			example: 'The café is adjacent to the library.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'vicinity',
			phonetic: '/vɪˈsɪnɪti/',
			definition: 'Nearby area',
			example: 'There are shops in the vicinity.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'premises',
			phonetic: '/ˈpremɪsɪz/',
			definition: 'Building and grounds',
			example: 'No smoking on the premises.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'tuition',
			phonetic: '/tjuˈɪʃən/',
			definition: 'Teaching/fees',
			example: 'Tuition fees are £9,000 annually.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'dissertation',
			phonetic: '/ˌdɪsəˈteɪʃən/',
			definition: 'Long essay/thesis',
			example: 'My dissertation is due in May.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'plagiarism',
			phonetic: '/ˈpleɪdʒəˌrɪzəm/',
			definition: "Copying others' work",
			example: 'Plagiarism is a serious offense.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'amenity',
			phonetic: '/əˈmiːnɪti/',
			definition: 'Useful feature',
			example: 'The hotel has excellent amenities.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'consultation',
			phonetic: '/ˌkɒnsəlˈteɪʃən/',
			definition: 'Meeting for advice',
			example: 'Book a consultation with your tutor.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'transcript',
			phonetic: '/ˈtrænskrɪpt/',
			definition: 'Written version of audio',
			example: 'The transcript shows every word spoken.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'abbreviate',
			phonetic: '/əˈbriːvieɪt/',
			definition: 'Shorten a word',
			example: 'Abbreviate "number" as "no."',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'distractor',
			phonetic: '/dɪˈstræktə/',
			definition: 'Wrong answer option',
			example: 'Identify distractors in MCQ.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'synonym',
			phonetic: '/ˈsɪnənɪm/',
			definition: 'Word with same meaning',
			example: '"Big" and "large" are synonyms.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'antonym',
			phonetic: '/ˈæntənɪm/',
			definition: 'Word with opposite meaning',
			example: '"Hot" and "cold" are antonyms.',
			level: 'B1',
			type: 'Noun',
		},
	],
	// Speaking phrases and connectors
	speaking: [
		{
			word: 'absolutely',
			phonetic: '/ˈæbsəluːtli/',
			definition: 'Completely; without doubt',
			example: 'I absolutely agree with you.',
			level: 'B1',
			type: 'Adverb',
		},
		{
			word: 'personally',
			phonetic: '/ˈpɜːsənəli/',
			definition: 'From my own viewpoint',
			example: 'Personally, I prefer working from home.',
			level: 'B1',
			type: 'Adverb',
		},
		{
			word: 'undoubtedly',
			phonetic: '/ʌnˈdaʊtɪdli/',
			definition: 'Without any doubt',
			example: 'This is undoubtedly the best option.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'frankly',
			phonetic: '/ˈfræŋkli/',
			definition: 'Speaking honestly',
			example: 'Frankly, I think we need to reconsider.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'essentially',
			phonetic: '/ɪˈsenʃəli/',
			definition: 'Basically; fundamentally',
			example: 'Essentially, we have two choices.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'relatively',
			phonetic: '/ˈrelətɪvli/',
			definition: 'In comparison to something else',
			example: 'The test was relatively easy.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'particularly',
			phonetic: '/pəˈtɪkjələli/',
			definition: 'Especially',
			example: 'I particularly enjoyed the music.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'presumably',
			phonetic: '/prɪˈzjuːməbli/',
			definition: 'I assume that',
			example: "Presumably, you've heard the news.",
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'apparently',
			phonetic: '/əˈpærəntli/',
			definition: 'It seems that',
			example: 'Apparently, the meeting was cancelled.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'moreover',
			phonetic: '/mɔːrˈəʊvə/',
			definition: 'Additionally; furthermore',
			example: 'The job pays well. Moreover, it has great benefits.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'nevertheless',
			phonetic: '/ˌnevəðəˈles/',
			definition: 'However; still; despite that',
			example: 'He is young. Nevertheless, he has great experience.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'conversely',
			phonetic: '/ˈkɒnvɜːsli/',
			definition: 'On the other hand; opposite',
			example: 'Some prefer coffee. Conversely, others drink tea.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'subsequently',
			phonetic: '/ˈsʌbsɪkwəntli/',
			definition: 'Afterwards; following that',
			example: 'He studied hard. Subsequently, he passed the exam.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'ultimately',
			phonetic: '/ˈʌltɪmətli/',
			definition: 'In the end; finally',
			example: 'Ultimately, hard work pays off.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'interestingly',
			phonetic: '/ˈɪntrəstɪŋli/',
			definition: 'In an interesting way',
			example: 'Interestingly, the results were unexpected.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'significantly',
			phonetic: '/sɪɡˈnɪfɪkəntli/',
			definition: 'In an important way',
			example: 'This has significantly improved my skills.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'arguably',
			phonetic: '/ˈɑːɡjuəbli/',
			definition: 'It can be argued that',
			example: 'This is arguably the best solution.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'admittedly',
			phonetic: '/ədˈmɪtɪdli/',
			definition: 'It must be admitted',
			example: 'Admittedly, I was wrong.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'supposedly',
			phonetic: '/səˈpəʊzɪdli/',
			definition: 'According to what is believed',
			example: 'He supposedly left early.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'accordingly',
			phonetic: '/əˈkɔːdɪŋli/',
			definition: 'Therefore; as a result',
			example: 'Prices rose. Accordingly, sales fell.',
			level: 'B2',
			type: 'Adverb',
		},
	],
	// Writing Task 1 & 2 vocabulary
	writing: [
		{
			word: 'illustrate',
			phonetic: '/ˈɪləstreɪt/',
			definition: 'To show or demonstrate',
			example: 'The graph illustrates the trend.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'demonstrate',
			phonetic: '/ˈdemənstreɪt/',
			definition: 'To show clearly',
			example: 'The data demonstrates a clear pattern.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'indicate',
			phonetic: '/ˈɪndɪkeɪt/',
			definition: 'To point out or show',
			example: 'The results indicate a positive outcome.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'constitute',
			phonetic: '/ˈkɒnstɪtjuːt/',
			definition: 'To make up or form',
			example: 'Women constitute 60% of the workforce.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'fluctuate',
			phonetic: '/ˈflʌktʃueɪt/',
			definition: 'To rise and fall irregularly',
			example: 'Prices fluctuated throughout the year.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'plummet',
			phonetic: '/ˈplʌmɪt/',
			definition: 'To fall sharply',
			example: 'Sales plummeted in the fourth quarter.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'surge',
			phonetic: '/sɜːdʒ/',
			definition: 'To increase suddenly',
			example: 'There was a surge in demand.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'plateau',
			phonetic: '/ˈplætəʊ/',
			definition: 'To reach a stable level',
			example: 'Growth plateaued after 2020.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'decline',
			phonetic: '/dɪˈklaɪn/',
			definition: 'To decrease gradually',
			example: 'Unemployment declined steadily.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'peak',
			phonetic: '/piːk/',
			definition: 'To reach the highest point',
			example: 'Temperatures peaked in July.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'stabilize',
			phonetic: '/ˈsteɪbəlaɪz/',
			definition: 'Become steady',
			example: 'The currency stabilized after the crisis.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'account for',
			phonetic: '/əˈkaʊnt fɔː/',
			definition: 'Represent; explain',
			example: 'Exports account for 40% of GDP.',
			level: 'B2',
			type: 'Phrasal Verb',
		},
		{
			word: 'outnumber',
			phonetic: '/ˌaʊtˈnʌmbə/',
			definition: 'Be more than',
			example: 'Women outnumber men in this field.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'remain constant',
			phonetic: '/rɪˈmeɪn ˈkɒnstənt/',
			definition: 'Stay the same',
			example: 'The rate remained constant.',
			level: 'B2',
			type: 'Phrase',
		},
		{
			word: 'marginally',
			phonetic: '/ˈmɑːdʒɪnəli/',
			definition: 'Slightly',
			example: 'Sales increased marginally.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'substantially',
			phonetic: '/səbˈstænʃəli/',
			definition: 'Considerably; significantly',
			example: 'Costs rose substantially.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'moderately',
			phonetic: '/ˈmɒdərətli/',
			definition: 'To a medium degree',
			example: 'Prices increased moderately.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'exponentially',
			phonetic: '/ˌekspəˈnenʃəli/',
			definition: 'At an increasing rate',
			example: 'The population grew exponentially.',
			level: 'C1',
			type: 'Adverb',
		},
		{
			word: 'comparatively',
			phonetic: '/kəmˈpærətɪvli/',
			definition: 'In comparison',
			example: 'This is comparatively better.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'respectively',
			phonetic: '/rɪˈspektɪvli/',
			definition: 'In the order mentioned',
			example: 'UK and US scored 80% and 75% respectively.',
			level: 'B2',
			type: 'Adverb',
		},
	],
	// Environment & Society topics
	topics: [
		{
			word: 'sustainable',
			phonetic: '/səˈsteɪnəbl/',
			definition: 'Long-term viable; eco-friendly',
			example: 'We must adopt sustainable practices.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'depletion',
			phonetic: '/dɪˈpliːʃən/',
			definition: 'Reduction; using up resources',
			example: 'Overfishing caused fish stock depletion.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'ecological',
			phonetic: '/ˌiːkəˈlɒdʒɪkəl/',
			definition: 'Related to ecosystems',
			example: 'Ecological balance is disrupted by pollution.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'carbon footprint',
			phonetic: '/ˈkɑːbən ˈfʊtprɪnt/',
			definition: 'Total greenhouse gas emissions',
			example: 'We should reduce our carbon footprint.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'renewable',
			phonetic: '/rɪˈnjuːəbl/',
			definition: 'Can be replaced naturally',
			example: 'Solar energy is a renewable resource.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'well-being',
			phonetic: '/ˈwel ˈbiːɪŋ/',
			definition: 'Health; state of being well',
			example: 'Mental well-being is as important as physical health.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'preventive',
			phonetic: '/prɪˈventɪv/',
			definition: 'Designed to prevent',
			example: 'Preventive medicine is more effective.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'chronic',
			phonetic: '/ˈkrɒnɪk/',
			definition: 'Long-lasting; persistent',
			example: 'Chronic stress can cause serious illness.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'urbanization',
			phonetic: '/ˌɜːbənaɪˈzeɪʃən/',
			definition: 'Process of becoming urban',
			example: 'Rapid urbanization caused housing shortages.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'demographic',
			phonetic: '/ˌdeməˈɡræfɪk/',
			definition: 'Related to population stats',
			example: 'Demographic changes affect pensions.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'globalization',
			phonetic: '/ˌɡləʊbəlaɪˈzeɪʃən/',
			definition: 'Worldwide integration',
			example: 'Globalization has increased trade.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'automation',
			phonetic: '/ˌɔːtəˈmeɪʃən/',
			definition: 'Use of machines to do work',
			example: 'Factory automation replaced many workers.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'digital literacy',
			phonetic: '/ˈdɪdʒɪtl ˈlɪtərəsi/',
			definition: 'Ability to use technology',
			example: 'Digital literacy is essential today.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'competency',
			phonetic: '/ˈkɒmpɪtənsi/',
			definition: 'Skill; ability',
			example: 'Language competency is required.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'productivity',
			phonetic: '/ˌprɒdʌkˈtɪvɪti/',
			definition: 'Effectiveness; output per input',
			example: 'Remote work improved productivity.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'innovation',
			phonetic: '/ˌɪnəˈveɪʃən/',
			definition: 'New ideas; invention',
			example: 'Innovation drives economic growth.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'proficiency',
			phonetic: '/prəˈfɪʃənsi/',
			definition: 'High level of skill',
			example: 'She achieved proficiency in three languages.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'curriculum',
			phonetic: '/kəˈrɪkjələm/',
			definition: 'Subject matter taught',
			example: 'The school curriculum needs updating.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'governance',
			phonetic: '/ˈɡʌvənəns/',
			definition: 'System of managing/ruling',
			example: 'Good governance ensures transparency.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'subsidize',
			phonetic: '/ˈsʌbsɪdaɪz/',
			definition: 'Support financially',
			example: 'Governments subsidize agriculture.',
			level: 'B2',
			type: 'Verb',
		},
	],
	// Day 4: Environment & Nature
	environment: [
		{
			word: 'biodiversity',
			phonetic: '/ˌbaɪəʊdaɪˈvɜːsɪti/',
			definition: 'Variety of life forms',
			example: 'Rainforests have high biodiversity.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'ecosystem',
			phonetic: '/ˈiːkəʊsɪstəm/',
			definition: 'Community of organisms',
			example: 'The coral reef ecosystem is fragile.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'habitat',
			phonetic: '/ˈhæbɪtæt/',
			definition: 'Natural home',
			example: 'Deforestation destroys habitats.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'species',
			phonetic: '/ˈspiːʃiːz/',
			definition: 'Type of organism',
			example: 'Many species are endangered.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'extinct',
			phonetic: '/ɪkˈstɪŋkt/',
			definition: 'No longer existing',
			example: 'Dinosaurs became extinct.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'endangered',
			phonetic: '/ɪnˈdeɪndʒəd/',
			definition: 'At risk of extinction',
			example: 'Tigers are endangered animals.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'conservation',
			phonetic: '/ˌkɒnsəˈveɪʃən/',
			definition: 'Protection of nature',
			example: 'Wildlife conservation is essential.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'emission',
			phonetic: '/ɪˈmɪʃən/',
			definition: 'Substance released',
			example: 'Carbon emissions cause warming.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'pollutant',
			phonetic: '/pəˈluːtənt/',
			definition: 'Harmful substance',
			example: 'Factories release pollutants.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'deforestation',
			phonetic: '/diːˌfɒrɪˈsteɪʃən/',
			definition: 'Clearing of forests',
			example: 'Deforestation accelerates climate change.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'erosion',
			phonetic: '/ɪˈrəʊʒən/',
			definition: 'Gradual wearing away',
			example: 'Soil erosion affects farming.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'drought',
			phonetic: '/draʊt/',
			definition: 'Prolonged dry period',
			example: 'The drought destroyed crops.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'renewable',
			phonetic: '/rɪˈnjuːəbl/',
			definition: 'Can be replenished',
			example: 'Solar is a renewable energy source.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'depletion',
			phonetic: '/dɪˈpliːʃən/',
			definition: 'Using up resources',
			example: 'Overfishing caused fish stock depletion.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'ecological',
			phonetic: '/ˌiːkəˈlɒdʒɪkəl/',
			definition: 'Related to ecosystems',
			example: 'Ecological balance is disrupted.',
			level: 'B2',
			type: 'Adjective',
		},
	],
	// Day 4-5: Science & Research
	science: [
		{
			word: 'phenomenon',
			phonetic: '/fɪˈnɒmɪnən/',
			definition: 'Observable event',
			example: 'Climate change is a global phenomenon.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'theory',
			phonetic: '/ˈθɪəri/',
			definition: 'System of ideas',
			example: "Darwin's theory of evolution.",
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'evidence',
			phonetic: '/ˈevɪdəns/',
			definition: 'Proof',
			example: 'Scientific evidence supports this.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'experiment',
			phonetic: '/ɪkˈsperɪmənt/',
			definition: 'Scientific test',
			example: 'The experiment proved the hypothesis.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'variable',
			phonetic: '/ˈveəriəbl/',
			definition: 'Changeable factor',
			example: 'Control all variables in research.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'data',
			phonetic: '/ˈdeɪtə/',
			definition: 'Facts/statistics',
			example: 'The data supports our conclusion.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'sample',
			phonetic: '/ˈsɑːmpl/',
			definition: 'Representative group',
			example: 'A sample of 500 people was used.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'survey',
			phonetic: '/ˈsɜːveɪ/',
			definition: 'Questionnaire study',
			example: 'We conducted a nationwide survey.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'correlation',
			phonetic: '/ˌkɒrəˈleɪʃən/',
			definition: 'Statistical relationship',
			example: "There's a correlation between X and Y.",
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'causation',
			phonetic: '/kɔːˈzeɪʃən/',
			definition: 'Cause-effect relationship',
			example: "Correlation doesn't imply causation.",
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'methodology',
			phonetic: '/ˌmeθəˈdɒlədʒi/',
			definition: 'Research methods',
			example: 'The methodology was rigorous.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'significant',
			phonetic: '/sɪɡˈnɪfɪkənt/',
			definition: 'Statistically important',
			example: 'Results were statistically significant.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'preliminary',
			phonetic: '/prɪˈlɪmɪnəri/',
			definition: 'Initial; first stage',
			example: 'Preliminary results show progress.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'conclusive',
			phonetic: '/kənˈkluːsɪv/',
			definition: 'Definitive; final',
			example: 'The evidence is not conclusive.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'hypothesis',
			phonetic: '/haɪˈpɒθəsɪs/',
			definition: 'Proposed explanation',
			example: 'The hypothesis was tested.',
			level: 'B2',
			type: 'Noun',
		},
	],
	// Day 5: Writing Task 1 - Trends
	trends: [
		{
			word: 'increase',
			phonetic: '/ɪnˈkriːs/',
			definition: 'Go up; rise',
			example: 'Sales increased by 20%.',
			level: 'B1',
			type: 'Verb/Noun',
		},
		{
			word: 'decrease',
			phonetic: '/dɪˈkriːs/',
			definition: 'Go down; fall',
			example: 'Costs decreased significantly.',
			level: 'B1',
			type: 'Verb/Noun',
		},
		{
			word: 'rise',
			phonetic: '/raɪz/',
			definition: 'Go up',
			example: 'There was a sharp rise in prices.',
			level: 'B1',
			type: 'Verb/Noun',
		},
		{
			word: 'fall',
			phonetic: '/fɔːl/',
			definition: 'Go down',
			example: 'Unemployment fell by 3%.',
			level: 'B1',
			type: 'Verb/Noun',
		},
		{
			word: 'grow',
			phonetic: '/ɡrəʊ/',
			definition: 'Increase; develop',
			example: 'The economy grew steadily.',
			level: 'B1',
			type: 'Verb',
		},
		{
			word: 'decline',
			phonetic: '/dɪˈklaɪn/',
			definition: 'Decrease gradually',
			example: 'Population declined over the decade.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'fluctuate',
			phonetic: '/ˈflʌktʃueɪt/',
			definition: 'Rise and fall irregularly',
			example: 'Prices fluctuated throughout the year.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'stabilize',
			phonetic: '/ˈsteɪbəlaɪz/',
			definition: 'Become steady',
			example: 'The market stabilized in Q4.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'peak',
			phonetic: '/piːk/',
			definition: 'Reach highest point',
			example: 'Sales peaked in December.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'dip',
			phonetic: '/dɪp/',
			definition: 'Fall briefly',
			example: 'There was a slight dip in March.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'surge',
			phonetic: '/sɜːdʒ/',
			definition: 'Rise suddenly',
			example: 'Demand surged unexpectedly.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'plummet',
			phonetic: '/ˈplʌmɪt/',
			definition: 'Fall rapidly',
			example: 'Share prices plummeted.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'soar',
			phonetic: '/sɔː/',
			definition: 'Rise quickly',
			example: 'Profits soared to record levels.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'level off',
			phonetic: '/ˈlevl ɒf/',
			definition: 'Become flat',
			example: 'Growth leveled off in Q3.',
			level: 'B2',
			type: 'Phrasal Verb',
		},
		{
			word: 'remain constant',
			phonetic: '/rɪˈmeɪn ˈkɒnstənt/',
			definition: 'Stay the same',
			example: 'The rate remained constant.',
			level: 'B2',
			type: 'Phrase',
		},
		{
			word: 'dramatically',
			phonetic: '/drəˈmætɪkli/',
			definition: 'Very significantly',
			example: 'Sales increased dramatically.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'substantially',
			phonetic: '/səbˈstænʃəli/',
			definition: 'To a large degree',
			example: 'Profits grew substantially.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'marginally',
			phonetic: '/ˈmɑːdʒɪnəli/',
			definition: 'Slightly; a little',
			example: 'Prices rose marginally.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'gradually',
			phonetic: '/ˈɡrædʒuəli/',
			definition: 'Slowly; step by step',
			example: 'Temperatures increased gradually.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'exponentially',
			phonetic: '/ˌekspəˈnenʃəli/',
			definition: 'At increasing rate',
			example: 'Data is growing exponentially.',
			level: 'C1',
			type: 'Adverb',
		},
	],
	// Day 6: Process & Map Vocabulary
	process: [
		{
			word: 'initially',
			phonetic: '/ɪˈnɪʃəli/',
			definition: 'At the beginning',
			example: 'Initially, raw materials are collected.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'subsequently',
			phonetic: '/ˈsʌbsɪkwəntli/',
			definition: 'After that',
			example: 'Subsequently, they are sorted.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'eventually',
			phonetic: '/ɪˈventʃuəli/',
			definition: 'In the end',
			example: 'Eventually, the product is packaged.',
			level: 'B1',
			type: 'Adverb',
		},
		{
			word: 'simultaneously',
			phonetic: '/ˌsɪmlˈteɪniəsli/',
			definition: 'At the same time',
			example: 'Two processes occur simultaneously.',
			level: 'B2',
			type: 'Adverb',
		},
		{
			word: 'prior to',
			phonetic: '/ˈpraɪə tuː/',
			definition: 'Before',
			example: 'Prior to processing, materials are inspected.',
			level: 'B2',
			type: 'Preposition',
		},
		{
			word: 'thereafter',
			phonetic: '/ˌðeərˈɑːftə/',
			definition: 'After that',
			example: 'Thereafter, it is transported to stores.',
			level: 'C1',
			type: 'Adverb',
		},
		{
			word: 'collect',
			phonetic: '/kəˈlekt/',
			definition: 'Gather',
			example: 'Raw materials are collected.',
			level: 'B1',
			type: 'Verb',
		},
		{
			word: 'transport',
			phonetic: '/ˈtrænspɔːt/',
			definition: 'Move from place to place',
			example: 'Materials are transported to the factory.',
			level: 'B1',
			type: 'Verb/Noun',
		},
		{
			word: 'filter',
			phonetic: '/ˈfɪltə/',
			definition: 'Remove impurities',
			example: 'Water is filtered to remove particles.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'compress',
			phonetic: '/kəmˈpres/',
			definition: 'Press together',
			example: 'The material is compressed.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'distribute',
			phonetic: '/dɪˈstrɪbjuːt/',
			definition: 'Deliver to places',
			example: 'Goods are distributed to retailers.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'convert',
			phonetic: '/kənˈvɜːt/',
			definition: 'Change form',
			example: 'Energy is converted to electricity.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'extract',
			phonetic: '/ˈekstrækt/',
			definition: 'Remove from source',
			example: 'Oil is extracted from seeds.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'refine',
			phonetic: '/rɪˈfaɪn/',
			definition: 'Purify',
			example: 'Crude oil is refined.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'assemble',
			phonetic: '/əˈsembl/',
			definition: 'Put together',
			example: 'Parts are assembled into products.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'construct',
			phonetic: '/kənˈstrʌkt/',
			definition: 'Build',
			example: 'A new road was constructed.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'demolish',
			phonetic: '/dɪˈmɒlɪʃ/',
			definition: 'Destroy (building)',
			example: 'The old factory was demolished.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'relocate',
			phonetic: '/ˌriːləʊˈkeɪt/',
			definition: 'Move to new place',
			example: 'The factory was relocated.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'renovate',
			phonetic: '/ˈrenəveɪt/',
			definition: 'Restore; update',
			example: 'The building was renovated.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'expand',
			phonetic: '/ɪkˈspænd/',
			definition: 'Grow; become bigger',
			example: 'The town expanded significantly.',
			level: 'B2',
			type: 'Verb',
		},
	],
	// Day 7-8: History & Society
	history: [
		{
			word: 'ancient',
			phonetic: '/ˈeɪnʃənt/',
			definition: 'Very old',
			example: 'Ancient civilizations built pyramids.',
			level: 'B1',
			type: 'Adjective',
		},
		{
			word: 'medieval',
			phonetic: '/ˌmediˈiːvl/',
			definition: 'Middle Ages',
			example: 'Medieval Europe was feudal.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'contemporary',
			phonetic: '/kənˈtempərəri/',
			definition: 'Of the same period',
			example: 'Contemporary accounts describe...',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'era',
			phonetic: '/ˈɪərə/',
			definition: 'Historical period',
			example: 'The Victorian era was transformative.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'civilization',
			phonetic: '/ˌsɪvəlaɪˈzeɪʃən/',
			definition: 'Advanced society',
			example: 'The Roman civilization lasted centuries.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'dynasty',
			phonetic: '/ˈdɪnəsti/',
			definition: 'Ruling family',
			example: 'The Ming Dynasty ruled China.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'empire',
			phonetic: '/ˈempaɪə/',
			definition: 'Large territory ruled',
			example: 'The British Empire was vast.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'revolution',
			phonetic: '/ˌrevəˈluːʃən/',
			definition: 'Sudden change',
			example: 'The Industrial Revolution changed society.',
			level: 'B1',
			type: 'Noun',
		},
		{
			word: 'reform',
			phonetic: '/rɪˈfɔːm/',
			definition: 'Change for improvement',
			example: 'Social reforms improved conditions.',
			level: 'B2',
			type: 'Noun/Verb',
		},
		{
			word: 'migration',
			phonetic: '/maɪˈɡreɪʃən/',
			definition: 'Movement of people',
			example: 'Mass migration occurred in the 1800s.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'settlement',
			phonetic: '/ˈsetlmənt/',
			definition: 'Established community',
			example: 'The first settlement was in 1607.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'indigenous',
			phonetic: '/ɪnˈdɪdʒənəs/',
			definition: 'Native; original',
			example: 'Indigenous peoples lived there for millennia.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'heritage',
			phonetic: '/ˈherɪtɪdʒ/',
			definition: 'Cultural inheritance',
			example: 'Protect our cultural heritage.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'archaeology',
			phonetic: '/ˌɑːkiˈɒlədʒi/',
			definition: 'Study of ancient remains',
			example: 'Archaeology reveals past civilizations.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'artifact',
			phonetic: '/ˈɑːtɪfækt/',
			definition: 'Historical object',
			example: 'The museum displays ancient artifacts.',
			level: 'B2',
			type: 'Noun',
		},
	],
	// Day 9+: Band 8.5 Advanced Vocabulary
	band85: [
		{
			word: 'unequivocally',
			phonetic: '/ˌʌnɪˈkwɪvəkəli/',
			definition: 'Without doubt; clearly',
			example: 'The evidence unequivocally supports this.',
			level: 'C1',
			type: 'Adverb',
		},
		{
			word: 'ubiquitous',
			phonetic: '/juːˈbɪkwɪtəs/',
			definition: 'Present everywhere',
			example: 'Smartphones are now ubiquitous.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'unprecedented',
			phonetic: '/ʌnˈpresɪdentɪd/',
			definition: 'Never happened before',
			example: 'This is an unprecedented situation.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'undermine',
			phonetic: '/ˌʌndəˈmaɪn/',
			definition: 'Weaken gradually',
			example: 'This will undermine public trust.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'synonymous',
			phonetic: '/sɪˈnɒnɪməs/',
			definition: 'Having same meaning',
			example: 'Quality is synonymous with this brand.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'scrutinize',
			phonetic: '/ˈskruːtɪnaɪz/',
			definition: 'Examine closely',
			example: 'We must scrutinize the data.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'proliferate',
			phonetic: '/prəˈlɪfəreɪt/',
			definition: 'Increase rapidly',
			example: 'Fake news continues to proliferate.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'precipitate',
			phonetic: '/prɪˈsɪpɪteɪt/',
			definition: 'Cause to happen suddenly',
			example: 'This could precipitate a crisis.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'perpetuate',
			phonetic: '/pəˈpetʃueɪt/',
			definition: 'Make continue',
			example: "Don't perpetuate harmful stereotypes.",
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'paradigm shift',
			phonetic: '/ˈpærədaɪm ʃɪft/',
			definition: 'Fundamental change',
			example: 'AI represents a paradigm shift.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'nuanced',
			phonetic: '/ˈnjuːɑːnst/',
			definition: 'Having subtle differences',
			example: 'A nuanced understanding is required.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'multifaceted',
			phonetic: '/ˌmʌltifæsɪtɪd/',
			definition: 'Having many aspects',
			example: 'This is a multifaceted problem.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'juxtapose',
			phonetic: '/ˌdʒʌkstəˈpəʊz/',
			definition: 'Place side by side',
			example: 'Juxtapose the two images to compare.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'intrinsic',
			phonetic: '/ɪnˈtrɪnsɪk/',
			definition: 'Belonging naturally',
			example: 'There is intrinsic value in education.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'holistic',
			phonetic: '/həʊˈlɪstɪk/',
			definition: 'Considering the whole',
			example: 'Take a holistic approach to health.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'extraneous',
			phonetic: '/ɪkˈstreɪniəs/',
			definition: 'Irrelevant; not essential',
			example: 'Remove extraneous details.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'dichotomy',
			phonetic: '/daɪˈkɒtəmi/',
			definition: 'Division into two parts',
			example: 'The dichotomy between work and life.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'concomitant',
			phonetic: '/kənˈkɒmɪtənt/',
			definition: 'Accompanying',
			example: 'With success come concomitant challenges.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'commensurate',
			phonetic: '/kəˈmenʃərət/',
			definition: 'Proportional; corresponding',
			example: 'Salary should be commensurate with experience.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'albeit',
			phonetic: '/ɔːlˈbiːɪt/',
			definition: 'Although',
			example: 'He succeeded, albeit with difficulty.',
			level: 'C1',
			type: 'Conjunction',
		},
		// Additional Band 8.5 words for higher score
		{
			word: 'ameliorate',
			phonetic: '/əˈmiːliəreɪt/',
			definition: 'Make something better; improve',
			example:
				'Policies were introduced to ameliorate living conditions.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'cognizant',
			phonetic: '/ˈkɒɡnɪzənt/',
			definition: 'Aware or conscious of something',
			example: 'We must be cognizant of cultural differences.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'delineate',
			phonetic: '/dɪˈlɪnieɪt/',
			definition: 'Describe or portray precisely',
			example: 'The report delineates the key challenges.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'envisage',
			phonetic: '/ɪnˈvɪzɪdʒ/',
			definition: 'Imagine as a future possibility',
			example: 'It is difficult to envisage a world without technology.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'eschew',
			phonetic: '/ɪˈsʃuː/',
			definition: 'Deliberately avoid or keep away from',
			example: 'Many young people eschew traditional careers.',
			level: 'C2',
			type: 'Verb',
		},
		{
			word: 'exigency',
			phonetic: '/ˈeksɪdʒənsi/',
			definition: 'An urgent need or demand',
			example: 'The exigencies of modern life create stress.',
			level: 'C2',
			type: 'Noun',
		},
		{
			word: 'germane',
			phonetic: '/dʒɜːˈmeɪn/',
			definition: 'Relevant and appropriate',
			example: 'His comments were not germane to the discussion.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'hegemony',
			phonetic: '/hɪˈɡeməni/',
			definition: 'Leadership or dominance',
			example: 'Western cultural hegemony is being challenged.',
			level: 'C2',
			type: 'Noun',
		},
		{
			word: 'inchoate',
			phonetic: '/ɪnˈkəʊeɪt/',
			definition: 'Just begun; not fully formed',
			example: 'The plan is still inchoate and needs development.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'inexorable',
			phonetic: '/ɪnˈeksərəbl/',
			definition: 'Impossible to stop or prevent',
			example: 'The inexorable rise of technology continues.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'inimical',
			phonetic: '/ɪˈnɪmɪkəl/',
			definition: 'Harmful or hostile',
			example: 'Such policies are inimical to economic growth.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'lacuna',
			phonetic: '/ləˈkjuːnə/',
			definition: 'A gap or missing part',
			example: 'There is a significant lacuna in the research.',
			level: 'C2',
			type: 'Noun',
		},
		{
			word: 'obviate',
			phonetic: '/ˈɒbvieɪt/',
			definition: 'Remove a need or difficulty',
			example: 'Technology can obviate the need for travel.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'ostensible',
			phonetic: '/ɒˈstensɪbl/',
			definition: 'Appearing to be true but not necessarily so',
			example: 'The ostensible reason for his departure was illness.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'panacea',
			phonetic: '/ˌpænəˈsiːə/',
			definition: 'A solution for all problems',
			example: 'Technology is not a panacea for social issues.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'paradoxically',
			phonetic: '/ˌpærəˈdɒksɪkli/',
			definition: 'In a seemingly contradictory way',
			example: 'Paradoxically, increased choice can reduce satisfaction.',
			level: 'C1',
			type: 'Adverb',
		},
		{
			word: 'pernicious',
			phonetic: '/pəˈnɪʃəs/',
			definition: 'Having a harmful effect',
			example: 'Social media can have pernicious effects on youth.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'predicated',
			phonetic: '/ˈpredɪkeɪtɪd/',
			definition: 'Based on; founded upon',
			example: 'Success is predicated on hard work.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'quintessential',
			phonetic: '/ˌkwɪntɪˈsenʃəl/',
			definition: 'Representing the perfect example',
			example: 'She is the quintessential modern professional.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'salient',
			phonetic: '/ˈseɪliənt/',
			definition: 'Most noticeable or important',
			example: 'The salient features of the proposal are outlined.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'spurious',
			phonetic: '/ˈspjʊəriəs/',
			definition: 'False or fake; not genuine',
			example: 'The article contained spurious claims.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'tacit',
			phonetic: '/ˈtæsɪt/',
			definition: 'Understood without being stated',
			example: 'There was tacit agreement among the group.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'tenable',
			phonetic: '/ˈtenəbl/',
			definition: 'Able to be defended; reasonable',
			example: 'His position is no longer tenable.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'vicarious',
			phonetic: '/vɪˈkeəriəs/',
			definition: 'Experienced through another person',
			example: 'She lived vicariously through her children.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'zeitgeist',
			phonetic: '/ˈtsaɪtɡaɪst/',
			definition: 'The spirit or mood of a particular time',
			example: 'The film captures the zeitgeist of the era.',
			level: 'C2',
			type: 'Noun',
		},
		{
			word: 'acrimonious',
			phonetic: '/ˈækrɪˈməʊniəs/',
			definition: 'Angry and bitter',
			example: 'The debate became increasingly acrimonious.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'antithesis',
			phonetic: '/ænˈtɪθəsɪs/',
			definition: 'The exact opposite',
			example: 'His views are the antithesis of mine.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'burgeoning',
			phonetic: '/ˈbɜːdʒənɪŋ/',
			definition: 'Growing or developing quickly',
			example: 'The burgeoning tech industry creates jobs.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'circumvent',
			phonetic: '/ˌsɜːkəmˈvent/',
			definition: 'Find a way around an obstacle',
			example: 'Companies try to circumvent regulations.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'corroborate',
			phonetic: '/kəˈrɒbəreɪt/',
			definition: 'Confirm or give support to',
			example: 'The evidence corroborates his testimony.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'deleterious',
			phonetic: '/ˌdelɪˈtɪəriəs/',
			definition: 'Causing harm or damage',
			example: 'Smoking has deleterious effects on health.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'disparate',
			phonetic: '/ˈdɪspərət/',
			definition: 'Essentially different; distinct',
			example: 'The disparate groups found common ground.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'efficacious',
			phonetic: '/ˌefɪˈkeɪʃəs/',
			definition: 'Effective in producing results',
			example: 'The treatment proved efficacious.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'egregious',
			phonetic: '/ɪˈɡriːdʒəs/',
			definition: 'Outstandingly bad; shocking',
			example: 'This was an egregious violation of rights.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'ephemeral',
			phonetic: '/ɪˈfemərəl/',
			definition: 'Lasting for a very short time',
			example: 'Social media fame is often ephemeral.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'equivocal',
			phonetic: '/ɪˈkwɪvəkəl/',
			definition: 'Ambiguous; open to interpretation',
			example: 'The results were equivocal at best.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'fallacious',
			phonetic: '/fəˈleɪʃəs/',
			definition: 'Based on a mistaken belief',
			example: 'The argument is fundamentally fallacious.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'idiosyncratic',
			phonetic: '/ˈɪdiəsɪnˈkrætɪk/',
			definition: 'Peculiar to an individual',
			example: 'Her idiosyncratic style is recognizable.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'immutable',
			phonetic: '/ɪˈmjuːtəbl/',
			definition: 'Unchanging over time',
			example: 'Some principles are immutable.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'impetus',
			phonetic: '/ˈɪmpɪtəs/',
			definition: 'The force that makes something happen',
			example: 'The crisis provided the impetus for reform.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'incipient',
			phonetic: '/ɪnˈsɪpiənt/',
			definition: 'Beginning to develop',
			example: 'Signs of incipient change are visible.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'innocuous',
			phonetic: '/ɪˈnɒkjuəs/',
			definition: 'Not harmful or offensive',
			example: 'The comment seemed innocuous but caused offense.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'insidious',
			phonetic: '/ɪnˈsɪdiəs/',
			definition: 'Proceeding in a subtle way but harmful',
			example: 'The insidious effects of pollution are clear.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'intransigent',
			phonetic: '/ɪnˈtrænsɪdʒənt/',
			definition: 'Unwilling to change views',
			example: 'Both sides remained intransigent.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'laudable',
			phonetic: '/ˈlɔːdəbl/',
			definition: 'Deserving praise',
			example: 'Their efforts are highly laudable.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'myriad',
			phonetic: '/ˈmɪriəd/',
			definition: 'Countless; very many',
			example: 'There are myriad reasons for this trend.',
			level: 'C1',
			type: 'Adjective/Noun',
		},
		{
			word: 'nascent',
			phonetic: '/ˈnæsənt/',
			definition: 'Just beginning to develop',
			example: 'The nascent industry shows promise.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'obfuscate',
			phonetic: '/ˈɒbfəskeɪt/',
			definition: 'Make unclear or confusing',
			example: 'Politicians often obfuscate the truth.',
			level: 'C2',
			type: 'Verb',
		},
		{
			word: 'perfunctory',
			phonetic: '/pəˈfʌŋktəri/',
			definition: 'Done without care or interest',
			example: 'His response was merely perfunctory.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'pervasive',
			phonetic: '/pəˈveɪsɪv/',
			definition: 'Spreading widely throughout',
			example: 'Technology is pervasive in modern life.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'proclivity',
			phonetic: '/prəˈklɪvɪti/',
			definition: 'Natural tendency',
			example: 'Humans have a proclivity for conflict.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'recalcitrant',
			phonetic: '/rɪˈkælsɪtrənt/',
			definition: 'Stubbornly uncooperative',
			example: 'The recalcitrant child refused to listen.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'superfluous',
			phonetic: '/suːˈpɜːfluəs/',
			definition: 'Unnecessary; more than needed',
			example: 'Remove all superfluous information.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'tantamount',
			phonetic: '/ˈtæntəmaʊnt/',
			definition: 'Equivalent in effect',
			example: 'Silence is tantamount to agreement.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'unmitigated',
			phonetic: '/ʌnˈmɪtɪɡeɪtɪd/',
			definition: 'Absolute; total',
			example: 'The project was an unmitigated success.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'untenable',
			phonetic: '/ʌnˈtenəbl/',
			definition: 'Cannot be defended or maintained',
			example: 'His position became untenable.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'verisimilitude',
			phonetic: '/ˌverɪsɪˈmɪlɪtjuːd/',
			definition: 'The appearance of being true',
			example: 'The story had verisimilitude.',
			level: 'C2',
			type: 'Noun',
		},
		// Additional Band 8.5+ Advanced Words
		{
			word: 'abstruse',
			phonetic: '/æbˈstruːs/',
			definition: 'Difficult to understand; obscure',
			example:
				'The professor lectured on abstruse philosophical concepts.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'alacrity',
			phonetic: '/əˈlækrɪti/',
			definition: 'Brisk and cheerful readiness',
			example: 'She accepted the invitation with alacrity.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'anachronistic',
			phonetic: '/əˌnækrəˈnɪstɪk/',
			definition: 'Belonging to a different time period',
			example: 'His views on women are anachronistic.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'anathema',
			phonetic: '/əˈnæθɪmə/',
			definition: 'Something that one detests',
			example: 'Racism is anathema to a civilized society.',
			level: 'C2',
			type: 'Noun',
		},
		{
			word: 'apotheosis',
			phonetic: '/əˌpɒθiˈəʊsɪs/',
			definition: 'The highest point of development; glorification',
			example:
				'The building represents the apotheosis of modern architecture.',
			level: 'C2',
			type: 'Noun',
		},
		{
			word: 'arbitrary',
			phonetic: '/ˈɑːbɪtrəri/',
			definition: 'Based on random choice rather than reason',
			example: 'The decision seemed entirely arbitrary.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'assiduously',
			phonetic: '/əˈsɪdjuəsli/',
			definition: 'With great care and perseverance',
			example: 'He assiduously avoided any controversy.',
			level: 'C1',
			type: 'Adverb',
		},
		{
			word: 'auspicious',
			phonetic: '/ɔːˈspɪʃəs/',
			definition: 'Indicating a good chance of success',
			example: 'It was an auspicious start to the new year.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'axiomatic',
			phonetic: '/ˌæksiəˈmætɪk/',
			definition: 'Self-evident; unquestionable',
			example: 'It is axiomatic that practice improves performance.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'bellicose',
			phonetic: '/ˈbelɪkəʊs/',
			definition: 'Demonstrating aggression and willingness to fight',
			example:
				'His bellicose rhetoric alarmed the international community.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'capricious',
			phonetic: '/kəˈprɪʃəs/',
			definition: 'Given to sudden changes of mood or behaviour',
			example: 'The weather in spring can be capricious.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'cogent',
			phonetic: '/ˈkəʊdʒənt/',
			definition: 'Clear, logical, and convincing',
			example: 'She presented a cogent argument for reform.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'complacent',
			phonetic: '/kəmˈpleɪsənt/',
			definition: 'Showing smug satisfaction with oneself',
			example: 'We cannot afford to be complacent about climate change.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'conflagration',
			phonetic: '/ˌkɒnfləˈɡreɪʃən/',
			definition: 'An extensive fire; a conflict',
			example: 'The conflagration destroyed the entire forest.',
			level: 'C2',
			type: 'Noun',
		},
		{
			word: 'conundrum',
			phonetic: '/kəˈnʌndrəm/',
			definition: 'A confusing and difficult problem',
			example: 'Immigration remains a political conundrum.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'copious',
			phonetic: '/ˈkəʊpiəs/',
			definition: 'Abundant in supply or quantity',
			example: 'She took copious notes during the lecture.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'credulous',
			phonetic: '/ˈkredjʊləs/',
			definition: 'Having a tendency to believe too readily',
			example: 'Scammers target credulous elderly people.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'cursory',
			phonetic: '/ˈkɜːsəri/',
			definition: 'Hasty and therefore not thorough',
			example: 'A cursory glance at the report revealed errors.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'dearth',
			phonetic: '/dɜːθ/',
			definition: 'A scarcity or lack of something',
			example: 'There is a dearth of qualified teachers.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'debilitate',
			phonetic: '/dɪˈbɪlɪteɪt/',
			definition: 'Make someone weak or infirm',
			example: 'The illness debilitated him for months.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'defunct',
			phonetic: '/dɪˈfʌŋkt/',
			definition: 'No longer existing or functioning',
			example: 'The now-defunct company was once a market leader.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'disingenuous',
			phonetic: '/ˌdɪsɪnˈdʒenjuəs/',
			definition: 'Not candid or sincere; pretending ignorance',
			example:
				'It would be disingenuous to claim we had no prior knowledge.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'disseminate',
			phonetic: '/dɪˈsemɪneɪt/',
			definition: 'Spread widely',
			example: 'The internet helps disseminate information rapidly.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'draconian',
			phonetic: '/drəˈkəʊniən/',
			definition: 'Excessively harsh and severe',
			example: 'The draconian measures were widely criticized.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'ebullient',
			phonetic: '/ɪˈbʌliənt/',
			definition: 'Cheerful and full of energy',
			example: 'Her ebullient personality made her popular.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'eclectic',
			phonetic: '/ɪˈklektɪk/',
			definition: 'Deriving ideas from diverse sources',
			example: 'The museum has an eclectic collection.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'elucidate',
			phonetic: '/ɪˈluːsɪdeɪt/',
			definition: 'Make clear; explain',
			example: 'Could you elucidate your main argument?',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'endemic',
			phonetic: '/enˈdemɪk/',
			definition: 'Native to a particular region; widespread',
			example: 'Corruption is endemic in many institutions.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'enigmatic',
			phonetic: '/ˌenɪɡˈmætɪk/',
			definition: 'Mysterious and difficult to understand',
			example: 'She remains an enigmatic figure in history.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'excoriate',
			phonetic: '/ɪkˈskɔːrieɪt/',
			definition: 'Criticize severely',
			example: "The report excoriated the government's response.",
			level: 'C2',
			type: 'Verb',
		},
		{
			word: 'exorbitant',
			phonetic: '/ɪɡˈzɔːbɪtənt/',
			definition: 'Unreasonably high (price)',
			example: 'Housing prices in the city are exorbitant.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'facetious',
			phonetic: '/fəˈsiːʃəs/',
			definition: 'Treating serious issues with inappropriate humour',
			example: 'His facetious remarks were not appreciated.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'fastidious',
			phonetic: '/fæsˈtɪdiəs/',
			definition: 'Very attentive to detail; hard to please',
			example: 'She is fastidious about cleanliness.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'feckless',
			phonetic: '/ˈfekləs/',
			definition: 'Lacking initiative or strength of character',
			example: 'The feckless response to the crisis was disappointing.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'furtive',
			phonetic: '/ˈfɜːtɪv/',
			definition: 'Attempting to avoid notice; secretive',
			example: 'He cast a furtive glance over his shoulder.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'grandiloquent',
			phonetic: '/ɡrænˈdɪləkwənt/',
			definition: 'Using pompous or extravagant language',
			example: 'His grandiloquent speech impressed few.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'hackneyed',
			phonetic: '/ˈhæknid/',
			definition: 'Lacking significance through overuse',
			example: 'Avoid hackneyed phrases in your essay.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'hubris',
			phonetic: '/ˈhjuːbrɪs/',
			definition: 'Excessive pride or self-confidence',
			example: 'His hubris led to his downfall.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'ignominious',
			phonetic: '/ˌɪɡnəˈmɪniəs/',
			definition: 'Deserving or causing public disgrace',
			example: 'The team suffered an ignominious defeat.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'implacable',
			phonetic: '/ɪmˈplækəbl/',
			definition: 'Unable to be appeased; relentless',
			example: 'She was his implacable enemy.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'indolent',
			phonetic: '/ˈɪndələnt/',
			definition: 'Wanting to avoid activity or exertion; lazy',
			example: 'His indolent attitude cost him the promotion.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'ineluctable',
			phonetic: '/ˌɪnɪˈlʌktəbl/',
			definition: 'Unable to be resisted or avoided; inevitable',
			example: 'The ineluctable truth finally emerged.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'ingenuous',
			phonetic: '/ɪnˈdʒenjuəs/',
			definition: 'Innocent and unsuspecting',
			example: 'Her ingenuous questions charmed everyone.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'inveterate',
			phonetic: '/ɪnˈvetərət/',
			definition: 'Having a particular habit that cannot be changed',
			example: 'He was an inveterate liar.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'judicious',
			phonetic: '/dʒuːˈdɪʃəs/',
			definition: 'Having or showing good judgement',
			example: 'A judicious use of resources is essential.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'litigious',
			phonetic: '/lɪˈtɪdʒəs/',
			definition: 'Tending to engage in lawsuits',
			example: 'American society is notoriously litigious.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'lugubrious',
			phonetic: '/ləˈɡuːbriəs/',
			definition: 'Looking or sounding sad and dismal',
			example: 'His lugubrious expression matched his mood.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'magnanimous',
			phonetic: '/mæɡˈnænɪməs/',
			definition: 'Generous or forgiving',
			example: 'She was magnanimous in victory.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'mendacious',
			phonetic: '/menˈdeɪʃəs/',
			definition: 'Not telling the truth; lying',
			example: 'The mendacious politician lost public trust.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'mercurial',
			phonetic: '/mɜːˈkjʊəriəl/',
			definition: 'Subject to sudden changes of mood',
			example: 'His mercurial temperament made him unpredictable.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'meticulous',
			phonetic: '/məˈtɪkjʊləs/',
			definition: 'Showing great attention to detail',
			example: 'She is meticulous in her research.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'nefarious',
			phonetic: '/nɪˈfeəriəs/',
			definition: 'Wicked or criminal',
			example: 'The nefarious scheme was eventually exposed.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'nonchalant',
			phonetic: '/ˈnɒnʃəlɑːnt/',
			definition: 'Appearing casually calm and relaxed',
			example: 'She tried to appear nonchalant despite her nerves.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'obsequious',
			phonetic: '/əbˈsiːkwiəs/',
			definition: 'Obedient to an excessive degree',
			example: 'His obsequious manner irritated his colleagues.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'onerous',
			phonetic: '/ˈəʊnərəs/',
			definition: 'Involving heavy obligation; burdensome',
			example: 'The onerous regulations burden small businesses.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'ostentatious',
			phonetic: '/ˌɒstenˈteɪʃəs/',
			definition: 'Characterized by vulgar display of wealth',
			example: 'His ostentatious lifestyle attracted criticism.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'parsimonious',
			phonetic: '/ˌpɑːsɪˈməʊniəs/',
			definition: 'Very unwilling to spend money',
			example: 'The parsimonious approach led to underfunding.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'pedantic',
			phonetic: '/pɪˈdæntɪk/',
			definition: 'Excessively concerned with minor details',
			example: 'His pedantic insistence on rules annoyed everyone.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'penchant',
			phonetic: '/ˈpɒnʃɒn/',
			definition: 'A strong liking for something',
			example: 'She has a penchant for vintage clothing.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'peremptory',
			phonetic: '/pəˈremptəri/',
			definition: 'Insisting on immediate attention; dictatorial',
			example: 'His peremptory tone offended the staff.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'perspicacious',
			phonetic: '/ˌpɜːspɪˈkeɪʃəs/',
			definition: 'Having keen mental perception and understanding',
			example: 'The perspicacious analyst predicted the crisis.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'placate',
			phonetic: '/pləˈkeɪt/',
			definition: 'Make less angry or hostile',
			example: 'They offered concessions to placate the unions.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'plethora',
			phonetic: '/ˈpleθərə/',
			definition: 'A large or excessive amount',
			example: 'There is a plethora of options available.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'precipitous',
			phonetic: '/prɪˈsɪpɪtəs/',
			definition: 'Dangerously steep; done too hastily',
			example: 'The precipitous decline in sales was alarming.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'precocious',
			phonetic: '/prɪˈkəʊʃəs/',
			definition: 'Having developed certain abilities earlier than usual',
			example: 'The precocious child could read at age three.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'prescient',
			phonetic: '/ˈpresiənt/',
			definition: 'Having knowledge of events before they happen',
			example: 'Her prescient warning went unheeded.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'prodigious',
			phonetic: '/prəˈdɪdʒəs/',
			definition: 'Remarkably great in extent or amount',
			example: 'He has a prodigious talent for music.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'profligate',
			phonetic: '/ˈprɒflɪɡət/',
			definition: 'Recklessly extravagant or wasteful',
			example: 'The profligate spending led to bankruptcy.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'propitious',
			phonetic: '/prəˈpɪʃəs/',
			definition: 'Indicating a good chance of success; favourable',
			example: 'The conditions were propitious for investment.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'prosaic',
			phonetic: '/prəˈzeɪɪk/',
			definition: 'Lacking poetic beauty; ordinary',
			example: 'His prosaic writing style lacked imagination.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'pugnacious',
			phonetic: '/pʌɡˈneɪʃəs/',
			definition: 'Eager or quick to argue or fight',
			example: 'His pugnacious demeanor intimidated others.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'querulous',
			phonetic: '/ˈkwerʊləs/',
			definition: 'Complaining in a petulant manner',
			example: 'The querulous customer demanded a refund.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'quixotic',
			phonetic: '/kwɪkˈsɒtɪk/',
			definition: 'Extremely idealistic; unrealistic',
			example: 'His quixotic plan to reform society failed.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'rapacious',
			phonetic: '/rəˈpeɪʃəs/',
			definition: 'Aggressively greedy or grasping',
			example: 'The rapacious corporations exploited workers.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'recondite',
			phonetic: '/ˈrekəndaɪt/',
			definition: 'Little known; obscure',
			example: 'His expertise in recondite subjects impressed few.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'redolent',
			phonetic: '/ˈredələnt/',
			definition: 'Strongly reminiscent of; fragrant',
			example: 'The garden was redolent of jasmine.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'refractory',
			phonetic: '/rɪˈfræktəri/',
			definition: 'Stubborn or unmanageable',
			example: 'The refractory child refused all discipline.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'replete',
			phonetic: '/rɪˈpliːt/',
			definition: 'Filled or well-supplied with',
			example: 'The report is replete with errors.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'sagacious',
			phonetic: '/səˈɡeɪʃəs/',
			definition: 'Having keen mental discernment; wise',
			example: 'The sagacious leader avoided conflict.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'sanguine',
			phonetic: '/ˈsæŋɡwɪn/',
			definition: 'Optimistic in difficult situations',
			example: 'She remained sanguine about her prospects.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'sedulous',
			phonetic: '/ˈsedjʊləs/',
			definition: 'Showing dedication and diligence',
			example: 'His sedulous efforts finally paid off.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'sycophant',
			phonetic: '/ˈsɪkəfənt/',
			definition: 'A person who acts obsequiously for advantage',
			example: 'He surrounded himself with sycophants.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'tenacious',
			phonetic: '/tɪˈneɪʃəs/',
			definition: 'Holding firmly to something; persistent',
			example: 'Her tenacious pursuit of justice inspired others.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'transient',
			phonetic: '/ˈtrænziənt/',
			definition: 'Lasting only for a short time',
			example: 'Fame can be transient.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'trenchant',
			phonetic: '/ˈtrentʃənt/',
			definition: 'Vigorous or incisive in expression',
			example: 'Her trenchant critique exposed the flaws.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'truculent',
			phonetic: '/ˈtrʌkjʊlənt/',
			definition: 'Eager to argue or fight; aggressive',
			example: 'His truculent attitude alienated potential allies.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'turgid',
			phonetic: '/ˈtɜːdʒɪd/',
			definition: 'Swollen; or tediously pompous in style',
			example: 'His turgid prose was difficult to read.',
			level: 'C2',
			type: 'Adjective',
		},
		{
			word: 'ubiquity',
			phonetic: '/juːˈbɪkwɪti/',
			definition: 'The state of being everywhere',
			example: 'The ubiquity of social media affects everyone.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'umbrage',
			phonetic: '/ˈʌmbrɪdʒ/',
			definition: 'Offense or annoyance',
			example: 'She took umbrage at his remarks.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'vacillate',
			phonetic: '/ˈvæsɪleɪt/',
			definition: 'Alternate between different opinions',
			example: 'He vacillated between the two options.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'venerate',
			phonetic: '/ˈvenəreɪt/',
			definition: 'Regard with great respect',
			example: 'The community venerates its elders.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'verbose',
			phonetic: '/vɜːˈbəʊs/',
			definition: 'Using more words than needed',
			example: 'His verbose explanations confused the audience.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'vitriolic',
			phonetic: '/ˌvɪtriˈɒlɪk/',
			definition: 'Filled with bitter criticism or malice',
			example: 'The vitriolic attack damaged his reputation.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'vociferous',
			phonetic: '/vəˈsɪfərəs/',
			definition: 'Expressing opinions loudly and forcefully',
			example: 'The vociferous protests forced a policy change.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'wanton',
			phonetic: '/ˈwɒntən/',
			definition: 'Deliberate and unprovoked',
			example: 'The wanton destruction shocked the community.',
			level: 'C1',
			type: 'Adjective',
		},
		{
			word: 'zealous',
			phonetic: '/ˈzeləs/',
			definition: 'Having great energy in pursuit of a cause',
			example: 'She was a zealous advocate for human rights.',
			level: 'B2',
			type: 'Adjective',
		},
	],
	// Day 8: Speaking Idioms
	idioms: [
		{
			word: 'at the end of the day',
			definition: 'Ultimately',
			example: 'At the end of the day, family matters most.',
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'on the other hand',
			definition: 'Alternatively',
			example:
				"It's expensive, but on the other hand, it's high quality.",
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'to be honest',
			definition: 'Speaking frankly',
			example: "To be honest, I wasn't impressed.",
			level: 'B1',
			type: 'Idiom',
		},
		{
			word: 'as a matter of fact',
			definition: 'Actually',
			example: "As a matter of fact, I've been there twice.",
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'time and again',
			definition: 'Repeatedly',
			example: "I've told him time and again.",
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'more often than not',
			definition: 'Usually',
			example: 'More often than not, I cook at home.',
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'in the long run',
			definition: 'Eventually',
			example: 'In the long run, this will save money.',
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'from time to time',
			definition: 'Occasionally',
			example: 'I visit my grandparents from time to time.',
			level: 'B1',
			type: 'Idiom',
		},
		{
			word: 'once in a while',
			definition: 'Rarely',
			example: 'I go to the cinema once in a while.',
			level: 'B1',
			type: 'Idiom',
		},
		{
			word: 'by and large',
			definition: 'Generally',
			example: 'By and large, the experience was positive.',
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'all things considered',
			definition: 'Overall',
			example: 'All things considered, it was a success.',
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'having said that',
			definition: 'However',
			example: "Having said that, there's room for improvement.",
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'for the most part',
			definition: 'Mostly',
			example: 'For the most part, I agree.',
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'in a nutshell',
			definition: 'Briefly',
			example: 'In a nutshell, it was a great trip.',
			level: 'B2',
			type: 'Idiom',
		},
		{
			word: 'from my perspective',
			definition: 'Personal view',
			example: 'From my perspective, this is the best option.',
			level: 'B2',
			type: 'Phrase',
		},
		{
			word: 'I would argue that',
			definition: 'I contend',
			example: 'I would argue that this is necessary.',
			level: 'B2',
			type: 'Phrase',
		},
		{
			word: 'it seems to me that',
			definition: 'I think',
			example: 'It seems to me that this is fair.',
			level: 'B2',
			type: 'Phrase',
		},
		{
			word: "I'm firmly convinced that",
			definition: 'Strong belief',
			example: "I'm firmly convinced that this works.",
			level: 'B2',
			type: 'Phrase',
		},
	],
	// Day 8: Speaking Collocations
	collocations: [
		{
			word: 'make a decision',
			definition: 'Decide',
			example: "It's time to make a decision.",
			level: 'B1',
			type: 'Collocation',
		},
		{
			word: 'take action',
			definition: 'Act; do something',
			example: 'We need to take action now.',
			level: 'B1',
			type: 'Collocation',
		},
		{
			word: 'pay attention',
			definition: 'Focus; concentrate',
			example: 'Students should pay attention in class.',
			level: 'B1',
			type: 'Collocation',
		},
		{
			word: 'have an impact',
			definition: 'Make a difference',
			example: 'Technology has an impact on society.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'raise awareness',
			definition: 'Inform people',
			example: 'Campaigns raise awareness about issues.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'face challenges',
			definition: 'Deal with problems',
			example: 'Countries face challenges in development.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'meet expectations',
			definition: 'Satisfy requirements',
			example: "The product didn't meet expectations.",
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'draw conclusions',
			definition: 'Decide based on evidence',
			example: 'We can draw conclusions from the data.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'take responsibility',
			definition: 'Accept accountability',
			example: 'People should take responsibility for their actions.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'make progress',
			definition: 'Advance; improve',
			example: 'Students make progress through practice.',
			level: 'B1',
			type: 'Collocation',
		},
		{
			word: 'keep in touch',
			definition: 'Stay connected',
			example: 'I keep in touch with friends online.',
			level: 'B1',
			type: 'Collocation',
		},
		{
			word: 'lead a healthy lifestyle',
			definition: 'Live healthily',
			example: "It's important to lead a healthy lifestyle.",
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: "broaden one's horizons",
			definition: 'Expand knowledge',
			example: 'Travel broadens your horizons.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'gain experience',
			definition: 'Acquire skills',
			example: 'Internships help you gain experience.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'strike a balance',
			definition: 'Find middle ground',
			example: 'We need to strike a balance between work and life.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'undergo transformation',
			definition: 'Change significantly',
			example: 'Cities have undergone transformation.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'make a contribution',
			definition: 'Help; give',
			example: 'Everyone can make a contribution.',
			level: 'B2',
			type: 'Collocation',
		},
		{
			word: 'come to terms with',
			definition: 'Accept reality',
			example: 'He came to terms with the situation.',
			level: 'B2',
			type: 'Collocation',
		},
	],
	// Day 9: Mixed Practice Academic
	mixedAcademic: [
		{
			word: 'accommodate',
			definition: 'Provide space for',
			example: 'The hotel can accommodate 200 guests.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'acknowledge',
			definition: 'Accept or recognize',
			example: 'She acknowledged her mistake.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'advocate',
			definition: 'Publicly support',
			example: 'They advocate for equal rights.',
			level: 'C1',
			type: 'Verb/Noun',
		},
		{
			word: 'allocate',
			definition: 'Distribute for a purpose',
			example: 'Funds were allocated to education.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'anticipate',
			definition: 'Expect something',
			example: 'We anticipate a busy season.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'approximately',
			definition: 'Close to an exact amount',
			example: 'It costs approximately $100.',
			level: 'B1',
			type: 'Adverb',
		},
		{
			word: 'assess',
			definition: 'Evaluate or judge',
			example: 'We need to assess the situation.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'assume',
			definition: 'Suppose without proof',
			example: 'I assumed you knew.',
			level: 'B2',
			type: 'Verb',
		},
		{
			word: 'attain',
			definition: 'Achieve or reach',
			example: 'She attained her goal.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'authorize',
			definition: 'Give official permission',
			example: 'Only managers can authorize this.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'beneficial',
			definition: 'Having a good effect',
			example: 'Exercise is beneficial for health.',
			level: 'B2',
			type: 'Adjective',
		},
		{
			word: 'capacity',
			definition: 'Maximum amount',
			example: 'The stadium has a capacity of 50,000.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'circumstances',
			definition: 'Conditions or situation',
			example: 'Under the circumstances, we had no choice.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'coincide',
			definition: 'Happen at same time',
			example: 'The events coincided.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'collapse',
			definition: 'Fall down suddenly',
			example: 'The building collapsed.',
			level: 'B2',
			type: 'Verb/Noun',
		},
		{
			word: 'commence',
			definition: 'Begin',
			example: 'The meeting will commence at 9 AM.',
			level: 'C1',
			type: 'Verb',
		},
		{
			word: 'commodity',
			definition: 'Product that can be traded',
			example: 'Oil is a valuable commodity.',
			level: 'C1',
			type: 'Noun',
		},
		{
			word: 'communicate',
			definition: 'Share information',
			example: "It's important to communicate clearly.",
			level: 'B1',
			type: 'Verb',
		},
		{
			word: 'complexity',
			definition: 'State of being complicated',
			example: 'The complexity of the problem is high.',
			level: 'B2',
			type: 'Noun',
		},
		{
			word: 'component',
			definition: 'Part of a larger whole',
			example: 'Each component is essential.',
			level: 'B2',
			type: 'Noun',
		},
	],
};

let flashcardState = {
	currentCategory: 'academic',
	currentIndex: 0,
	showingAnswer: false,
	learned: JSON.parse(localStorage.getItem('ielts-vocab-learned') || '[]'),
	shuffle: false,
	mode: 'learn', // 'learn' or 'test'
	quizState: {
		questions: [],
		currentQuestion: 0,
		score: 0,
		answers: [],
		completed: false,
	},
};

// Refresh flashcard state from localStorage (used after cloud sync)
function refreshFlashcardState() {
	flashcardState.learned = JSON.parse(
		localStorage.getItem('ielts-vocab-learned') || '[]',
	);
	updateFlashcardDisplay();
}

// In-app alert for vocabulary (fallback if notificationManager not available)
function showVocabAlert(message) {
	// Remove existing alert if any
	const existing = document.getElementById('vocab-alert');
	if (existing) existing.remove();

	const alert = document.createElement('div');
	alert.id = 'vocab-alert';
	alert.className =
		'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4';
	alert.innerHTML = `
		<div class="bg-amber-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
			<span class="text-xl">⚠️</span>
			<p class="flex-1 text-sm font-medium">${message}</p>
			<button onclick="this.closest('#vocab-alert').remove()" class="text-white/80 hover:text-white text-lg font-bold">&times;</button>
		</div>
	`;
	document.body.appendChild(alert);

	// Auto-remove after 5 seconds
	setTimeout(() => alert.remove(), 5000);
}

function initFlashcards() {
	updateFlashcardDisplay();
}

function updateFlashcardDisplay() {
	const container = document.getElementById('flashcard-container');
	if (!container) return;

	// If in test mode, show quiz interface
	if (flashcardState.mode === 'test') {
		renderQuizMode(container);
		return;
	}

	const words = IELTS_VOCABULARY[flashcardState.currentCategory];
	const currentWord = words[flashcardState.currentIndex];
	const isLearned = flashcardState.learned.includes(currentWord.word);
	const learnedInCategory = words.filter((w) =>
		flashcardState.learned.includes(w.word),
	).length;
	const levelColors = {
		B1: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
		B2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
		C1: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
		C2: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
	};
	const levelColor = levelColors[currentWord.level] || levelColors['B2'];

	container.innerHTML = `
		<div class="space-y-3">
			<!-- Mode Toggle -->
			<div class="flex items-center justify-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
				<button onclick="switchVocabMode('learn')"
					class="flex-1 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
						flashcardState.mode === 'learn'
							? 'bg-white dark:bg-gray-600 text-teal-600 dark:text-teal-400 shadow-sm'
							: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
					}">
					📚 Learn
				</button>
				<button onclick="switchVocabMode('test')"
					class="flex-1 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
						flashcardState.mode === 'test'
							? 'bg-white dark:bg-gray-600 text-teal-600 dark:text-teal-400 shadow-sm'
							: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
					}">
					✏️ Test (${learnedInCategory} words)
				</button>
			</div>

			<!-- Category Dropdown -->
			<div class="flex items-center justify-between gap-3">
				<div class="relative flex-1">
					<select onchange="changeVocabCategory(this.value)"
						class="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer">
						${Object.keys(IELTS_VOCABULARY)
							.map(
								(cat) => `
							<option value="${cat}" ${
									flashcardState.currentCategory === cat
										? 'selected'
										: ''
								}>
								${cat.charAt(0).toUpperCase() + cat.slice(1)} (${IELTS_VOCABULARY[cat].length})
							</option>
						`,
							)
							.join('')}
					</select>
					<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
						<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
						</svg>
					</div>
				</div>
				<span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
					${flashcardState.learned.length} total
				</span>
			</div>

			<!-- Progress -->
			<div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
				<span>Card ${flashcardState.currentIndex + 1} of ${words.length}</span>
				<span class="flex items-center gap-2">
					${
						currentWord.type
							? `<span class="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">${currentWord.type}</span>`
							: ''
					}
					<span class="px-2 py-0.5 rounded ${levelColor} text-xs font-medium">${
		currentWord.level || 'B2'
	}</span>
				</span>
			</div>

			<!-- Flashcard -->
			<div class="cursor-pointer" onclick="flipFlashcard()">
				<div class="bg-white dark:bg-gray-800 rounded-xl border-2 ${
					isLearned
						? 'border-green-400'
						: 'border-gray-200 dark:border-gray-700'
				} p-3 sm:p-5 min-h-[180px] sm:min-h-[200px] flex flex-col items-center justify-center text-center transition-all hover:shadow-lg">
					${
						flashcardState.showingAnswer
							? `
						<p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Definition:</p>
						<p class="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2 sm:mb-3">${
							currentWord.definition
						}</p>
						<p class="text-xs text-teal-600 dark:text-teal-400 italic mb-2">"${
							currentWord.example
						}"</p>
						${
							currentWord.type
								? `<p class="text-[10px] text-blue-500 dark:text-blue-400 mb-1">${currentWord.type}</p>`
								: ''
						}
						<button onclick="event.stopPropagation(); flipFlashcard()" class="text-xs text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">↩️ Flip back</button>
					`
							: `
						<p class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">${
							currentWord.word
						}</p>
						${
							currentWord.type
								? `<p class="text-[10px] text-blue-500 dark:text-blue-400 mb-1">(${currentWord.type})</p>`
								: ''
						}
						${
							currentWord.phonetic
								? `<p class="text-xs text-purple-600 dark:text-purple-400 font-mono mb-2">${currentWord.phonetic}</p>`
								: ''
						}
						<button onclick="event.stopPropagation(); pronounceWord('${currentWord.word.replace(
							/'/g,
							"\\'",
						)}')"
							class="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium hover:bg-teal-200 dark:hover:bg-teal-800/50 transition-colors flex items-center gap-1 mb-2">
							<span>🔊</span> Listen
						</button>
						<span class="text-xs text-gray-400">👆 Tap to see definition</span>
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
						class="px-3 py-2 rounded-lg text-xs font-medium transition-colors
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

	// Trigger cloud sync if available
	if (typeof cloudSync !== 'undefined' && cloudSync.syncEnabled) {
		cloudSync.syncToCloud();
	}
}

function shuffleFlashcards() {
	const words = IELTS_VOCABULARY[flashcardState.currentCategory];
	flashcardState.currentIndex = Math.floor(Math.random() * words.length);
	flashcardState.showingAnswer = false;
	updateFlashcardDisplay();
}

// Clean text for speech - remove IPA, emojis, and other non-spoken content
function cleanTextForSpeech(text) {
	if (!text) return '';

	// Remove IPA phonetic notation (anything between / / or [ ])
	let cleaned = text.replace(/\/[^\/]+\//g, '').replace(/\[[^\]]+\]/g, '');

	// Remove common emojis and symbols used as prefixes
	cleaned = cleaned.replace(
		/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}💬📝✨🔹▸•\-\*]+\s*/gu,
		'',
	);

	// Remove leading/trailing whitespace and extra spaces
	cleaned = cleaned.replace(/\s+/g, ' ').trim();

	return cleaned;
}

// Pronounce word using Web Speech API
function pronounceWord(word) {
	if ('speechSynthesis' in window) {
		// Cancel any ongoing speech
		window.speechSynthesis.cancel();

		const cleanedWord = cleanTextForSpeech(word);
		if (!cleanedWord) return;

		const utterance = new SpeechSynthesisUtterance(cleanedWord);
		utterance.lang = 'en-GB'; // British English for IELTS
		utterance.rate = 0.85; // Slightly slower for clarity
		utterance.pitch = 1;

		// Try to use a British voice if available
		const voices = window.speechSynthesis.getVoices();
		const britishVoice = voices.find(
			(voice) =>
				voice.lang.includes('en-GB') || voice.name.includes('British'),
		);
		if (britishVoice) {
			utterance.voice = britishVoice;
		}

		window.speechSynthesis.speak(utterance);
	} else {
		alert(
			'Speech synthesis not supported in this browser. Try Chrome or Safari.',
		);
	}
}

// Load voices when available
if ('speechSynthesis' in window) {
	window.speechSynthesis.onvoiceschanged = () => {
		window.speechSynthesis.getVoices();
	};
}

// ==================== VOCABULARY QUIZ/TEST MODE ====================
function switchVocabMode(mode) {
	flashcardState.mode = mode;
	if (mode === 'test') {
		startVocabQuiz();
	} else {
		updateFlashcardDisplay();
	}
}

function startVocabQuiz() {
	const words = IELTS_VOCABULARY[flashcardState.currentCategory];
	const learnedWords = words.filter((w) =>
		flashcardState.learned.includes(w.word),
	);

	if (learnedWords.length < 4) {
		flashcardState.mode = 'learn';
		updateFlashcardDisplay();
		// Use in-app notification instead of browser alert
		if (typeof notificationManager !== 'undefined') {
			notificationManager.showInAppNotification(
				'Learn at least 4 words first before taking the test!',
				'warning',
				5000,
			);
		} else {
			// Fallback: create simple in-app notification
			showVocabAlert(
				'Learn at least 4 words first before taking the test!',
			);
		}
		return;
	}

	// Create quiz with max 10 questions from learned words
	const quizWords = shuffleArray([...learnedWords]).slice(0, 10);
	const questions = quizWords.map((word) => {
		// Get 3 wrong options from all words (not the correct one)
		const allOtherWords = words.filter((w) => w.word !== word.word);
		const wrongOptions = shuffleArray(allOtherWords)
			.slice(0, 3)
			.map((w) => w.definition);
		const options = shuffleArray([word.definition, ...wrongOptions]);

		return {
			word: word.word,
			correctAnswer: word.definition,
			options: options,
		};
	});

	flashcardState.quizState = {
		questions: questions,
		currentQuestion: 0,
		score: 0,
		answers: [],
		completed: false,
	};

	updateFlashcardDisplay();
}

function shuffleArray(array) {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function renderQuizMode(container) {
	const quiz = flashcardState.quizState;

	if (quiz.completed) {
		// Show results
		const percentage = Math.round(
			(quiz.score / quiz.questions.length) * 100,
		);
		const grade =
			percentage >= 90
				? '🏆 Excellent!'
				: percentage >= 70
				? '✅ Good job!'
				: percentage >= 50
				? '📚 Keep practicing!'
				: '❌ Review words again';

		container.innerHTML = `
			<div class="space-y-4 text-center">
				<div class="text-4xl mb-2">${percentage >= 70 ? '🎉' : '📖'}</div>
				<h3 class="text-xl font-bold text-gray-900 dark:text-white">Quiz Complete!</h3>
				<div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
					<p class="text-3xl font-bold ${
						percentage >= 70 ? 'text-green-600' : 'text-amber-600'
					} mb-2">
						${quiz.score}/${quiz.questions.length}
					</p>
					<p class="text-sm text-gray-600 dark:text-gray-400">${percentage}% correct</p>
					<p class="text-lg font-medium mt-2">${grade}</p>
				</div>

				<!-- Review wrong answers -->
				${
					quiz.answers.filter((a) => !a.correct).length > 0
						? `
					<div class="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-left">
						<p class="font-semibold text-red-700 dark:text-red-400 mb-2 text-sm">Review these words:</p>
						<div class="space-y-2">
							${quiz.answers
								.filter((a) => !a.correct)
								.map(
									(a) => `
								<div class="text-xs">
									<span class="font-medium text-gray-900 dark:text-white">${a.word}</span>
									<span class="text-gray-500 dark:text-gray-400"> → ${a.correctAnswer}</span>
								</div>
							`,
								)
								.join('')}
						</div>
					</div>
				`
						: ''
				}

				<div class="flex gap-2 justify-center mt-4">
					<button onclick="startVocabQuiz()"
						class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors">
						🔄 Try Again
					</button>
					<button onclick="switchVocabMode('learn')"
						class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors">
						📚 Back to Learn
					</button>
				</div>
			</div>
		`;
		return;
	}

	const q = quiz.questions[quiz.currentQuestion];

	container.innerHTML = `
		<div class="space-y-3">
			<!-- Mode Toggle -->
			<div class="flex items-center justify-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
				<button onclick="switchVocabMode('learn')"
					class="flex-1 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
					📚 Learn
				</button>
				<button onclick="switchVocabMode('test')"
					class="flex-1 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors bg-white dark:bg-gray-600 text-teal-600 dark:text-teal-400 shadow-sm">
					✏️ Test
				</button>
			</div>

			<!-- Progress -->
			<div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
				<span>Question ${quiz.currentQuestion + 1} of ${quiz.questions.length}</span>
				<span class="text-green-600 dark:text-green-400 font-medium">Score: ${
					quiz.score
				}</span>
			</div>

			<!-- Progress bar -->
			<div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
				<div class="h-full bg-teal-500 transition-all duration-300"
					style="width: ${(quiz.currentQuestion / quiz.questions.length) * 100}%"></div>
			</div>

			<!-- Question -->
			<div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
				<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">What is the meaning of:</p>
				<p class="text-xl font-bold text-gray-900 dark:text-white mb-1">${q.word}</p>
				<button onclick="pronounceWord('${q.word.replace(/'/g, "\\'")}')"
					class="text-xs text-teal-600 dark:text-teal-400 hover:underline">🔊 Listen</button>
			</div>

			<!-- Options -->
			<div class="space-y-2">
				${q.options
					.map(
						(opt, i) => `
					<button onclick="answerQuizQuestion(${i})"
						class="w-full text-left px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-sm text-gray-700 dark:text-gray-300 transition-colors">
						<span class="font-medium text-gray-500 dark:text-gray-500 mr-2">${String.fromCharCode(
							65 + i,
						)}.</span>
						${opt}
					</button>
				`,
					)
					.join('')}
			</div>
		</div>
	`;
}

function answerQuizQuestion(optionIndex) {
	const quiz = flashcardState.quizState;
	const q = quiz.questions[quiz.currentQuestion];
	const selectedAnswer = q.options[optionIndex];
	const isCorrect = selectedAnswer === q.correctAnswer;

	quiz.answers.push({
		word: q.word,
		selectedAnswer: selectedAnswer,
		correctAnswer: q.correctAnswer,
		correct: isCorrect,
	});

	if (isCorrect) {
		quiz.score++;
	}

	quiz.currentQuestion++;

	if (quiz.currentQuestion >= quiz.questions.length) {
		quiz.completed = true;
	}

	updateFlashcardDisplay();
}

// Expose quiz functions globally
window.switchVocabMode = switchVocabMode;
window.startVocabQuiz = startVocabQuiz;
window.answerQuizQuestion = answerQuizQuestion;

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
window.pronounceWord = pronounceWord;

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
				<!-- Cambridge IELTS Books (1-20) -->
				<div>
					<h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
						<span>📚</span> Cambridge IELTS Books 1-20 (Free Practice Tests)
					</h4>
					<p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Click any book for free online practice tests with answers</p>
					<div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
						${[
							{
								num: 20,
								url: 'https://practicepteonline.com/official-ielts-tests-book-20/',
								new: true,
							},
							{
								num: 19,
								url: 'https://practicepteonline.com/official-ielts-book-19/',
								new: true,
							},
							{
								num: 18,
								url: 'https://practicepteonline.com/official-ielts-tests-book-18/',
							},
							{
								num: 17,
								url: 'https://practicepteonline.com/official-ielts-tests-book-17/',
							},
							{
								num: 16,
								url: 'https://practicepteonline.com/official-ielts-tests-book-16/',
							},
							{
								num: 15,
								url: 'https://practicepteonline.com/official-ielts-tests-book-15/',
							},
							{
								num: 14,
								url: 'https://practicepteonline.com/official-ielts-tests-book-14/',
							},
							{
								num: 13,
								url: 'https://practicepteonline.com/official-ielts-tests-book-13/',
							},
							{
								num: 12,
								url: 'https://practicepteonline.com/official-ielts-tests-book-12/',
							},
							{
								num: 11,
								url: 'https://practicepteonline.com/official-ielts-tests-book-11/',
							},
							{
								num: 10,
								url: 'https://practicepteonline.com/official-ielts-tests-book-10/',
							},
							{
								num: 9,
								url: 'https://practicepteonline.com/official-ielts-tests-book-9/',
							},
							{
								num: 8,
								url: 'https://practicepteonline.com/official-ielts-tests-book-8/',
							},
							{
								num: 7,
								url: 'https://practicepteonline.com/official-ielts-tests-book-7/',
							},
							{
								num: 6,
								url: 'https://practicepteonline.com/official-ielts-tests-book-6/',
							},
							{
								num: 5,
								url: 'https://practicepteonline.com/official-ielts-tests-book-5/',
							},
							{
								num: 4,
								url: 'https://practicepteonline.com/official-ielts-tests-book-4/',
							},
							{
								num: 3,
								url: 'https://practicepteonline.com/official-ielts-tests-book-3/',
							},
							{
								num: 2,
								url: 'https://practicepteonline.com/official-ielts-tests-book-2/',
							},
							{
								num: 1,
								url: 'https://practicepteonline.com/official-ielts-tests-book-1/',
							},
						]
							.map(
								(book) => `
							<a href="${book.url}" target="_blank"
								class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600 relative">
								${
									book.new
										? '<span class="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded">NEW</span>'
										: ''
								}
								<div class="text-lg mb-0.5">📕</div>
								<div class="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">Book ${
									book.num
								}</div>
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
						<a href="https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests" target="_blank"
							class="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border-2 border-blue-300 dark:border-blue-700">
							<span class="text-2xl">🎯</span>
							<div>
								<div class="text-sm font-bold text-blue-700 dark:text-blue-300">BC Practice Tests</div>
								<div class="text-xs text-blue-600 dark:text-blue-400">Official FREE mock tests ⭐</div>
							</div>
						</a>
						<a href="https://ieltsliz.com/" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">👩‍🏫</span>
							<div>
								<div class="text-sm font-medium text-teal-700 dark:text-teal-300">IELTS Liz</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Free lessons & tips</div>
							</div>
						</a>
						<a href="https://www.ielts.org/for-test-takers/sample-test-questions" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">📝</span>
							<div>
								<div class="text-sm font-medium text-teal-700 dark:text-teal-300">IELTS.org</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Official sample tests</div>
							</div>
						</a>
						<a href="https://www.britishcouncil.org/exam/ielts/prepare" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">🇬🇧</span>
							<div>
								<div class="text-sm font-medium text-teal-700 dark:text-teal-300">British Council</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Free prep materials</div>
							</div>
						</a>
						<a href="https://www.idp.com/australia/ielts/prepare/" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">🌏</span>
							<div>
								<div class="text-sm font-medium text-teal-700 dark:text-teal-300">IDP IELTS</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Practice & resources</div>
							</div>
						</a>
						<a href="https://www.ieltsadvantage.com/free-ielts-practice-tests/" target="_blank"
							class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-gray-200 dark:border-gray-600">
							<span class="text-2xl">📊</span>
							<div>
								<div class="text-sm font-medium text-teal-700 dark:text-teal-300">IELTS Advantage</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Free practice tests</div>
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
								<div class="text-sm font-medium text-red-700 dark:text-red-300">IELTS with Abo Rameen</div>
								<div class="text-xs text-red-600 dark:text-red-400">Band 9 strategies</div>
							</div>
						</a>
						<a href="https://www.youtube.com/@IELTSLiz" target="_blank"
							class="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
							<span class="text-2xl">🎬</span>
							<div>
								<div class="text-sm font-medium text-red-700 dark:text-red-300">IELTS Liz</div>
								<div class="text-xs text-red-600 dark:text-red-400">All sections covered</div>
							</div>
						</a>
						<a href="https://www.youtube.com/@E2IELTS" target="_blank"
							class="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
							<span class="text-2xl">🎬</span>
							<div>
								<div class="text-sm font-medium text-red-700 dark:text-red-300">E2 IELTS</div>
								<div class="text-xs text-red-600 dark:text-red-400">High-quality lessons</div>
							</div>
						</a>
						<a href="https://www.youtube.com/@AsadYaqub" target="_blank"
							class="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
							<span class="text-2xl">🎬</span>
							<div>
								<div class="text-sm font-medium text-red-700 dark:text-red-300">Asad Yaqub</div>
								<div class="text-xs text-red-600 dark:text-red-400">Tips & mock tests</div>
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
