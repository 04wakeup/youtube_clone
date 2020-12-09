import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // send user info to cookies
passport.deserializeUser(User.deserializeUser());
