const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
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
    batch:{
        type: Number,
        required: true 
    },
    age:{
        type: Number,
        required: true 
    },
    wallet:{
        type: Number,
        required: true
    },

});

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);
