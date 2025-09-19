const dotenv = require("dotenv");

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
}

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realtime-voice-chat",
    JWT_SECRET: process.env.JWT_SECRET,
    CORS_ORIGIN: process.env.CORS_ORIGIN
};
