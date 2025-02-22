const mongoose = require("mongoose");


const reviewschema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name:{
        type: String,
        required: true,
    },

    rating:{
        type: Number,
        require: true,
        min: 1,
        max: 5
    },

    comment:{
        type: String,
        required: true
    },
}, {timestamps: true});

const productschema = new mongoose.Schema({
    name: {type: String, required:true},
     description: {type:String},
     price:{type: Number, required:true},
     image: {type: String},
     category: {type: String, required:true},
     countinstock:{type: Number, required: true},
     reviews: [reviewschema],
     rating : {type: Number, default: 0},
     numreviews: {type: Number, default: 0},
} , {timestamps:true} );


const Product = mongoose.model("Product", productschema);

module.exports = Product;

