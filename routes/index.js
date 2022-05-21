import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.sendStatus(200);
  });

  router.get('/status', AppController.getStatus);
  router.get('/stats', AppController.getStats);

  router.post('/users', UsersController.postNew);
  router.get('/users/me', UsersController.getMe);

  router.get('/connect', AuthController.getConnect);
  router.get('/disconnect', AuthController.getDisconnect);

  return router;
};
