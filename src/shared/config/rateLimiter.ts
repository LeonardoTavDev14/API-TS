import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1200,
  max: 100,
});
