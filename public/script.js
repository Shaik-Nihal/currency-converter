// Update API endpoints to use absolute paths
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? '' 
  : 'https://shaik-nihal.github.io/currency-converter';

// Update fetch calls
const response = await fetch(`${API_BASE_URL}/api/supported-currencies`);
// Store Choices.js instances globally
let fromChoices, toChoices;

// Function to populate the "From" and "To" currency dropdowns
async function populateCurrencyDropdowns() {
    try {
        const response = await fetch('/api/supported-currencies');
        const data = await response.json();

        if (data && data.supported_codes) {
            const fromDropdown = document.getElementById('fromCurrency');
            const toDropdown = document.getElementById('toCurrency');

            data.supported_codes.forEach(([currencyCode, currencyName]) => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currencyCode;
                optionFrom.textContent = `${currencyName} (${currencyCode})`;
                fromDropdown.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currencyCode;
                optionTo.textContent = `${currencyName} (${currencyCode})`;
                toDropdown.appendChild(optionTo);
            });

            // Initialize and store Choices.js instances
            fromChoices = new Choices(fromDropdown, { 
                searchEnabled: true,
                placeholderValue: 'Select currency'
            });
            toChoices = new Choices(toDropdown, { 
                searchEnabled: true,
                placeholderValue: 'Select currency'
            });
        } else {
            console.error('Failed to fetch supported currencies.');
        }
    } catch (error) {
        console.error('Error fetching supported currencies:', error);
    }
}

// Function to handle currency conversion
async function convertCurrency() {
    const from = fromChoices.getValue(true);
    const to = toChoices.getValue(true);
    const amount = parseFloat(document.getElementById('amountInput').value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('resultText').textContent = 'Please enter a valid amount.';
        return;
    }

    try {
        const response = await fetch(`/api/exchange-rate?from=${from}&to=${to}`);
        const data = await response.json();
        const rate = data.conversion_rates[to];

        if (!rate) {
            document.getElementById('resultText').textContent = 'Exchange rate not available.';
            return;
        }

        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById('resultText').textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        document.getElementById('exchangeRate').value = rate.toFixed(4);
        document.getElementById('fromCode').textContent = from;
        document.getElementById('toCode').textContent = to;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        document.getElementById('resultText').textContent = 'Error fetching exchange rate.';
    }
}

// Function to swap currencies
function swapCurrencies() {
    if (!fromChoices || !toChoices) return;

    const fromValue = fromChoices.getValue(true);
    const toValue = toChoices.getValue(true);

    if (!fromValue || !toValue) return;

    // Swap the selected values
    fromChoices.setChoiceByValue(toValue);
    toChoices.setChoiceByValue(fromValue);

    // Trigger conversion if amount is present
    const amount = document.getElementById('amountInput').value;
    if (amount) {
        convertCurrency();
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateCurrencyDropdowns();
    
    document.getElementById('convertBtn').addEventListener('click', convertCurrency);
    document.getElementById('swapBtn').addEventListener('click', swapCurrencies);
    
    // Optional: Add input event listener for automatic conversion
    document.getElementById('amountInput').addEventListener('input', () => {
        const amount = document.getElementById('amountInput').value;
        if (amount) {
            convertCurrency();
        }
    });
});