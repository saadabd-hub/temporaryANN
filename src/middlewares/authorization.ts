import User from "../models/UserModel";

class authorization {
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
  }
}

export default authorization;
