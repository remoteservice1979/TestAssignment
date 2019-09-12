'use strict'

const unirest = require('unirest');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const yelp = require('yelp-fusion');

//console.log(`Your port is ${process.env.FUSIONAPI_KEY}`); // 8626
const apiKey = `${process.env.FUSIONAPI_KEY}`
module.exports = {
  fetchBusinesses: searchTerm => {

  const searchRequest = {
     term: 'restaurants',
     location: 'Los Angeles',
     count: 5
   };

   const client = yelp.client(apiKey);

  //  console.log("This fusstion API", process.env.FUSIONAPI_KEY)
  //  console.log(`Your port is ${process.env.FUSIONAPI_KEY}`);
    return new Promise((resolve, reject) => {
      client.search(searchRequest)
        .then((response) => {
        //  console.log(response.jsonBody);
        //  return response.jsonBody;
          resolve(response.jsonBody);
        })
        .catch((error) => {
          console.log(error);
        });

     // unirest.get(`https://api.yelp.com/v3/businesses/search?location=Naperville&limit=50&term=${searchTerm}`)
     //    .header('Authorization',  `${process.env.FUSIONAPI_KEY}`)
     //    .header('Accept', 'application/json')
     //    .end(response => {
     //      if (response.status === 200) {
     //        console.log('data collectd', response.body);
     //        resolve(response.body);
     //      } else {
     //        const error = new Error('Failed to get data from api');
     //        reject(error);
     //      }
     //    });
    });
  },
  fetchBusinessDetail: businessId => {
    return new Promise((resolve, reject) => {
      unirest.get(`https://api.yelp.com/v3/businesses/${businessId}`)
        .header('Authorization', `${process.env.FUSIONAPI_KEY}`)
        .header('Accept', 'application/json')
        .end(response => {
          if (response.status === 200) {
            resolve(response.body);
          } else {
            const error = new Error('Failed to get data from api');
            reject(error);
          }
        });
    });
  },
}
