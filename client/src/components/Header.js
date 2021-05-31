import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><a href="/">Courses</a></h1>
          <nav>
            {authUser ?
              <React.Fragment>                
                <ul className="header--signedout">
                  <li><span>Welcome, {authUser.firstName}!</span></li>
                  <li><Link className="signout" to="/signout">Sign Out</Link></li>
                </ul>
              </React.Fragment>
            : 
              <React.Fragment>
                <ul className="header--signedout">
                  <li><Link className="signup" to="/signup">Sign Up</Link></li>
                  <li><Link className="signin" to="/signin">Sign In</Link></li>
                </ul>               
              </React.Fragment>
            }              
          </nav>
        </div>  
      </header>
    );  
  }  
};

