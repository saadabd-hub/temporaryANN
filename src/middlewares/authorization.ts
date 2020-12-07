import roles from "../helper/roles";
import User from "../models/UserModel";

class authorization {
  static grantacsess(action, resource) {
    return async (req, res, next) => {
      try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action"
          });
        }
        next()
      } catch (error) {
        next(error)
      }
    }
  }
  static async allowifloggedin(req, res, next) {
    try {
      const user = res.locals.loggedInUser;

      if (!user) {
        console.log(user);

        return res.status(401).json({
          error: "You need to be logged in to access this route"
        });
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
}
export default authorization;
