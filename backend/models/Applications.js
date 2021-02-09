const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
	applicant_email: {
		type: String,
		required: true
    },
    applicant_name: {
        type: String,
        required: true
    },
	job_id: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	sop: {
		type: String,
		required: false
    },
    date: {
        type: Date,
        required: false
    }
})

module.exports = Application = mongoose.model("Application", ApplicationSchema);
