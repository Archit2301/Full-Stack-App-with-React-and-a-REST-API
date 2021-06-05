import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  };

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const { title, description, estimatedTime, materialsNeeded, errors } =
      this.state;

    return (
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.change}
                  />
                  <p>
                    By {authUser.firstName} {authUser.lastName}
                  </p>
                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={this.change}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    onChange={this.change}
                    type="text"
                    id="estimatedTime"
                    name="estimatedTime"
                    value={estimatedTime}
                  />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    onChange={this.change}
                    name="materialsNeeded"
                    id="materialsNeeded"
                    value={materialsNeeded}
                  ></textarea>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    )
  }

  // Updated when the value of the input field changes
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
    const { context } = this.props;
    const { emailAddress, password, id } = context.authenticatedUser;
    const userId = id;
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const course = { title, userId, description, estimatedTime, materialsNeeded };

    // Call to createCourse function 
    context.data.createCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/');
          console.log('Course created!');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
        this.props.history.push('/error')
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
