import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    course: [],
    user: [],
    errors: []
  }

  // Get Current Page Data
  componentDidMount() {
    
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          title: data[0].title,
          user: data[0],
          description: data[0].description,
          estimatedTime: data[0].estimatedTime,
          materialsNeeded: data[0].materialsNeeded
        });
      })
      .catch((err) => {
        console.log(err)
        this.props.history.push('/forbidden')
      });
  }

  render() {
    const { errors } = this.state;
    const { firstName, lastName } = this.state.user;

    return (
      <div className="wrap">
        <h2>Update Course</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input onChange={this.change} type="text" name="title" id="title" value={this.state.title}/>
                  <p>
                    By {firstName} {lastName}
                  </p>
                  <label htmlFor="description">Course Description</label>
                  <textarea onChange={this.change} name="description" id="description" value={this.state.description}></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input onChange={this.change} type="text" id="estimatedTime" name="estimatedTime" value={this.state.estimatedTime} />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea onChange={this.change} name="materialsNeeded" id="materialsNeeded" value={this.state.materialsNeeded}></textarea>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const CourseId = this.props.match.params.id;
    const { context } = this.props;
    const { emailAddress, password } = context.authenticatedUser;

    const { id, title, description, user, estimatedTime, materialsNeeded } =
      this.state;

    const course = {
      id,
      title,
      description,
      user,
      estimatedTime,
      materialsNeeded,
    };

    context.data
      .updateCourse(emailAddress, password, course, CourseId)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push(`/courses/${CourseId}`);
          console.log('Course updated!');
        }
      })
      .catch(err => {        
        console.log(err);
        this.props.history.push('/forbidden')
      })
  };

  cancel = () => {
    this.props.history.push(`/courses/${this.props.match.params.id}`);
  };
}

