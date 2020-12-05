import User from "../models/UserModel";

class authorization {
  static unregistered(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          if (user._id.toString() === req._id) {
            if (user.role === "unregistered") {
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
            if (user.role === "participant") {
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
            if (user.role === "committee") {
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
}

export default authorization;
