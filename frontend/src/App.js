import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
import ApplicantProfile from './components/Applicant/ApplicantProfile'
import RecruiterProfile from './components/Recruiter/RecruiterProfile'
import Login from './components/Common/Login'
import Jobs from './components/Recruiter/CreateJobs'
import JobListings from './components/Applicant/JobListings'
import EditJobs from './components/Recruiter/EditJobs'
import EditJobVals from './components/Recruiter/EditJobVals'
import Applications from './components/Applicant/Applications'
import ManageApplications from './components/Recruiter/ManageApplications'



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: false,
    }
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={UsersList} />
          <Route path="/register" component={Register} />
          <Route path="/applicantprofile" component={ApplicantProfile} />
          <Route path="/recruiterprofile" component={RecruiterProfile} />
          <Route path="/login" component={Login} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/joblistings" component={JobListings} />
          <Route path="/editjobs" component={EditJobs} />
          <Route path="/editjobvals" component={EditJobVals} />
          <Route path="/applications" component={Applications} />
          <Route path="/manageapplications" component={ManageApplications} />
        </div>
      </Router>
    );
  }
}

export default App;
