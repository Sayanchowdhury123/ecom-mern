const express = require("express");
const Product = require("../models/product");
const {protect} = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", async(req,res) => {
try{
    const products = await Product.find();
    res.json(products)
} catch(error){
    res.status(500).json({message: "server error"})
}


});

router.get("/searching", async (req,res) => {
    try {
        

        
        const products = await Product.find({
            name: { $regex: req.query.q , $options: "i"}
        });
        res.json(products)
    } catch (error) {
        res.status(500).json({message: "error searching products", error})
    }
})


router.get("/:id", async(req,res) => {
    try {
        
        const product = await Product.findById(req.params.id)
        if(product){
            res.json(product);
        } else{
            res.status(404).json({message: "product not found"})
        }
   
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
});

router.get("/:id/related", async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"product not found"})
        }

        const relatedproduct = await Product.find({
            category: product.category,
            _id: {$ne: product._id}
        }).limit(4);

        res.json(relatedproduct);

    } catch (error) {
        res.status(500).json({message:"error fetching related products ", error})
    }
})

router.post("/reviews/:id",protect ,async(req,res) => {
    try {
        const {rating, comment} = req.body;

        const product = await Product.findById(req.params.id);
      

        
    
        if(product){
            const review = {
                user: req.user._id,
                rating: Number(rating),
                comment,
                name: req.user.name
            }

            if(!product.reviews){
                product.reviews = [];
            }
        
            product.reviews.push(review);
        
            product.numreviews = product.reviews.length;
        
            product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.numreviews;
        
            await product.save();
    
            res.status(201).json({message:"review added"})
        } else{
            res.status(404).json({message:"product not found"})
        }
    } catch (error) {
        res.status(500).json({message: "server error"})
        console.log(error);
    }
 
});


router.put("/:id/reviews/:reviewid", protect, async(req,res) => {
    try {
        const {rating, comment} = req.body;
        const product = await Product.findById(req.params.id);
        if(product){
            const review = product.reviews.find((r) => r._id.toString() === req.params.reviewid);
            if(!review){
                return res.status(404).json({message: "review not found"})
            }

            review.comment = comment || review.comment;
            review.rating = rating || review.rating;
            review.updatedAt = Date.now();

            product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length;
           
            await product.save();
            res.status(201).json({message:"review updated"})
        }else{
            res.status(404).json({message:"product not found"})
        }
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
})



router.delete("/:id/reviews/:reviewid", protect, async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            const review = product.reviews.find((r) => r._id.toString() === req.params.reviewid);
            if(!review){
                return res.status(404).json({message: "review not found"})
            }

            product.reviews = product.reviews.filter((rev) => rev._id.toString() !== req.params.reviewid)
            
            product.numreviews = product.reviews.length;
            product.rating = product.numreviews > 0 ?   product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.numreviews : 0;
            await product.save();
            res.status(201).json({message:"review deleted"})
        }else{
            res.status(404).json({message:"product not found"})
        }
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
})

module.exports = router;
