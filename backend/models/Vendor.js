const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    shopname: {
		type: String,
		required: true
	},
    start: {
		type: String,
		required: true
	},
    close: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
    contact:{
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true 
    },
	accepted: {
		type: Number,
		required: true
	},
	cooking: {
		type: Number,
		required: true
	},
});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
