// Home component to list the courses by GET request to an api

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Course from './Course';

export default class Courses extends Component {
  state = {
    courses: []
  };

  // Get courses and render them in the homepage
  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')      
      .then((data) => {
        this.setState({ courses: data.data })
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  render() {
    const { courses } = this.state;
    // console.log(courses);
    return (
      <div className="wrap main--grid">
        {courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
        
        <Link className="course--module course--add--module" to="/courses/create">
          <h3 className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </Link>
      </div>      
    )
  }
}
