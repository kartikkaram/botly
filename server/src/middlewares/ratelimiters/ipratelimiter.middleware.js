import rateLimit from "express-rate-limit";

export const ipLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,                // 100 requests per hour per IP
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,   // Sends `RateLimit-*` headers
  legacyHeaders: false,    // Disables the deprecated `X-RateLimit-*` headers
});
