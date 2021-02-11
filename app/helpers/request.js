const axios = require('axios');

const buildRequest = ({ url, path, method, headers, data, params }) => {
  const defaultOptions = {
    method,
    url: `${url}${path}`,
    headers,
    json: true,
    data,
    params
  };
  return defaultOptions;
};

exports.request = options => axios(buildRequest(options)).then(response => response.data);
