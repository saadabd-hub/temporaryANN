import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import env from "../env.config";
import jwt from "jsonwebtoken";


class SMTPemail {
  static _idActivation(req, res, next) {
    dotenv.config();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.Email,
        pass: env.Password,
      },
    });

    // const token = jwt.sign(
    //   {
    //     username: req.bodyusername,
    //     email: req.body.email,
    //     phoneNumber: req.body.phoneNumber,
    //     password: req.body.password,
    //     birthDate: req.body.birthDate,
    //     fullname: req.body.fullname,
    //     subdistrict: req.body.subdistrict,
    //     tournament: req.body.tournament,
    //     role: req.body.role,
    //     picture: req.file.path,
    //   },
    //   env.JWT_Activate,
    //   {
    //     expiresIn: "10m",
    //   }
    // );
    // function token(min, max) {
    //   min = Math.ceil(1000);
    //   max = Math.floor(2000);
    //   return Math.floor(Math.random() * (max - min + 1) + min);
    // }
    const token = Math.floor(Math.random() * 2000) + 1000


    let mailOptions = {
      from: env.Email,
      to: req.body.email,
      subject: "Account Activation for ANN cup",
      html: `
        <div class="area" style="background-color: rgb(27, 27, 27); padding: 2em 0 2em 0;">
        <div class="container" >
            <img src="/Back-end/images/Game-Online-PUBG-Banner.jpg" style="width:100%;" alt="">
            <div class="container2" style="margin: 2em;">
                <h2 style="color: rgb(255, 255, 255); ">We on behalf of ANN CUP welcome you to participate the biggest tournament in Indonesia</h2>
                <p style="color: rgb(255, 255, 255);">Come on proud youth generation of Indonesia, be brave to compete and claim your throne, <strong> to validate your sign up please copy on given link to activate your account:</strong></p>
                <div style="background-color:red; width:5em;"><h3 style="color:cyan;">${token}</h3></div>
            </div>
        </div>
    </div>
      `,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.json({ Error: err });
      } else next();
    });
  }
}

export default SMTPemail;
