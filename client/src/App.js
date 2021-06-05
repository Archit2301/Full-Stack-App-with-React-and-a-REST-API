import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './PrivateRoute';

import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);
const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const AuthUserWithContext = withContext(Authenticated);

function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <main>
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <PrivateRoute path="/authenticated" component={AuthUserWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/error" component={UnhandledError} />
            <Route path="/forbidden" component={Forbidden} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;