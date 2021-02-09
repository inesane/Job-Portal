const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	recruiter_name: {
		type: String,
		required: false
	},
	recruiter_emailid: {
		type : String,
		required: false
	},
	max_applications: {
		type : Number,
		required : true
	},
	max_positions: {
		type: Number,
		required: true
    },
    date_of_posting: {
		type: Date,
		required: false
    },
    application_deadline: {
		type: Date,
		required: true
    },
    required_skills: {
		type: [String],
		required: false
    },
    type: {
		type: String,
		required: true
    },
    duration: {
		type: Number,
		required: true
    },
    salary: {
		type: Number,
		required: true
    },
    rating: {
		type: Number,
		required: false
	},
	number_of_ratings: {
		type: Number,
		required: false
	},
	status: {
		type: String,
		required: false
	}
});

module.exports = Job = mongoose.model("Jobs", JobSchema);