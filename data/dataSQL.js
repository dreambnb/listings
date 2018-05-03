const pg = require('pg');

const pgClient = new pg.Client({
  host: '172.17.0.2',
  user: 'postgres',
  database: 'listings',
});

pgClient.connect();

module.exports.pgClient = pgClient;



// module.exports.get25 = (name, callback) => {

//   let sql = `SELECT name, url FROM githubrepos WHERE name = (?) LIMIT 25`;
//   connection.query(sql, name, (error, results) => {
//     if (error) {
//       callback(error, null)
//     } else {
//       callback(null, results)
//     }
//   })
// }
