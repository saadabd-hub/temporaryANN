import Router from "express";
import UnregisteredUserTodo from "../controllers/UnregisteredUsertodoController";
import authorization from "../middlewares/authorization";

const router = Router();

router.get(
  "/profile/:id",
  authorization.unregisteredParticipant,
  UnregisteredUserTodo.seeProfile
);

router.put(
  "/profile/:id",
  authorization.unregisteredParticipant,
  UnregisteredUserTodo.changeProfile
);

router.get(
  "/inbox/:id",
  authorization.unregisteredParticipant,
  UnregisteredUserTodo.seeInbox
);

router.get("/testing/:id", (req, res, next) => {
  console.log("test a test");
});

export default router;
