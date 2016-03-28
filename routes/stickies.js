var express = require('express');
var mongoose = require('mongoose');
var Sticky = mongoose.model('Sticky');
var router = express.Router();

/* GET sticky listings. */
router.get('/', function(req, res, next) {
 Sticky.find( function ( err, stickies, count ) {
   res.render('stickies', { stickies: stickies });
 });
});

/* POST a new sticky */
router.post('/', function(req, res, next) {
 new Sticky({
   title: req.body.title,
   description: req.body.description,
   updated_at : Date.now()
 }).save( function( err, sticky, count ) {
   res.redirect('/stickies');
 });
});

/* GET a sticky */
router.get('/:id', function(req, res, next) {
 Sticky.findById(req.params.id, function(err, sticky) {
   res.render('sticky', { sticky: sticky });
 });
});

/* EDIT a sticky */
router.post('/edit/:id', function(req, res, next) {
 Sticky.findById( req.params.id, function(err, sticky) {
   sticky.title = req.body.title,
   sticky.description = req.body.description,
   sticky.updated_at = Date.now();
   sticky.save( function(err, sticky, count) {
     res.redirect('/stickies');
   });
 });
});

/* DELETE a sticky */
router.post('/:id', function(req, res, next) {
 Sticky.findById(req.params.id, function(err, sticky) {
   sticky.remove( function(err, sticky) {
     res.redirect('/stickies');
   });
  });
});

module.exports = router;
