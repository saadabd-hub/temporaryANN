import jwt from "jsonwebtoken";
require("dotenv").config();

export default (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    var JWT_Accesstoken: any = process.env.JWT_Accesstoken;
    jwt.verify(access_token, "signin", (err, decoded) => {
      if (err) next({ name: "INVALID_TOKEN" });
      else {
        req._id = decoded._id;
        next();
      }
    });
  } else next({ name: "MISSING_TOKEN" });
};
