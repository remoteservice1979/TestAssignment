'use strict'

const unirest = require('unirest');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const yelp = require('yelp-fusion');
const orderBy = require('lodash/orderBy');

// _.orderBy(hotels, 'account.id', 'desc');
//console.log(`Your port is ${process.env.FUSIONAPI_KEY}`); // 8626
const apiKey = `${process.env.FUSIONAPI_KEY}`
module.exports = {
  fetchBusinesses: searchTerm => {
// Alpharetta
  const searchRequest = {
     term: 'restaurants',
     location: 'Los Angeles',
     limit: 5,
     sort_by:'rating',
     offset : 100
     // sort_order:'desc'
   };

   const client = yelp.client(apiKey);

   console.log("This fusstion API", process.env.FUSIONAPI_KEY)
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


    });
  },
  fetchBusinessDetail: businessId => {

    const client = yelp.client(apiKey);
    const searchDescRequest = {
       term: 'restaurants',
       location: 'Los Angeles',
       id: `${businessId}`
     };
    return new Promise((resolve, reject) => {

      client.search(searchDescRequest)
        .then((response) => {
        //  console.log(response.jsonBody);
        //  return response.jsonBody;
          resolve(response.jsonBody);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
}
