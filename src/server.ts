import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

const startingServer = async () => {
  try {
    console.log("Starting...");
    app.listen(port, () => {
      setTimeout(() => {
        console.log(`Server is running on port: ${port}`);
      }, 1000);
    });
  } catch (err) {
    console.log("Error starting server: ", err);
    process.exit(1);
  }
};

startingServer();
