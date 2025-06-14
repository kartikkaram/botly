import rateLimit from 'express-rate-limit';

export const botKeyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 500, // 500 requests per day
  message: 'Bot key limit exceeded: 500 requests per day',
  keyGenerator: (req) => req.headers['botkey'],
  standardHeaders: true,
  legacyHeaders: false,
});
