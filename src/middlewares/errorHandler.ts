const errorHandling = (err, req, res, next) => {
  let code: number;
  let name: string = err.name;
  let message: string;

  switch (name) {
    case "ALREADY_EXIST":
      code = 409;
      message = "Either Username or Email already exist";
      break;
    case "ALREADY_SUBMITTED":
      code = 409;
      message =
        "You already submitted to this tournament, please wait for further announcement";
      break;
    case "ALREADY_PARTICIPATED":
      code = 409;
      message = "This user is already a participant of another game";
      break;
    case "TOURNAMENT_EXIST":
      code = 409;
      message = "Tournament already exist";
      break;
    case "RULES_EXIST":
      code = 409;
      message = "Rules already exist";
      break;
    case "RULES_NOT_FOUND":
      code = 409;
      message = "Rules not found";
      break;
    case "TOURNAMENT_NOT_FOUND":
      code = 409;
      message = "Tournament not found";
      break;
    case "EMAIL_EXIST":
      code = 409;
      message = "Email already exist";
      break;
    case "USERNAME_EXIST":
      code = 409;
      message = "Username already exist";
      break;
    case "PROFILE_EXIST":
      code = 409;
      message = "Phone Number already exist";
      break;
    case "GROUP_NEEDED":
      code = 409;
      message = "Must be enter as a group to this tournament";
      break;
    case "INDIVIDUAL_NEEDED":
      code = 409;
      message = "Must be enter as an individual to this tournament";
      break;
    case "ALREADY_ASSIGNED":
      code = 409;
      message = "This user already assigned with such role";
      break;
    case "CODE_NOT_RECOGNIZE":
      code = 400;
      message = "Verifying code is expired or false";
      break;
    case "MONGOOSE_ERROR":
      code = 500;
      message = "mongoose error";
      break;
    case "PROFILE_ADD":
      code = 401;
      message = "Profile already created ";
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
      message = "Either Username or Email or Password combination not found";
      break;
    case "REQUIREMENT_NOT_MET":
      code = 404;
      message = "This user doesn't met the requirement";
      break;
    case "BANNED":
      code = 404;
      message = "this account is suspended";
      break;
    case "ADMIN_ONLY":
      code = 404;
      message = "Are you trying to break in";
      break;
    case "TIME_ERR":
      code = 404;
      message = "Time logic error please check the date";
      break;
    case "NOT_AUTHORIZE":
      code = 404;
      message = `This user don't have authorization for such task`;
      break;
    case "LIMIT_REACHED":
      code = 404;
      message = `Exceed max player limit`;
      break;
    case "USER_NOT_FOUND":
      code = 404;
      message = "This user does not exist";
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

export default errorHandling;
