const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/checkAuth");
const isAdmin = require("../middleware/isAdmin");

router.get("/", (req, res) => {
  res.send("welcome to the passport lab home page");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
  res.render("admin", {
    sessions: req.sessionStore.sessions,
    user: req.user,
  });
});

router.post("/admin/revoke", ensureAuthenticated, isAdmin, (req, res) => {
  const sessionId = req.body.sessionId;
  req.sessionStore.destroy(sessionId, (err) => {
    if (err) {
      return res.status(500).send("Failed to revoke session.");
    }
    res.redirect("/admin");
  });
});

module.exports = router;
