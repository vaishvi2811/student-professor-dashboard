import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bannerImg: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    skills: [
        { type: String }
    ],
    achievements: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }
    ],
    enrolledCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ],
    enrolledCommitties: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }
    ],
    class: { // New attribute
        sem: { type: Number, required: true }, // Semester
        branch: { type: String, required: true } // Branch
    },

},{
    timestamps:true
});


//Professor Schema
const ProfessorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    expertise: [
        { type: String }
    ],
    coursesTaught: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' } // References courses taught by the professor
    ],
    department: {
        type: String,
        required: true, // Example: "Computer Science", "Mechanical", etc.
    },
    officeHours: {
        type: String, // Example: "Mon-Fri, 2 PM - 4 PM"
        default: "",
    },
}, {
    timestamps: true
});



const AchievementSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: "" },

    dateReceived: { type: Date, default: Date.now }
});

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
    class: { // New attribute
        sem: { type: Number, required: true }, // Semester
        branch: { type: String, required: true } // Branch
    },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    createdAt: { type: Date, default: Date.now }
});

const CommitteeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Creator (Admin or Faculty)
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        role: { type: String, enum: ['President', 'Vice President', 'Secretary', 'Member'], default: 'Member' },
        joinedAt: { type: Date, default: Date.now }
    }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Committee-related events
    createdAt: { type: Date, default: Date.now }
});

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    committee: { type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }, // Linked to a committee
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // The event host
    date: { type: Date, required: true },
    location: { type: String },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Attendees
    createdAt: { type: Date, default: Date.now }
});





const Event = mongoose.model("Event", EventSchema);
const Committee = mongoose.model("Committee", CommitteeSchema);
const Course = mongoose.model("Course", CourseSchema);
const Achievement = mongoose.model("Achievement", AchievementSchema);   
const Student = mongoose.model("Student", studentSchema);
const Professor = mongoose.model("Professor", ProfessorSchema);

export { Student, Achievement, Course, Committee, Event, Professor };
