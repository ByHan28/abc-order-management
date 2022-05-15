const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
     orderID : "String",
     itemName : "String",
     trackNo : "String",
     description : "String",
     tot_amount: "Number",
});

module.exports = Item = mongoose.model("Order",OrderSchema);
