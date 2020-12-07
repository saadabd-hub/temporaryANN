import Router from "express";
import authentication from "../middlewares/authentication";

import authorization from "../middlewares/authorization";

const router = Router();

router.put(
  "/assign", authentication, authorization.allowifloggedin, authorization.grantacsess("updateOwn", "assigncom")
);

export default router;
