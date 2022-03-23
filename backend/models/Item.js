const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Vendor = require('./Vendor');

// Create Schema
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
    type:{
        type: String,
        required: true
    },
    tags:{
        type: String,
        required: false 
    },
    rating:{
        type: Number,
        required: true 
    },
    num_rating:{
        type: Number,
        required: true 
    },
    addonprices:[{
        type: Number,
        required: false
    }],
    addons:[{
        type: String,
        required: false
    }],
    vendor_id:{
        type: String,
        required: true
    },
    vendor:{
        type: Schema.Types.Object, 
        ref: 'Person'
    },
    num_addon:{
		type: Number,
		required: true
	}


});

module.exports = Item = mongoose.model("Item", ItemSchema);
