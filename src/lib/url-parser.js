const url = require('url');
const queryString = require('querystring');

module.exports = function urlParser(req) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  return Promise.resolve(req);
};
