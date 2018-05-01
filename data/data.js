const fs = require('fs');
const db = require('../server/db.js');

// create array of objs
// read file
// split by line to get objs
// for each obj
// split by comma
// create obj
// assign title,id,price,keywords,description,num_reviews,avg_rating,imageUrl to value in array
// push obj to array of objs

const listings = [];

fs.readFile('./fullListings.csv', 'utf8', (err, data) => {
  if (err) {
    console.log('error in reading'.err);
  } else {
    const objs = data.split('\r\n');
    for (let i = 0; i < objs.length; i++) {
      const listing = objs[i].split(',');
      let keywordString = listing[3];
      if (keywordString[0] === '"') {
        keywordString = keywordString.slice(1, keywordString.length - 1);
      }
      const keywords = keywordString.split(' ');
      const newObj = {
        id: Number(listing[1]),
        imageUrl: listing[7],
        description: listing[4],
        title: listing[0],
        price: Number(listing[2]),
        num_reviews: Number(listing[5]),
        avg_rating: Number(listing[6]),
        keywords,
      };

      listings.push(newObj);
    }

    for (let i = 0; i < listings.length; i++) {
      db.save(listings[i], (err, listing) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('success', listing);
        }
      });
    }
  }
});

