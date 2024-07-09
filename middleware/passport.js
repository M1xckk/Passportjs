const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userController = require("../controllers/userController");
const dotenv = require("dotenv");

dotenv.config();

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const githubLogin = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    const user = userController.getUserByGithubIdOrCreate(profile);
    return user ? done(null, user) : done(null, false);
  }
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = userController.getUserById(id);
  done(null, user);
});

passport.use(localLogin);
passport.use(githubLogin);

module.exports = passport;