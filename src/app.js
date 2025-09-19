const express = require("express");
const cors = require("cors");
const config = require("./config");

// Routes
const authRoutes = require("./routes/auth");

const app = express();

const allowedOrigins =
    (config.CORS_ORIGIN || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: false,
}));

app.use(express.json({ limit: '10mb' }));

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use('/api/', limiter);

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
