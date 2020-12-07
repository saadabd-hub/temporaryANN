import Router from "express";
import UnregisteredController from "../controllers/UnregisteredController";
import authentication from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

const router = Router();

router.post(
  "/submit/:id",
  authentication, authorization.allowifloggedin, authorization.grantacsess("createOwn", "submit"),
  UnregisteredController.SubmitTournament,
  UnregisteredController.sendSubmission
);

router.get("/inboxNotifications/:id", UnregisteredController.notifications);

router.get("/inbox/:id", UnregisteredController.SeeInbox);

export default router;
