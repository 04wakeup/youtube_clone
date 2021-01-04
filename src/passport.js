import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import GitHubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy()); //

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION ? `https://murmuring-hollows-75711.herokuapp.com${routes.githubCallback}` : `http://localhost:4000${routes.githubCallback}`,
      // if you set the callback url on github, above doesn't work.
      // https://murmuring-hollows-75711.herokuapp.com/ for homepage
      // https://murmuring-hollows-75711.herokuapp.com/auth/github/callback for Auth call back UR
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://lazy-baboon-94.loca.lt/${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
passport.deserializeUser(User.deserializeUser());
