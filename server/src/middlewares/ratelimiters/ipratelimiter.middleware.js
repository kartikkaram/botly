import rateLimit from "express-rate-limit";

export const ipAndBotKeyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,                // 100 requests per IP-botkey pair
  message: 'Too many requests for this bot key from your IP, please try again later.',
  keyGenerator: (req) => `${req.ip}-${req.headers['botkey'] || 'no-botkey'}`, // Combine IP and botkey
  standardHeaders: true,   // Sends `RateLimit-*` headers
  legacyHeaders: false,    // Disables the deprecated `X-RateLimit-*` headers
});
