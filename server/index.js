
const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const db = require('../data/dataDB.js');
const path = require('path');
const cors = require('cors');
const responseTime = require('response-time');

// uncomment these for local 
const redisModule = require('redis');
const redis = redisModule.createClient();

// uncomment below for docker
// const redisClient = require('redis').createClient;
// const redis = redisClient('redis://cache:6379');

const app = express();

redis.on('error', (err) => {
  console.log('Error on redis', err);
})


app.use(morgan('dev'));
app.use(parser.json());
app.use(cors());
app.use(responseTime());

// app.use(':locationId', express.static(path.join(__dirname, '../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/rooms/:listingId', (req, res) => {
  
  const id = req.params.listingId;
  redis.get(id, (err, result) => {
    if (result) {
      console.log('in redis!');
      console.log(result)
      res.send(JSON.parse(result));  
    } else {
      db.getSimilarListings(id, (err, listings) => {
        if (err) {
          res.status(404);
          res.end(err);
        } else {
          redis.setex(id, 300, JSON.stringify(listings));
          res.send(listings);
        }
      });
    }
  });
});

app.post('/rooms/:listingId', (req, res) => {

  let listingObj = req.body;
  db.save(listingObj, (err, listing) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.send(listing);
    }
  })

});


let port = 3333;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

