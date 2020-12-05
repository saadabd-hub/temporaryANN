import Router from "express";
import userController from "../controllers/UserController";
import pagination from "../middlewares/pagination";
import SMTPemail from "../middlewares/nodemailer";
import upload from "../helper/multer";
import authentication from "../middlewares/authentication";

const router = Router();

router.post("/signup", userController.signup, userController.init);

router.post("/signin", userController.signin);

export default router;
