import Product from "../Models/Product.Model.js"
import reviewModel from "../Models/ReviewModel.js"


let reviewProduct = async(req,res)=>{
    // i want check if the user is customer so throw token  ,check if the product exist from req.body.productID
    // then call model of review and add the review with id of the user from token and product id from body 

    if(req.decoded_token.role != "customer")
        return res.status(400).json({ message: "only customer can add review to product" })
    let product = await Product.findById(req.body.productID)

    if (!product)
        return res.status(400).json({ message: "product not found" })
    
    req.body.userID = req.decoded_token.id
    let review
    try{

        review = await  reviewModel.insertOne(req.body)

    } 
    catch(err){
        if ( err.code == 11000)
            return res.status(400).json({ message: "you have already reviewed this product" })
        //any thing else create error
        return res.status(400).json({ message: "review not added" })

    }


    res.json({ message: "review added successfully", data: review })

}

let updateReview = async(req,res)=>{
    // i want check if the user is customer so throw token  ,check if the product exist from req.body.productID
    // then call model of review and add the review with id of the user from token and product id from body 

    if(req.decoded_token.role != "customer")
        return res.status(400).json({ message: "only customer can add review to product" })
    let product = await Product.findById(req.body.productID)

    if (!product)
        return res.status(400).json({ message: "product not found" })
    
    req.body.userID = req.decoded_token.id
    let review = await  reviewModel.findOneAndUpdate({userID: req.decoded_token.id,productID: req.body.productID},req.body,{upsert: true,returnDocument: 'after'})

    if(!review)
        return res.status(400).json({ message: "review not added" })

    res.json({ message: "review updated successfully", data: review })

}



let deleteReview = async(req,res)=>{
    // i want check if the user is customer so throw token  ,check if the product exist from req.body.productID
    // then call model of review and add the review with id of the user from token and product id from body 

    if(req.decoded_token.role != "customer")
        return res.status(400).json({ message: "only customer can add review to product" })
    let product = await Product.findById(req.body.productID)

    if (!product)
        return res.status(400).json({ message: "product not found" })
    
    req.body.userID = req.decoded_token.id


    let review = await  reviewModel.findOneAndDelete({userID: req.decoded_token.id,productID: req.body.productID})

    // console.log(review);
    if(!review)
        return res.status(400).json({ message: "review not exists" })

    res.json({ message: "review deleted successfully", data: review })

}

let getProductReview = async(req,res)=>{
    // all users can use this function check if the products exist from req.body.productID
    //then call for review model and gets all reviews of that product

    let product = await Product.findById(req.body.productID)
    if (!product)
        return res.status(400).json({ message: "product not found" })

    let review = await  reviewModel.find({productID: req.body.productID}).populate("userID","name")
    res.json({ message: "reviews of this product", data: review })
}


export {reviewProduct,updateReview,deleteReview,getProductReview}
