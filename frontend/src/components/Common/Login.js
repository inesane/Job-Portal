import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const oldUser = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('http://localhost:4000/user/login', oldUser)
            .then(res => {
                localStorage.setItem("email", res.data.email)
                localStorage.setItem("usertype", res.data.usertype)
                localStorage.setItem("name", res.data.name)
                localStorage.setItem("id", res.data._id)
                alert("Logged In");
                if (res.data.usertype == "applicant") {
                    this.props.history.push('/applicantprofile');
                }
                else if (res.data.usertype == "recruiter") {
                    this.props.history.push('/recruiterprofile');
                } console.log(res.data)
                this.setState({ errors: res.data })
            }).catch(err => {
                alert("Error in Logging in. Please Check Email and Password.")
            })
            ;

        this.setState({
            email: '',
            password: '',
        });
    }

    render() {
        return (
            <div>
                <Link to="/register">Click Here To Register If You Do Not Have An Account</Link>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}