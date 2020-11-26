import Router from "express";
import userRouter from "./user";
import UnregisteredUserTodoRouter from "./UnregisteredUserTodo";
import authentication from "../middlewares/authentication";
import errorHandler from "../middlewares/errorHandler";

const router = Router();

router.get("/", (req, res) => {
  res.render("contact");
});

router.use("/user", userRouter);

router.use("/user", UnregisteredUserTodoRouter);
router.use(errorHandler);

export default router;
