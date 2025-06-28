# 📚 Word Weaver Dictionary App

This is a simple dictionary web app built using **JavaScript** and the [Free Dictionary API](https://dictionaryapi.dev/). Users can search for any word to get definitions, phonetics, audio pronunciation, examples, and more.

---

## 🚀 Live Features

- Search any word using input box or "Enter" key
- Displays:
  - Phonetic transcription
  - Audio pronunciation (if available)
  - Part of speech, definitions, and examples
  - Synonyms and antonyms
  - Source link for reference
- Handles errors and invalid words gracefully

---

## 🧠 JavaScript Logic Breakdown

### 🔍 DOM Interactions

- **Input Field**: For entering the word to search.
- **Button**: Triggers search on click.
- **Result Container**: Displays the word details or error.

### 🌐 API Integration

- **API Used**: [Free Dictionary API](https://api.dictionaryapi.dev/api/v2/entries/en/)

### 🖱️ Event Listeners

- `searchBtn.onclick` → Triggers `fetchDefinition()`
- `wordInput.keypress (Enter)` → Also triggers `fetchDefinition()`

### ⚙️ fetchDefinition()

An async function that:
- Gets and trims the input value
- Validates for empty input
- Shows a "Searching..." message
- Uses `fetch()` with `async/await` to call the API
- Parses JSON response and:
  - ✅ On success: calls `displayDefinition(data)`
  - ❌ On word not found or other error: calls `displayError(message)`

### 📄 displayDefinition(data)

- Clears previous results
- Dynamically builds HTML content for:
  - Word, phonetic, audio (if any)
  - Definitions grouped by part of speech
  - Examples, synonyms, antonyms
  - Source link

### ⚠️ displayError(message)

- Displays user-friendly error message inside result container

---

## 🧰 Tech Stack

- HTML
- CSS
- JavaScript (Vanilla JS)
- [Free Dictionary API](https://dictionaryapi.dev/)

---

## 📌 Usage

1. Clone the repo or open the `.html` file in a browser.
2. Type a word and click **Search** or press **Enter**.
3. View the results with rich word information.

---

## 🙋‍♀️ Author

Appala Meenakshi Sindhuja  
3rd Year B.E., Chaitanya Bharathi Institute of Technology
