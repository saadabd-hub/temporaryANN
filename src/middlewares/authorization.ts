import User from "../models/UserModel";

class authorization {
  static unregisteredParticipant(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          if (user._id.toString() === req._id) {
            if (user.role === 4) {
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
