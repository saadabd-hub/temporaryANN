import Router from "express";
import WebAdminController from "../controllers/WebAdminController";
import authentication from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

const router = Router();

router.put(
    "/assign", authentication, authorization.allowifloggedin, authorization.grantacsess("updateOwn", "assign"),
    WebAdminController.assign
);

export default router;
