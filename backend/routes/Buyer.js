var express = require("express");
var router = express.Router();

// Load User model
const Buyer  = require("../models/Buyer");
const Vendor = require("../models/Vendor");

// GET request 
// Getting all the users
router.get("/show", function(req, res) {
    Buyer.find(function(err, buyer) {
		if (err) {
			console.log(err);
		} else {
			res.json(buyer);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        batch: req.body.batch,
        age: req.body.age,
        password: req.body.password,
        contact: req.body.contact,
        date: req.body.date,
        wallet: 0
    });
    console.log(newBuyer);
    Vendor.findOne({ email: newBuyer.email })
        .then(vendor => {
            if (vendor) { 
                res.send("remail"); 
            }
            else {
                Buyer.findOne({ email: newBuyer.email })
                    .then(buyer => {
                        if (buyer) {
                             res.send("remail"); 
                            }
                        else {
                            newBuyer.save()
                                .then(curr_buyer => {
                                    res.status(200).json(curr_buyer);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                        }
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });

});

router.post("/login", (req,res) => {
    const email = req.body.email ;
    const password = req.body.password ;
    console.log(email);
    console.log(password);
    Buyer.findOne({ email: email })
        .then(buyer => {
            if(buyer){
                if(buyer.password == password){
                    res.send(buyer._id);
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
    Buyer.findOne({ _id: id })
        .then(buyer => {
           res.send(buyer);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/editname", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {name: req.body.name};
    Buyer.findOneAndUpdate(filter,update)
    .then(vendor => {
        res.send(vendor);
     })
     .catch(err => {
         res.status(400).send(err);
     });
});

router.post("/editage", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {age: req.body.age};
    Buyer.findOneAndUpdate(filter,update)
    .then(vendor => {
        res.send(vendor);
     })
     .catch(err => {
         res.status(400).send(err);
     });
});

router.post("/editbatch", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {batch: req.body.batch};
    Buyer.findOneAndUpdate(filter,update)
    .then(vendor => {
        res.send(vendor);
     })
     .catch(err => {
         res.status(400).send(err);
     });
});

router.post("/editcontact", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {contact: req.body.contact};
    Buyer.findOneAndUpdate(filter,update)
    .then(vendor => {
        res.send(vendor);
     })
     .catch(err => {
         res.status(400).send(err);
     });
});

router.post("/editpassword", (req,res) => {
    const filter = {_id: req.body.id};
    const update = {password: req.body.password};
    Buyer.findOneAndUpdate(filter,update)
    .then(vendor => {
        res.send(vendor);
     })
     .catch(err => {
         res.status(400).send(err);
     });
});

router.post("/addtowallet", (req,res) => {
    const filter = {_id: req.body.id};
    Buyer.findOne(filter)
    .then(vendor => {
        const update = {wallet: parseInt(req.body.ToAdd)+parseInt(vendor.wallet)};
        console.log(update);
        console.log(req.body.wallet);
        console.log(vendor.ToAdd);
        Buyer.findOneAndUpdate(filter,update)
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

