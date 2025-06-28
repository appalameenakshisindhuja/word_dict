document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultContainer = document.getElementById('resultContainer');

    const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

    searchBtn.addEventListener('click', fetchDefinition);
    wordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            fetchDefinition();
        }
    });

    async function fetchDefinition() {
        const word = wordInput.value.trim();
        if (!word) {
            displayError("Please enter a word.");
            return;
        }

        resultContainer.innerHTML = '<p class="placeholder-text">Searching...</p>'; // Show loading state

        try {
            const response = await fetch(`${API_URL}${word}`);
            const data = await response.json();

            if (response.ok && data.length > 0) {
                displayDefinition(data[0]); // Free Dictionary API returns an array
            } else if (data.title === "No Definitions Found") {
                displayError(`Sorry, "${word}" not found in the dictionary. Please double-check the spelling or try a different word.`);
            } else {
                displayError("An error occurred while fetching the definition. Please try again.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            displayError("Could not connect to the dictionary service. Please check your internet connection.");
        }
    }

    function displayDefinition(data) {
        resultContainer.innerHTML = ''; // Clear previous results

        const wordDisplay = document.createElement('div');
        wordDisplay.classList.add('word-display');

        // Word and Phonetics
        const wordTitle = document.createElement('h2');
        wordTitle.textContent = data.word;

        const phoneticText = document.createElement('span');
        phoneticText.classList.add('phonetic-text');
        const phonetic = data.phonetic || (data.phonetics.find(p => p.text) ? data.phonetics.find(p => p.text).text : '');
        phoneticText.textContent = phonetic;
        wordTitle.appendChild(phoneticText);

        // Audio
        const audioUrl = data.phonetics.find(p => p.audio && p.audio.length > 0);
        if (audioUrl) {
            const audioIcon = document.createElement('i');
            audioIcon.classList.add('fas', 'fa-volume-up', 'audio-icon');
            audioIcon.title = 'Play pronunciation';
            audioIcon.addEventListener('click', () => {
                const audio = new Audio(audioUrl.audio);
                audio.play().catch(e => console.error("Audio playback error:", e));
            });
            wordTitle.appendChild(audioIcon);
        }

        wordDisplay.appendChild(wordTitle);
        resultContainer.appendChild(wordDisplay);

        // Meanings
        data.meanings.forEach(meaning => {
            const meaningSection = document.createElement('div');
            meaningSection.classList.add('meaning-section');

            const partOfSpeech = document.createElement('h3');
            partOfSpeech.classList.add('part-of-speech');
            partOfSpeech.textContent = meaning.partOfSpeech;
            meaningSection.appendChild(partOfSpeech);

            const definitionList = document.createElement('ol');
            definitionList.classList.add('definition-list');

            meaning.definitions.forEach((def, index) => {
                const definitionItem = document.createElement('li');
                definitionItem.classList.add('definition-item');

                const strongDef = document.createElement('strong');
                strongDef.textContent = def.definition;
                definitionItem.appendChild(strongDef);

                if (def.example) {
                    const example = document.createElement('p');
                    example.classList.add('example');
                    example.textContent = `Example: "${def.example}"`;
                    definitionItem.appendChild(example);
                }
                definitionList.appendChild(definitionItem);
            });
            meaningSection.appendChild(definitionList);

            // Synonyms and Antonyms (if available)
            if (meaning.synonyms && meaning.synonyms.length > 0) {
                const synonyms = document.createElement('p');
                synonyms.classList.add('synonyms-antonyms');
                synonyms.innerHTML = `<strong>Synonyms:</strong> ${meaning.synonyms.slice(0, 5).join(', ')}`;
                if (meaning.synonyms.length > 5) {
                    synonyms.innerHTML += '...';
                }
                meaningSection.appendChild(synonyms);
            }
            if (meaning.antonyms && meaning.antonyms.length > 0) {
                const antonyms = document.createElement('p');
                antonyms.classList.add('synonyms-antonyms');
                antonyms.innerHTML = `<strong>Antonyms:</strong> ${meaning.antonyms.slice(0, 5).join(', ')}`;
                 if (meaning.antonyms.length > 5) {
                    antonyms.innerHTML += '...';
                }
                meaningSection.appendChild(antonyms);
            }

            resultContainer.appendChild(meaningSection);
        });

        // Source URL
        if (data.sourceUrls && data.sourceUrls.length > 0) {
            const sourceLink = document.createElement('p');
            sourceLink.classList.add('source-link');
            sourceLink.innerHTML = `Source: <a href="${data.sourceUrls[0]}" target="_blank" rel="noopener noreferrer">${data.sourceUrls[0]}</a>`;
            resultContainer.appendChild(sourceLink);
        }
    }

    function displayError(message) {
        resultContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }
});