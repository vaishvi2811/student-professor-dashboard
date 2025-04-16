import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import {Student, Professor} from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();


// Function to check if the first 2 digits of RollNum match the email prefix
const isValidRollNum = (email, rollNum) => {
    const emailPrefix = email.split('@')[0]; // Extract part before '@'
    const lastTwoDigits = emailPrefix.match(/\d{2}$/); // Get last 2 digits if present

    return lastTwoDigits ? rollNum.startsWith(lastTwoDigits[0]) : false;
};

// Function to check password strength
const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};


const signup = async(req, res) => {
    try {
        const { name, email, rollNum, password, class:studentClass } = req.body;


        // Validate Roll Number
        if (!isValidRollNum(email, rollNum)) {
            return res.status(400).json({ message: 'Roll Number does not match email format.' });
        }

        // Validate password strength
        if (!isStrongPassword(password)) {
            return res.status(400).json({ message: 'Weak password! Must contain 8+ chars, 1 uppercase, 1 lowercase, 1 number, and 1 special character.' });
        }

        // Validate class fields
        if (!studentClass || !studentClass.branch || !studentClass.sem) {
            return res.status(400).json({ message: 'class.branch and class.sem are required.' });
        }

        // Check if user already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'User already exists. Please log in.' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newStudent = new Student({
            name,
            email,
            rollNum,
            password: hashedPassword,
            class: studentClass
        });

        // Save user to database
        await newStudent.save();

        // Generate JWT token
        const token = jwt.sign({ studentId: newStudent._id, email: newStudent.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with token
        res.status(201).json({ message: 'Signup successful', token });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Ensure email belongs to VJTI
        if (!email.endsWith('vjti.ac.in')) {
            return res.status(400).json({ message: 'Only @vjti.ac.in emails are allowed.' });
        }

        // Find the student by email
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({ message: 'User not found. Please sign up.' });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { studentId: student._id, email: student.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response with token
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Professor Signup
const professorSignup = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password || !department) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Check if professor already exists
        const existingProfessor = await Professor.findOne({ email });
        if (existingProfessor) {
            return res.status(400).json({ message: "Professor already exists. Please log in." });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new professor
        const newProfessor = new Professor({
            name,
            email,
            password: hashedPassword,
            department,
            contactNumber,
        });

        // Save the professor to the database
        await newProfessor.save();

        res.status(201).json({ message: "Signup successful. You can now log in." });
    } catch (error) {
        console.error("Professor Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Professor Login
const professorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find the professor by email
        const professor = await Professor.findOne({ email });
        if (!professor) {
            return res.status(400).json({ message: "Professor not found. Please sign up." });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, professor.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials. Please try again." });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { professorId: professor._id, email: professor.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Professor Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Logout function (for both students and professors)
const logout = async(req, res) => {
    res.send("logout route");
}

export { signup, login, logout, professorSignup, professorLogin }; 