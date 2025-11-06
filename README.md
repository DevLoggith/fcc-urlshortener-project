# URL Shortener Microservice

The boilerplate code for this project which my solution is built on top of can be found here: https://github.com/freeCodeCamp/boilerplate-project-urlshortener/

I implemented the URL Shortener microservice using Node.js, Express, Mongoose, and MongoDB (Atlas). My contributions include:
- Designing the MongoDB schema and model for storing original and short URLs
- Implementing the `POST /api/shorturl` endpoint with:
    - URL validation using the URL web API interface and Node `dns` module
    - Protocol checks using the `URL()` constructor and `http` and `https` protocols
- The `GET /api/shorturl/:nanourl` endpoint for redirecting users. 

I wrapped database queries in try/catch blocks for proper error handling and ensured that each valid submission returns a JSON object in the form `{ original_url, short_url }`. This approach keeps the code modular, maintainable, and easily extensible for additional features, while meeting the project’s requirements and passing all FCC tests.

## Test cases
1. ✅ You can POST a URL to `/api/shorturl` and get a JSON response with `original_url` and `short_url` properties. Here's an example: `{ original_url : 'https://freeCodeCamp.org', short_url : 1}`
2. ✅ When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL.
3. ✅ If you pass an invalid URL that doesn't follow the valid `http://www.example.com` format, the JSON response will contain `{ error: 'invalid url' }`

## Usage
### Creating a short URL:
```
POST /api/shorturl
Body: { "url": "https://freecodecamp.org" }
Response: { "original_url": "https://freecodecamp.org", "short_url": 73780 }
```
### Redirecting using stored short URL:
```
GET /api/shorturl/73780
→ Redirects to https://freecodecamp.org
```
