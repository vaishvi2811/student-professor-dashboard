import { Project, Student } from "../models/user.model.js";

const createProject = async (req, res) => {
    try {
      const { name, startDate, endDate, description, contributors } = req.body;
       
      const newProject = new Project({
        name,
        startDate,
        endDate,
        description,
        contributors, // expecting an array of ObjectIds
      });
  
      await newProject.save();
  
      res.status(201).json({
        success: true,
        message: "Project created successfully",
        project: newProject,
      });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  const updateProject = async (req, res) => {
    try {
      const { name, startDate, endDate, description, contributors } = req.body;
      const { id } = req.params;
  
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        {
          name,
          startDate,
          endDate,
          description,
          contributors, // expecting updated contributor ObjectIds
        },
        { new: true }
      );
  
      if (!updatedProject) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

// Get all projects for a user
const getProjects = async (req, res) => {
    try {
        const userId = req.user.studentId; // Assuming the user ID is attached by the middleware

        // Fetch projects and populate contributors
        const projects = await Project.find({ contributors: userId }).populate("contributors", "name email");

        res.status(200).json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

  // Delete a project
const deleteProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      const userId = req.user.studentId;
  
      const project = await Project.findById(projectId);
      
      if (!project) return res.status(404).json({ message: "Project not found" });
      
      if (!project.contributors.includes(userId)) {
        return res.status(403).json({ message: "Not authorized to delete this project" });
      }
  
      await Project.findByIdAndDelete(projectId);
  
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export { createProject, updateProject, getProjects, deleteProject };

