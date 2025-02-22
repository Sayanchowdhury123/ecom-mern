const mongoose = require("mongoose");


const cartitemschema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    quantity: {
        type: Number,
        default: 1,
        min: 1,
        required: true,
    }
});


const cartschema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    items:[cartitemschema],
})


const Cart = mongoose.model("Cart", cartschema);

module.exports = Cart;
