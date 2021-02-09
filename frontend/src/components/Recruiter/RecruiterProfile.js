import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";


const RecruiterProfile = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [contact_number, setContact_Number] = useState("");
    const [bio, setBio] = useState("");
    const wordLimit = 250;
    const [wordCount, setWordcount] = useState("");
    const [charLimit, setCharlimit] = useState("");
    const [updated_bio, setUpdated_Bio] = useState("");
    const [updated_contact_number, setUpdated_Contact_Number] = useState("");

    useEffect(() => {
        const User = {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            contact_number,
            bio
        }
        axios.post("http://localhost:4000/user/recruiterinfo", User)
            .then(res => {
                setContact_Number(res.data.contact_number)
                setBio(res.data.bio)
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
            email: localStorage.getItem("email"),
            contact_number : updated_contact_number,
            bio : updated_bio
        }
        try {
            axios.post('http://localhost:4000/user/editrecruiter', User)
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
        setUpdated_Bio(event.target.value);
        setWordcount(wordCount);
        setCharlimit(wordLimit - wordCount < 0 ? bio.length : null)
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
            <p>Contact Number: {contact_number}</p>
            <p>Bio: {bio}</p>
            <form onSubmit={edit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number: </label>
                    <input type="number"
                        className="form-control"
                        min="0000000000"
                        max="9999999999"
                        onChange={(e) => setUpdated_Contact_Number(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Bio: </label>
                    <textarea
                        type="text"
                        className="form-control"
                        onChange={(e) => wordCheck(e)}
                        maxLength={charLimit}
                    />
                    {WordLimitMessage}
                </div>
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
export default RecruiterProfile