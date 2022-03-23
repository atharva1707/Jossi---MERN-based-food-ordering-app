const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Vendor = require('./Vendor');
const Buyer = require('./Buyer');
const Item = require('./Item');

// Create Schema
const OrderSchema = new Schema({
    item_id: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
    status:{
        type: String,
        required: true 
    },
    buyer_id:{
        type: String,
        required: true 
    },
    vendor_id:{
        type: String,
        required: true 
    },
    addons:[{
        type: String,
        required: false
    }],
    quantity:{
        type: Number,
        required: true 
    },
    cost:{
        type: Number,
        required: true 
    },
    rating:{
        type: Number,
        required: true
    },
    israted:{
        type: Number,
        required: true
    },
    vendor:{
        type: Schema.Types.Object, 
        ref: 'Vendor',
        required: true
    },
    buyer:{
        type: Schema.Types.Object, 
        ref: 'Buyer',
        required: true
    },
    item:{
        type: Schema.Types.Object, 
        ref: 'Item',
        required: true
    },


});

module.exports = Order = mongoose.model("Order", OrderSchema);
