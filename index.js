import express from "express";
import { dbConnect } from "./Database/dbconnect.js";
import userRouter from "./Routes/User.Routes.js";
import adminRouter from "./Routes/Admin.Routes.js";
import categoryRoutes from "./Routes/Category.Routes.js";
import productRoutes from "./Routes/Product.Routes.js";
import wishlistRouter from "./Routes/Wishlist.Routes.js";
import reviewRouter from "./Routes/Review.Routes.js";
import paymentRouter from "./Routes/Payment.Routes.js";
import cartRouter from "./Routes/Cart.Routers.js";
import orderRouter from "./Routes/Order.Routers.js";
import webhookRouter from "./Routes/webhookRoutes.js";

const app = express();
dbConnect();

// --------------------- Stripe Webhook ---------------------
// Mount webhook route BEFORE express.json()
// It uses express.raw() inside webhookRouter
app.use("/api", webhookRouter);

// --------------------- JSON Middleware ---------------------
app.use(express.json()); // for all other routes

// --------------------- Routers ---------------------
app.use(userRouter);
app.use(adminRouter);
app.use(wishlistRouter);
app.use(reviewRouter);
app.use(cartRouter);
app.use(orderRouter);

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/payment", paymentRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});