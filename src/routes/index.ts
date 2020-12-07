import Router from "express";
import userRouter from "./user";
import UnregisteredRouter from "./UnregisteredRoutes";
import authentication from "../middlewares/authentication";
import errorHandler from "../middlewares/errorHandler";
import authorization from "../middlewares/authorization";
import WebAdminRouter from "./WebAdminTodoRouter";
import CommitteeRouter from "./CommitteeRoutes";
import TournamentRouter from "./TournamentRoutes";
import ProfileRouter from "./profile"


const router = Router();

router.get("/home", (req, res) => {
  res.send("Welcome to ANN cup");
});

router.use("", TournamentRouter);
router.use("/user", userRouter);
router.use("/user", UnregisteredRouter);
router.use("/user", ProfileRouter);
router.use("/com", CommitteeRouter);
router.use("/admin", WebAdminRouter);

router.use(errorHandler);

export default router;
