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
    const { emailAddress, password, errors } = this.state;

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
              <label htmlFor="emailAddress">Email Address</label>
              <input onChange={this.change} id="emailAddress" name="emailAddress" type="email" value={emailAddress}/>
              <label htmlFor="password">Password</label>
              <input onChange={this.change} id="password" name="password" type="password" value={password} />
            </React.Fragment>
          )}
        />
        <p>
          Don't have a user account? Click here to<Link to="/signup"> sign up!</Link>
        </p>
      </div>
    )
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      }
    })
  }

r
  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          this.props.history.push(from);
          console.log(`Sign-in successful for ${emailAddress}!`)
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}