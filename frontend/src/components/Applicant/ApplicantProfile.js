import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import * as M from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ApplicantProfile = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState("");
    const [updated_education, setUpdated_Education] = useState("");
    const [updated_skills, setUpdated_Skills] = useState("");

    useEffect(() => {
        const User = {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            skills,
            education
        }
        axios.post("http://localhost:4000/user/applicantinfo", User)
            .then(res => {
                setEducation(res.data.education)
                setSkills(res.data.skills)
                console.log(User)
            })
            .catch(function(error) {
                console.log(error);
            })
    })

    const edit = async (e) => {
        e.preventDefault();
        const User = {
            name,
            education : updated_education,
            email: localStorage.getItem("email"),
            skills : updated_skills
        }
        try {
            axios.post('http://localhost:4000/user/editapplicant', User)
                .then(res => {
                    alert("Edited User");
                    localStorage.setItem("name", res.data.name)
                    console.log(res.data);
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("email");
        localStorage.removeItem("usertype");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        history.push('/login');
    }

    return (
        <div>
            <p>Email: {localStorage.getItem("email")}</p>
            <p>Name: {localStorage.getItem("name")}</p>
            <p>Skills: {skills}</p>
            {/* <p>Education: {education}</p> */}
            <form onSubmit={edit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {/* <div className="form-group">
                    <label>Education: </label>
                    <input type="text"
                        className="form-control"
                        onChange={(e) => setUpdated_Education(e.target.value)}
                    />
                </div> */}
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <Autocomplete
                            freeSolo
                            multiple
                            id="combo-box-demo"
                            options={[
                                "C",
                                "C++",
                                "CSS",
                                "HTML",
                                "Java",
                                "JavaScript",
                                "Python",
                                "Flutter",
                                "Objective-C",
                                "PHP",
                                "Swift",
                                "GoLang",
                            ].map((option) => option)}
                            getOptionLabel={(option) => option}
                            style={{ width: 1110 }}
                            onChange={(event, newValue) => {
                                setUpdated_Skills(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Add Skill"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <div className="form-group">
                    <input type="submit" value="Edit Profile" className="btn btn-primary" />
                </div>
            </form>
            <form onSubmit={submit}>
                <div className="form-group">
                    <input type="submit" value="Log Out" className="btn btn-primary" />
                </div>
            </form>
        </div >
    )
}
export default ApplicantProfile