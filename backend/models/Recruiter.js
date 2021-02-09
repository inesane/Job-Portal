const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contact_number: {
		type: Number,
		required: false
	},
	bio: {
		type: String,
		required: false
	}
})

module.exports = Recruiter = mongoose.model("Recruiter", RecruiterSchema);