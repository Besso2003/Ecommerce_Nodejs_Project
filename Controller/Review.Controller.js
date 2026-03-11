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

export {reviewProduct}
