import { Router } from "express"
import { orderPlacement,getOrders,deleteOrder,getOrderByStatus,updateOrderStatus } from "../Controller/Order.Controller.js" 
import validateToken from "../MiddleWare/validateToken.js";
const router = Router(); 

router.use(validateToken)
router.get("/orders", getOrders);
router.get("/getbystatus/:status", getOrderByStatus);
router.post("/placeorder", orderPlacement);
router.delete("/deleteorder/:orderId", deleteOrder);
router.put("/updateorderstatus", updateOrderStatus);

export default router; 