import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    jwt.verify(access_token, "ANNjaya", (err, decoded) => {
      if (err) next({ name: "INVALID_TOKEN" });
      else {
        req._id = decoded._id;
        next();
      }
    });
  } else next({ name: "MISSING_TOKEN" });
};
