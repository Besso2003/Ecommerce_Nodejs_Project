import Product from "../Models/Product.Model.js"
import wishlistModel from "../Models/wishlistModel.js"



let addProductToWishlist = async (req, res) => {
    // i will check if the user is customer , so take its token and check its role 
    // if customer call model of wishlist and add the product into it with id of the user from token and product id from params/body 
    if (req.decoded_token.role != "customer")
        return res.status(400).json({ message: "only customer can add product to wishlist" })
    let product = await Product.findById(req.body.productID)
    if (!product)
        return res.status(400).json({ message: "product not found" })

    // want to check if the wish list have that product before don't added it 
    let userwishlist = await wishlistModel.findOne({ userID: req.decoded_token.id })

    if (userwishlist && userwishlist.items.includes(req.body.productID))
        return res.status(400).json({ message: "product already exists in wishlist" })


    let wishlist = await wishlistModel.findOneAndUpdate({ userID: req.decoded_token.id }, { $addToSet: { items: product._id } }, { upsert: true, returnDocument: 'after' })

    if (!wishlist)
        return res.status(400).json({ message: "product not added to wishlist" })

    res.json({ message: "product added to wishlist successfully", data: wishlist },)

}

let deleteProductFromWishlist = async (req, res) => {
    // i will check if the user is customer , so take its token and check its role 
    //check if this real product 
    //delete from wishlist
    if (req.decoded_token.role != "customer")
        return res.status(400).json({ message: "only customer can add product to wishlist" })
    let product = await Product.findById(req.body.productID)
    if (!product)
        return res.status(400).json({ message: "product not found" })

    let userwishlist = await wishlistModel.findOne({ userID: req.decoded_token.id })

    if (userwishlist && !userwishlist.items.includes(req.body.productID))
        return res.status(400).json({ message: "product not exists in Your wishlist" })


    let wishlist = await wishlistModel.findOneAndUpdate({ userID: req.decoded_token.id }, { $pull: { items: product._id } }, { upsert: true, returnDocument: 'after' })

    if (!wishlist)
        return res.status(400).json({ message: "product not deleted from wishlist" })

    res.json({ message: "product deleted from your wishlist successfully", data: wishlist },)
}

let getUserWishlist= async(req,res)=>{
    //i should check if the user is customer , so take its token and check its role 
    //then call model of wishlist and get the wishlist with id of the user from token and populate its items

    if(req.decoded_token.role != "customer")
        return res.status(400).json({ message: "only customer can add product to wishlist" })

    let wishlist=await wishlistModel.findOne({userID: req.decoded_token.id}).populate("items")
    if(!wishlist)
        return res.status(400).json({ message: "no wishlist for this user" })
    res.json({ message: "your wishlist", data: wishlist },)
}

export { addProductToWishlist , deleteProductFromWishlist,getUserWishlist}