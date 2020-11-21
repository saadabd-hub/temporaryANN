import Router from "express";
import userController from "../controllers/UserController";
import multer from "multer";
import pagination from "../middlewares/pagination";
import SMTPemail from "../middlewares/nodemailer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post(
  "/signup",
  upload.single("picture"),
  userController.signup,
  SMTPemail._idActivation
);

router.post("/activate", userController.activate);

// router.post("/signup", upload.single("picture"), userController.signup);

router.post("/signin", userController.signin);

// router.post("/test", SMTPemail.helloEmail);

export default router;
