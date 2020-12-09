import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("Join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  // console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("Join", { pageTitle: "Join" });
  } else {
    //  to do : register user
    try {
      const user = await User({
        // User just create, User.create create & store in db
        name,
        email,
      });
      await User.register(user, password);
      next(); // check the globalRouter for next step(=postLogin)
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }

    //  to do : log user in
  }
};
export const getLogin = (req, res) => res.render("Login", { pageTitle: "login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});
export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("Users", { pageTitle: "Users" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });
