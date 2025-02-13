const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("./middleware/passport");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000; 

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("User details are: ", req.user);
  console.log("Entire session object:", req.session);
  console.log("Session details are: ", req.session.passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
