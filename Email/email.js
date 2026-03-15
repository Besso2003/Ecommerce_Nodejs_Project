import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import { template } from "./emailTemplate.js";

// export async function sendEmail(email ) {

// const transporter = nodemailer.createTransport({
// service: "Gmail",
//   auth: {
//     user: "youssef11gaber10@gmail.com",//email sender
//     pass: "hjtl zolc rqyw yzmj",
//   },
// });

// // i will token email to not appear in url 

// const tokenedEmail = jwt.sign(email, "secret")

//   const info = await transporter.sendMail({

//     from: '"ecommerce app" <youssef11gaber10@gmail.com>',
//     to: email, //get from body  
//     subject: "Confirm your account",
//     html: template(tokenedEmail) , // HTML version of the message
//   });

//   console.log("Message sent:", info.messageId);

// }

export async function sendEmail(email, subject, htmlTemplate) {

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "youssef11gaber10@gmail.com",
            pass: "hjtl zolc rqyw yzmj",
        },
    });

    const info = await transporter.sendMail({
        from: '"ecommerce app" <youssef11gaber10@gmail.com>',
        to: email,
        subject: subject,
        html: htmlTemplate,
    });

    console.log("Message sent:", info.messageId);
}