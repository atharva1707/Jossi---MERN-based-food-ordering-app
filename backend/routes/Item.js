var express = require("express");
var router = express.Router();

// Load User model
const Item = require("../models/Item");
const Vendor = require("../models/Vendor");
const Order = require("../models/Order");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Item.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    })
});

router.post("/byid", function (req, res) {
            Item.find({ vendor_id : req.body.id}, function (err, items) {
                if (err){
                    console.log(err);
                }
                else{
                    res.json(items);
                }
            });
       


});




router.post("/add", (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        price: req.body.price,
        tags: req.body.tag,
        type: req.body.type,
        addons: req.body.addons,
        addonprices: req.body.addonprices,
        rating: 0,
        num_rating: 0,
        num_addon: req.body.numaddon,
        vendor_id: req.body.vendor._id,
        vendor: req.body.vendor,

    });
    console.log(newItem);
    newItem.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/delete", (req, res) => {

    const filter = { _id: req.body.id };
    Item.findOneAndDelete(filter)
        .then(item => {
            res.status(200);
        })
        .catch(err => {
            res.status(400);
        });
});


router.post("/edit", (req, res) => {
    const update = {
        name: req.body.name,
        price: req.body.price,
        tags: req.body.tag,
        type: req.body.type,
        addons: req.body.addons,
        addonprices: req.body.addonprices,
        num_addon: req.body.numaddon,

    };
    console.log(update);
    const filter = { _id: req.body.id };
    Item.findOneAndUpdate(filter, update,{new: true})
        .then(item => {
            console.log("OKAY");
            Order.updateMany({ item_id: item._id },
                { item: item }, function (err, docs) {
                    if (err) {
                        return res.status(404).send("Issue in updation for Orders");
                    }
                    else {
                        return res.status(200).send("Updated");
                    }
                });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send("Email Found");
            return user;
        }
    });
});

module.exports = router;

