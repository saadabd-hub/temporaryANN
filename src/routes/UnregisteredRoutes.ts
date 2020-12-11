import Router from "express";
import UnregisteredController from "../controllers/UnregisteredController";
import UserController from "../controllers/UserController";
import authentication from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

const router = Router();

// router.post(
//   "/submit/:id",
//   authentication, authorization.allowifloggedin, authorization.grantacsess("createOwn", "submit"),
//   UnregisteredController.SubmitTournament,
//   UnregisteredController.sendSubmission
// )
router.post(
  "/submit/:id",
  authorization.user,
  UnregisteredController.SubmitTournament,
  UnregisteredController.sendSubmission
);

router.post(
  "/submitGroup/:id",
  authorization.user,
  UnregisteredController.SubmitTournamentAsGroup,
  UnregisteredController.sendSubmission
);

router.get(
  "/inboxNotifications/:id",
  authorization.user,
  UnregisteredController.notifications
);

router.get("/inbox/:id", authorization.user, UnregisteredController.SeeInbox);

router.post(
  "/createGroup/:id",
  authorization.user,
  UnregisteredController.createGroup
);

export default router;
