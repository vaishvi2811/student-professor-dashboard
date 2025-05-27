import { Achievement, Student } from "../models/user.model.js";

//Create a new achievement
const createAchievement = async (req, res) => {
    try {
        const { title, description, image, dateReceived } = req.body;
        const userId = req.user.studentId; // Assuming you have user ID from JWT or session    

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        //Validate required fields
        if(!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // Create new achievement
        const newAchievement = new Achievement({
            user: userId,
            title,
            description,
            image,
            dateReceived
        });

        // Save achievement to database
        await newAchievement.save();

        // Add achievement to user's achievements array
        await Student.findByIdAndUpdate(userId, { $push: { achievements: newAchievement._id } });

        res.status(201).json({ message: "Achievement created successfully", achievement: newAchievement });
    } catch (error) {   
        console.error("Error creating achievement:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all achievements for a user
const getAchievements = async (req, res) => {
    try {
        const userId = req.user.studentId; // Assuming user ID is extracted from JWT middleware

        // Find achievements for the user
        const achievements = await Achievement.find({ user: userId });

        res.status(200).json({ achievements });
    } catch (error) {
        console.error("Error fetching achievements:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update an achievement
const updateAchievement = async (req, res) => {
    try {
        const { achievementId } = req.params;
        const { title, description, image, dateReceived } = req.body;

        // Find and update the achievement
        const updatedAchievement = await Achievement.findByIdAndUpdate(
            achievementId,
            { title, description, image, dateReceived },
            { new: true }
        );

        if (!updatedAchievement) {
            return res.status(404).json({ message: "Achievement not found." });
        }

        res.status(200).json({ message: "Achievement updated successfully.", achievement: updatedAchievement });
    } catch (error) {
        console.error("Error updating achievement:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete an achievement
const deleteAchievement = async (req, res) => {
    try {
        const { achievementId } = req.params;
        const userId = req.user.studentId; // Assuming user ID is extracted from JWT middleware

        // Find and delete the achievement
        const deletedAchievement = await Achievement.findByIdAndDelete(achievementId);

        if (!deletedAchievement) {
            return res.status(404).json({ message: "Achievement not found." });
        }

        // Remove the achievement from the user's achievements array
        await Student.findByIdAndUpdate(userId, {
            $pull: { achievements: achievementId },
        });

        res.status(200).json({ message: "Achievement deleted successfully." });
    } catch (error) {
        console.error("Error deleting achievement:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { createAchievement, getAchievements, updateAchievement, deleteAchievement };