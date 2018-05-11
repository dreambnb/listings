const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingsSchema = new Schema({
  id: Number,
  imageUrl: String,
  description: String,
  title: String,
  zipcode: Number,
  price: Number,
  numOfReviews: Number,
  avgRating: Number,
})

module.exports = mongoose.model('Listings', listingsSchema);
