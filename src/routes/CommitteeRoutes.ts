import Router from "express";
import UnregisteredUserTodo from "../controllers/UnregisteredController";
import authorization from "../middlewares/authorization";
import CommitteeController from "../controllers/CommitteeController";
import authentication from "../middlewares/authentication";
const router = Router();

router.post(
  "/createRules/:id",
  authorization.comittee,
  CommitteeController.createRules
);

router.post(
  "/createGame/:id",
  authorization.comittee,
  CommitteeController.createTournament
);

router.put(
  "/approve/:id",
  authorization.comittee,
  CommitteeController.approveSubmission
);

router.put(
  "/approveGroup/:id",
  authorization.comittee,
  CommitteeController.approveGroup
);

router.put(
  "/kickParticipant/:id",
  authorization.comittee,
  CommitteeController.kickParticipant
);

router.put(
  "/kickGroup/:id",
  authorization.comittee,
  CommitteeController.kickGroup
);

router.put(
  "/kickGroup/:id",
  authorization.comittee,
  CommitteeController.approveGroup
);

router.get(
  "/seeList/:id",
  authorization.comittee,
  CommitteeController.seeParticipantList
);

router.put("/startFreeForAll/:id");

router.put(
  "/shuffle/:id",
  authorization.comittee,
  CommitteeController.shufflingParticipantList
);

router.put(
  "/branches/:id",
  authorization.comittee,
  CommitteeController.shufflingBranchesList
);

router.put(
  "/proceedBranches/:id",
  authorization.comittee,
  CommitteeController.proceedBranchesTournament
);

export default router;
