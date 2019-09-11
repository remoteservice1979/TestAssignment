'use strict'

const unirest = require('unirest');
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.FUSIONAPI_KEY}`); // 8626

module.exports = {
  fetchBusinesses: searchTerm => {
  //  console.log("This fusstion API", process.env.FUSIONAPI_KEY)
    console.log(`Your port is ${process.env.FUSIONAPI_KEY}`);
    return new Promise((resolve, reject) => {
     unirest.get(`https://api.yelp.com/v3/businesses/search?location=Naperville&limit=50&term=${searchTerm}`)
        .header('Authorization',  `${process.env.FUSIONAPI_KEY}`)
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
