var express = require("express");
const { Mongoose } = require("mongoose");
var router = express.Router();

// Load User model
const Vendor = require("../models/Vendor");
const Buyer = require("../models/Buyer");
const Item = require("../models/Item");

// GET request 
// Getting all the users
router.get("/show", function (req, res) {
    Vendor.find(function (err, vendor) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendor);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db

router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        shopname: req.body.shopname,
        close: req.body.close,
        email: req.body.email,
        start: req.body.start,
        password: req.body.password,
        contact: req.body.contact,
        date: req.body.date,
        accepted: 0,
        cooking: 0,
    });
    console.log(newVendor);
    Vendor.findOne({ email: newVendor.email })
        .then(vendor => {
            if (vendor) { 
                res.send("remail"); 
            }
            else {
                Buyer.findOne({ email: newVendor.email })
                    .then(buyer => {
                        if (buyer) {
                             res.send("remail"); 
                            }
                        else {
                            newVendor.save()
                                .then(curr_vendor => {
                                    res.status(200).json(curr_vendor);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                        }
                    });
            }
        });

});


router.post("/login", (req,res) => {
    const email = req.body.email ;
    const password = req.body.password ;
    console.log(email);
    console.log(password);
    Vendor.findOne({ email: email })
        .then(vendor => {
            console.log(vendor);
            if(vendor){
                if(vendor.password == password){
                    res.send(vendor._id);
                }
                else{
                    res.send("Incorrect Password");
                }
            }
            else{
                res.send("Invalid email");
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/getbyid", (req,res) => {
    const id = req.body.id ;
    Vendor.findOne({ _id: id })
        .then(vendor => {
           res.send(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/editname", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {name: req.body.name};
    Vendor.findOneAndUpdate(filter,update,{new: true})
    .then(vendor => {
        Item.updateMany({ vendor_id: vendor._id },
            { vendor: vendor }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation for food");
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

router.post("/editshopname", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {shopname: req.body.shopname};
    Vendor.findOneAndUpdate(filter,update,{new: true})
    .then(vendor => {
        Item.updateMany({ vendor_id: vendor._id },
            { vendor: vendor }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation for food");
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

router.post("/editcontact", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {contact: req.body.contact};
    console.log(req.body.name);
    Vendor.findOneAndUpdate(filter,update,{new: true})
    .then(vendor => {
        Item.updateMany({ vendor_id: vendor._id },
            { vendor: vendor }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation for food");
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
router.post("/editpassword", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {password: req.body.password};
    console.log(req.body.name);
    Vendor.findOneAndUpdate(filter,update,{new: true})
    .then(vendor => {
        Item.updateMany({ vendor_id: vendor._id },
            { vendor: vendor }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation for food");
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
router.post("/editclose", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {close: req.body.close};
    console.log(req.body.name);
    Vendor.findOneAndUpdate(filter,update,{new: true})
    .then(vendor => {
        Item.updateMany({ vendor_id: vendor._id },
            { vendor: vendor }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation for food");
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
router.post("/editopen", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {start: req.body.open};
    console.log(req.body.open);
    Vendor.findOneAndUpdate(filter,update,{new: true})
    .then(vendor => {
        console.log("HERE");
        Item.updateMany({ vendor_id: vendor._id },
            { vendor: vendor }, function (err, docs) {
                if (err) {
                    return res.status(404).send("Issue in updation for food");
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


router.post("/accepted", function (req, res) {
    const filter = {_id: req.body.id};
    Vendor.findOne(filter)
    .then(vendor => {
        const update = {accepted: 1+parseInt(vendor.accepted)};
        Vendor.findOneAndUpdate(filter,update)
        .then(vendor_ => {
            res.send(vendor_);
        })
        .catch(err => {
            res.status(400).send(err);
        });
     })
     .catch(err => {
         res.status(400).send(err);
     });
});

router.post("/cooking", function (req, res) {
    const filter = {_id: req.body.id};
    Vendor.findOne(filter)
    .then(vendor => {
        const update = {
            cooking: 1+parseInt(vendor.cooking),
            accepted: -1+parseInt(vendor.accepted),
        };
        Vendor.findOneAndUpdate(filter,update)
        .then(vendor_ => {
            res.send(vendor_);
        })
        .catch(err => {
            res.status(400).send(err);
        });
     })
     .catch(err => {
         res.status(400).send(err);
     });
});

router.post("/readyforpickup", function (req, res) {
    const filter = {_id: req.body.id};
    Vendor.findOne(filter)
    .then(vendor => {
        const update = {
            cooking: -1+parseInt(vendor.cooking),
        };
        Vendor.findOneAndUpdate(filter,update)
        .then(vendor_ => {
            res.send(vendor_);
        })
        .catch(err => {
            res.status(400).send(err);
        });
     })
     .catch(err => {
         res.status(400).send(err);
     });
});

// POST request 
// Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

module.exports = router;

