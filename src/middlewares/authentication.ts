import jwt from "jsonwebtoken";
<<<<<<< HEAD
require("dotenv").config();

export default (req, res, next) => {
  const { access_token } = req.headers;

  if (access_token) {
    var JWT_Accesstoken: any = process.env.JWT_Accesstoken;
    jwt.verify(access_token, JWT_Accesstoken, (err, decoded) => {
      if (err) next({ name: "INVALID_TOKEN" });
      else {
        req._id = decoded._id;
        next();
=======
import User from "../models/UserModel";
require("dotenv").config();

const authentication = async (req, res, next) => {
  const access_token = req.headers['x-access-token'] || req.headers['authorization'];
  if (access_token.startsWith('Bearer')) {
    try {

      const bearer = access_token.replace('Bearer ', '')
      const secret_key: any = process.env.JWT_Accesstoken
      const _id = await jwt.verify(bearer, secret_key);
      var exp
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
>>>>>>> 226e86c
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