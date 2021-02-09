const bcrypt = require('bcrypt')
var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// Load Applicant model
const Applicant = require("../models/Applicant");

// Load Recruiter model
const Recruiter = require("../models/Recruiter");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        usertype: req.body.usertype,
        date: Date.now()
    });


    const email = req.body.email;
    User.findOne({ email }).then(user => {
        // Check if user email exists
        console.log(user)
        if (!user) {
            let userid;
            bcrypt.hash(newUser.password, 2, (err, hash) => {
                newUser.password = hash
                newUser.save()
                    .then(user => {
                        userid = user._id
                        res.status(200).json(user);

                        if (req.body.usertype == "applicant") {
                            const newApplicant = new Applicant({
                                email: req.body.email,
                                name: req.body.name,
                                _id: userid
                            });
                            newApplicant.save()
                                .then(user => {
                                    res.status(200).json(newApplicant);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                        }
                        else if (req.body.usertype == "recruiter") {
                            const newRecruiter = new Recruiter({
                                email: req.body.email,
                                name: req.body.name,
                                _id: userid
                            });
                            newRecruiter.save()
                                .then(user => {
                                    res.status(200).json(newRecruiter);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                        }
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            })
        }
        else {
            return res.status(404).json({
                error: "Account with email already exists",
            });
        }
    });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            //res.send("Email Found");
            //return user;
            bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    res.json(user);
                }
                else {
                    return res.status(404).json({
                        error: "Wrong Password",
                    });
                }
            })
        }
    });
});

// POST request
// edit applicant profile
router.post("/editapplicant", (req, res) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            user.name = req.body.name || user.name
            user.save().then((user) => {
                res.status(200).json(user);
            })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }
    )
    Applicant.findOne({ email: req.body.email }).then(
        (applicant) => {
            applicant.name = req.body.name || applicant.name
            applicant.skills = req.body.skills || applicant.skills
            applicant.save().then((applicant) => {
                res.status(200).json(applicant);
            })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }
    )
});


// POST request
// edit recruiter profile
router.post("/editrecruiter", (req, res) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            user.name = req.body.name || user.name
            user.save().then((user) => {
                res.status(200).json(user);
            })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }
    )
    Recruiter.findOne({ email: req.body.email }).then(
        (recruiter) => {
            recruiter.name = req.body.name || recruiter.name
            recruiter.contact_number = req.body.contact_number || recruiter.contact_number
            recruiter.bio = req.body.bio || recruiter.bio
            recruiter.save().then((recruiter) => {
                res.status(200).json(recruiter);
            })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }
    )
});

// POST request
// recruiter info
router.post("/recruiterinfo", (req, res) => {
    Recruiter.findOne({ email: req.body.email }).then(
        (recruiter) => {
            res.status(200).json(recruiter)
        }
    ).catch((err) => {
        res.status(400).send(err);
    })
})

// POST request
// applicant info
router.post("/applicantinfo", (req, res) => {
    Applicant.findOne({ email: req.body.email }).then(
        (applicant) => {
            res.status(200).json(applicant)
        }
    ).catch((err) => {
        res.status(400).send(err);
    })
})

module.exports = router;