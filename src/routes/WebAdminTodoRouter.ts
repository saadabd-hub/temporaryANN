import Router from "express";
import WebAdminController from "../controllers/WebAdminController";
<<<<<<< HEAD
=======
import authentication from "../middlewares/authentication";
>>>>>>> 226e86c
import authorization from "../middlewares/authorization";

const router = Router();

router.put(
<<<<<<< HEAD
  "/assign/:id",
  authorization.webAdmin,
  WebAdminController.assignHeadofSubdistrict
=======
    "/assign", authentication, authorization.allowifloggedin, authorization.grantacsess("updateOwn", "assign"),
    WebAdminController.assign
>>>>>>> 226e86c
);

export default router;
