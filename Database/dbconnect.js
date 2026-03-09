import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// export const dbConnect = mongoose.connect("mongodb+srv://youssef11gaber10_db_user:<db_password>@cluster0.scks23e.mongodb.net/?appName=E-commerceAPP")
// .then(() => {
//     console.log("Database Connected");
// }).catch((err) => {
//     console.log(err);
// })


export const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.CONNECTION_STRING_MAIN 
    );

    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
