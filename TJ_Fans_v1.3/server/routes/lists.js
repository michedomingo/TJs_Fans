import { ListModel } from '../models/List.js';

export default (app) => {
  app.post('/v1/lists', async (req, res) => {
    if (req.body === undefined) {
      req.status(400).end();
    } else if (req.user === undefined) {
      req.status(401).end();
    } else {
      const listData = {
        ...req.body,
        timestamp: Date.now(),
        user: req.user.data._id,
      };
      const list = await ListModel.create(listData);
      if (list) {
        res.send(list).end();
      } else {
        res.status(500).end();
      }
    }
  });

  app.get('/v1/lists', async (req, res) => {
    if (!req.user.data._id) {
      res.status(401).end();
      return;
    }
    const lists = (await ListModel.find({ user: req.user.data._id })) || [];
    res.send(lists);
  });
};
