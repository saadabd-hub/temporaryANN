import Router from "express";
import userRouter from "./user";
import authentication from "../middlewares/authentication";
import errorHandler from "../middlewares/errorHandler";

const router = Router();

router.use("/user", userRouter);
router.use(authentication);
router.use(errorHandler);

export default router;
