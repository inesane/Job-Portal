import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Demo</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            {
                                localStorage.getItem("usertype") ? (
                                    <>
                                        {localStorage.getItem("usertype") == "applicant" ? (
                                            <>
                                                <li className="navbar-item">
                                                    <Link to="/applicantprofile" className="nav-link">Profile</Link>
                                                </li>
                                                <li className="navbar-item">
                                                    <Link to="/joblistings" className="nav-link">Jobs</Link>
                                                </li>
                                            </>
                                        ) : (
                                                <>
                                                    <li className="navbar-item">
                                                        <Link to="/recruiterprofile" className="nav-link">Profile</Link>
                                                    </li>
                                                    <li className="navbar-item">
                                                        <Link to="/jobs" className="nav-link">Add Job</Link>
                                                    </li>
                                                    <li className="navbar-item">
                                                        <Link to="/editjobs" className="nav-link">My Jobs</Link>
                                                    </li>
                                                </>
                                            )}
                                    </>
                                ) : (
                                        <>
                                            <li className="navbar-item">
                                                <Link to="/users" className="nav-link">Users</Link>
                                            </li>
                                            <li className="navbar-item">
                                                <Link to="/register" className="nav-link">Register</Link>
                                            </li>
                                            <li className="navbar-item">
                                                <Link to="/login" className="nav-link">Login</Link>
                                            </li>
                                        </>
                                    )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}