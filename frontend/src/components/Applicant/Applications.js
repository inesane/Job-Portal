import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";


const Applications = () => {
    const history = useHistory();
    const [sop, setSop] = useState("");
    const wordLimit = 250;
    const [wordCount, setWordcount] = useState("");
    const [charLimit, setCharlimit] = useState("");

    let WordLimitMessage;
    var result = wordLimit - wordCount;
    if (result < 0) {
        WordLimitMessage = (
            <p>
                You Have Reached the Maximum Number of Words
            </p>
        );
    }
    else {
        WordLimitMessage = (
            <p>
                {result} Words Left
            </p>
        );
    }


    const wordCheck = (event) => {
        const wordCount =
            event.target.value === "" ? 0 : event.target.value.split(" ").length;
        setSop(event.target.value);
        setWordcount(wordCount);
        setCharlimit(wordLimit - wordCount < 0 ? sop.length : null)
    }

    const submit = async (e) => {
        e.preventDefault();
        const Application = {
            applicant_name: localStorage.getItem("name"),
            applicant_email: localStorage.getItem("email"),
            job_id: localStorage.getItem("job_id"),
            sop
        }
        axios.post("http://localhost:4000/job/apply", Application)
            .then(res => {
                alert("Applied");
                console.log(res.data);

            }).catch(err => {
                alert(err)
            })
        localStorage.removeItem("job_id");
        history.push('/applicantprofile');
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>SOP: </label>
                    <textarea
                        type="text"
                        className="form-control"
                        onChange={(e) => wordCheck(e)}
                        maxLength={charLimit}
                    />
                    {WordLimitMessage}
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
            </form>
        </div >
    )
}
export default Applications