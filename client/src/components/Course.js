import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course }) => {
  return (
    <React.Fragment>
      <Link className="course--module course--link" to={`/courses/${course.id}`}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    </React.Fragment>
  );
};

export default Course;