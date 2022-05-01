const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

const getStatus = async (req, res) => {
  if (redisClient.isAlive() && dbClient.isAlive()) {
    const status = {
      redis: await redisClient.isAlive(),
      db: await dbClient.isAlive(),
    };
    return res.status(200).json(status);
  }
  return res.status(400);
};

const getStats = async (req, res) => {
  if (dbClient.isAlive()) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    return res.status(200).json(stats);
  }
  return res.status(400);
};

module.exports = getStatus;
module.exports = getStats;
