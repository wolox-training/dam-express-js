const { request } = require('../helpers/request');
const config = require('../../config');

const getRandom = () =>
  request({
    method: 'get',
    url: config.numbersApi.url,
    path: '/random/trivia'
  }).catch(() => Promise.reject(new Error('Error getting a random weed')));

module.exports = {
  getRandom
};
