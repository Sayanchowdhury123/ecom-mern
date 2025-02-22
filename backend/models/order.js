const mongoose = require("mongoose");


const orederschema = new mongoose.Schema({
    user: {type : mongoose.Schema.Types.ObjectId , ref: "User" , required: true},
    items: [
        {

            product: {type:  mongoose.Schema.Types.ObjectId, ref:"Product"},
            quantity: {type: Number, required:true},
            name: {type: String},
            price:{type: Number},
        }
    ],

    totalprice: {type: Number, required: true},
    shippingaddress: {
        fullname:{type: String,required:true},
         address: {type: String,required:true},
         city:{type: String,required:true},
         postalcode: {type:String,required:true},
         country:{type:String,required:true}
    },
    paymentmethod:{type:String,required:true},
    status:{type:String,default:"pending"}
},{timestamps: true});


const Order = mongoose.model("Order", orederschema);
module.exports = Order;