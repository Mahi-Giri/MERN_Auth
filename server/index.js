import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "../constant.js";
import userRoute from "./routes/user.route.js";
import authRouth from "./routes/auth.route.js";

mongoose
    .connect(`${process.env.MONGO_CONNECTION_STRING}/${DB_NAME}`)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log(`Error connecting to MongoDB ${e.message}`);
    });

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRouth);
