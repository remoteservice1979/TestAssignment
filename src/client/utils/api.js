'use strict';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';
const _ = require('lodash');

export default {
  fetchBusinesses: async searchTerm => {
    try {
      const list = await axios.get(`/search?term=${searchTerm}`);
      console.log(typeof(list), list);
      // const sortedUserOrders = list.map(orders =>
      //     _.orderBy(orders, ['order'], ['asc'])
      // )
      // console.log(sortedUserOrders);
      return list.data;
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
