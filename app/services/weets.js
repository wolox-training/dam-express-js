const { request } = require('../helpers/request');
const { numberApiError } = require('../errors');
const config = require('../../config');
const logger = require('../app/logger');

const getRandom = () =>
  request({
    method: 'get',
    url: config.numbersApi.url,
    path: '/random/trivia'
  }).catch(() => {
    logger.error('Error getting a random weet');
    throw numberApiError();
  });

module.exports = {
  getRandom
};
