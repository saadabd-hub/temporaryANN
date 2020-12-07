import { AccessControl } from "accesscontrol"
const ac = new AccessControl

const roles = (function () {
    ac.grant("user")
        .readOwn("profile")
        .createOwn("profile")
        .updateOwn("profile")
        .createOwn("submit", "user")

    ac.grant("participant")
        .readOwn("profile")
        .createOwn("profile")
        .updateOwn("profile")

    ac.grant("comittee")
        .readOwn("profile")
        .createOwn("profile")
        .updateOwn("profile")
        .readAny("profile")
        .create("rules")
        .updateOwn("assignpart")

    ac.grant("headchief")
        .readOwn("profile")
        .createOwn("profile")
        .updateOwn("profile")
        .updateOwn("assigncom")

    ac.grant("admin")
        .readOwn("profile")
        .createOwn("profile")
        .updateOwn("profile")
        .updateAny("assign")

    return ac;
})();

export default roles