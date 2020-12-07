import Router from "express";
import userController from "../controllers/UserController";
import pagination from "../middlewares/pagination";
import SMTPemail from "../middlewares/nodemailer";
import upload from "../helper/multer";
import authentication from "../middlewares/authentication";


const router = Router();

router.post("/signup", userController.Signup, SMTPemail._idActivation);

router.post("/signin", userController.signin, userController.proceed_signin);

router.put("/forget", userController.forgotPassword, SMTPemail.forgotPassword);

router.put("/reset", userController.resetPassword)

export default router;
