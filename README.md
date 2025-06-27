# Dubois API

API for accessing the Dubois Buyse vocabulary method. This API provides access to an extensive collection of French words categorized by echelon (level) and grammatical type.

## Features

- Search words by level (echelon or difficulty level)
- Filter by grammatical type
- Rate limiting to prevent excessive use
- API key authentication

## Authentication

All API requests require a valid API key. To obtain an API key, please contact:

**Email**: [pieralonso@proton.me](mailto:pieralonso@proton.me)

The API key must be included in all requests in one of the following ways:

1. As an HTTP header:

    ```
    x-api-key: YOUR_API_KEY_HERE
    ```

2. As a query parameter:
    ```
    ?api_key=YOUR_API_KEY_HERE
    ```

## Endpoints

### GET /api

Returns Dubois Buyse vocabulary words filtered by the provided parameters.

#### Query Parameters

| Parameter | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| level     | Number | Difficulty level (1-43)                                     |
| type      | Text   | Grammatical type (e.g., "nom masculin", "verbe 1er groupe") |

**Note**: For the `type` parameter, you don't need to provide the complete grammatical type. The API performs partial matching, so providing just a word like `nom` or `verbe` will match all types containing that word. For example, `type=nom` will match both "nom masculin" and "nom femenin".

#### Available Grammatical Types

| Type              | Description          |
| ----------------- | -------------------- |
| verbe 1er groupe  | First group verb     |
| verbe 2ème groupe | Second group verb    |
| verbe 3ème groupe | Third group verb     |
| nom masculin      | Masculine noun       |
| nom femenin       | Feminine noun        |
| adjectif qualif   | Qualifying adjective |
| adverbe           | Adverb               |
| préposition       | Preposition          |
| conjonction       | Conjunction          |
| pronom            | Pronoun              |
| interjection      | Interjection         |
| adjectif indéfi   | Indefinite adjective |
| adjectif numéral  | Numerical adjective  |

#### Response

```json
{
  "total": 42,
  "results": [
    {
      "word": "maison",
      "level": 1,
      "type": "nom femenin"
    },
    {
      "word": "chat",
      "level": 1,
      "type": "nom masculin"
    },
    ...
  ]
}
```

#### Response Codes

- `200 OK`: The request was completed successfully
- `400 Bad Request`: Invalid or missing parameters
- `401 Unauthorized`: Invalid or missing API key
- `429 Too Many Requests`: Rate limit exceeded

## Examples

### cURL Examples

#### Unix/Linux/macOS

```bash
curl -X GET "https://dubois-buyse.onrender.com/api?level=1" \
  -H "x-api-key: YOUR_API_KEY_HERE"
```

#### Windows PowerShell

```powershell
curl -X GET "https://dubois-buyse.onrender.com/api?level=1" `
  -H "x-api-key: YOUR_API_KEY_HERE"
```

### JavaScript Fetch Examples

#### Using API Key in Headers

```javascript
fetch("https://dubois-buyse.onrender.com/api?level=1", {
    method: "GET",
    headers: {
        "x-api-key": "YOUR_API_KEY_HERE",
    },
})
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
```

#### Using API Key as Query Parameter

```javascript
fetch("https://dubois-buyse.onrender.com/api?level=1&api_key=YOUR_API_KEY_HERE")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
```

## Usage Limits

- 100 requests per IP address every 15 minutes
- If you exceed this limit, you will receive a 429 error and will have to wait until the rate limiting period ends

## Implementation Notes

This API is built with:

- Node.js
- Express.js
- dotenv for environment variable management
- express-rate-limit for rate limiting

## License

MIT

## Contact

For queries, issues, or suggestions related to the API, please contact:

**Developer**: Pier Alonso
**Email**: [pieralonso@proton.me](mailto:pieralonso@proton.me)
