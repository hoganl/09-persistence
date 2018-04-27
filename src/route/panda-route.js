'use strict';

const logger = require('../lib/logger');
const Panda = require('../model/panda');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routePanda(router) {
  router.post('/api/v1/panda', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-PANDA: POST /api/v1/panda');

    try {
      const newPanda = new Panda(req.body.title, req.body.content);
      storage.create('Panda', newPanda)
        .then((panda) => {
          response.sendJSON(res, 201, panda);
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-PANDA: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/panda', (req, res) => {
    if (req.url.query.id) {
      storage.fetchOne('Panda', req.url.query.id)
        .then((item) => {
          response.sendJSON(res, 200, item);
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          response.sendText(res, 404, 'Resource not found');
          return undefined;
        });
    } else {
      storage.fetchAll('Panda')
        .then((item) => {
          response.sendJSON(res, 200, item);
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          response.sendText(res, 404, 'Resource not found');
          return undefined;
        });
    }
  });

  router.delete('/api/v1/panda', (req, res) => {
    storage.delete('Panda', req.url.query.id)
      .then(() => {
        response.sendText(res, 204, 'No content in the body');        
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 204, 'Resource not found');    
        return undefined;
      });
    return undefined;
  });
};
