import Router from "express";
import UnregisteredUserTodo from "../controllers/UnregisteredController";
import authorization from "../middlewares/authorization";
import CommitteeController from "../controllers/CommitteeController";
import authentication from "../middlewares/authentication";
const router = Router();

router.post(
  "/createRules", authentication,
  authorization.allowifloggedin, authorization.grantacsess("create", "rules"),
  CommitteeController.createRules
);

router.post(
  "/createGame",
  authentication,
  authorization.allowifloggedin, authorization.grantacsess("create", "rules"),
  CommitteeController.createTournament
);

router.put(
  "/approve/:id",
  // authorization.committee,
  CommitteeController.approveSubmission
);

export default router;
