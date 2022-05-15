const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const Order = require("../model/order");
const uuid = require("uuid");
const connectDB = require("../config/database");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

connectDB();

Router.post("/addOrder",(req,res)=>{
    const id = uuid.v4();
    const itemName = req.body.itemName;
    const trackNo = req.body.trackNo;
    const description = req.body.description;
    const tot_amount = req.body.tot_amount;

    const order = new Order({
        OrderID : id,
        itemName : itemName,
        trackNo : trackNo,
        description : description,
        tot_amount: tot_amount,
    });

    order.save(err => {
        console.log(err);
        if (err) return res.status(500).send(err);
        return res.status(200).send(order)
    });
    
});

Router.get("/orders",(req,res)=>{
    Order.find((err,result)=>{
        if(err){
            console.log(err);
        }else{
            const orders = result;
           res.send(orders);
        }
    });
});

Router.put("/updateOrder",(req,res)=>{
    const OrderID =  req.body.OrderID;
    const itemName = req.body.itemName;
    const trackNo = req.body.trackNo;
    const description = req.body.description;
    const tot_amount = req.body.tot_amount;
    const userId = req.body.userId;

    const query = {OrderID:OrderID};
    Order.findOneAndUpdate(query,{$set:{
            itemName : itemName,
            trackNo : trackNo,
            description : description,
            tot_amount: tot_amount,
    }},(err)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(OrderID)
    });
});

Router.delete("/deleteOrder",(req,res)=>{
    const OrderID =  req.body.OrderID;
    const query = {OrderID: OrderID};
    Order.findOneAndDelete(query,(err,result)=>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
});

module.exports = Router;