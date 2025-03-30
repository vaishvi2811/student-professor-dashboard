import { Link } from "react-router-dom";

function CoursesList() {
  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/coursestudents/${course.id}`}>
              {course.code} - {course.name} (Students: {course.students}, Avg Grade: {course.averageGrade})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursesList;
