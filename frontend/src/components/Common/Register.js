import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";

const Register = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUsertype] = useState("applicant");

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            usertype,
        }
        try {
            axios.post('http://localhost:4000/user/register', newUser)
                .then(res => {
                    alert("Created " + res.data.name);
                    localStorage.setItem("email", email)
                    localStorage.setItem("usertype", usertype)
                    localStorage.setItem("name", name)
                    localStorage.setItem("id", res.data._id)
                    if (res.data.usertype == "applicant") {
                        history.push('/applicantprofile');
                    }
                    else if (res.data.usertype == "recruiter") {
                        history.push('/recruiterprofile');
                    }
                    console.log(res.data)
                }).catch(err => {
                    alert(err)
                })
                ;
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <Link to="/login">Click Here To Login If You Already Have An Account</Link>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Type of User: </label>
                    <select name="usertype" id="usertype" className="form-control" onChange={(e) => setUsertype(e.target.value)}>
                        <option value="applicant">Applicant</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default Register