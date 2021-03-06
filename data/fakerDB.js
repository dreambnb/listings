const faker = require('faker');
const db = require('./data.js');
const fs = require('fs');

let idNumber = 0 
for (let j = 0; j< 5000;j++){
  let listings = [];
  for (let i = 0; i < 2000; i++) {
    idNumber++;
    let listing = {};
    let imageId = idNumber%1000
    listing.id = idNumber;
    listing.imageUrl =`https://picsum.photos/316/210?image=${imageId}`
    listing.description = 'ENTIRE HOUSE ' + (Math.floor(Math.random() * Math.floor(3))+1) +' BED',
    listing.title = faker.address.streetAddress();
    listing.zipcode = Number(faker.address.zipCode("#####"));
    listing.price = Math.floor(Math.random() * Math.floor(400)) + 50
    listing.numOfReviews = Math.floor(Math.random() * Math.floor(100)) + 10
    listing.avgRating = Number((Math.random() * Math.floor(3) + 2).toFixed(2))
    listings.push(JSON.stringify(listing));
  }
  if(idNumber%10000 === 0) {console.log(idNumber)}
  fs.appendFileSync('./data.json', listings.join('\n'));
}
// const insertListings = () => {
//   db.Listings.create(listings).then(() => db.connection.then(db => db.disconnect()));
// };

// insertListings();