'use strict';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';


export default {
  fetchBusinesses: async searchTerm => {
    try {
      const list = await axios.get(`/search?term=${searchTerm}`);
      console.log(typeof(list), list.data);

      // let data =  _.orderBy(list, 'data.businesses.rating', 'desc');
      let collectData = [];
      let databusiness = [];
      let dataRegion = [];
      let total = 0;
      let i =0 ;
     list.data.businesses.map( function(order) {
     //  console.log(order.rating);
          if (order.rating >= 5 && i <= 5) {

            databusiness.push(order);
             i = i+1 ;
          }
     })
      i =0;
    //  console.log('thsis',retrunRequest);
      const retrunRequest = {
          businesses: databusiness,
          region:  list.data.region,
          total: list.total
      }

     console.log('thsis',retrunRequest);

      return retrunRequest;
    } catch (error) {
      console.warn(error);
      return null;
    }
  },
  fetchBusinessDetail: async businessId => {
    try {
      const businessDetail = await axios.get(`/business-detail/${businessId}`);
      return businessDetail.data;
    } catch (error) {
      console.warn(error);
      return null;
    }
  },
};
