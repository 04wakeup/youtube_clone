import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "Password doesn't match"); // use flash() to show the messages
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome", // use flash()
  failureFlash: "Can't log in",
});
// GitHub Login
// 1. Sends User to Github
export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome", // use flash()
  failureFlash: "Can't log in",
});

// 2. Check the user at Github
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
// 3. Authentication Success & Redirect
export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

// Facebook Login
// 1. Sends user to FB, this calls >>> passport.js which calls  >>> 2(below)  >>> globalRouter >>> 3. Success & Redirect
export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome", // use flash()
  failureFlash: "Can't log in",
});

// 2. Check the user at FB
export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};
// 3. Authentication Success & Redirect
export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Logged Out");
  req.logout();
  res.redirect(routes.home);
};

// => res.render("userDetail", { pageTitle: "User Detail", user: req.user }); // current logged user
export const getMe = async (req, res) => {
  const {
    user: { id }, // it's different from direct access with userDetila
  } = req;
  console.log(">>>", id, "<<<<");
  try {
    const user = await User.findById({ id }).populate("videos"); // (id) is well also
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const userDetail = async (req, res) => {
  const {
    params: { id }, // it's different from getME!
  } = req;
  try {
    console.log("000000000");
    const user = await User.findById({ _id: id }); // .populate("videos"); // (id) is well also
    console.log("11111111", user);
    res.render("userDetail", { pageTitle: "User Detail", user });
    console.log("222222222");
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash("success", "Profile updated.");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile.");
    res.redirect(routes.editProfile);
  }
};
export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords don't match.");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    } else {
      await req.user.changePassword(oldPassword, newPassword); // await or it loos done
      res.redirect(routes.me);
    }
  } catch (error) {
    req.flash("error", "Password can't be changed.");
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
