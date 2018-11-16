const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

router.post("/register", function(req, res) {
  turbo
    .createUser(req.body)
    .then(data => {
      req.vertexSession.user = { id: data.id };
      res.redirect("/dashboard");
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

router.post("/login", function(req, res) {
  turbo
    .login(req.body)
    .then(data => {
      req.vertexSession.user = { id: data.id };
      res.redirect("/dashboard");
    })
    .catch(error => {
      res.json({
        confirmation: "failure",
        data: error
      });
    });
});

router.get("/logout", function(req, res) {
  req.vertexSession.reset();
  res.redirect("/");
});

router.post("/update", function(req, res) {
  if (!req.vertexSession) res.redirect("/");
  if (!req.vertexSession.user) res.redirect("/");

  turbo
    .updateUser(req.vertexSession.user.id, req.body)
    .then(data => {
      res.redirect("/dashboard");
    })
    .catch(error => {
      res.json({
        confirmation: "failure",
        data: error
      });
    });
});

module.exports = router;
