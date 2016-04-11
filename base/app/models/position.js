
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Position = new Schema({
  date: String,
  latitude: String,
  longitude: String
},{collection: 'position'}); 

mongoose.model('position', Position);