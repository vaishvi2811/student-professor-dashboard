import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { createAchievement, getAchievements, updateAchievement, deleteAchievement } from '../controllers/achievement.controller.js';
import { professorSignup, professorLogin } from '../controllers/auth.controller.js';
import authenticateUser from '../middlewares/auth.middleware.js';
import { getUserDetails, uploadProfilePicture } from '../controllers/user.controller.js';
import upload from '../middlewares/upload.middleware.js'; // Assuming you have a middleware for handling file uploads

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//Route to create a new achievement
router.post("/create-achievement", authenticateUser, createAchievement);
//Route to get all achievements of a user
router.get("/achievements", authenticateUser, getAchievements);
//Route to update an achievement
router.put("/update-achievement/:achievementId", authenticateUser, updateAchievement);
//Route to delete an achievement            
router.delete("/delete-achievement/:achievementId", authenticateUser, deleteAchievement);

// Professor Authentication Routes
router.post("/professor/signup", professorSignup);
router.post("/professor/login", professorLogin);

//Routes for Dashboard data
router.get('/dashboard', authenticateUser, getUserDetails)

//Route to upload profile picture
router.put('/upload-profile-picture', authenticateUser, upload.single('profilePicture'), uploadProfilePicture);

export default router;