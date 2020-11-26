import jwt from "jsonwebtoken";
import envConfig from "../env.config";
import User from "../models/UserModel";

const authentication = async (req, res, next) => {
  const access_token = req.headers['x-access-token'] || req.headers['authorization'];
  if (access_token.startsWith('Bearer')) {
    try {
     
      const bearer = access_token.replace('Bearer ', '')
      const secret_key: any = process.env.JWT_SECRET
      const _id = await jwt.verify(bearer, secret_key);
      console.log("asdasd", _id)
      var exp
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
      }
      const user = await User.findById(_id);
      res.locals.loggedInUser = user
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};
export default authentication