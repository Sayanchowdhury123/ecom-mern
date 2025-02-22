const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userroutes = require("./routes/userroutes");
const productroutes = require("./routes/productroutes");
const adminroutes = require("./routes/adminroutes");
const cartroutes = require("./routes/cartroutes")
const path = require("path");


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));
app.use(express.urlencoded({extended:true}));
app.use("/uploads", express.static(path.join(__dirname,"uploads")));


app.use("/api/users", userroutes);
app.use("/api/products", productroutes);
app.use("/api/admin", adminroutes);
app.use("/api/cart", cartroutes)

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log("error",err));

app.get("/", (req,res) => {
    res.send("e-commerce api running")
})

const PORT = process.env.PORT;
app.listen(PORT,() =>{
    console.log(`server is running`)
})