import express from "express";
import { userRoutes } from "./interface/routes/user/routes.user";

const app = express();

app.use(express.json());
app.use("/auth/user", userRoutes);

export { app };
