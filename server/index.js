import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "../constant.js";

mongoose
    .connect(`${process.env.MONGO_CONNECTION_STRING}/${DB_NAME}`)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log(`Error connecting to MongoDB ${e.message}`);
    });

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
