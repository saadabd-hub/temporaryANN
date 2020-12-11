import Router from "express";
import ProfileController from "../controllers/ProfileController";
import upload from "../helper/multer";
import authentication from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

const router = Router();

// router.post(
//   "/profile/:id",
//   upload.single("picture"),
//   authentication,
//   authorization.allowifloggedin,
//   authorization.grantacsess("createOwn", "profile"),
//   ProfileController.UserProfile
// );

// router.get(
//   "/profile/:id",
//   authentication,
//   ProfileController.seeProfile,
//   authorization.allowifloggedin,
//   authorization.grantacsess("readOwn", "profile")
// );
router.get("/profile/:id", authorization.user, ProfileController.seeProfile);

// router.put(
//   "/profile/:id",
//   authentication,
//   ProfileController.changeProfile,
//   authorization.allowifloggedin,
//   authorization.grantacsess("updateOwn", "profile")
// );
router.put("/profile/:id", authorization.user, ProfileController.changeProfile);

export default router;
