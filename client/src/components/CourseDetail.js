import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class CourseDetail extends Component {

  state = {
    course: [],
    user: [],
    errors: []
  }

  componentDidMount() {
    
    axios.get(`http://localhost:5000/api/${this.props.match.url}`)
      .then(response => {
        this.setState({
          course: response.data[0],
          user: response.data[0].student          
        });
      })
  }

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { course } = this.state;
    const { firstName, lastName } = this.state.user

    return (
      <main>
        <div className="actions--bar">
            <div className="wrap">
              { authUser && authUser.id === course.userId  ? (
              <React.Fragment>  
                <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                <Link onClick={this.handleDelete} className="button" to="#">Delete Course</Link>
                <Link className="button button-secondary" to="/">Return to List</Link>
              </React.Fragment>
            )
              :
            (
              <React.Fragment>
                <Link className="button button-secondary" to="/">Return to List</Link>
              </React.Fragment>
            )}
            </div>
        </div>  

        <div className="wrap">
          <h2>Course Detail</h2>  
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>By: {firstName} {lastName}</p>

                <ReactMarkdown source={course.description} />
              </div>
              <div>
                <h3 className="course--detail--title">Estimate Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown source={course.materialsNeeded} />
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    )  
  }
}