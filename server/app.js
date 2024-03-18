import userRoute from "./routes/user.route.js";
import express from "express";

const app = express();

app.use("/api/v1/user", userRoute);

export { app };
