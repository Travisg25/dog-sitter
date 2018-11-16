const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get("/", function(req, res) {
  res.render("index", {
    text:
      "This is the dynamic data. Open index.js from the routes directory to see."
  });
});

router.get("/dashboard", function(req, res) {
  if (!req.vertexSession) res.redirect("/");
  if (!req.vertexSession.user) res.redirect("/");

  turbo
    .fetchUser(req.vertexSession.user.id)
    .then(user => {
      if (user.type === "dogOwner")
        return [user, turbo.fetch("reservations", { owner: user.id })];
      else return [user, turbo.fetch("reservations", { sitter: user.id })];
    })
    .spread((user, reservations) => {
      if (user.type === "dogOwner")
        res.render("dashboard", {
          user: user,
          reservations: reservations,
          isDogOwner: true
        });
      else
        res.render("dashboard", {
          user: user,
          reservations: reservations,
          isDogSitter: true
        });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

router.get("/reservations", function(req, res) {
  if (!req.vertexSession) res.redirect("/");
  if (!req.vertexSession.user) res.redirect("/");

  turbo
    .fetchUser(req.vertexSession.user.id)
    .then(user => {
      return [
        user,
        turbo.fetch("reservations", { sitter: { $not: { $exists: true } } })
      ];
    })
    .spread((user, reservations) => {
      if (user.type === "dogOwner")
        res.render("reservations", {
          user: user,
          reservations: reservations,
          isDogOwner: true
        });
      else
        res.render("reservations", {
          user: user,
          reservations: reservations,
          isDogSitter: true
        });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

router.get("/profiles", function(req, res) {
  turbo.fetch("user", { type: "dogSitter" }).then(users => {
    res.render("profiles", { profiles: users });
  });
});

router.get("/profile/:id", function(req, res) {
  turbo
    .fetchUser(req.params.id)
    .then(user => {
      return [user, turbo.fetch("reservations", { sitter: user.id })];
    })
    .spread((user, reservations) => {
      res.render("profile", { user: user, reservations: reservations });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

module.exports = router;
