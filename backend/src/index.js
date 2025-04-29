//const express  = require('express'); // commonjs

// to use import/export syntax, you need to set "type": "module" in package.json

import express from 'express'; // ES6 module syntax

import authRoutes from  "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"; // import message routes

import dotenv from 'dotenv';

import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { server, app } from './lib/socket.io.js';

dotenv.config();

//const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve(); // get the current directory name

app.use(express.json()); // to parse json data from request body
app.use(cookieParser());
app.use(cors(
    {
    origin: ["http://localhost:5173", "http://localhost:5174"],// replace with your frontend URL
    credentials: true, // to allow cookies to be sent with requests

    }

)); // to allow cross-origin requests
app.use(express.json({ limit: '10mb' })); // Increase limit to 10mb
app.use(express.urlencoded({ extended: true, limit: '10mb' }));



app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); // serve static files from the frontend build folder
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html")); // serve index.html for all other routes
    });
}

server.listen(PORT,()=> {
    console.log("Server is running on port: " + PORT);
    connectDB();
})