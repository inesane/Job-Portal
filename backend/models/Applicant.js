const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	education: {
		type: String,
		required: false
	},
	skills: {
		type: [String],
		required: false
	},
	rating: {
		type: Number,
		required: false
	},
	resume: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false
	}
})

module.exports = Applicant = mongoose.model("Applicant", ApplicantSchema);
