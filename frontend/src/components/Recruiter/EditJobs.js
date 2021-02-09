import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class EditJobs extends Component {

    constructor(props) {
        super(props);
        this.state = { jobs: [], sortedJobs: [], sortName: true };
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
    }

    componentDidMount() {
        const CurrUser = {
            recruiter_emailid: localStorage.getItem("email")
        }
        axios.post('http://localhost:4000/job/ownjobs', CurrUser)
            .then(response => {
                this.setState({ jobs: response.data, sortedJobs: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    sortChange() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.jobs;
        var flag = this.state.sortName;
        array.sort(function (a, b) {
            if (a.date != undefined && b.date != undefined) {
                return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
            }
            else {
                return 1;
            }
        });
        this.setState({
            jobs: array,
            sortName: !this.state.sortName,
        })
    }

    EditJob(_id) {
        localStorage.setItem("job_id", _id);
        this.props.history.push('/editjobvals');

    }

    DeleteJob(id) {
        const Job = {
            _id : id
        }
        axios.post('http://localhost:4000/job/delete', Job)
            .then(res => {
                alert("Deleted Job " + res.data.title)
            }).catch(err => {
                alert(err)
            })
    }

    ShowApplications(id) {
        localStorage.setItem("job_id", id);
        this.props.history.push('/manageapplications');
    }

    renderIcon() {
        if (this.state.sortName) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Title</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Duration</TableCell>
                                        <TableCell>Salary</TableCell>
                                        <TableCell>Application Deadline</TableCell>
                                        <TableCell>Skills Required</TableCell>
                                        <TableCell>Job Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((job, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.type}</TableCell>
                                            <TableCell>{job.duration}</TableCell>
                                            <TableCell>{job.salary}</TableCell>
                                            <TableCell>{job.application_deadline}</TableCell>
                                            <TableCell>{job.required_skills}</TableCell>
                                            <TableCell>{job.status}</TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => this.EditJob(job._id)}
                                                    className="btn btn-primary"
                                                >
                                                    Edit
                                            </button>
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => this.DeleteJob(job._id)}
                                                    className="btn btn-primary"
                                                >
                                                    Delete
                                            </button>
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => this.ShowApplications(job._id)}
                                                    className="btn btn-primary"
                                                >
                                                    Show Applicants
                                            </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default EditJobs;