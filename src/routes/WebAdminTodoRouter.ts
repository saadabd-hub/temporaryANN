import Router from "express";
import WebAdminController from "../controllers/WebAdminController";
import authorization from "../middlewares/authorization";

const router = Router();

// router.put(
//   "/assign/:id",
//   authorization.webAdmin,
//   WebAdminController.assignHeadofSubdistrict
// );

export default router;
