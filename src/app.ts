import express from "express";
import { userRoutes } from "./interface/routes/user/routes.user";
import { limiter } from "./shared/config/rateLimite";

const app = express();

app.use(express.json());
app.use(limiter);
app.use("/auth/user", userRoutes);

export { app };
