var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Sticky = new Schema({
  title : String,
  description : String,
  updated_at : Date
});

mongoose.model( 'Sticky', Sticky );
mongoose.connect( 'mongodb://localhost/sticky_notes' );