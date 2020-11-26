import User from "../models/UserModel";

class WebAdminController {
  static assignHeadofSubdistrict(req, res, next) {
    const { userId } = req.body;

    User.findById(userId)
      .then((user) => {
        if (user?.role != 2) {
          const role = 2;
          return User.findByIdAndUpdate(userId, { $set: { role } }).then(
            res.send(`${user?.email}'s role assigned to 2`)
          );
        } else throw { name: "ALREADY_ASSIGNED" };
      })
      .catch(next);
  }
}

export default WebAdminController;
