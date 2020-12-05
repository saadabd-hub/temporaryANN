import Router from "express";
import UnregisteredController from "../controllers/UnregisteredController";
import authorization from "../middlewares/authorization";

const router = Router();

router.post(
  "/submit/:id",
  authorization.unregistered,
  UnregisteredController.SubmitTournament,
  UnregisteredController.sendSubmission
);

router.get("/inboxNotifications/:id", UnregisteredController.notifications);

router.get("/inbox/:id", UnregisteredController.SeeInbox);

export default router;
