'use strict'

const unirest = require('unirest');

module.exports = {
  fetchBusinesses: searchTerm => {
    return new Promise((resolve, reject) => {
      unirest.get(`https://www.yelp.com/fusion/=${searchTerm}`)
        .header('Authorization', process.env.FUSIONAPI_KEY)
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
      unirest.get(`https://www.yelp.com/fusion//${businessId}`)
        .header('Authorization', process.env.FUSIONAPI_KEY)
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
