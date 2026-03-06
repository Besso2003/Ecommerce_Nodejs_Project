import express from "express";
import { dbConnect } from "./Database/dbconnect.js";
import userModel from "./Models/UserModel.js";

const app = express();

dbConnect();
userModel; // this is for create the table  //you can remove it cause you call it in controller

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})