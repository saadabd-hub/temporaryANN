import Router from "express";
import userRouter from "./user";
import UnregisteredUserTodoRouter from "./UnregisteredUserTodo";
import authentication from "../middlewares/authentication";
import errorHandler from "../middlewares/errorHandler";
import authorization from "../middlewares/authorization";
import WebAdminRouter from "./WebAdminTodoRouter";
const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to ANN cup");
});

router.use("/user", userRouter);
router.use(authentication);
router.use("/user", UnregisteredUserTodoRouter);

router.use("/admin", WebAdminRouter);

router.use(errorHandler);

export default router;
