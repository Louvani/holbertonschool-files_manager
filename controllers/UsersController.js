import sha1 from 'sha1';
import mongodb from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

// const redisClient = require('../utils/redis');

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) res.status(400).json({ error: 'Missing email' });
    if (!password) res.status(400).json({ error: 'Missing password' });
    if (!dbClient.isAlive()) res.status(400);

    const user = await dbClient.client
      .db('files_manager')
      .collection('users')
      .findOne({ email });

    if (user) res.status(400).json({ error: 'Already exist' });

    const newPassword = sha1(password);
    const newUser = await dbClient.client
      .db('files_manager')
      .collection('users')
      .insert({ email, password: newPassword });
    return res.status(201)
      .json({ id: newUser.ops[0]._id, email: newUser.ops[0].email });
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];
    const user = await redisClient.get(`auth_${token}`);
    if (user) {
      const id = new mongodb.ObjectID(user);
      const result = await dbClient.client
        .db('files_manager')
        .collection('users')
        .findOne({ _id: id });
      if (result) {
        return res.status(200).json({ id: result._id, email: result.email });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
