import { UserModel } from '../models/User.js';

export default (app) => {
  app.get('/v1/users/:id', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).end();
      }
    } catch (e) {
      res.status(404).end();
    }
  });
};
