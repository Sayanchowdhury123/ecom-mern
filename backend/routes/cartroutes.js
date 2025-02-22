const {protect} = require("../middleware/authmiddleware")
const Product = require("../models/product");
const express = require("express");
const Cart = require("../models/cart");


const router = express.Router();


router.post("/", protect, async (req,res) => {
    const {productid, quantity} = req.body;
    const userid = req.user._id;
    try {
        const product = await Product.findById(productid);
        
        if(!product){
            return res.status(404).json({message: "product not found"})
        }
     
       let cart = await Cart.findOne({user: userid}) ;


       if(!cart){
        cart = new Cart({user: userid, items:[{product: productid, quantity}]})
       }else{
        const itemindex = cart.items.findIndex(item => item.product.toString() === productid)

      if(itemindex > -1){
        cart.items[itemindex].quantity += quantity;
      }else{
        cart.items.push({product: productid, quantity})
      }

       }


       await cart.save();

       res.status(200).json({message: "added to cart", cart})

    } catch (error) {
        res.status(500).json({message:"server error"})
        console.log(error);
    }
})



router.get("/",protect, async (req,res) => {
      const userid = req.user._id;
      
      try {
        const cart = await Cart.findOne({user: userid}).populate("items.product", "name price image");

        if(!cart){
            return res.status(200).json({items: []})
        }


        res.status(200).json(cart)
      } catch (error) {
        res.status(500).json({message:"server error"})
        console.log(error);
      }
})



router.put("/:productid", protect, async (req,res) => {
    const {quantity} = req.body;
    const {productid} = req.params;
    const userid = req.user._id;

    try {
      let cart = await Cart.findOne({user: userid}).populate("items.product");

      if(!cart){
        return res.status(404).json({message: "no cart found"})
      }

      const itemindex = cart.items.findIndex((item => item.product._id.toString() === productid));

      if(itemindex !== -1){
        cart.items[itemindex].quantity = quantity;
      }else{
        return res.status(404).json({message : "producct not found"});
      }

      await cart.save();
      
      const updatedcart = await Cart.findOne({user: userid}).populate("items.product");

      res.status(200).json({cart: updatedcart});
    } catch (error) {
        res.status(500).json({message:"server error"})
        console.log(error);
    }

});



router.delete("/:productid", protect, async (req,res) => {
    const userid = req.user._id;
    const {productid} = req.params;

    try {
        const cart = await Cart.findOne({user: userid}).populate("items.product");

        if(!cart){
            return res.status(404).json({message: "no cart found"});
        }

       cart.items = cart.items.filter((item) => item.product._id.toString() !== productid);
        
       await cart.save();

       const updatedcart = await Cart.findOne({user: userid}).populate("items.product");


       res.status(200).json({cart: updatedcart});
    } catch (error) {
        res.status(500).json({message:"server error"})
        console.log(error);
    }
})



module.exports = router;