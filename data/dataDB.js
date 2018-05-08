const mongoose = require('mongoose');
module.exports.connection = mongoose.connect('mongodb://localhost/dreambnb'); //change localhost --> database for ec2

// const redisClient = require('redis').createClient;

// const redis = redisClient(6379, 'localhost');

var Schema = mongoose.Schema;

var listingsSchema = new Schema({
  id: Number,
  imageUrl: String,
  description: String,
  title: String,
  zipcode: Number,
  price: Number,
  numReviews: Number,
  avgRating: Number,
})

Listings = mongoose.model('Listings', listingsSchema);


const getSimilarListings = (id, callback) => {
  Listings.findOne({ id: id }, 'price avgRating id zipcode').exec()
    .then((listing) => {
      let price = listing.price;
      let avgRating = listing.avgRating;
      let currentId = listing.id;
      let zipcode = listing.zipcode
      return Listings.find({ price: { $gt: price - 10, $lt: price + 10 }, avgRating: { $gt: avgRating - 0.5, $lt: avgRating + 0.5 }, zipcode: { $gt: zipcode - 10, $lt: zipcode + 10 }}) // price: { $gt: price - 1, $lt: price + 1 }, avgRating: { $gt: avgRating - 1, $lt: avgRating + 1 },
        .where({ id: { $ne: currentId } })
        .sort({ avgRating: -1 })
        .limit(12);
    }).then((listings) => {
      callback(null, listings);
    }).catch((err) => callback(err, null));
}


// getSimilarListings(1, (error,result)=>{
//   if (error){
//     console.log(error)
//   } else {
//     console.log(result)
//   }
// })



module.exports.Listings = Listings;
module.exports.getSimilarListings = getSimilarListings;


