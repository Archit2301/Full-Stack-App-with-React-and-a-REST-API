import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (      
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <label for="emailAddress">Email Address</label>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="email"
                  value={emailAddress} 
                  onChange={this.change} 
                />
                <label for="password">Password</label>
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                />                
              </React.Fragment>
            )} />
          <p>
          Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
          </p>
        </div>      
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {

  }

  cancel = () => {

  }
}