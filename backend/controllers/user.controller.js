import { Student, Achievement, Course, Committee, Professor } from "../models/user.model.js";

const getUserDetails = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const student = await Student.findById(studentId)
      .populate({
        path: 'enrolledCourses',
        populate: { path: 'teacher', model: 'Professor' }
      })
      .populate('achievements')
      .populate({
        path: 'enrolledCommitties',
        populate: {
          path: 'members.user',
          model: 'Student'
        }
      });

    if (!student) {
      return res.status(404).json({ message: "User not found." });
    }

    const response = {
      name: student.name,
      department: student.class.branch,
      sem: student.class.sem.toString(),
      courses: student.enrolledCourses.map((course, idx) => ({
        id: idx + 1,
        code: course._id.toString().slice(-5).toUpperCase(), // mock code
        name: course.name,
        professor: course.teacher?.name || "TBA",
        grade: "A-" // Placeholder
      })),
      achievements: student.achievements.map((ach, idx) => ({
        id: idx + 1,
        title: ach.title,
        date: new Date(ach.dateReceived).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        description: ach.description
      })),
      committees: student.enrolledCommitties.map((com, idx) => {
        const membership = com.members.find(m => m.user._id.toString() === student._id.toString());
        return {
          id: idx + 1,
          name: com.name,
          role: membership?.role || "Member"
        };
      })
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const studentId = req.user.id; // assuming auth middleware sets req.user
    const imageUrl = req.file.path; // multer + cloudinary gives image URL

    const student = await Student.findByIdAndUpdate(
      studentId,
      { profilePicture: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePicture: imageUrl,
      student,
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getUserDetails, uploadProfilePicture };
