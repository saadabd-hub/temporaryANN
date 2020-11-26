import { AccessControl } from "accesscontrol"
const ac = new AccessControl

const roles = (function () {
    ac.grant("user")
        .readOwn("profile")
        .updateOwn("profile")

    ac.grant("Comittee")
        .extend("user")
        .readAny("profile")

    ac.grant("HeadChief")
        .extend("user")
        .extend("Comittee")
        .updateAny("profile")
        .deleteAny("profile")

    ac.grant("admin")
        .extend("user")
        .extend("Comittee")
        .extend("HeadChief")
        .readAny("profile")

    return ac;
})();

export default roles