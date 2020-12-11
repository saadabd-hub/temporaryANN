import Router from "express";
import userRouter from "./user";
import UnregisteredRouter from "./UnregisteredRoutes";
import errorHandler from "../middlewares/errorHandler";
import WebAdminRouter from "./WebAdminTodoRouter";
import CommitteeRouter from "./CommitteeRoutes";
import TournamentRouter from "./TournamentRoutes";
import ProfileRouter from "./profile";
import headchiefrouter from "./HeadofSubdistrictRoutes";
import authentication from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

const router = Router();

router.get("/home", (req, res) => {
  res.send("Welcome to ANN cup");
});

router.use("", TournamentRouter);
router.use("/user", userRouter);
router.use(authentication);
router.use("/user", UnregisteredRouter);
router.use("/user", ProfileRouter);
router.use("/comittee", CommitteeRouter);
router.use("/admin", WebAdminRouter);
router.use("/chief", headchiefrouter);

router.use(errorHandler);

export default router;
