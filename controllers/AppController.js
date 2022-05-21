const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

export default class AppController {
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    return res.status(200).json(status);
  }

  static async getStats(req, res) {
    if (dbClient.isAlive()) {
      const stats = {
        users: await dbClient.nbUsers(),
        files: await dbClient.nbFiles(),
      };
      return res.status(200).json(stats);
    }
    return res.status(400);
  }
}
