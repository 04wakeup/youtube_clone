import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import GitHubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy({}));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    // excuted after visiting Github
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); // send user info to cookies
passport.deserializeUser(User.deserializeUser());
