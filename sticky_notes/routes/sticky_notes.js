var express = require('express');
var redis = require('redis');
var redisClient = redis.createClient();
var router = express.Router();

/*GET Sticky*/
router.get('/', function(req, res, next) {
  redisClient.smembers("sticky_notes", function (err, sticky_notes) {
    res.locals.sticky_notes = sticky_notes ? sticky_notes : [];
    res.render('sticky_notes');
  });
});

/*PO'ST add Sticky*/
router
.post('/', function(req, res, next) {
  redisClient.sadd("sticky_notes", req.body.name);
  res.redirect('/sticky_notes');
});

/* DELETE  a Sticky*/
router.get('/delete/:name', function(req, res, next) {
  redisClient.srem("sticky_notes", req.params.name);
  res.redirect('sticky_notes');
});

module.exports = router;