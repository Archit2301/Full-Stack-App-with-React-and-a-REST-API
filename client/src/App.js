import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:5000/api/courses/`
});

class App extends Component {

  state = {
    courses: []
  }

  constructor() {
    super();
    api.get('/').then(res => {
      console.log(res.data)
      this.setState({ courses: res.data })
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.courses.map(course => <h2 key={course.id}>{course.title}</h2>)}
      </div>
    );
  }
}

export default App;
