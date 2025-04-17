import { Course, Professor } from '../models/user.model.js';
const createCourse = async (req, res) => {
  try {
    const professorId = req.user.id;
    console.log('Professor ID:', professorId); // Log the professor ID for debugging

    const { name, description, class: courseClass } = req.body;

    const newCourse = new Course({
      name,
      description,
      teacher: professorId,
      class: courseClass, // { sem: ..., branch: ... }
    });

    await newCourse.save();

    // Add course to professor's list
    await Professor.findByIdAndUpdate(professorId, {
      $push: { coursesTaught: newCourse._id }
    });

    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse,
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export { createCourse };
