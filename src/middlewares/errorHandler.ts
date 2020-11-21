export = (err, req, res, next) => {
  let code: number;
  let name: string = err.name;
  let message: string;

  switch (name) {
    case "ALREADY_EXIST":
      code = 409;
      message = "Either Username, Email, or Phonenumber already exist";
      break;
    case "EXPIRED":
      code = 400;
      message = "Link is expired";
      break;
    case "MONGOOSE_ERROR":
      code = 500;
      message = "mongoose error";
      break;
    case "LOGIN_FAIL":
      code = 401;
      message = "Email or password combination not found";
      break;
    case "MISSING_TOKEN":
      code = 401;
      message = "Missing access token";
      break;
    case "INVALID_TOKEN":
      code = 401;
      message = "Invalid access token";
      break;
    case "NOT_FOUND":
      code = 404;
      message = "Email or Password combination not found";
      break;
    case "BANNED":
      code = 404;
      message = "this account is suspended";
      break;
    case "ADMIN_ONLY":
      code = 404;
      message = "Are you trying to break in";
      break;
    case "NOT_ENOUGH":
      code = 404;
      message = "Out of stock";
      break;
    case "ADDRESS_NOT_FOUND":
      code = 404;
      message = "Address not found";
      break;
    case "FORBIDDEN":
      code = 403;
      message = "No access";
      break;
    case "ALREADY_RENAMED":
      code = 403;
      message = `Already renamed it to your data`;
      break;
    default:
      code = 500;
      message = "Internal server error";
      console.log(err);
      break;
  }
  res.status(code).json({ success: false, message });
};
