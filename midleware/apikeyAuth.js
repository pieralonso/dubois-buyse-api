const dotenv = require("dotenv");
dotenv.config();

function apiKeyAuth(req, res, next) {
    const userApiKey = req.headers["x-api-key"] || req.query.api_key;
    const VALID_API_KEYS = process.env.API_KEYS?.split(",") || [];

    if (!userApiKey || !VALID_API_KEYS.includes(userApiKey)) {
        return res.status(401).json({ message: "Invalid API Key" });
    }

    next();
}

module.exports = { apiKeyAuth };
