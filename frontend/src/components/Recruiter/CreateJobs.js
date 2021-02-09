import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import * as M from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Jobs = () => {

    const [title, setTitle] = useState("");
    // const [recruiter_name, setRecruiter_Name] = useState("");
    // const [recruiter_emailid, setRecruiter_EmailID] = useState("");
    const [max_applications, setMax_Applications] = useState("");
    const [max_positions, setMax_Positions] = useState("");
    const [application_deadline, setApplication_Deadline] = useState("");
    const [required_skills, setRequired_Skills] = useState("");
    const [type, setType] = useState("full-time");
    const [duration, setDuration] = useState("");
    const [salary, setSalary] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const newJob = {
            title,
            recruiter_name: localStorage.getItem("name"),
            recruiter_emailid: localStorage.getItem("email"),
            max_applications,
            max_positions,
            application_deadline,
            required_skills,
            type,
            duration,
            salary,
            status : "active"
        }
        console.log(newJob)
        try {
            axios.post('http://localhost:4000/job/create', newJob)
                .then(res => {
                    alert("Created Job " + res.data.title);
                    console.log(res.data)
                }).catch(err => {
                    alert(err + newJob.recruiter_name)
                })
                ;
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Job Title: </label>
                    <input type="text"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Maximum Number of Applications: </label>
                    <input type="number"
                        className="form-control"
                        min="1"
                        onChange={(e) => setMax_Applications(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Maximum Number of Positions: </label>
                    <input type="number"
                        className="form-control"
                        min="1"
                        onChange={(e) => setMax_Positions(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Application Deadline: </label>
                    <input type="datetime-local"
                        className="form-control"
                        onChange={(e) => setApplication_Deadline(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Type of Job: </label>
                    <select name="type" id="type" className="form-control" onChange={(e) => setType(e.target.value)}>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="work-from-home">Work From Home</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Duration (in months): </label>
                    <input type="number"
                        className="form-control"
                        min="0"
                        max="6"
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Salary (per month): </label>
                    <input type="number"
                        className="form-control"
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>
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
                                setRequired_Skills(newValue);
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
                    <input type="submit" value="Create Job" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default Jobs