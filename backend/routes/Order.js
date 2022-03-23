var express = require("express");
var router = express.Router();

// Load User model
const Order = require("../models/Order");
const Item = require("../models/Item");
const { response } = require("express");
const Buyer = require("../models/Buyer");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Order.find(function (err, orders) {
        if (err) {
            console.log(err);
        } else {
            res.json(orders);
        }
    })
});





router.post("/add", (req, res) => {
    console.log(req.body);

    const newOrder = new Order({
        vendor_id: req.body.vendor_id,
        buyer: req.body.buyer,
        buyer_id: req.body.buyer_id,
        vendor: req.body.vendor,
        item_id: req.body.item_id,
        item: req.body.item,
        date: req.body.date,
        status: "PLACED",
        addons: req.body.addons,
        quantity: req.body.quantity,
        cost: req.body.cost,
        rating: 0,
        israted: 0,
    });




    console.log("NOW");
    console.log(newOrder);
    newOrder.save()
        .then(order => {
            console.log("HERE");
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/byvendorid", function (req, res) {
    Order.find({ vendor_id: req.body.id }, function (err, orders) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});


router.post("/top", function (req, res) {

    Order.find({ vendor_id: req.body.id, status: "COMPLETED" }, function (err, orders) {
        if (err) {


        }
        else {
            var dict = {};
            orders.map((order) => {
                if (dict[order.item.name]) { dict[order.item.name] += 1; }
                else { dict[order.item.name] = 1; }
            })
            var items = Object.keys(dict).map(function (key) {
                return [key, dict[key]];
            });

            items.sort(function (first, second) {
                return second[1] - first[1];
            });
            res.json(items);
        }
    });
});


router.post("/agewise", function (req, res) {

    let dict = {} ;
    let done = 0 ;
    for(let i=1;i<=100;i++){
        Buyer.find({age: i}, function(err,buyers){
            if(err){;}
            else{
                if(buyers.length==0){done += 1;}
                buyers.forEach((buyer) => {
                    Order.count({buyer_id: buyer._id, vendor_id: req.body.id},function(err1,count){
                        if(err1){;}
                        else{
                            console.log(i);
                            if(dict[i]){dict[i] += count}
                            else{dict[i] = count}
                            done +=1 ;
                            if(done==100){
                                console.log(dict);
                                res.send(dict);
                            }
                        }
                    });
                });
            }
        });
    }
});


router.post("/batchwise", function (req, res) {

    let dict = {} ;
    let done = 0 ;
    for(let i=1;i<=5;i++){
        Buyer.find({batch: i}, function(err,buyers){
            if(err){;}
            else{
                if(buyers.length==0){done += 1;}
                buyers.forEach((buyer) => {
                    Order.count({buyer_id: buyer._id, vendor_id: req.body.id},function(err1,count){
                        if(err1){;}
                        else{
                            console.log(i);
                            if(dict[i]){dict[i] += count}
                            else{dict[i] = count}
                            done +=1 ;
                            if(done==5){
                                console.log(dict);
                                res.send(dict);
                            }
                        }
                    });
                });
            }
        });
    }
});

router.post("/stat", function (req, res) {

    let completed = 0;
    let orders_t = 0;
    let rejected = 0;
    console.log("HERE");
    Order.count({ vendor_id: req.body.id, status: 'COMPLETED' }, function (err, count1) {
        if (err) { console.log(err) }
        else {
            Order.count({ vendor_id: req.body.id, status: "REJECTED" }, function (err, count2) {
                if (err) { console.log(err) }
                else {
                    Order.count({ vendor_id: req.body.id }, function (err, count3) {
                        if (err) { console.log(err) }
                        else {
                            
                            res.json({ completed: count1, rejected: count2, total: count3 });
                        }
                    });
                }
            });
        }
    });

});



router.post("/bybuyerid", function (req, res) {
    Order.find({ buyer_id: req.body.id }, function (err, orders) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.post("/rating", function (req, res) {

    Order.findOneAndUpdate({ _id: req.body.id }, { rating: req.body.rating })
        .then(order => {
            Item.findOne({ _id: order.item._id })
                .then(item => {
                    const update = {
                        rating: parseInt(item.rating) + parseInt(req.body.rating),
                        num_rating: parseInt(item.num_rating) + 1,
                    }
                    Item.findOneAndUpdate({ _id: order.item._id }, update)
                        .then(item_ => {
                            console.log(item_);
                        })
                })
            res.send(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });


});



router.post("/next", (req, res) => {

    const filter = { _id: req.body._id };
    let next_stage = "PLACED";
    if (req.body.status === "PLACED") { next_stage = "ACCEPTED" }
    if (req.body.status === "ACCEPTED") { next_stage = "COOKING" }
    if (req.body.status === "COOKING") { next_stage = "READY FOR PICKUP" }
    if (req.body.status === "READY FOR PICKUP") { next_stage = "COMPLETED" }
    if (req.body.status === "COMPLETED") { next_stage = "COMPLETED" }




    Order.findOneAndUpdate(filter, { status: next_stage })
        .then(order => {
            res.send(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/reject", (req, res) => {

    const filter = { _id: req.body._id };
    Order.findOneAndUpdate(filter, { status: "REJECTED" })
        .then(order => {
            res.send(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// router.post("/delete", (req, res) => {

//     const filter = {_id: req.body.id};
//     Item.findOneAndDelete(filter)
//         .then(item => {
//             res.status(200);
//         })
//         .catch(err => {
//             res.status(400);
//         });
// });


// router.post("/edit", (req, res) => {
//     const update = {
//         name: req.body.name,
//         price: req.body.price,
//         tags: req.body.tag,
//         type: req.body.type,
//         addons: req.body.addons,
//         addonprices: req.body.addonprices,
//         num_addon: req.body.numaddon,

//     };
//     console.log(update);
//     const filter = {_id: req.body.id};
//     Item.findOneAndUpdate(filter,update)
//         .then(item => {
//             res.status(200).json(item);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });
// // POST request 
// // Login
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

