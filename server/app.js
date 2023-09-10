const express = require("express");
const app = express();
const cors = require("cors");
const { pseudoRandomBytes } = require("crypto");
const stripe = require("stripe")("sk_test_51Nnzd0SFIAKZeCgTARmB1PyzIxZat1QJTL7c7qozNVM3EB2tANl8gsrf6KN0ldUTlPh9gSomuBKPXP1ATscZx0ci002TyOjeIj")

app.use(express.json());
app.use(cors());

app.post("/api/create-checkout-session", async(req, res)=>{
    const {products} = req.body;
    console.log(products)

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.title
            },
            unit_amount:product.price *100, 
        },
        quantity: product.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000",
        cancel_url:"http://localhost:3000/cancel",
    });
    res.json({id:session.id})
})

app.listen(7000, () => {
    console.log("server start")
})