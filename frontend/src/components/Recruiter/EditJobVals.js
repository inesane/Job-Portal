import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import * as M from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const EditJobVals = () => {
    const history = useHistory();
    const [max_applications, setMax_Applications] = useState("");
    const [max_positions, setMax_Positions] = useState("");
    const [application_deadline, setApplication_Deadline] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const idtemp = localStorage.getItem("job_id")
        const newJob = {
            max_applications : max_applications,
            max_positions : max_positions,
            application_deadline : application_deadline,
            _id : idtemp
        }
        console.log(newJob)
        try {
            axios.post('http://localhost:4000/job/edit', newJob)
                .then(res => {
                    alert("Edited Job");
                    console.log(res.data)
                    localStorage.removeItem("job_id")
                    history.push('/editjobs')
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
            <form onSubmit={submit}>
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
                    <input type="submit" value="Edit Job" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default EditJobVals