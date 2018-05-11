require('newrelic');

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost/dreambnb')
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});
app.use('/:id', express.static(path.join(__dirname, '../client/dist')));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

let port = 4000;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});