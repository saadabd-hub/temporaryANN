import Router from "express";
import userRouter from "./user";
import UnregisteredRouter from "./UnregisteredRoutes";
import authentication from "../middlewares/authentication";
import errorHandler from "../middlewares/errorHandler";
import authorization from "../middlewares/authorization";
import WebAdminRouter from "./WebAdminTodoRouter";
<<<<<<< HEAD
const router = Router();

router.get("/", (req, res) => {
=======
import CommitteeRouter from "./CommitteeRoutes";
import TournamentRouter from "./TournamentRoutes";
import ProfileRouter from "./profile"


const router = Router();

router.get("/home", (req, res) => {
>>>>>>> 226e86c
  res.send("Welcome to ANN cup");
});

router.use("", TournamentRouter);
router.use("/user", userRouter);
<<<<<<< HEAD
router.use(authentication);
router.use("/user", UnregisteredUserTodoRouter);

=======
router.use("/user", UnregisteredRouter);
router.use("/user", ProfileRouter);
router.use("/com", CommitteeRouter);
>>>>>>> 226e86c
router.use("/admin", WebAdminRouter);

router.use(errorHandler);

export default router;
