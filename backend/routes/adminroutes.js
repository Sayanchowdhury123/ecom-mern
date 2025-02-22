const express = require("express");
const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const {protect , isadmin} = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadimage");

const router = express.Router();


router.get("/users",protect,isadmin ,async(req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({message: "server error"})
    }
    
});


router.delete("/users/:id", protect, isadmin, async(req,res) => {
    try {
         await User.findByIdAndDelete(req.params.id);
         res.json({message: "user deleted"})
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
});


router.put("/make-admin/:id", protect, isadmin, async(req,res) => {
    try {
        const user = await User.findById(req.params.id);

        if(user){
            user.isadmin = true;
            await user.save();
            res.json({message :"user promoted to admin"})
        }else{
            res.status(404).json({message: "user not found"})
        }

    } catch (error) {
        res.status(500).json({message: "server error"})
    }
})



router.get("/products", protect, isadmin, async(req,res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
   
})





router.post("/addproduct",protect,isadmin ,upload.single("image"),async(req,res) => {
   try {
    console.log(req.body);
    const {name, description, price, category, countinstock} = req.body;
    
    const product = new Product({name,description,price,category,countinstock, image:  req.file ? req.file.path : ""});
    await product.save();
    res.status(201).json(product);
   } catch (error) {
    console.log("error adding product",error);
    res.status(500).json({message: "server error"})
   }
})



router.put("/editproduct/:id", protect, isadmin,upload.single("image") ,async(req,res) => {
    try {
       const {id} = req.params;
       const {name,description, price, category, countinstock} = req.body;
       const image = req.file ? req.file.path : "";

       const updatedata = {};

       if(name){
        updatedata.name = name;
       }
       if(description){
        updatedata.description = description;
       }
       if(price){
        updatedata.price = price;
       }
       if(category){
        updatedata.category = category;
       }
       if(countinstock){
        updatedata.countinstock = countinstock;
       }
       if(image){
        updatedata.image = image;
       }

       const updated = await Product.findByIdAndUpdate(id,updatedata,{new: true})
       res.status(201).json(updated);
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
})

router.delete("/products/:id", protect, isadmin, async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({message: "product deleted"})
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
})


router.get("/orders", protect,  async(req,res) => {
    try {
        let orders;
        if(req.user.isadmin){
            orders = await Order.find({user: req.user._id}).populate("items.product", "name price");
        } else{
            orders = await Order.find({user: req.user._id}).populate("items.product", "name price")
        }
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({message: "server error",error})
    }
   
});

router.post("/orders", protect,  async (req,res) => {
    try {
        const {items, totalprice, shippingaddress, paymentmethod} = req.body;

        const order = new Order({
            user: req.user._id,
            items,
            totalprice,
            shippingaddress,
            paymentmethod
        })

        const createorder = await order.save();
        res.status(201).json(createorder);
    } catch (error) {
        res.status(500).json({message: "error creating order",error})
        console.log(error);
    }
});


router.get("/orders/:id", protect, async (req,res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")

        if(!order){
            res.status(404).json({message:"order not found",error})
        }

        res.json(order);
    } catch (error) {
       res.status(500).json({messgae: "error fetching order",error})   
    }
})


router.put("/orders/:id", protect, isadmin, async(req,res) => {
    try {
        const order = await Order.findById(req.params.id);
       if(!order){
        return   res.status(404).json({message:"order not found"})
       }

       order.status = req.body.status || order.status;
       const updatedorder = await order.save();
       res.json(updatedorder);
    } catch (error) {
        res.status(500).json({message: "server error",error})
    }
})


router.delete("/orders/:id", protect,isadmin,async (req,res) => {
    try {
      
        const order = await Order.findByIdAndDelete(req.params.id)
          res.json({message:"order deleted successfully"})
    } catch (error) {
        res.status(500).json({message: " error deleting order",error})
    }
})


module.exports = router;