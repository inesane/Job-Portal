const bcrypt = require('bcrypt')
var express = require("express");
var router = express.Router();

// Load Job model
const Job = require("../models/Jobs");

// Load Application model
const Application = require("../models/Applications")


// POST request 
// Add a job to db
router.post("/create", (req, res) => {
    // console.log("yes")
    const newJob = new Job({
        title: req.body.title,
        recruiter_name: req.body.recruiter_name,
        recruiter_emailid: req.body.recruiter_emailid,
        max_applications: req.body.max_applications,
        max_positions: req.body.max_positions,
        date_of_posting: Date.now(),
        application_deadline: req.body.application_deadline,
        required_skills: req.body.required_skills,
        type: req.body.type,
        duration: req.body.duration,
        salary: req.body.salary,
        rating: 0,
        number_of_ratings: 0,
        status: "active"
    });
    newJob.save().then(Job => {
        res.status(200).json(Job);
    })
        .catch(err => {
            res.status(400).send(err);
        });
})

// GET request 
// Getting all the jobs
router.get("/", function (req, res) {
    Job.find({ status: "active" }).exec(function (err, job) {
        if (err) {
            console.log(err);
        } else {
            res.json(job);
        }
    })
});

// POST request 
// Getting all the jobs with current recruiter
router.post("/ownjobs", function (req, res) {
    Job.find({ recruiter_emailid: req.body.recruiter_emailid }).exec(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }

    })
});

// POST request
// Delete job
router.post("/delete", function (req, res) {
    Job.findOne({ _id: req.body._id }).then(
        (job) => {
            job.status = "deleted"
            job.save().then((job) => {
                res.status(200).json(job);
            })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }
    )
})

// POST request
// EDIT job
router.post("/edit", function (req, res) {
    Job.findOne({ _id: req.body._id }).then(
        (job) => {
            job.application_deadline = req.body.application_deadline || job.application_deadline
            job.max_applications = req.body.max_applications || job.max_applications
            job.max_positions = req.body.max_positions || job.max_positions
            job.save().then((job) => {
                res.status(200).json(job);
            })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }
    )
})

// POST request
// Create application
router.post("/apply", function (req, res) {
    const newApplication = new Application({
        applicant_email: req.body.applicant_email,
        applicant_name: req.body.applicant_name,
        job_id: req.body.job_id,
        sop: req.body.sop,
        state: "applied",
        date: Date.now()
    });
    newApplication.save().then(Application => {
        res.status(200).json(Application);
    })
        .catch(err => {
            res.status(400).send(err);
        });
})

// POST request
// getting all the applications
router.post("/getapplications", function (req, res) {
    console.log(req.body._id)
    Application.find({ $and: [{ job_id: req.body._id }, { state: { $ne: "rejected" } }]}).then((application) => {
        if (!application) {
            return res.status(404).json({
                error: "Error",
            });
        }
        else
        {
            res.status(200).json(application)
        }
    })
})

// POST request
// Reject Application
router.post("/reject", function (req, res) {
    Application.findOne({ _id: req.body._id }).then(
        (application) => {
            application.state = "rejected"
            application.save().then((application) => {
                res.status(200).json(application);
            })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }
    )
})

// POST request
// Accept Application
router.post("/accept", function (req, res) {
    Application.findOne({ _id: req.body._id }).then(
        (application) => {
            application.state = "accepted"
            application.save().then((application) => {
                res.status(200).json(application);
            })
                .catch((err) => {
                    res.status(400).send(err);
                });
        }
    )
})

module.exports = router;