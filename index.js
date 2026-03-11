import express from "express";
import { dbConnect } from "./Database/dbconnect.js";
import userRouter from "./Routes/User.Routes.js";
import adminRouter from "./Routes/Admin.Routes.js";
import categoryRoutes from "./Routes/Category.Routes.js"
import productRoutes  from "./Routes/Product.Routes.js"

const app = express();

dbConnect();
// userModel; // this is for create the table  //you can remove it cause you call it in controller
app.use(express.json()) // this for req.body 
app.use(userRouter)
app.use(adminRouter)

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
