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
import emailjs from 'emailjs-com';

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class ManageApplications extends Component {

    constructor(props) {
        super(props);
        this.state = { applications: [], sortedApplications: [], sortName: true };
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
    }

    componentDidMount() {
        const Job = {
            _id: localStorage.getItem("job_id")
        }
        axios.post('http://localhost:4000/job/getapplications', Job)
            .then(response => {
                console.log(response.data)
                this.setState({ applications: response.data, sortedApplications: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    Reject(id) {
        const Application = {
            _id: id
        }
        axios.post('http://localhost:4000/job/reject', Application)
            .then(res => {
                alert("Rejected Application")
            }).catch(err => {
                alert(err)
            })
    }

    Accept(application) {
        const appname = application.applicant_name
        const appemail = application.applicant_email
        const fromname = localStorage.getItem("name")
        console.log(fromname)
        console.log(appname)
        console.log(appemail)
        emailjs.send('dass', 'template_giv8byb', { message: "Congrats you have been accepted for: ", from_name: fromname, to_name: appname, to_email: appemail }, 'user_qv94Jf1qCvuYJjkmiIgXT')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
        alert("Accepted Application")
        axios.post('http://localhost:4000/job/accept', application)
            .then(res => {
                alert("Accepted Application")
            }).catch(err => {
                alert(err)
            })
    }

    sortChange() {
        /**
         *      Note that this is sorting only at front-end.
         */
        var array = this.state.applications;
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
            applications: array,
            sortName: !this.state.sortName,
        })
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
                                        <TableCell>Name</TableCell>
                                        <TableCell>Skills</TableCell>
                                        <TableCell>Date of Application</TableCell>
                                        <TableCell>SOP</TableCell>
                                        <TableCell>Stage of Application</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((application, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ }</TableCell>
                                            <TableCell>{application.applicant_name}</TableCell>
                                            <TableCell>{ }</TableCell>
                                            <TableCell>{application.date}</TableCell>
                                            <TableCell>{application.sop}</TableCell>
                                            <TableCell>{application.state}</TableCell>
                                            <TableCell>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => this.Accept(application)}
                                                >
                                                    Accept
                                            </button>
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    className="btn btn-primary"
                                                >
                                                    Shortlist
                                            </button>
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => this.Reject(application._id)}
                                                    className="btn btn-primary"
                                                >
                                                    Reject
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

export default ManageApplications;