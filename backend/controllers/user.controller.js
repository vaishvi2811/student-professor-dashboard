import jwt from "jsonwebtoken";
import { Student } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const getUserDetails = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized. Token is missing." });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.studentId) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    // Find the student by ID
    const student = await Student.findById(decoded.studentId).select("-password"); // Exclude the password field
    if (!student) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send the student details as the response
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getUserDetails };