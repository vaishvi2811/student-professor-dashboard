import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json()); // Required to parse JSON request bodies
app.use(cors({
    origin: `http://localhost:5173`, // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent with requests
}));
app.use("/api/v1/auth",authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});