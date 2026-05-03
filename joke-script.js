// DOM Elements
const jokeDisplay = document.getElementById('jokeDisplay');
const getJokeBtn = document.getElementById('getJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const categorySelect = document.getElementById('categorySelect');
const loadingSpinner = document.getElementById('loadingSpinner');
const jokeCounter = document.getElementById('jokeCounter');
const favoritesList = document.getElementById('favoritesList');
const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');

// State
let currentJoke = '';
let jokesLoaded = 0;
let favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];

// API endpoints
const APIs = {
    any: 'https://official-joke-api.appspot.com/random_joke',
    general: 'https://official-joke-api.appspot.com/jokes/general/random',
    programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
    'knock-knock': 'https://official-joke-api.appspot.com/jokes/knock-knock/random'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateJokeCounter();
    renderFavorites();
});

// Event Listeners
getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyToClipboard);
categorySelect.addEventListener('change', fetchJoke);
clearFavoritesBtn.addEventListener('click', clearAllFavorites);

/**
 * Fetch a joke from the API
 */
async function fetchJoke() {
    const category = categorySelect.value;
    const apiUrl = APIs[category] || APIs.any;

    // Show loading state
    showLoading(true);
    getJokeBtn.disabled = true;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayJoke(data);
        jokesLoaded++;
        updateJokeCounter();

    } catch (error) {
        console.error('Error fetching joke:', error);
        displayError('Failed to load joke. Please try again!');
    } finally {
        showLoading(false);
        getJokeBtn.disabled = false;
    }
}

/**
 * Display the joke on the screen
 */
function displayJoke(jokeData) {
    let jokeText = '';

    // Handle different joke formats
    if (jokeData.setup && jokeData.delivery) {
        // Two-part joke
        jokeText = `<span class="joke-setup">${jokeData.setup}</span><span class="joke-punchline">${jokeData.delivery}</span>`;
        currentJoke = `${jokeData.setup}\n${jokeData.delivery}`;
    } else if (jokeData.joke) {
        // Single-line joke
        jokeText = jokeData.joke;
        currentJoke = jokeData.joke;
    } else {
        jokeText = 'Could not load joke. Try again!';
        currentJoke = '';
    }

    jokeDisplay.innerHTML = `<p>${jokeText}</p>`;
    
    // Add animation
    jokeDisplay.style.animation = 'none';
    setTimeout(() => {
        jokeDisplay.style.animation = 'fadeIn 0.6s ease-out';
    }, 10);
}

/**
 * Display error message
 */
function displayError(message) {
    jokeDisplay.innerHTML = `<p style="color: #ff6b6b;">${message}</p>`;
}

/**
 * Show/hide loading spinner
 */
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.add('active');
    } else {
        loadingSpinner.classList.remove('active');
    }
}

/**
 * Copy current joke to clipboard
 */
function copyToClipboard() {
    if (!currentJoke) {
        alert('No joke to copy!');
        return;
    }

    navigator.clipboard.writeText(currentJoke).then(() => {
        // Change button text temporarily
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        copyBtn.style.background = '#51cf66';
        copyBtn.style.borderColor = '#51cf66';

        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
            copyBtn.style.borderColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy joke to clipboard');
    });
}

/**
 * Add current joke to favorites
 */
function addToFavorites() {
    if (!currentJoke) return;

    if (!favorites.includes(currentJoke)) {
        favorites.push(currentJoke);
        saveFavorites();
        renderFavorites();
    }
}

/**
 * Remove joke from favorites
 */
function removeFromFavorites(joke) {
    favorites = favorites.filter(fav => fav !== joke);
    saveFavorites();
    renderFavorites();
}

/**
 * Save favorites to localStorage
 */
function saveFavorites() {
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
}

/**
 * Render favorites list
 */
function renderFavorites() {
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<li class="empty-message">No favorites yet. Add some!</li>';
        return;
    }

    favorites.forEach(joke => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${truncateJoke(joke, 60)}</span>
            <button onclick="removeFromFavorites('${escapeQuotes(joke)}')">Remove</button>
        `;
        favoritesList.appendChild(li);
    });
}

/**
 * Clear all favorites
 */
function clearAllFavorites() {
    if (favorites.length === 0) return;

    if (confirm('Are you sure you want to clear all favorites?')) {
        favorites = [];
        saveFavorites();
        renderFavorites();
    }
}

/**
 * Update joke counter display
 */
function updateJokeCounter() {
    jokeCounter.textContent = jokesLoaded;
}

/**
 * Truncate long jokes
 */
function truncateJoke(joke, length) {
    return joke.length > length ? joke.substring(0, length) + '...' : joke;
}

/**
 * Escape quotes for inline onclick handlers
 */
function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Add favorite button functionality to joke display
jokeDisplay.addEventListener('click', () => {
    if (currentJoke && !jokeDisplay.querySelector('.favorite-added')) {
        addToFavorites();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        fetchJoke();
    }
});
