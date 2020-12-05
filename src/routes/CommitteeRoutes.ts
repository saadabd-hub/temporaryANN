import Router from "express";
import UnregisteredUserTodo from "../controllers/UnregisteredController";
import authorization from "../middlewares/authorization";
import CommitteeController from "../controllers/CommitteeController";
const router = Router();

router.post(
  "/createRules/:id",
  authorization.committee,
  CommitteeController.createRules
);

router.post(
  "/createGame/:id",
  authorization.committee,
  CommitteeController.createTournament
);

router.put(
  "/approve/:id",
  authorization.committee,
  CommitteeController.approveSubmission
);

export default router;
