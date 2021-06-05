import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
  state = {
    course: [],
    user: [],
    errorS: []
  };

  handleDelete = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const id = this.props.match.params.id;

    // call to deleteCourse api call function
    context.data.deleteCourse(authUser.emailAddress, authUser.password, id)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/');
          console.log('The course was successfully deleted!');          
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
        this.props.history.push('/error')
      });
  };

  // Retrieve the course with the matched id in url
  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ course: data[0], user: data[0].student });
      })
      .catch(err => {
        console.log(err)
        this.props.history.push('/notfound')
    })
  }

  render() {
    const { context } = this.props;
    const { course } = this.state;
    const authUser = context.authenticatedUser;
    
    const { firstName, lastName } = this.state.user;
    
    return (
      <React.Fragment>
        <div className="actions--bar">
          <div className="wrap">
            {authUser && authUser.id === course.userId ?             
              (<React.Fragment>
                <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                <Link onClick={this.handleDelete} to="#" className="button">Delete Course</Link>
                <Link to="/" className="button button-secondary">Return to List</Link>
              </React.Fragment>) 
            : 
              (<React.Fragment>
                <Link className="button" to="/">
                  Return to List
                </Link>
              </React.Fragment>)
            }
          </div>
        </div>

        <div className="wrap">
          <h2>Course Details</h2>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {firstName} {lastName}</p>
              <ReactMarkdown children={course.description} />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown children={course.materialsNeeded} />
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
