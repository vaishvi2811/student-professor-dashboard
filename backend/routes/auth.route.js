import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { createAchievement, getAchievements, updateAchievement, deleteAchievement } from '../controllers/achievement.controller.js';
import { professorSignup, professorLogin } from '../controllers/auth.controller.js';
import authenticateUser from '../middlewares/auth.middleware.js';
import { getUserDetails, searchStudents, uploadProfilePicture, getProfessorDashboard, searchProfessor } from '../controllers/user.controller.js';
import upload from '../middlewares/upload.middleware.js'; // Assuming you have a middleware for handling file uploads
import authenticateProfessor from '../middlewares/professorAuth.middleware.js';
import { createCourse } from '../controllers/course.controller.js';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/project.controller.js';

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

//Route to create course for professor
router.post('/create-course', authenticateProfessor, createCourse);

//Route to search Student
router.get('/search-student', searchStudents);

//Route to add project to student
router.post('/add-project',authenticateUser, createProject);

//Route to fetch users projects
router.get('/projects', authenticateUser, getProjects);

// Update an existing project
router.put('/update-project/:projectId', authenticateUser, updateProject);

// Delete a project
router.delete('/delete-project/:projectId', authenticateUser, deleteProject); // Route to delete a project by IDid', authenticateUser, deleteProject);

//Route to fetch professor details
router.get('/professor-dashboard', authenticateProfessor, getProfessorDashboard);

//Route to search professors
router.get('/search-professor', searchProfessor);
export default router;