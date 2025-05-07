# Currency Converter

A real-time currency converter application built with Node.js, Express, and the ExchangeRate-API. Features an intuitive user interface with searchable currency dropdowns and instant conversion updates.

## Features

- 🔄 Real-time currency conversion
- 🔍 Searchable currency dropdowns
- 💱 Support for multiple currencies
- ⚡ Instant rate updates
- 🔄 Currency swap functionality
- 📱 Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- ExchangeRate-API key ([Get it here](https://www.exchangerate-api.com/))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shaik-Nihal/currency-converter.git
cd currency-converter
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```plaintext
EXCHANGE_RATE_API_KEY=your_api_key_here
```

4. Start the server:
```bash
node server.js
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```plaintext
currency-converter/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── .env
├── package.json
└── README.md
```

## Dependencies

- Express.js - Web application framework
- Choices.js - Searchable dropdown component
- Bootstrap - Frontend styling
- dotenv - Environment variable management
- node-fetch - HTTP client for API requests

## API Reference

The application uses the [ExchangeRate-API](https://www.exchangerate-api.com/) for currency conversion rates.

### Endpoints

- `/api/exchange-rate` - Get exchange rates for a specific currency
- `/api/supported-currencies` - Get list of supported currencies

## Usage

1. Enter the amount you want to convert
2. Select the source currency from the "From" dropdown
3. Select the target currency from the "To" dropdown
4. View the converted amount and exchange rate
5. Use the swap button to quickly switch currencies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ExchangeRate-API](https://www.exchangerate-api.com/) for providing exchange rate data
- [Choices.js](https://github.com/Choices-js/Choices) for the searchable dropdown implementation
- [Bootstrap](https://getbootstrap.com/) for the responsive design components