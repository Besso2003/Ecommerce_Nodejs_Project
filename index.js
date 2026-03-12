import express from "express";
import { dbConnect } from "./Database/dbconnect.js";
import userRouter from "./Routes/User.Routes.js";
import adminRouter from "./Routes/Admin.Routes.js";
import categoryRoutes from "./Routes/Category.Routes.js"
import productRoutes  from "./Routes/Product.Routes.js"
import wishlistRouter from "./Routes/Wishlist.Routes.js";
import reviewRouter from "./Routes/Review.Routes.js";
import paymentRouter from "./Routes/Payment.Routes.js";
import cartRouter from "./Routes/Cart.Routers.js"

const app = express();

dbConnect();
// userModel; // this is for create the table  //you can remove it cause you call it in controller
app.use(express.json()) // this for req.body 
app.use(userRouter)
app.use(adminRouter)
app.use(wishlistRouter)
app.use(reviewRouter)
app.use(cartRouter)

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRouter);


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
