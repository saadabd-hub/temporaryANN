import Router from "express";
import userController from "../controllers/UserController";
import pagination from "../middlewares/pagination";
import SMTPemail from "../middlewares/nodemailer";
import upload from "../helper/multer";
import authentication from "../middlewares/authentication";

const router = Router();



router.post(
  "/signup",
  upload.single("picture"),
  userController.signup,
  SMTPemail._idActivation,
  userController.temporarySignup
);

router.post(
  "/signin",
  userController.login,
  userController.proceed_signin,
  // userController.signedin
);

router.get("/user", authentication, userController.allowifloggedin, userController.grantacsess('readAny', 'profile'), userController.getUsers)

export default router;
