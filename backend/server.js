const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
const DB_NAME = "tutorial"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var BuyerRouter = require("./routes/Buyer");
var VendorRouter = require("./routes/Vendor");
var ItemRouter = require("./routes/Item");
var OrderRouter = require("./routes/Order");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB

// const DB_NAME = 'mongodb+srv://atharva_DASS:atharva_DASS@cluster0.icngm.mongodb.net/Cluster0?retryWrites=true&w=majority'


mongoose.connect(process.env.MONGODB_URI   , { useNewUrlParser: true },{useCreateIndex: true},{useUnifiedTopology: true},{useFindAndModify: true},);
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

    // mongoose.connect(DB_NAME, {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: true,
    // }).then(() => {
    //     console.log('mongoose connect successful');
    // }).catch((err) => console.log('no mongoose connection'))

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/buyer", BuyerRouter);
app.use("/vendor", VendorRouter);
app.use("/item", ItemRouter);
app.use("/order", OrderRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
