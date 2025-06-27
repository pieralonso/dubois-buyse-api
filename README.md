# Dubois API

API for accessing the Dubois Buyse vocabulary method. This API provides access to an extensive collection of French words categorized by echelon (level) and grammatical type.

## Features

- Search words by echelon (difficulty level)
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
| echellon  | Number | Difficulty level (1-43)                                     |
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
      "mot": "maison",
      "echellon": 1,
      "tipe": "nom femenin"
    },
    {
      "mot": "chat",
      "echellon": 1,
      "tipe": "nom masculin"
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

> **Note**: The examples below show how to make API requests in different environments. In Unix-based systems (Linux/macOS), use the backslash (`\`) for line continuation. In Windows PowerShell, use the backtick (`` ` ``) character. PowerShell also provides the native `Invoke-RestMethod` cmdlet as an alternative to curl.

### Basic Request (with API key in header)

#### Unix/Linux/macOS

```bash
curl -X GET "https://dubois-api.onrender.com/api?echellon=1" \
  -H "x-api-key: YOUR_API_KEY_HERE"
```

#### Windows PowerShell

```powershell
curl -X GET "https://dubois-api.onrender.com/api?echellon=1"
-H "x-api-key: YOUR_API_KEY_HERE"
```

### Filter by echelon and type

#### Unix/Linux/macOS

```bash
curl -X GET "https://dubois-api.onrender.com/api?echellon=1&type=nom" \
  -H "x-api-key: YOUR_API_KEY_HERE"
```

#### Windows PowerShell

```powershell
curl -X GET "https://dubois-api.onrender.com/api?echellon=1&type=nom"
  -H "x-api-key: YOUR_API_KEY_HERE"
```

### Examples of partial type matching

#### Unix/Linux/macOS

```bash
# Get all verbs (matches "verbe 1er groupe", "verbe 2ème groupe", etc.)
curl -X GET "https://dubois-api.onrender.com/api?type=verbe" \
  -H "x-api-key: YOUR_API_KEY_HERE"

# Get all adjectives (matches "adjectif qualif", "adjectif indéfi", etc.)
curl -X GET "https://dubois-api.onrender.com/api?type=adjectif" \
  -H "x-api-key: YOUR_API_KEY_HERE"
```

#### Windows PowerShell

```powershell
# Get all verbs
curl -X GET "https://dubois-api.onrender.com/api?type=verbe"
  -H "x-api-key: YOUR_API_KEY_HERE"

# Get all adjectives
curl -X GET "https://dubois-api.onrender.com/api?type=adjectif" `
  -H "x-api-key: YOUR_API_KEY_HERE"
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
