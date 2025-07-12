import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 900000,
  max: 10,
  message: {
    status: 429,
    message: "You've made too many requests. Please try again later.",
  },
});
