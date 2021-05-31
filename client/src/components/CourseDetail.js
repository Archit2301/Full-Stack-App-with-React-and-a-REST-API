import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default class CourseDetail extends Component {

  constructor() {
    super();
    this.state = {
      course: [],
      user: []
    };
  }  

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
          course: response.data[0],
          user: response.data[0].User
        });
      })
  }

  render() {
    console.log(this.state.user);

    return (
      <main>
        <div className="actions--bar">
            <div className="wrap">
              <a className="button" href="">Update Course</a>
              <a className="button" href="">Delete Course</a>
              <a className="button button-secondary" href="">Return to List</a>
            </div>
        </div>  

        <div className="wrap">
          <h2>Course Detail</h2>  
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{this.state.course.title}</h4>
                <p>By: {this.state.user.firstName} {this.state.user.lastName}</p>

                <ReactMarkdown source={this.state.course.description} />
              </div>
              <div>
                <h3 className="course--detail--title">Estimate Time</h3>
                <p>{this.state.course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown source={this.state.course.materialsNeeded} />
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    )  
  }
}