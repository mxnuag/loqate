document.addEventListener('DOMContentLoaded', () => {
    const addressInput = document.getElementById('address');
    const suggestionsContainer = document.getElementById('address-suggestions');

    addressInput.addEventListener('input', async () => {
        const query = addressInput.value;
        if (query.length > 2) {
            const suggestions = await fetchSuggestions(query);
            displaySuggestions(suggestions);
        } else {
            suggestionsContainer.innerHTML = '';
        }
    });

    suggestionsContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'DIV') {
            addressInput.value = event.target.textContent;
            suggestionsContainer.innerHTML = '';
        }
    });

    async function fetchSuggestions(query) {
        const apiKey = 'YOUR_LOQATE_API_KEY';
        const response = await fetch(`https://api.addressy.com/Capture/Interactive/Find/v1.00/json3.ws?Key=${apiKey}&Text=${query}&IsMiddleware=false`);
        const data = await response.json();
        return data.Items || [];
    }

    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = suggestions.map(suggestion => `<div>${suggestion.Text}</div>`).join('');
    }
});
