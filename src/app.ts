import express from "express";
import { userRoutes } from "./interface/routes/user/routes.user";
import { limiter } from "./shared/config/rateLimiter";

const app = express();

app.use(express.json());
app.use("/auth/user", userRoutes);
app.use(limiter);

export { app };
