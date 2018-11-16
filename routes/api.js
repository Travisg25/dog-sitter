const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

/*  This is a sample API route. */

router.get("/reservations", function(req, res) {
  turbo
    .fetch("reservations", req.body)
    .then(data => {
      res.json({
        confirmation: "success",
        data: data
      });
    })
    .catch(error => {
      res.json({
        confirmation: "failure",
        data: error
      });
    });
});

router.post("/reservations", function(req, res) {
  if (!req.vertexSession) res.redirect("/");
  if (!req.vertexSession.user) res.redirect("/");

  req.body.owner = req.vertexSession.user.id;
  turbo
    .create("reservations", req.body)
    .then(data => {
      res.redirect("/reservations");
    })
    .catch(error => {
      res.json({
        confirmation: "failure",
        data: data
      });
    });
});

router.put("/reservations/:id", function(req, res) {
  if (!req.vertexSession) res.redirect("/");
  if (!req.vertexSession.user) res.redirect("/");

  turbo
    .updateEntity("reservations", req.params.id, req.body)
    .then(data => {
      res.json({
        confirmation: "success",
        data: data
      });
    })
    .catch(error => {
      res.json({
        confirmation: "failure",
        data: error
      });
    });
});

module.exports = router;
