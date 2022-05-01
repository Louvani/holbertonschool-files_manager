const express = require('express');

const getStatus = require('../controllers/AppController');
const getStats = require('../controllers/AppController');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.sendStatus(200);
  });

  router.get('/status', getStatus);
  router.get('/stats', getStats);
  return router;
};
