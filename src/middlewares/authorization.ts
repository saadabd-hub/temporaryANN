import roles from "../helper/roles";
import User from "../models/UserModel";

class authorization {
<<<<<<< HEAD
  static unregisteredParticipant(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          if (user._id.toString() === req._id) {
            if (user.role <= 5 && user.role != 0) {
              next();
            } else
              throw {
                name: "FORBIDDEN",
              };
          } else
            throw {
              name: "FORBIDDEN",
            };
        } else
          throw {
            name: "NOT_FOUND",
          };
      })
      .catch(next);
  }

  static participant(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          if (user._id.toString() === req._id) {
            if (user.role <= 4 && user.role != 0) {
              next();
            } else
              throw {
                name: "FORBIDDEN",
              };
          } else
            throw {
              name: "FORBIDDEN",
            };
        } else
          throw {
            name: "NOT_FOUND",
          };
      })
      .catch(next);
  }

  static committee(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          if (user._id.toString() === req._id) {
            if (user.role <= 3 && user.role != 0) {
              next();
            } else
              throw {
                name: "FORBIDDEN",
              };
          } else
            throw {
              name: "FORBIDDEN",
            };
        } else
          throw {
            name: "NOT_FOUND",
          };
      })
      .catch(next);
  }

  static headofSubdistrict(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          if (user._id.toString() === req._id) {
            if (user.role <= 2 && user.role != 0) {
              next();
            } else
              throw {
                name: "FORBIDDEN",
              };
          } else
            throw {
              name: "FORBIDDEN",
            };
        } else
          throw {
            name: "NOT_FOUND",
          };
      })
      .catch(next);
  }

  static webAdmin(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          if (user._id.toString() === req._id) {
            if (user.role <= 1 && user.role != 0) {
              next();
            } else
              throw {
                name: "FORBIDDEN",
              };
          } else
            throw {
              name: "FORBIDDEN",
            };
        } else
          throw {
            name: "NOT_FOUND",
          };
      })
      .catch(next);
=======
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
>>>>>>> 226e86c
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
